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
    let margin = { top: 60, right: 40, bottom: 60, left: 120 };
    let width = $derived(containerWidth - margin.left - margin.right);
    let height = $derived(containerHeight - margin.top - margin.bottom);
    
    let value = $state(0);
    let svg;
    let processedData = $state([]);
    
    // Display controls as separate boolean variables
    let displayRegular = $state(true);
    let displayPlus = $state(false);
    let displayedBrands = $state(null);

    // Tooltip state
    let tooltip = $state({ visible: false, x: 0, y: 0, content: '' });

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
        
        // Convert waist values to numbers and filter out invalid data
        const processedData = filteredData
            .map(d => ({
                ...d,
                waistMin: parseFloat(d.waist),
                waistMax: parseFloat(d.waist), // Same value for both since ASTM is exact measurements
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

    // Group brands and filter by current display settings
    function processData() {
        const groupedByBrand = d3.group(sizeCharts, d => d.brand);
        const processed = [];
        
        groupedByBrand.forEach((brandData, brandName) => {
            // Parse displayedBrands if it's a string, otherwise use as-is
            let brandsToShow = displayedBrands;
            if (typeof displayedBrands === 'string' && displayedBrands !== 'null') {
                brandsToShow = displayedBrands.split(',').map(brand => brand.trim());
            }
            
            // Skip brands not in displayedBrands filter (if filter exists)
            if (brandsToShow && brandsToShow !== 'null' && Array.isArray(brandsToShow)) {
                // Use case-insensitive matching to handle any potential issues
                const brandMatch = brandsToShow.some(targetBrand => 
                    targetBrand.toLowerCase().trim() === brandName.toLowerCase().trim()
                );
                if (!brandMatch) {
                    return;
                }
            }
            
            // Filter for apparel garment type - separate Regular and Plus
            const regularData = displayRegular ? brandData.filter(d => 
                d.garmentType && d.garmentType.toLowerCase().includes('apparel') && 
                d.sizeRange && d.sizeRange.toLowerCase() === 'regular' &&
                d.waistMin !== null && 
                d.waistMin !== undefined
            ) : [];
            
            const plusData = displayPlus ? brandData.filter(d => 
                d.garmentType && d.garmentType.toLowerCase().includes('apparel') && 
                d.sizeRange && d.sizeRange.toLowerCase() === 'plus' &&
                d.waistMin !== null && 
                d.waistMin !== undefined
            ) : [];
            
            // Only include brand if it has data for at least one of the requested display types
            if (regularData.length > 0 || plusData.length > 0) {
                // Calculate Regular size range
                let regularRange = null;
                if (regularData.length > 0) {
                    const regularWaistMinValues = regularData.map(d => d.waistMin).filter(v => v !== null && v !== undefined);
                    const regularAllMaxValues = regularData.map(d => d.waistMax !== null && d.waistMax !== undefined ? d.waistMax : d.waistMin);
                    
                    regularRange = {
                        min: d3.min(regularWaistMinValues),
                        max: d3.max(regularAllMaxValues)
                    };
                }
                
                // Calculate Plus size range
                let plusRange = null;
                if (plusData.length > 0) {
                    const plusWaistMinValues = plusData.map(d => d.waistMin).filter(v => v !== null && v !== undefined);
                    const plusAllMaxValues = plusData.map(d => d.waistMax !== null && d.waistMax !== undefined ? d.waistMax : d.waistMin);
                    
                    plusRange = {
                        min: d3.min(plusWaistMinValues),
                        max: d3.max(plusAllMaxValues)
                    };
                }
                
                // Determine the max waist value for sorting (prioritize regular, then plus)
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
        
        // Sort brands by their maximum waist value (smallest to largest)
        processed.sort((a, b) => a.maxWaistValue - b.maxWaistValue);
        
        return processed;
    }

    function showTooltip(event, data) {
        const chartContainer = document.querySelector('.chart-container');
        const rect = chartContainer.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        // Format tooltip content
        let content = '';
        
        // Handle numeric size range
        if (data.numericSizeMax !== null && data.numericSizeMax !== undefined && 
            data.numericSizeMax !== data.numericSizeMin) {
            content += `<strong>Size:</strong> ${data.numericSizeMin} - ${data.numericSizeMax}<br>`;
        } else if (data.numericSizeMin !== null && data.numericSizeMin !== undefined) {
            content += `<strong>Size:</strong> ${data.numericSizeMin}<br>`;
        } else {
            content += `<strong>Size:</strong> N/A<br>`;
        }
        
        // Handle waist range
        if (data.waistMax !== null && data.waistMax !== undefined && data.waistMax !== data.waistMin) {
            content += `<strong>Waist:</strong> ${data.waistMin}" - ${data.waistMax}"`;
        } else {
            content += `<strong>Waist:</strong> ${data.waistMin}"`;
        }
        
        tooltip = {
            visible: true,
            x: x + 10,
            y: y - 10,
            content: content
        };
    }

    function hideTooltip() {
        tooltip = { visible: false, x: 0, y: 0, content: '' };
    }

    function renderChart() {
        if (!processedData.length || !containerWidth || !containerHeight) return;
        
        // Set fixed scale from 20 to 65 inches
        const xScale = d3.scaleLinear()
            .domain([20, 65])
            .range([0, width]);

        // Calculate spacing for brands (including ASTM if present)
        const totalItems = processedData.length + (astmData ? 1 : 0);
        const brandSpacing = height / (totalItems + 1);

        const svgSelection = d3.select(svg);
        svgSelection.selectAll('*').remove();

        const g = svgSelection
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // Render ASTM standard sizes if data exists (at the top)
        if (astmData) {
            const astmYPosition = brandSpacing; // First position
            
            // ASTM label
            g.append('text')
                .attr('x', xScale(astmData.range.min))
                .attr('y', astmYPosition - 10)
                .attr('text-anchor', 'start')
                .style('font-size', Math.max(containerWidth * 0.008, 10) + 'px')
                .style('fill', '#333')
                .style('font-weight', '600')
                .text('ASTM Standard Sizes');
            
            // ASTM horizontal line
            g.append('line')
                .attr('x1', xScale(astmData.range.min))
                .attr('x2', xScale(astmData.range.max))
                .attr('y1', astmYPosition)
                .attr('y2', astmYPosition)
                .style('stroke', '#C2D932')
                .style('stroke-width', 3)
                .style('opacity', 0.8);
            
            // ASTM data points
            astmData.data.forEach((d, dataIndex) => {
                g.append('circle')
                    .attr('cx', xScale(d.waistMin))
                    .attr('cy', astmYPosition)
                    .attr('r', 5)
                    .style('fill', '#C2D932')
                    .style('stroke', 'white')
                    .style('stroke-width', 2)
                    .style('opacity', 0.9)
                    .style('cursor', 'pointer')
                    .on('mouseover', (event) => showTooltip(event, d))
                    .on('mouseout', hideTooltip)
                    .on('mousemove', (event) => showTooltip(event, d));
            });
        }

        // Render each brand (shifted down if ASTM exists)
        processedData.forEach((brand, index) => {
            const yPosition = (index + 1 + (astmData ? 1 : 0)) * brandSpacing; // Offset by 1 if ASTM exists
            
            // Find the leftmost starting point (minimum of all visible ranges)
            const allStartPoints = [];
            if (displayRegular && brand.regularRange) {
                allStartPoints.push(brand.regularRange.min);
            }
            if (displayPlus && brand.plusRange) {
                allStartPoints.push(brand.plusRange.min);
            }
            const brandStartPoint = Math.min(...allStartPoints);
            
            // Brand label - positioned directly above the starting point
            g.append('text')
                .attr('x', xScale(brandStartPoint))
                .attr('y', yPosition - 10)
                .attr('text-anchor', 'start')
                .style('font-size', Math.max(containerWidth * 0.008, 10) + 'px')
                .style('fill', '#333')
                .text(brand.brand);
            
            // Regular size horizontal line
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
            
            // Plus size horizontal line
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
            
            // Function to render plot points for a given dataset and color
            function renderSizePoints(data, color, sizeType) {
                data.forEach((d, dataIndex) => {
                    const hasRange = d.waistMax !== null && d.waistMax !== undefined && d.waistMax !== d.waistMin;
                    
                    if (hasRange) {
                        // Create pill shape for range data
                        const minX = xScale(d.waistMin);
                        const maxX = xScale(d.waistMax);
                        const pillGroup = g.append('g')
                            .attr('class', `pill-${index}-${dataIndex}-${sizeType}`)
                            .style('cursor', 'pointer');
                        
                        // Invisible hover area for the entire pill
                        pillGroup.append('rect')
                            .attr('x', minX - 8)
                            .attr('y', yPosition - 8)
                            .attr('width', maxX - minX + 16)
                            .attr('height', 16)
                            .style('fill', 'transparent')
                            .on('mouseover', (event) => showTooltip(event, d))
                            .on('mouseout', hideTooltip)
                            .on('mousemove', (event) => showTooltip(event, d));
                        
                        // Connecting line between min and max with round caps
                        pillGroup.append('line')
                            .attr('x1', minX)
                            .attr('x2', maxX)
                            .attr('y1', yPosition)
                            .attr('y2', yPosition)
                            .style('stroke', color)
                            .style('stroke-width', 8)
                            .style('stroke-linecap', 'round')
                            .style('opacity', 0.2)
                            .style('pointer-events', 'none');
                        
                        // Min circle
                        pillGroup.append('circle')
                            .attr('cx', minX)
                            .attr('cy', yPosition)
                            .attr('r', 4)
                            .style('fill', color)
                            .style('stroke', 'none')
                            .style('opacity', 0.4)
                            .style('pointer-events', 'none');
                        
                        // Max circle
                        pillGroup.append('circle')
                            .attr('cx', maxX)
                            .attr('cy', yPosition)
                            .attr('r', 4)
                            .style('fill', color)
                            .style('stroke', 'none')
                            .style('opacity', 0.4)
                            .style('pointer-events', 'none');
                            
                    } else {
                        // Single point for data without range
                        g.append('circle')
                            .attr('cx', xScale(d.waistMin))
                            .attr('cy', yPosition)
                            .attr('r', 4)
                            .style('fill', color)
                            .style('stroke', 'none')
                            .style('opacity', 0.8)
                            .style('cursor', 'pointer')
                            .on('mouseover', (event) => showTooltip(event, d))
                            .on('mouseout', hideTooltip)
                            .on('mousemove', (event) => showTooltip(event, d));
                    }
                });
            }
            
            // Render Regular size points (purple)
            if (displayRegular && brand.regularData.length > 0) {
                renderSizePoints(brand.regularData, '#B57BDC', 'regular');
            }
            
            // Render Plus size points (orange)
            if (displayPlus && brand.plusData.length > 0) {
                renderSizePoints(brand.plusData, '#D96F32', 'plus');
            }
        });

        // X-axis
        g.append('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0, ${height})`)
            .call(d3.axisBottom(xScale)
                .tickSize(-height)
                .ticks(10)
                .tickFormat('')
            )
            .style('opacity', 0.1);

        // X-axis with labels
        const xAxisLabels = g.append('g')
            .attr('class', 'x-axis-labels')
            .attr('transform', `translate(0, ${height})`)
            .call(d3.axisBottom(xScale).ticks(10))
            .style('opacity', 0.7);

        xAxisLabels.selectAll('text')
            .style('font-size', Math.max(containerWidth * 0.01, 10) + 'px')
            .attr('dy', '1.2em');

        // X-axis label
        g.append('text')
            .attr('x', width / 2)
            .attr('y', height + 40)
            .attr('text-anchor', 'middle')
            .style('font-size', Math.max(containerWidth * 0.012, 12) + 'px')
            .style('fill', '#666')
            .text('Waist Measurement (inches)');

        // Add median waistline vertical line if data exists
        if (medianWaistline !== null) {
            const medianX = xScale(medianWaistline);
            
            // Vertical line
            g.append('line')
                .attr('x1', medianX)
                .attr('x2', medianX)
                .attr('y1', 0)
                .attr('y2', height)
                .style('stroke', '#FF6B6B')
                .style('stroke-width', 2)
                .style('stroke-dasharray', '5,5')
                .style('opacity', 0.8);
            
            // Label
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

    // Watch for changes in display settings and update data
    $effect(() => {
        processedData = processData();
    });

    // Watch for changes in processed data or container dimensions and render chart
    $effect(() => {
        if (containerWidth > 0 && containerHeight > 0) {
            renderChart();
        }
    });

    // Update display settings based on scroll value
    $effect(() => {
        if (copy.scrolly4 && copy.scrolly4[value]) {
            const currentStage = copy.scrolly4[value];
            
            // Parse boolean strings to actual booleans
            const newDisplayRegular = currentStage.displayRegular === 'true';
            const newDisplayPlus = currentStage.displayPlus === 'true';
            const newDisplayedBrands = currentStage.displayedBrands === 'null' ? null : currentStage.displayedBrands;
            
            // Only update if values actually changed
            if (displayRegular !== newDisplayRegular || 
                displayPlus !== newDisplayPlus || 
                displayedBrands !== newDisplayedBrands) {
                
                displayRegular = newDisplayRegular;
                displayPlus = newDisplayPlus;
                displayedBrands = newDisplayedBrands;
            }
        }
    });

    onMount(() => {
        return () => {
            // No cleanup needed
        };
    });
</script>

<div class="outer-container">
    <div class="sticky-container">
        <div class="visual-container">
            <div class="chart-container" bind:clientHeight={containerHeight} bind:clientWidth={containerWidth}>
                <svg bind:this={svg}></svg>
                {#if tooltip.visible}
                    <div 
                        class="tooltip" 
                        style="left: {tooltip.x}px; top: {tooltip.y}px;"
                    >
                        {@html tooltip.content}
                    </div>
                {/if}
            </div>
        </div>
    </div>
    
    <div class="scrolly-outer">
        <Scrolly bind:value>
            {#each copy.scrolly4 as stage, i}
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
        width: calc(100% - 4rem);
        height: 100vh;
        margin: 0 auto;
        padding: 5px;
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

    .tooltip {
        position: fixed;
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 12px;
        line-height: 1.4;
        pointer-events: none;
        z-index: 1000;
        white-space: nowrap;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    }

    .tooltip :global(strong) {
        color: #fff;
        font-weight: 600;
    }
</style>