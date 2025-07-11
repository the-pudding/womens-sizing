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

    function updatePlotData() {
        // Process waistlines data - filter for race "all" and age "20 and over"
        const waistlinesData = waistlines
            .filter(d => d.race === 'all' && d.age === '20 and over')
            .map(d => ({
                yearRange: d.yearRange,
                waist: +d.percent50,
                color: 'orange',
                type: 'waistlines'
            }));

        plotData = waistlinesData;
    }

    function renderChart() {
        // Create time scale for x-axis
        const timeExtent = d3.extent([
            new Date(1988, 0, 1), // Start of first bar
            new Date(2023, 11, 31) // End of last bar
        ]);
        
        const xScale = d3.scaleTime()
            .domain(timeExtent)
            .range([0, width]);

        const yScale = d3.scaleLinear()
            .domain([30, 40])
            .range([height, 0]);

        const svgSelection = d3.select(svg);
        svgSelection.selectAll('*').remove();

        const g = svgSelection
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // Y-axis
        const yAxisLabels = g.append('g')
            .attr('class', 'y-axis')
            .call(d3.axisLeft(yScale).ticks(10))
            .style('opacity', 0.7);

        // Scale y-axis label font size
        yAxisLabels.selectAll('text')
            .style('font-size', Math.max(containerWidth * 0.01, 12) + 'px');

        // Add chart title with dynamic sizing and line breaking
        const titleFontSize = Math.max(containerWidth * 0.02, 14);
        const titleYPosition = Math.max(containerWidth * -0.02, 10);
        
        // Break title into multiple lines on smaller screens
        if (containerWidth < 500) {
            // Split into two lines for mobile
            const line1 = "Waistlines Have Largely";
            const line2 = "Increased Over Time";
            
            g.append('text')
                .attr('class', 'chart-title')
                .attr('x', 5)
                .attr('y', titleYPosition)
                .attr('text-anchor', 'start')
                .attr('font-size', titleFontSize + 'px')
                .attr('font-weight', 'bold')
                .attr('fill', '#313326')
                .text(line1);
            
            g.append('text')
                .attr('class', 'chart-title')
                .attr('x', 5)
                .attr('y', titleYPosition + titleFontSize + 4)
                .attr('text-anchor', 'start')
                .attr('font-size', titleFontSize + 'px')
                .attr('font-weight', 'bold')
                .attr('fill', '#313326')
                .text(line2);
        } else {
            // Single line for larger screens
            g.append('text')
                .attr('class', 'chart-title')
                .attr('x', 10)
                .attr('y', titleYPosition)
                .attr('text-anchor', 'start')
                .attr('font-size', titleFontSize + 'px')
                .attr('font-weight', 'bold')
                .attr('fill', '#313326')
                .text('Waistlines Have Largely Increased Over Time');
        }

        // X-axis
        const xAxisLabels = g.append('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0, ${height})`)
            .call(d3.axisBottom(xScale).tickSize(15).tickFormat(d3.timeFormat('%Y')))
            .style('opacity', 0.7);

        xAxisLabels.selectAll('text')
            .style('font-size', Math.max(containerWidth * 0.01, 12) + 'px')
            .attr('dy', '1.2em');

        // Only render data if we have any
        if (plotData.length === 0) return;

        // Create bar charts for waistlines data
        const waistlinesData = plotData.filter(d => d.type === 'waistlines');
        
        waistlinesData.forEach(d => {
            const years = d.yearRange.split('-');
            const startYear = parseInt(years[0]);
            const endYear = parseInt(years[1]);
            const startDate = new Date(startYear, 0, 1);
            const endDate = new Date(endYear, 11, 31);
            
            const barX = xScale(startDate);
            const barWidth = xScale(endDate) - xScale(startDate);
            const barHeight = height - yScale(d.waist);
            
            g.append('rect')
                .attr('class', 'waistline-bar')
                .attr('x', barX)
                .attr('y', yScale(d.waist))
                .attr('width', barWidth)
                .attr('height', barHeight)
                .attr('fill', '#9ABBD9')
                .style('opacity', 0.7)
                .style('cursor', 'pointer')
                .on('mouseover', function(event, barData) {
                    // Animate bar on hover
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style('opacity', 1)
                        .attr('stroke', '#7A9BC4')
                        .attr('stroke-width', 2);
                    
                    // Show year range label in center of bar (full detail)
                    const years = d.yearRange.split('-');
                    const startYear = years[0];
                    const endYear = years[1];
                    
                    // If bar width is too small, break years into separate lines
                    if (barWidth < 80) {
                        // First line - start year with dash
                        g.append('text')
                            .attr('class', 'hover-year-label')
                            .attr('x', barX + barWidth / 2)
                            .attr('y', yScale(d.waist) + barHeight / 2 - 8)
                            .attr('text-anchor', 'middle')
                            .attr('dominant-baseline', 'middle')
                            .attr('font-size', '12px')
                            .attr('fill', 'white')
                            .attr('font-weight', 'bold')
                            .text(startYear + '-')
                            .style('opacity', 0)
                            .transition()
                            .duration(200)
                            .style('opacity', 1);
                        
                        // Second line - end year
                        g.append('text')
                            .attr('class', 'hover-year-label')
                            .attr('x', barX + barWidth / 2)
                            .attr('y', yScale(d.waist) + barHeight / 2 + 8)
                            .attr('text-anchor', 'middle')
                            .attr('dominant-baseline', 'middle')
                            .attr('font-size', '12px')
                            .attr('fill', 'white')
                            .attr('font-weight', 'bold')
                            .text(endYear)
                            .style('opacity', 0)
                            .transition()
                            .duration(200)
                            .style('opacity', 1);
                    } else {
                        // Single line for wider bars
                        g.append('text')
                            .attr('class', 'hover-year-label')
                            .attr('x', barX + barWidth / 2)
                            .attr('y', yScale(d.waist) + barHeight / 2)
                            .attr('text-anchor', 'middle')
                            .attr('dominant-baseline', 'middle')
                            .attr('font-size', '14px')
                            .attr('fill', 'white')
                            .attr('font-weight', 'bold')
                            .text(d.yearRange)
                            .style('opacity', 0)
                            .transition()
                            .duration(200)
                            .style('opacity', 1);
                    }
                    
                    // Show waist value at top of bar
                    const waistText = `${d.waist}"`;
                    g.append('text')
                        .attr('class', 'hover-waist-label')
                        .attr('x', barX + barWidth / 2)
                        .attr('y', yScale(d.waist) - 10)
                        .attr('text-anchor', 'middle')
                        .attr('font-size', '12px')
                        .attr('fill', '#313326')
                        .attr('font-weight', 'bold')
                        .text(waistText)
                        .style('opacity', 0)
                        .transition()
                        .duration(200)
                        .style('opacity', 1);
                })
                .on('mouseout', function(event, barData) {
                    // Reset bar appearance
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style('opacity', 0.7)
                        .attr('stroke', 'none')
                        .attr('stroke-width', 0);
                    
                    // Remove labels
                    g.selectAll('.hover-year-label, .hover-waist-label')
                        .transition()
                        .duration(200)
                        .style('opacity', 0)
                        .remove();
                });
        });
    }

    // Update data and chart when stage changes
    $effect(() => {
        const stage = copy?.scrollysub2?.[value];
        if (!stage) return;
        
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
    <div class="scrolly-outer">
        <Scrolly bind:value>
            {#each copy.scrollywaistlines as stage, i}
                <div class="step">
                    <div class="text">
                        <p>{@html stage.text}</p>
                    </div>
                </div>
            {/each}
        </Scrolly>
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
                {#each copy.scrollywaistlines2 as stage, i}
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
        width: min(90%, 800px); /* Limits max width to 800px on desktop */
        height: 80vh;
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
</style>