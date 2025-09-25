<!-- SizeChart.svelte -->

<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
    import copy from "../data/copy.json";
    import sizeCharts from "../data/sizeCharts.json"
    import generatedPercentiles from '../data/generatedPercentiles.json';
    import ASTMsizes from "../data/ASTMsizes.json";
    import Scrolly from './helpers/Scrolly.svelte';

    let containerHeight = $state(0);
    let containerWidth = $state(0);
    let margin = { top: 60, right: 40, bottom: 120, left: 120 };
    let width = $derived(containerWidth - margin.left - margin.right);
    let height = $derived(containerHeight - margin.top - margin.bottom);
    
    let value = $state(0);
    let svg;
    let processedData = $state([]);
    
    // Display controls - initialize based on first stage
    const initialStage = copy.sizeCharts && copy.sizeCharts[0] ? copy.sizeCharts[0] : {};
    let displayRegular = $state(initialStage.displayRegular === 'true' || initialStage.displayRegular === true);
    let displayPlus = $state(initialStage.displayPlus === 'true' || initialStage.displayPlus === true);

    // Get median waistline value
    const medianWaistline = (() => {
        const targetData = generatedPercentiles.find(d => 
            d.yearRange === "2021-2023" && 
            d.race === "all" && 
            d.age === "20 and over"
        );
        return targetData ? targetData.percent50 : null;
    })();

    // Get ASTM standard sizes data
    const astmData = (() => {
        const filteredData = ASTMsizes.filter(d => 
            d.year === "2021" && 
            d.sizeRange === "straight"
        );
        
        const processedData = filteredData
            .map(d => ({
                ...d,
                waistMin: parseFloat(d.waist),
                waistMax: parseFloat(d.waist),
                numericSizeMin: d.size,
                numericSizeMax: d.size
            }))
            .filter(d => !isNaN(d.waistMin));
        
        if (processedData.length === 0) return null;
        
        const waistValues = processedData.map(d => d.waistMin);
        return {
            data: processedData,
            range: {
                min: d3.min(waistValues),
                max: d3.max(waistValues)
            }
        };
    })();

    // Function to get brands to display based on current stage configuration
    function getBrandsToDisplay(stageConfig) {
        if (!stageConfig || !stageConfig.brandFilter) {
            return null;
        }
        
        if (stageConfig.brandFilter === 'excludeNearMedian') {
            const groupedByBrand = d3.group(sizeCharts, d => d.brand);
            const brandsNotNearMedian = [];
            
            groupedByBrand.forEach((brandData, brandName) => {
                const regularSizes = brandData.filter(d => 
                    d.sizeRange && d.sizeRange.toLowerCase() === 'regular' &&
                    d.waistMin !== null && d.waistMin !== undefined
                );
                
                if (regularSizes.length === 0) {
                    brandsNotNearMedian.push(brandName);
                } else {
                    const hasNearMedianSize = regularSizes.some(d => {
                        const waistMax = d.waistMax !== null && d.waistMax !== undefined ? d.waistMax : d.waistMin;
                        return waistMax >= (medianWaistline - 1);
                    });
                    
                    if (!hasNearMedianSize) {
                        brandsNotNearMedian.push(brandName);
                    }
                }
            });

            return brandsNotNearMedian;
        }
        
        return null;
    }

    // Group brands and filter by current display settings
    function processData() {
        const groupedByBrand = d3.group(sizeCharts, d => d.brand);
        const processed = [];
        
        const currentStageConfig = copy.sizeCharts && copy.sizeCharts[value] ? copy.sizeCharts[value] : {};
        const brandsToShow = getBrandsToDisplay(currentStageConfig);
        
        groupedByBrand.forEach((brandData, brandName) => {
            if (brandsToShow && Array.isArray(brandsToShow)) {
                const brandMatch = brandsToShow.some(targetBrand => 
                    targetBrand.toLowerCase().trim() === brandName.toLowerCase().trim()
                );
                if (!brandMatch) {
                    return;
                }
            }
            
            const regularData = displayRegular ? brandData.filter(d => 
                d.sizeRange && d.sizeRange.toLowerCase() === 'regular' &&
                d.waistMin !== null && 
                d.waistMin !== undefined
            ) : [];
            
            const plusData = displayPlus ? brandData.filter(d => 
                d.sizeRange && d.sizeRange.toLowerCase() === 'plus' &&
                d.waistMin !== null && 
                d.waistMin !== undefined
            ) : [];
            
            if (regularData.length > 0 || plusData.length > 0) {
                let regularRange = null;
                if (regularData.length > 0) {
                    const regularWaistMinValues = regularData.map(d => d.waistMin).filter(v => v !== null && v !== undefined);
                    const regularAllMaxValues = regularData.map(d => d.waistMax !== null && d.waistMax !== undefined ? d.waistMax : d.waistMin);
                    
                    regularRange = {
                        min: d3.min(regularWaistMinValues),
                        max: d3.max(regularAllMaxValues)
                    };
                }
                
                let plusRange = null;
                if (plusData.length > 0) {
                    const plusWaistMinValues = plusData.map(d => d.waistMin).filter(v => v !== null && v !== undefined);
                    const plusAllMaxValues = plusData.map(d => d.waistMax !== null && d.waistMax !== undefined ? d.waistMax : d.waistMin);
                    
                    plusRange = {
                        min: d3.min(plusWaistMinValues),
                        max: d3.max(plusAllMaxValues)
                    };
                }
                
                const maxWaistValue = regularRange?.max || plusRange?.max;
                
                processed.push({
                    brand: brandName,
                    regularData,
                    plusData,
                    regularRange,
                    plusRange,
                    maxWaistValue
                });
            }
        });
        
        processed.sort((a, b) => a.maxWaistValue - b.maxWaistValue);
        return processed;
    }

    function renderChart() {
        if (!processedData.length || !containerWidth || !containerHeight) return;
        
        const xScale = d3.scaleLinear()
            .domain([20, 65])
            .range([0, width]);

        const totalItems = processedData.length + (astmData ? 1 : 0);
        const brandSpacing = height / (totalItems + 1);

        const svgSelection = d3.select(svg);
        svgSelection.selectAll('*').remove();

        const g = svgSelection
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // Render ASTM standard sizes if data exists
        if (astmData) {
            const astmYPosition = brandSpacing;
            
            g.append('text')
                .attr('x', xScale(astmData.range.min))
                .attr('y', astmYPosition - 10)
                .attr("class", "brand-label")
                .attr('text-anchor', 'start')
                .text('ASTM Standard Sizes');
            
            g.append('line')
                .attr('x1', xScale(astmData.range.min))
                .attr('x2', xScale(astmData.range.max))
                .attr('y1', astmYPosition)
                .attr('y2', astmYPosition)
                .style('stroke', '#C2D932')
                .style('stroke-width', 3)
                .style('opacity', 0.8);
            
            astmData.data.forEach((d, dataIndex) => {
                g.append('circle')
                    .attr('cx', xScale(d.waistMin))
                    .attr('cy', astmYPosition)
                    .attr('r', 6)
                    .style('fill', '#C2D932')
                    .style('opacity', 1);
            });
        }

        // Render each brand
        processedData.forEach((brand, index) => {
            const yPosition = (index + 1 + (astmData ? 1 : 0)) * brandSpacing;
            
            const allStartPoints = [];
            if (displayRegular && brand.regularRange) {
                allStartPoints.push(brand.regularRange.min);
            }
            if (displayPlus && brand.plusRange) {
                allStartPoints.push(brand.plusRange.min);
            }
            const brandStartPoint = Math.min(...allStartPoints);
            
            g.append('text')
                .attr('x', xScale(brandStartPoint))
                .attr('y', yPosition - 10)
                .attr("class", "brand-label")
                .attr('text-anchor', 'start')
                .text(brand.brand);
            
            if (displayRegular && brand.regularRange) {
                g.append('line')
                    .attr('x1', xScale(brand.regularRange.min))
                    .attr('x2', xScale(brand.regularRange.max))
                    .attr('y1', yPosition)
                    .attr('y2', yPosition)
                    .style('stroke', '#B57BDC')
                    .style('stroke-width', 2)
                    .style('opacity', 0.7);
            }
            
            if (displayPlus && brand.plusRange) {
                g.append('line')
                    .attr('x1', xScale(brand.plusRange.min))
                    .attr('x2', xScale(brand.plusRange.max))
                    .attr('y1', yPosition)
                    .attr('y2', yPosition)
                    .style('stroke', '#D96F32')
                    .style('stroke-width', 2)
                    .style('opacity', 0.7);
            }
            
            function renderSizePoints(data, color, sizeType) {
                data.forEach((d, dataIndex) => {
                    const hasRange = d.waistMax !== null && d.waistMax !== undefined && d.waistMax !== d.waistMin;
                    
                    if (hasRange) {
                        const minX = xScale(d.waistMin);
                        const maxX = xScale(d.waistMax);
                        const pillGroup = g.append('g')
                            .attr('class', `pill-${index}-${dataIndex}-${sizeType}`);
                        
                        pillGroup.append('line')
                            .attr('x1', minX)
                            .attr('x2', maxX)
                            .attr('y1', yPosition)
                            .attr('y2', yPosition)
                            .style('stroke', color)
                            .style('stroke-width', 10)
                            .style('stroke-linecap', 'round')
                            .style('opacity', 0.2);
                        
                        pillGroup.append('circle')
                            .attr('cx', minX)
                            .attr('cy', yPosition)
                            .attr('r', 6)
                            .style('fill', color)
                            .style('stroke', 'none')
                            .style('opacity', 1);
                        
                        pillGroup.append('circle')
                            .attr('cx', maxX)
                            .attr('cy', yPosition)
                            .attr('r', 6)
                            .style('fill', color)
                            .style('stroke', 'none')
                            .style('opacity', 1);
                            
                    } else {
                        g.append('circle')
                            .attr('cx', xScale(d.waistMin))
                            .attr('cy', yPosition)
                            .attr('r', 6)
                            .style('fill', color)
                            .style('stroke', 'none')
                            .style('opacity', 1);
                    }
                });
            }
            
            if (displayRegular && brand.regularData.length > 0) {
                renderSizePoints(brand.regularData, '#B57BDC', 'regular');
            }
            
            if (displayPlus && brand.plusData.length > 0) {
                renderSizePoints(brand.plusData, '#D96F32', 'plus');
            }
        });

        const xAxis = g.append('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0, ${height})`)
            .call(d3.axisBottom(xScale)
                .tickSize(-height)
                .ticks(10)
            )
            .style('opacity', 1);

        g.append('text')
            .attr('x', width / 2)
            .attr('y', height + 40)
            .attr('text-anchor', 'middle')
            .style('font-size', Math.max(containerWidth * 0.012, 12) + 'px')
            .style('fill', '#666')
            .text('Waist Measurement (inches)');

        // Add median waistline vertical line
        if (medianWaistline !== null) {
            const medianX = xScale(medianWaistline);
            
            g.append('line')
                .attr('x1', medianX)
                .attr('x2', medianX)
                .attr('y1', 0)
                .attr('y2', height)
                .style('stroke', '#FF6B6B')
                .style('stroke-width', 2)
                .style('stroke-dasharray', '5,5')
                .style('opacity', 0.8);
            
            g.append('text')
                .attr('x', medianX)
                .attr('y', -10)
                .attr('text-anchor', 'middle')
                .style('font-size', Math.max(containerWidth * 0.01, 11) + 'px')
                .style('fill', '#FF6B6B')
                .style('font-weight', '600')
                .text(`Median Waistline: ${medianWaistline}"`);
        }
    }

    $effect(() => {
        processedData = processData();
    });

    $effect(() => {
        if (containerWidth > 0 && containerHeight > 0) {
            renderChart();
        }
    });

    $effect(() => {
        if (copy.sizeCharts && copy.sizeCharts[value]) {
            const currentStage = copy.sizeCharts[value];
            
            const newDisplayRegular = currentStage.displayRegular === 'true' || currentStage.displayRegular === true;
            const newDisplayPlus = currentStage.displayPlus === 'true' || currentStage.displayPlus === true;
            
            if (displayRegular !== newDisplayRegular || 
                displayPlus !== newDisplayPlus) {
                
                displayRegular = newDisplayRegular;
                displayPlus = newDisplayPlus;
            }
        }
    });

    onMount(() => {
        processedData = processData();
    });
</script>
<div>
    <h3>TK size Chart section</h3>
    <p>TKTKTKTKTK</p>
</div>
<div class="outer-container">
    
    <div class="sticky-container">
        <div class="visual-container">
            <div id="size-chart" class="chart-container" bind:clientHeight={containerHeight} bind:clientWidth={containerWidth}>
                <svg bind:this={svg}></svg>
            </div>
        </div>
    </div>
    
    <div class="scrolly-outer">
        <Scrolly bind:value>
            {#each copy.sizeCharts as stage, i}
                <div class="step">
                    <div class="text">
                        <p>{@html stage.text}</p>
                    </div>
                </div>
            {/each}
        </Scrolly>
    </div>
</div>

<style>
    .outer-container {
        position: relative;
        width: 100%;
    }
    
    .sticky-container {
        position: sticky;
        top: 0;
        height: 100vh;
        width: 100%;
        z-index: 1;
    }
  
    .visual-container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .chart-container {
        width: 100%;
        height: 100svh;
        margin: 0 auto;
        padding: 2rem;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }
  
    svg {
        display: block;
        width: 100%;
        height: 100%;
    }
    
    .scrolly-outer {
        position: relative;
        z-index: 2;
    }
    
    .step {
        height: 100vh;
        display: flex;
        justify-content: flex-end; 
        align-items: center;
        padding-right: 2rem;
        font-family: var(--sans);
        font-size: var(--20px);
    }
    
    .step .text {
        max-width: 500px;
        width: 90%;
        padding: 20px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        margin: 0;
    }

    :global(#size-chart .x-axis .domain) {
        display: none;
    }

    :global(.brand-label) {
        font-family: var(--mono);
        font-weight: 700;
        font-size: var(--14px);
        text-transform: uppercase;
    }
</style>