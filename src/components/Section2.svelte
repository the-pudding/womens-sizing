<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
    import ASTMsizes from '../data/ASTMsizes.json';
    import copy from '../data/copy.json';
    import Scrolly from './helpers/Scrolly.svelte';

   
    let containerWidth = $state(0);
    let containerHeight = $state(0);
    let margin = { top: 40, right: 20, bottom: 60, left: 10 };
    let width = $derived(containerWidth - margin.left - margin.right);
    let height = $derived(containerHeight - margin.top - margin.bottom);

    let value = $state(0); 
    // let svg; 
    let svg = $state(null);
    let mounted = $state(false);


    let plotData = [];
    let currentHighlightedSize = $state(null);

    // Responsive icon dimensions based on container width
    let iconWidth = $derived(containerWidth > 0 ? Math.min(Math.max(containerWidth * 0.08, 30), 80) : 60);
    let iconHeight = $derived(iconWidth * 1.5);

    function updatePlotData() {
        const base = [
            { year: '1995', sizeRange: 'straight', color: 'purple', yPos: height / 4 },
            { year: '2021', sizeRange: 'Womens', color: 'blue', yPos: height/1.5 }
        ];

        // Filter data based on current scroll stage
        let visibleYears = [];
        if (value >= 0) visibleYears.push('1995');
        if (value >= 1) visibleYears.push('2021');
        
        plotData = base
            .filter(cfg => visibleYears.includes(cfg.year))
            .map(cfg =>
                ASTMsizes
                    .filter(d => d.year === cfg.year && d.sizeRange === cfg.sizeRange)
                    .map(d => ({
                        year: d.year,
                        size: d.size,
                        waist: +d.waist,
                        color: cfg.color,
                        y: cfg.yPos
                    }))
            ).flat();
    }

    function renderChart() {
   
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

        g.append('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0, ${height})`)
            .call(d3.axisBottom(xScale).tickSize(15).ticks(15).tickFormat(''))
            .style('opacity', 0.1);

        const xAxisLabels = g.append('g')
            .attr('class', 'x-axis-labels')
            .attr('transform', `translate(0, ${height})`)
            .call(d3.axisBottom(xScale).tickSize(20).ticks(10))
            .style('opacity', 0.3);

        xAxisLabels.selectAll('text')
            .style('font-size', Math.max(containerWidth * 0.01, 10) + 'px')
            .attr('dy', '1.2em');

        // Only render data if we have any
        if (plotData.length === 0) return;

        const icons = g.selectAll('image')
            .data(plotData)
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

        // Apply initial styling based on stage and highlighting
        icons.each(function(d) {
            const element = d3.select(this);
            const isHighlighted = (value === 2 && d.size === '8') || currentHighlightedSize === d.size;
            
            if (isHighlighted) {
                const scaleFactor = 1.15;
                const newWidth = iconWidth * scaleFactor;
                const newHeight = iconHeight * scaleFactor;
                
                element
                    .attr('width', newWidth)
                    .attr('height', newHeight)
                    .attr('x', xScale(d.waist) - newWidth/2)
                    .attr('y', d.y - newHeight/2)
                    .style('opacity', 1)
                    .style('filter', 'drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.25))');
            } else {
                element
                    .attr('width', iconWidth)
                    .attr('height', iconHeight)
                    .attr('x', xScale(d.waist) - iconWidth/2)
                    .attr('y', d.y - iconHeight/2)
                    .style('opacity', 0.7)
                    .style('filter', 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.2))');
            }
        });

        icons
            .on('mouseover', function(event, d) {
            
            const scaleFactor = 1.15;
            const newWidth = iconWidth * scaleFactor;
            const newHeight = iconHeight * scaleFactor;
            
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
                
            currentHighlightedSize = d.size;
        })
        .on('mouseout', function(event, d) {
            
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
                
            if (!(value === 2 && d.size === '8')) {
                currentHighlightedSize = null;
            }
        });

        // Labels - positioned above icons
        g.selectAll('text.label')
            .data(plotData)
            .enter()
            .append('text')
            .attr('class', 'label')
            .attr('x', d => xScale(d.waist))
            .attr('y', d => {
                const isHighlighted = (value === 2 && d.size === '8') || currentHighlightedSize === d.size;
                const heightMultiplier = isHighlighted ? 1.15 : 1;
                return d.y - (iconHeight * heightMultiplier * 0.19);
            })
            .attr('text-anchor', 'middle')
            .attr('font-size', Math.max(iconWidth * 0.18, 8) + 'px')
            .attr('fill', '#313326')
            .text(d => d.size);

        // Group Labels - year labels
        const grouped = d3.group(plotData, d => d.year);
        for (const [year, points] of grouped.entries()) {
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
    }

    // Update data and chart when stage changes
    $effect(() => {
        const stage = copy?.scrolly2?.[value];
        if (!stage) return;

        if (value === 2) {
            currentHighlightedSize = '8';
        }
        // Remove the else clause - let hover manage currentHighlightedSize on other stages

        renderChart();
    });

    // Handle stage-specific logic


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
            {#each copy.scrollysub2 as stage, i}
                <div class="step">
                    <div class="text">
                        <p>{@html stage.text}</p>
                    </div>
                </div>
            {/each}
        </Scrolly>
    </div>
    <div class="sticky-container">
        <div>
            <h3 style="padding-top: 20px; text-align: center">The truth about vanity sizing</h3>
        </div>
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
                {#each copy.scrolly2 as stage, i}
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
</style>