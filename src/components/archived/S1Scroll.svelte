<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
    import waistlinesData from '../../data/waistlines.json';
    import ASTMsizes from "../../data/ASTMsizes.json";
    import copy from "../../data/copy.json";
    
    // Import utilities from the modular structure
    import {
      filterAndProcessWaistlineData,
      filterAndProcessASTMData,
      generateChartData,
      formatTooltipText,
      findSizesForMeasurement,
      renderSizeBands,
      renderAxes,
      renderMetadata
    } from './chart/index.js';
    
    import { 
      generateRandomAvatar, 
      determineAvatarSize
    } from '../utils/avatar-generator.js';
    import Scrolly from '../helpers/Scrolly.svelte';
  
    // Responsive dimensions
    let containerHeight = $state(0);
    let containerWidth = $state(0);
    let margin = { top: 40, right: 10, bottom: 10, left: 10 };
    let width = $derived(containerWidth - margin.left - margin.right);
    let height = $derived(containerHeight - margin.top - margin.bottom);
    
    let avatarWidth = $derived(Math.max(30, width / 20));
    let avatarHeight = $derived(avatarWidth * 1.8);
    
    // Scrolly and chart state
    let value = $state(0);
    let svg;
    let filteredData = null;
    let ASTMfilter = null;
    let filteredASTM = [];
    let currentSizeRanges = [];
    let allSizeData = [];
    
    // Filter states defined in copy.json and set via scrollytelling
    let yearRange = $state("2015-2018");
    let race = $state("all");
    let age = $state("11");
    let ASTMyear = $state("2015");
    let ASTMrange = $state("junior");
    let avatarStyle = $state("greyscale");
    let avatarDisplay = $state("all");
    let percentileStyle = $state("color");
    let percentileHighlight = $state("5,50,95");
    let sizeBands = $state("S,M,L");
    let sizeType = $state("alpha");
    let bandColor = $state("gradient");
    let showBands = $state(true);
    
    // For avatar caching
    let avatarCache = $state(new Map());
    
    // Update settings when scroll position changes
    $effect(() => {
        // Get current stage data
        const stage = copy?.scrolly1?.[value];
        if (!stage) return;
        
        // Apply filter settings from copy data directly
        if (stage.yearRange) yearRange = stage.yearRange;
        if (stage.race) race = stage.race;
        if (stage.age) age = stage.age;
        if (stage.year) ASTMyear = stage.year;
        if (stage.sizeRange) ASTMrange = stage.sizeRange;
        if (stage.avatarStyle) avatarStyle = stage.avatarStyle;
        if (stage.avatarDisplay) avatarDisplay = stage.avatarDisplay;
        if (stage.percentileStyle) percentileStyle = stage.percentileStyle;
        if (stage.percentileHighlight) percentileHighlight = stage.percentileHighlight;
        if (stage.sizeBands) sizeBands = stage.sizeBands;
        if (stage.sizeType) sizeType = stage.sizeType;
        if (stage.bandColor) bandColor = stage.bandColor;
        if (stage.hasOwnProperty('showBands')) {
            showBands = stage.showBands;
        }
        
        // Update data with new settings
        updateData();
    });
    
    // Re-render when container dimensions change
    $effect(() => {
        if (containerWidth > 0 && containerHeight > 0 && filteredData) {
            renderChart();
        }
    });

    // Process data based on current settings
    function updateData() {
        // Get size bands directly from the sizeBands setting
        const sizesToInclude = sizeBands.split(',').map(s => s.trim());

        // Process waistline data
        const waistlineResults = filterAndProcessWaistlineData(
            waistlinesData,
            { yearRange, race, age }
        );
        filteredData = waistlineResults.filteredData;

        // Process ASTM data with size bands directly passed in
        const astmResults = filterAndProcessASTMData(
            ASTMsizes,
            { 
                year: ASTMyear, 
                sizeRange: ASTMrange,
                sizeType: sizeType,
                sizeBands: sizesToInclude
            },
            bandColor === "gradient" ? "#C2D932" : bandColor
        );
        
        ASTMfilter = astmResults.filter;
        filteredASTM = astmResults.filteredData;
        currentSizeRanges = astmResults.currentSizeRanges;
        allSizeData = astmResults.allSizeData;
        
        if (containerWidth > 0 && containerHeight > 0) {
            renderChart();
        }
    }
  
    // Initial data load
    onMount(() => {
        updateData();
    });
    
    // Render the chart with current data
    function renderChart() {
        if (!filteredData || !ASTMfilter || width <= 0 || height <= 0) return;
        
        // Use highlighted percentiles directly from settings
        const highlightedPercentiles = percentileHighlight.split(',').map(p => parseInt(p.trim(), 10));
        
        // Create current demographic key
        const demoKey = `${yearRange}-${race}-${age}`;
        
        // Generate chart data
        const chartData = generateChartData({
            filteredData,
            currentSizeRanges,
            allSizeData,
            width,
            height,
            margin,
            highlightedPercentiles,
            findSizesCallback: (value) => findSizesForMeasurement(allSizeData, value),
            avatarFunctions: {
                determineAvatarSize,
                generateRandomAvatar
            },
            avatarDimensions: {
                width: avatarWidth,
                height: avatarHeight
            },
            avatarCache,
            dataKey: demoKey
        });
        
        // Set fixed range for the x-axis regardless of the data
        chartData.xScale = d3.scaleLinear()
            .domain([20, 50])  // Fixed range from 20 to 50 inches
            .range([0, chartData.innerWidth]);
        
        // Set up SVG selection
        const svgSelection = d3.select(svg);
        
        // Check if chart structure exists
        let mainGroup = svgSelection.select('.main-chart-group');
        
        if (mainGroup.empty()) {
            // First render - create the structure
            svgSelection.selectAll('*').remove();
            
            // Create chart structure
            mainGroup = svgSelection.append('g')
                .attr('class', 'main-chart-group')
                .attr('transform', `translate(${margin.left}, ${margin.top})`);
            
            // Create groups for different chart elements
            mainGroup.append('g').attr('class', 'size-bands');
            mainGroup.append('g').attr('class', 'axes');
            mainGroup.append('g').attr('class', 'avatars');
            mainGroup.append('g').attr('class', 'metadata');
        }
        
        // Set SVG dimensions
        svgSelection
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom);
        
        // Get references to groups
        const sizeBandsGroup = svgSelection.select('.size-bands');
        const axesGroup = svgSelection.select('.axes');
        const avatarsGroup = svgSelection.select('.avatars');
        const metadataGroup = svgSelection.select('.metadata');
        
        // Clear and redraw bands, axes, and metadata (quick to redraw)
        sizeBandsGroup.selectAll('*').remove();
        axesGroup.selectAll('*').remove();
        metadataGroup.selectAll('*').remove();
        
        // Render updated chart elements
        if (showBands) {
            renderSizeBands(
                sizeBandsGroup, 
                currentSizeRanges, 
                chartData.xScale, 
                chartData.innerHeight, 
                { bandColor }
            );
        }
        
        renderAxes(
            axesGroup, 
            chartData.xScale, 
            chartData.innerHeight, 
            chartData.innerWidth
        );
        
        renderMetadata(
            metadataGroup, 
            filteredData, 
            ASTMfilter, 
            chartData.innerWidth
        );
        
        // For avatars, update them more intelligently
        updateAvatars(
            avatarsGroup,
            chartData.avatarData,
            chartData.avatarWidth,
            chartData.avatarHeight,
            demoKey
        );
    }
    
    // Update avatars intelligently - keep existing ones if possible
    function updateAvatars(selection, avatarData, avatarWidth, avatarHeight, currentDemoKey) {
        // Remove avatars that don't match the current demographic key
        selection.selectAll(`.avatar-group:not([data-demo="${currentDemoKey}"])`).remove();
        
        // Update or create avatars
        avatarData.forEach(avatar => {
            // Check if this specific avatar already exists
            const existing = selection.select(`.avatar-group[data-id="${avatar.id}"]`);
            
            if (!existing.empty()) {
                // Avatar exists - just update its properties
                updateExistingAvatar(existing, avatar, avatarWidth, avatarHeight);
            } else {
                // Create new avatar
                createNewAvatar(
                    selection, 
                    avatar, 
                    avatarWidth, 
                    avatarHeight, 
                    avatar.type === 'percentile', 
                    currentDemoKey
                );
            }
        });
    }
    
    // Update properties of an existing avatar
    function updateExistingAvatar(selection, avatar, avatarWidth, avatarHeight) {
        // Skip if the avatar shouldn't be visible
        const isPercentile = avatar.type === 'percentile';
        if (!shouldAvatarBeVisible(avatar, isPercentile)) {
            selection
                .transition()
                .duration(500)
                .style('opacity', 0)
                .on('end', function() { d3.select(this).remove(); });
            return;
        }
        
        // Determine style classes
        const baseClass = 'avatar-group';
        const typeClass = isPercentile ? 'percentile' : 'standard';
        const styleClass = (isPercentile && percentileStyle === 'color') || 
                          (!isPercentile && avatarStyle === 'color') ? 'color' : 'greyscale';
        
        // Update class and opacity
        selection
            .attr('class', `${baseClass} ${typeClass} ${styleClass}`)
            .transition()
            .duration(500)
            .style('opacity', 1);
    }
    
    // Create a new avatar
    function createNewAvatar(selection, avatar, avatarWidth, avatarHeight, isPercentile, demoKey) {
        // Skip if the avatar shouldn't be visible
        if (!shouldAvatarBeVisible(avatar, isPercentile)) {
            return null;
        }
        
        // Constrain position to ensure avatars stay within bounds
        const x = Math.max(0, Math.min(width - avatarWidth/2, avatar.x));
        const y = Math.max(0, Math.min(height - avatarHeight/2, avatar.y));
        
        // Determine style classes
        const baseClass = 'avatar-group';
        const typeClass = isPercentile ? 'percentile' : 'standard';
        const styleClass = (isPercentile && percentileStyle === 'color') || 
                          (!isPercentile && avatarStyle === 'color') ? 'color' : 'greyscale';
        const classString = `${baseClass} ${typeClass} ${styleClass}`;
        
        // Create avatar
        const avatarGroup = selection.append('g')
            .attr('class', classString)
            .attr('data-id', avatar.id)
            .attr('data-demo', demoKey) // Store demographic key for later filtering
            .attr('transform', `translate(${x - avatarWidth/2}, ${y - avatarHeight/2})`)
            .style('opacity', 0)
            .transition()
            .duration(500)
            .style('opacity', 1)
            .selection();
        
        // Add tooltip
        const tooltipText = formatTooltipText(
            avatar, 
            (value) => findSizesForMeasurement(allSizeData, value)
        );
        
        avatarGroup.append('title').text(tooltipText);
        
        // Add avatar layers
        avatar.avatar.layers.forEach(layer => {
            avatarGroup.append('image')
                .attr('href', layer.path)
                .attr('width', avatarWidth)
                .attr('height', avatarHeight)
                .attr('x', 0)
                .attr('y', 0);
        });
        
        return avatarGroup;
    }
    
    // Helper to check if an avatar should be visible
    function shouldAvatarBeVisible(avatar, isPercentile) {
        // Check display settings
        if (avatarDisplay === 'percentiles-only' && !isPercentile) {
            return false;
        }
        
        if (avatarDisplay === 'none') {
            return false;
        }
        
        // Skip percentiles not in highlight list
        if (isPercentile) {
            const highlightedPercentiles = percentileHighlight.split(',').map(p => parseInt(p.trim(), 10));
            if (!highlightedPercentiles.includes(avatar.percentile)) {
                return false;
            }
        }
        
        return true;
    }
