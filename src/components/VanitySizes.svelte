<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
    import ASTMsizes from '../data/ASTMsizes.json';
    import waistlines from '../data/waistlines.json';
    import copy from '../data/copy.json';
    import Scrolly from './helpers/Scrolly.svelte';

   
    let containerWidth = $state(0);
    let containerHeight = $state(0);
    let margin = { top: 40, right: 20, bottom: 80, left: 30 };
    let width = $derived(containerWidth - margin.left - margin.right);
    let height = $derived(containerHeight - margin.top - margin.bottom);

    let value = $state(0); 
    let svg = $state(null);
    let mounted = $state(false);

    let plotData = [];
    let currentHighlightedSize = $state(null);
    let iconWidth = $derived(containerWidth > 0 ? Math.min(Math.max(containerWidth * 0.08, 30), 80) : 60);
    let iconHeight = $derived(iconWidth * 1.5);

    function updatePlotData() {
        const straightData = ASTMsizes.filter(d => d.sizeRange === 'straight' && (d.year === '1995' || d.year === '2021'));
        const uniqueYears = ['1995', '2021']; 

        const yPositions = {
            '1995': height * 0.25, // Top quadrant
            '2021': height * 0.75  // Bottom quadrant
        };

        // Process ASTM sizing data
        const astmData = uniqueYears.map((year) => {
            const yearData = straightData.filter(d => d.year === year);
            const yPos = yPositions[year];
            
            return yearData.map(d => ({
                year: d.year,
                size: d.size,
                waist: +d.waist,
                color: 'blue',
                y: yPos,
                type: 'astm'
            }));
        }).flat();

        // Process waistlines data - filter for specific years only
        const waistlinesData = waistlines
            .filter(d => d.race === 'all' && d.age === '20 and over' && (d.yearRange === '1988-1994' || d.yearRange === '2021-2023'))
            .map(d => {
                return {
                    year: d.yearRange,
                    waist: +d.percent50,
                    color: 'orange',
                    y: height * 0.5, // Center on x-axis
                    type: 'waistlines'
                };
            });

        plotData = [...astmData, ...waistlinesData];
    }

    function applyHighlightEffects(targetSize) {
        if (!svg) return;
        
        const svgSelection = d3.select(svg);
        const g = svgSelection.select('g');
        
        const xScale = d3.scaleLinear()
            .domain([22, 42])
            .range([0, width]);

        // Calculate differences for opacity scale (only for ASTM data)
        const differences = [];
        const astmData = plotData.filter(d => d.type === 'astm');
        const sizeGroups = d3.group(astmData, d => d.size);
        for (const [size, points] of sizeGroups.entries()) {
            if (points.length === 2) {
                const point1995 = points.find(p => p.year === '1995');
                const point2021 = points.find(p => p.year === '2021');
                if (point1995 && point2021) {
                    differences.push(Math.abs(point2021.waist - point1995.waist));
                }
            }
        }
        
        const opacityScale = d3.scaleLinear()
            .domain([2.5, 4])
            .range([0.2, 0.8])
            .clamp(true);

        const scaleFactor = 1.15;
        const newWidth = iconWidth * scaleFactor;
        const newHeight = iconHeight * scaleFactor;
        
        // Scale up icons of the target size
        g.selectAll('image')
            .filter(iconData => iconData.size === targetSize)
            .transition()
            .duration(200)
            .attr('width', newWidth)
            .attr('height', newHeight)
            .attr('x', iconData => xScale(iconData.waist) - newWidth/2)
            .attr('y', iconData => iconData.y - newHeight/2)
            .style('opacity', 1)
            .style('filter', 'drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.25))');
        
        // Find both data points for this size (ASTM data only)
        const sizeData = plotData.filter(item => item.size === targetSize && item.type === 'astm');
        
        if (sizeData.length === 2) {
            const point1995 = sizeData.find(item => item.year === '1995');
            const point2021 = sizeData.find(item => item.year === '2021');
            
            if (point1995 && point2021) {
                // Calculate positions
                const x1 = xScale(point1995.waist);
                const x2 = xScale(point2021.waist);
                const y1 = point1995.y;
                const y2 = point2021.y;
                const midY = (y1 + y2) / 2;
                
                // Calculate difference and max opacity
                const difference = Math.abs(point2021.waist - point1995.waist);
                const maxOpacity = opacityScale(difference);
                
                // Create horizontal gradient for the difference band
                const gradientId = `gradient-${targetSize}`;
                const defs = g.append('defs');
                const gradient = defs.append('linearGradient')
                    .attr('id', gradientId)
                    .attr('x1', '0%')
                    .attr('x2', '100%')
                    .attr('y1', '0%')
                    .attr('y2', '0%');
                
                gradient.append('stop')
                    .attr('offset', '0%')
                    .attr('stop-color', '#B57BDC')
                    .attr('stop-opacity', 0.2);
                
                gradient.append('stop')
                    .attr('offset', '100%')
                    .attr('stop-color', '#B57BDC')
                    .attr('stop-opacity', maxOpacity);
                
                const topRowY = height * 0.25; // 1995 row
                const bottomRowY = height * 0.75; // 2021 row
                const bandTop = topRowY - iconHeight/2;
                const bandBottom = bottomRowY + iconHeight/2;
                const fullBandHeight = bandBottom - bandTop;

                // Draw gradient band FIRST (behind everything else) - FULL HEIGHT
                g.insert('rect', ':first-child')
                    .attr('class', 'comparison-band')
                    .attr('x', Math.min(x1, x2))
                    .attr('y', bandTop)  // Start at top of first row
                    .attr('width', Math.abs(x2 - x1))
                    .attr('height', fullBandHeight)  // Extend to bottom of second row
                    .attr('fill', `url(#${gradientId})`)
                    .style('opacity', 0)
                    .transition()
                    .duration(200)
                    .style('opacity', 1);
                
                // Draw horizontal line
                g.append('line')
                    .attr('class', 'comparison-line')
                    .attr('x1', x1)
                    .attr('x2', x2)
                    .attr('y1', midY)
                    .attr('y2', midY)
                    .attr('stroke', '#333')
                    .attr('stroke-width', 2)
                    .attr('stroke-dasharray', '5,5')
                    .style('opacity', 0)
                    .transition()
                    .duration(200)
                    .style('opacity', 0.8);
                
                // Add end markers
                g.append('circle')
                    .attr('class', 'comparison-marker')
                    .attr('cx', x1)
                    .attr('cy', midY)
                    .attr('r', 4)
                    .attr('fill', '#333')
                    .style('opacity', 0)
                    .transition()
                    .duration(200)
                    .style('opacity', 0.8);
                
                g.append('circle')
                    .attr('class', 'comparison-marker')
                    .attr('cx', x2)
                    .attr('cy', midY)
                    .attr('r', 4)
                    .attr('fill', '#333')
                    .style('opacity', 0)
                    .transition()
                    .duration(200)
                    .style('opacity', 0.8);
                
                // Add label with difference
                const labelX = (x1 + x2) / 2;
                const labelText = `${difference.toFixed(1)}"`;
                
                // Background for label
                const labelBg = g.append('rect')
                    .attr('class', 'comparison-label-bg')
                    .attr('x', labelX)
                    .attr('y', midY - 25)
                    .attr('rx', 4)
                    .attr('ry', 4)
                    .attr('fill', 'white')
                    .attr('stroke', '#333')
                    .attr('stroke-width', 1)
                    .style('opacity', 0);
                
                // Label text
                const label = g.append('text')
                    .attr('class', 'comparison-label')
                    .attr('x', labelX)
                    .attr('y', midY - 10)
                    .attr('text-anchor', 'middle')
                    .attr('font-size', Math.max(containerWidth * 0.015, 12) + 'px')
                    .attr('font-weight', 'bold')
                    .attr('fill', '#333')
                    .text(labelText)
                    .style('opacity', 0);
                
                // Adjust background size based on text
                const bbox = label.node().getBBox();
                labelBg
                    .attr('x', bbox.x - 4)
                    .attr('y', bbox.y - 2)
                    .attr('width', bbox.width + 8)
                    .attr('height', bbox.height + 4);
                
                // Fade in label
                labelBg.transition().duration(200).style('opacity', 0.9);
                label.transition().duration(200).style('opacity', 1);
            }
        }
    }

    function clearHighlightEffects() {
        if (!svg) return;
        
        const svgSelection = d3.select(svg);
        const g = svgSelection.select('g');
        
        const xScale = d3.scaleLinear()
            .domain([22, 42])
            .range([0, width]);

        // Remove comparison elements
        g.selectAll('.comparison-line').remove();
        g.selectAll('.comparison-marker').remove();
        g.selectAll('.comparison-label').remove();
        g.selectAll('.comparison-label-bg').remove();
        g.selectAll('.comparison-band').remove();
        g.selectAll('defs').remove();
        
        // Reset icon sizes
        g.selectAll('image')
            .transition()
            .duration(200)
            .attr('width', iconWidth)
            .attr('height', iconHeight)
            .attr('x', iconData => xScale(iconData.waist) - iconWidth/2)
            .attr('y', iconData => iconData.y - iconHeight/2)
            .style('opacity', 0.7)
            .style('filter', 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.2))');
    }

    function renderChart() {
        if (!svg) return;
        
        const xScale = d3.scaleLinear()
            .domain([22, 42])
            .range([0, width]);

        const svgSelection = d3.select(svg);
        svgSelection.selectAll('*').remove();

        const g = svgSelection
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // X-axis at vertical center
        g.append('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0, ${height / 2})`)
            .call(d3.axisBottom(xScale).tickSize(15).ticks(15).tickFormat(''))
            .style('opacity', 0.1);

        const xAxisLabels = g.append('g')
            .attr('class', 'x-axis-labels')
            .attr('transform', `translate(0, ${height / 2})`)
            .call(d3.axisBottom(xScale).tickSize(20).ticks(10))
            .style('opacity', 0.3);

        xAxisLabels.selectAll('text')
            .style('font-size', Math.max(containerWidth * 0.01, 10) + 'px')
            .attr('dy', '1.2em');

        // Only render data if we have any
        if (plotData.length === 0) return;

        // Calculate differences for opacity scale (only for ASTM data)
        const differences = [];
        const astmData = plotData.filter(d => d.type === 'astm');
        const sizeGroups = d3.group(astmData, d => d.size);
        for (const [size, points] of sizeGroups.entries()) {
            if (points.length === 2) {
                const point1995 = points.find(p => p.year === '1995');
                const point2021 = points.find(p => p.year === '2021');
                if (point1995 && point2021) {
                    differences.push(Math.abs(point2021.waist - point1995.waist));
                }
            }
        }
        
        // Create opacity scale based on differences (2.5 to 4 range)
        const opacityScale = d3.scaleLinear()
            .domain([2.5, 4])
            .range([0.2, 0.8])
            .clamp(true);

        // Create icons AFTER the differences calculation so bands can be drawn behind them
        const icons = g.selectAll('image')
            .data(plotData.filter(d => d.type === 'astm'))
            .enter()
            .append('image')
            .attr('xlink:href', d => {
                if (d.color === 'purple') return '/assets/purple-dress-form.png';
                if (d.color === 'blue') return '/assets/blue-dress-form.png';
                return '/assets/dress-form.png'; 
            })
            .attr('x', d => xScale(d.waist) - iconWidth/2)
            .attr('y', d => d.y - iconHeight/2)
            .attr('width', iconWidth)
            .attr('height', iconHeight)
            .style('cursor', 'pointer')
            .style('opacity', 0.7)
            .style('filter', 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.2))');

        // Create small orange circles for waistlines data
        // Determine visibility based on scroll stage
        const waistlineOpacity = (value >= 2) ? 0.8 : 0; // Only visible at stage 2 and beyond
        
        const waistlineCircles = g.selectAll('circle.waistline')
            .data(plotData.filter(d => d.type === 'waistlines'))
            .enter()
            .append('circle')
            .attr('class', 'waistline')
            .attr('cx', d => xScale(d.waist))
            .attr('cy', d => d.y)
            .attr('r', 5)
            .attr('fill', '#FF8C42')
            .style('opacity', waistlineOpacity);

        // Labels for ASTM data - positioned above icons, always visible
        const labels = g.selectAll('text.label')
            .data(plotData.filter(d => d.type === 'astm'))
            .enter()
            .append('text')
            .attr('class', 'label')
            .attr('x', d => xScale(d.waist))
            .attr('y', d => d.y - (iconHeight * 0.19))
            .attr('text-anchor', 'middle')
            .attr('font-size', Math.max(iconWidth * 0.18, 8) + 'px')
            .attr('fill', '#313326')
            .text(d => d.size)
            .style('cursor', 'pointer')
            .style('pointer-events', 'all');

        // Labels for waistlines data - also controlled by scroll stage
        const waistlineLabels = g.selectAll('text.waistline-label')
            .data(plotData.filter(d => d.type === 'waistlines'))
            .enter()
            .append('text')
            .attr('class', 'waistline-label')
            .attr('x', d => xScale(d.waist))
            .attr('y', d => d.y - 15)
            .attr('text-anchor', 'middle')
            .attr('font-size', Math.max(containerWidth * 0.012, 10) + 'px')
            .attr('fill', '#FF8C42')
            .attr('font-weight', 'bold')
            .text(d => {
                // Convert "2015-2018" to "'15-'18" format
                const years = d.year.split('-');
                const startYear = years[0].slice(-2);
                const endYear = years[1].slice(-2);
                return `'${startYear}-'${endYear}`;
            })
            .style('opacity', waistlineOpacity);

        // Create invisible hit areas for precise hover detection (ASTM data only)
        const hitAreas = g.selectAll('rect.hit-area')
            .data(plotData.filter(d => d.type === 'astm'))
            .enter()
            .append('rect')
            .attr('class', 'hit-area')
            .attr('x', d => xScale(d.waist) - iconWidth/2 - 5)
            .attr('y', d => d.y - iconHeight/2 - 10)
            .attr('width', iconWidth + 10)
            .attr('height', iconHeight + 20)
            .style('fill', 'transparent')
            .style('cursor', 'pointer')
            .style('pointer-events', 'all');

        // Define hover functions
        function handleHover(d) {
            const scaleFactor = 1.15;
            const newWidth = iconWidth * scaleFactor;
            const newHeight = iconHeight * scaleFactor;
            
            // Scale up icons of the same size
            g.selectAll('image')
                .filter(iconData => iconData.size === d.size)
                .transition()
                .duration(200)
                .attr('width', newWidth)
                .attr('height', newHeight)
                .attr('x', iconData => xScale(iconData.waist) - newWidth/2)
                .attr('y', iconData => iconData.y - newHeight/2)
                .style('opacity', 1)
                .style('filter', 'drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.25))');
            
            // Find both data points for this size (ASTM data only)
            const sizeData = plotData.filter(item => item.size === d.size && item.type === 'astm');
            
            if (sizeData.length === 2) {
                const point1995 = sizeData.find(item => item.year === '1995');
                const point2021 = sizeData.find(item => item.year === '2021');
                
                if (point1995 && point2021) {
                    // Calculate positions
                    const x1 = xScale(point1995.waist);
                    const x2 = xScale(point2021.waist);
                    const y1 = point1995.y;
                    const y2 = point2021.y;
                    const midY = (y1 + y2) / 2;
                    
                    // Calculate difference and max opacity
                    const difference = Math.abs(point2021.waist - point1995.waist);
                    const maxOpacity = opacityScale(difference);
                    
                    // Create horizontal gradient for the difference band
                    const gradientId = `gradient-${d.size}`;
                    const defs = g.append('defs');
                    const gradient = defs.append('linearGradient')
                        .attr('id', gradientId)
                        .attr('x1', '0%')
                        .attr('x2', '100%')
                        .attr('y1', '0%')
                        .attr('y2', '0%');
                    
                    gradient.append('stop')
                        .attr('offset', '0%')
                        .attr('stop-color', '#B57BDC')
                        .attr('stop-opacity', 0.2);
                    
                    gradient.append('stop')
                        .attr('offset', '100%')
                        .attr('stop-color', '#B57BDC')
                        .attr('stop-opacity', maxOpacity);
                    
                    // Draw gradient band FIRST (behind everything else)
                    g.insert('rect', ':first-child')
                        .attr('class', 'comparison-band')
                        .attr('x', Math.min(x1, x2))
                        .attr('y', y1)
                        .attr('width', Math.abs(x2 - x1))
                        .attr('height', Math.abs(y2 - y1))
                        .attr('fill', `url(#${gradientId})`)
                        .style('opacity', 0)
                        .transition()
                        .duration(200)
                        .style('opacity', 1);
                    
                    // Draw horizontal line
                    g.append('line')
                        .attr('class', 'comparison-line')
                        .attr('x1', x1)
                        .attr('x2', x2)
                        .attr('y1', midY)
                        .attr('y2', midY)
                        .attr('stroke', '#333')
                        .attr('stroke-width', 2)
                        .attr('stroke-dasharray', '5,5')
                        .style('opacity', 0)
                        .transition()
                        .duration(200)
                        .style('opacity', 0.8);
                    
                    // Add end markers
                    g.append('circle')
                        .attr('class', 'comparison-marker')
                        .attr('cx', x1)
                        .attr('cy', midY)
                        .attr('r', 4)
                        .attr('fill', '#333')
                        .style('opacity', 0)
                        .transition()
                        .duration(200)
                        .style('opacity', 0.8);
                    
                    g.append('circle')
                        .attr('class', 'comparison-marker')
                        .attr('cx', x2)
                        .attr('cy', midY)
                        .attr('r', 4)
                        .attr('fill', '#333')
                        .style('opacity', 0)
                        .transition()
                        .duration(200)
                        .style('opacity', 0.8);
                    
                    // Add label with difference
                    const labelX = (x1 + x2) / 2;
                    const labelText = `${difference.toFixed(1)}"`;
                    
                    // Background for label
                    const labelBg = g.append('rect')
                        .attr('class', 'comparison-label-bg')
                        .attr('x', labelX)
                        .attr('y', midY - 25)
                        .attr('rx', 4)
                        .attr('ry', 4)
                        .attr('fill', 'white')
                        .attr('stroke', '#333')
                        .attr('stroke-width', 1)
                        .style('opacity', 0);
                    
                    // Label text
                    const label = g.append('text')
                        .attr('class', 'comparison-label')
                        .attr('x', labelX)
                        .attr('y', midY - 10)
                        .attr('text-anchor', 'middle')
                        .attr('font-size', Math.max(containerWidth * 0.015, 12) + 'px')
                        .attr('font-weight', 'bold')
                        .attr('fill', '#333')
                        .text(labelText)
                        .style('opacity', 0);
                    
                    // Adjust background size based on text
                    const bbox = label.node().getBBox();
                    labelBg
                        .attr('x', bbox.x - 4)
                        .attr('y', bbox.y - 2)
                        .attr('width', bbox.width + 8)
                        .attr('height', bbox.height + 4);
                    
                    // Fade in label
                    labelBg.transition().duration(200).style('opacity', 0.9);
                    label.transition().duration(200).style('opacity', 1);
                }
            }
                
            currentHighlightedSize = d.size;
        }

        function handleMouseOut(d) {
            // Remove comparison elements
            g.selectAll('.comparison-line').remove();
            g.selectAll('.comparison-marker').remove();
            g.selectAll('.comparison-label').remove();
            g.selectAll('.comparison-label-bg').remove();
            g.selectAll('.comparison-band').remove();
            g.selectAll('defs').remove();
            
            // Reset icon sizes
            g.selectAll('image')
                .filter(iconData => iconData.size === d.size)
                .transition()
                .duration(200)
                .attr('width', iconWidth)
                .attr('height', iconHeight)
                .attr('x', iconData => xScale(iconData.waist) - iconWidth/2)
                .attr('y', iconData => iconData.y - iconHeight/2)
                .style('opacity', 0.7)
                .style('filter', 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.2))');
                
            currentHighlightedSize = null;
        }

        // Add hover events to hit areas (primary interaction)
        hitAreas
            .on('mouseover', function(event, d) {
                handleHover(d);
            })
            .on('mouseout', function(event, d) {
                handleMouseOut(d);
            });

        // Disable pointer events on icons and labels to prevent conflicts
        icons.style('pointer-events', 'none');
        labels.style('pointer-events', 'none');

        // Group Labels - year labels (only for ASTM data)
        const astmGrouped = d3.group(plotData.filter(d => d.type === 'astm'), d => d.year);
        for (const [year, points] of astmGrouped.entries()) {
            const avgY = d3.mean(points, d => d.y);
            const color = points[0].color;
            g.append('text')
                .attr('x', 30)
                .attr('y', avgY - iconHeight/2 - 15)
                .attr('text-anchor', 'start')
                .attr('font-size', Math.max(containerWidth * 0.025, 12) + 'px')
                .attr('font-weight', 'bold')
                .attr('fill', () => {
                    if (color === 'purple') return '#B57BDC';
                    if (color === 'blue') return '#9ABBD9';
                    return color;
                })
                .text(year);
        }

        // Apply highlight effects if needed - with proper timing
        setTimeout(() => {
            if (currentHighlightedSize && (value === 1 || value === 3)) {
                applyHighlightEffects(currentHighlightedSize);
            }
        }, 100);
    }

    // Update data and chart when stage changes
    $effect(() => {
        const stage = copy?.vanitySizing?.[value];
        if (!stage) return;
        
        // Set the highlighted size based on the current stage
        if (value === 1) {
            currentHighlightedSize = '8';
        } else if (value === 3) {
            currentHighlightedSize = '18';
        } else {
            currentHighlightedSize = null;
        }
        
        // Update data and render chart
        updatePlotData();
        renderChart();
    });

    onMount(() => {
        mounted = true;

        $effect(() => {
            if (!svg || containerWidth === 0 || containerHeight === 0) return;
            updatePlotData();
            renderChart();
        });
    });
