<!-- Section1.svelte -->

<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
    import waistlinesData from '../data/waistlines.json';
    import ASTMsizes from "../data/ASTMsizes.json";
    import copy from "../data/copy.json";
    import { 
      filterAndProcessASTMData, 
      filterAndProcessWaistlineData,
      generateChartData,
      renderChartElements,
      formatTooltipText,
      findSizesForMeasurement
    } from './utils/refactored-chart-utilities.js';
    import { 
      generateRandomAvatar, 
      determineAvatarSize, 
      AVATAR_SIZE 
    } from './utils/avatar-generator.js';
    import Scrolly from './helpers/Scrolly.svelte';
  
  
    let { 
      width = 1800,
      height = 1200,
      margin = { top: 40, right: 10, bottom: 10, left: 10 },
      
      omittedSizes = ["XXL", "XL", "XS", "XXS"], 
      
      colors = {
        dots: '#4682b4',
        percentileDot: '#e41a1c',
        sizeBandBase: '#C2D932'
      }
    } = $props();
    
    let value = $state(0);
    let svg;
    let chartElement;
    let filteredData = null;
    let ASTMfilter = null;
    let filteredASTM = [];
    let currentSizeRanges = [];
    let allSizeData = [];
    
    let yearRange = $state("2015-2018");
    let race = $state("all");
    let age = $state("11");
    let ASTMyear = $state("2015");
    let ASTMrange = $state("junior");
    
    let currentStage = $derived(copy?.scrolly1?.[value] || null);
    
    $effect(() => {
        if (value === undefined) value = 0;
        
        // Update individual state variables separately
        // This avoids refreshing the entire component at once
        if (currentStage.yearRange) yearRange = currentStage.yearRange;
        if (currentStage.race) race = currentStage.race; 
        if (currentStage.age) age = currentStage.age;

        if (currentStage.year) ASTMyear = currentStage.year;
        if (currentStage.sizeRange) ASTMrange = currentStage.sizeRange; 
        
        updateData();
    });

    function updateData() {    
        // Filter and process waistline data in one step
        const waistlineResults = filterAndProcessWaistlineData(
            waistlinesData,
            { yearRange, race, age }
        );
        filteredData = waistlineResults.filteredData;

        // Filter and process ASTM data in one step
        const astmResults = filterAndProcessASTMData(
            ASTMsizes,
            { year: ASTMyear, sizeRange: ASTMrange },
            omittedSizes,
            colors.sizeBandBase
        );
        
        // Update all related state at once
        ASTMfilter = astmResults.filter;
        filteredASTM = astmResults.filteredData;
        currentSizeRanges = astmResults.currentSizeRanges;
        allSizeData = astmResults.allSizeData;
        
        // Render chart after data is updated
        renderChart();  
    }
  
    onMount(() => {
        updateData();
    });
    
    function renderChart() {
        if (!filteredData || !ASTMfilter) return;
        
        // Generate chart data (points, avatars, scales) in one step
        const chartData = generateChartData({
            filteredData,
            currentSizeRanges,
            allSizeData,
            width,
            height,
            margin,
            findSizesCallback: (value) => findSizesForMeasurement(allSizeData, value),
            // Pass the avatar generator functions
            avatarFunctions: {
                determineAvatarSize,
                generateRandomAvatar
            }
        });
        
        // Clear existing content
        d3.select(svg).selectAll('*').remove();
        
        // Set SVG dimensions
        d3.select(svg)
            .attr('width', width)
            .attr('height', height);
        
        // Create main chart group
        const chart = d3.select(svg)
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);
        
        // Render all chart elements using a single utility function
        renderChartElements({
            chart,
            chartData,
            metadata: {
                filteredData,
                ASTMfilter
            },
            renderFunctions: {
                renderAvatar: renderAvatar
            }
        });
    }
    
    function renderAvatar(selection, avatar, avatarWidth, avatarHeight, isPercentile = false) {
        // Check if avatar has position coordinates
        if (typeof avatar.x !== 'number' || typeof avatar.y !== 'number') {
            console.warn('Avatar missing position coordinates:', avatar);
            return null;
        }
        
        const avatarGroup = selection.append('g')
            .attr('class', isPercentile ? 'avatar percentile' : 'avatar')
            .attr('transform', `translate(${avatar.x - avatarWidth/2}, ${avatar.y - avatarHeight/2})`);
                
        const tooltipText = formatTooltipText(
            avatar, 
            (value) => findSizesForMeasurement(allSizeData, value)
        );
                
        avatarGroup.append('title').text(tooltipText);
                
        avatar.avatar.layers.forEach(layer => {
            avatarGroup.append('image')
                .attr('href', layer.path)
                .attr('width', avatarWidth)
                .attr('height', avatarHeight)
                .attr('x', 0)
                .attr('y', 0)
                .style('filter', isPercentile ? 'none' : 'grayscale(1)');
        });
                
        return avatarGroup;
    }
</script>
  
<div class="outer-container">
    <div class="visual-container">
        <svg 
            bind:this={svg} 
            width={width}
            height={height}
            bind:this={chartElement}
        ></svg>
        
        <!-- Debug info -->
        <div class="debug-info">
            <p>Step: {value}</p>
            <p>Year: {yearRange}</p>
            <p>Race: {race}</p>
            <p>Age: {age}</p>
        </div>
    </div>
  
    <Scrolly bind:value>
        {#each copy.scrolly1 as stage, i}
            <div class="step">
                <div class="text">
                    <p>{@html stage.text}</p>
                </div>
            </div>
        {/each}
    </Scrolly>
</div>
  
<style>
    .outer-container {
        display: block;
        width: 100%;
    }
  
    .visual-container {
        position: sticky;
        top: 0;
        width: 100%;
        height: 100vh;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1;
    }
  
    svg {
        display: block;
        max-width: 95%;
        max-height: 90%;
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
  
    :global(.x-axis path),
    :global(.x-axis line),
    :global(.x-axis-labels path),
    :global(.x-axis-labels line) {
        stroke: #333;
    }
  
    :global(.x-axis text),
    :global(.x-axis-labels text) {
        font-size: 12px;
        font-weight: 500;
    }
  
    .step {
        height: 100vh;
    }
  
    .step .text {
        width: 100%;
        padding: 20px;
        background: white;
    }
</style>