</script>
  
<div class="outer-container">
    <div class="sticky-container">
        <div class="visual-container">
            <div class="chart-container" bind:clientHeight={containerHeight} bind:clientWidth={containerWidth}>
                <svg bind:this={svg}></svg>
            </div>
            
            <div class="debug-info">
                <p>Step: {value}</p>
                <p>Year: {yearRange}</p>
                <p>Race: {race}</p>
                <p>Age: {age}</p>
                <p>ASTM: {ASTMyear}, {ASTMrange}</p>
                <p>Avatar: {avatarStyle}, {avatarDisplay}</p>
                <p>Percentiles: {percentileStyle}, {percentileHighlight}</p>
                <p>Sizes: {sizeBands}, {sizeType}, {bandColor}</p>
                <p>Show Bands: {showBands ? 'Yes' : 'No'}</p>
            </div>
        </div>
    </div>
    
    <div class="scrolly-outer">
        <Scrolly bind:value>
            {#each copy.scrolly1 as stage, i}
                <div class="step" >
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
        height: 80vh;
        margin: 0 auto;
        padding: 5px;
        border: 1px solid #eee;
        border-radius: 8px;
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
  
    /* Debug info */
    .debug-info {
        position: absolute;
        top: 10px;
        right: 10px;
        background: rgba(255,255,255,0.9);
        padding: 10px;
        border-radius: 4px;
        font-size: 14px;
        z-index: 100;
    }
    
    .scrolly-outer {
        position: relative;
        z-index: 2;
    }
    
    .step {
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .step .text {
        max-width: 500px;
        width: 90%;
        padding: 25px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        margin: 0 auto;
    }
    
    /* Avatar style classes */
    :global(.avatar-group.standard.greyscale image) {
        filter: grayscale(100%);
        transition: filter 0.5s ease;
    }
    
    :global(.avatar-group.standard.color image) {
        filter: none;
        transition: filter 0.5s ease;
    }
    
    :global(.avatar-group.percentile.greyscale image) {
        filter: grayscale(100%);
        transition: filter 0.5s ease;
    }
    
    :global(.avatar-group.percentile.color image) {
        filter: none;
        transition: filter 0.5s ease;
    }
    
    /* Size band style classes */
    :global(.size-band.solid) {
        opacity: 0.3 !important; /* Override gradient opacity */
        transition: opacity 0.5s ease, fill 0.5s ease;
    }
    
    :global(.size-band.gradient) {
        transition: opacity 0.5s ease, fill 0.5s ease;
    }
    
    :global(.size-band.hidden) {
        display: none;
    }
    
    :global(.avatar-group) {
        transition: transform 0.75s ease, opacity 0.5s ease;
    }
</style>