</script>

<div class="outer-container">
    <div class="spot-image">TK spot art?</div>
    <div class="text-block">
        {#each copy.section2 as block}
        <div>
            {#if block.subhed}
                <h3>{block.subhed}</h3>
            {/if}
            <p>{@html block.text}</p>
        </div>
    {/each}
    </div>
    <div class="sticky-container">
        <div class="visual-container">
                <div class="chart-container" bind:clientHeight={containerHeight} bind:clientWidth={containerWidth}>
                    {#if mounted}
                        <svg bind:this={svg}></svg>
                    {/if}
                </div>
        </div>
    </div>
    <div class="scrolly-outer">
            <Scrolly bind:value>
                {#each copy.vanitySizing as stage, i}
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
        height: 70vh;
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
        width: calc(100%);
        height: 70vh;
        margin: 0 auto;
        padding: 5px;
        background-color: white;
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
        pointer-events: none;
    }
    .step {
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-right: 2rem;
    }
    .step .text {
        max-width: 500px;
        width: 90%;
        padding: 20px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
        margin: 0;
    }
    .spot-image {
        margin: 20vh 40vh 10vh 40vh;
        height: 30vh;
        background-color: aliceblue;
        text-align: center;
    }    
    .text-block {
        width: min(90%, 550px);
        margin: 0 auto;
        margin-bottom: 60px;
        margin-top: 60px;
    }
</style>