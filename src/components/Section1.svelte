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
  
    let containerHeight = $state(0);
    let containerWidth = $state(0);
    let margin = { top: 40, right: 10, bottom: 10, left: 10 };
    let width = $derived(containerWidth - margin.left - margin.right);
    let height = $derived(containerHeight - margin.top - margin.bottom);
    
    let avatarWidth = $derived(Math.max(30, width / 20));
    let avatarHeight = $derived(avatarWidth * 1.8);
    
    let { 
      omittedSizes = ["XXL", "XL", "XS", "XXS"], 
      
      colors = {
        dots: '#4682b4',
        percentileDot: '#e41a1c',
        sizeBandBase: '#C2D932'
      }
    } = $props();
    

    let value = $state(0);
    let svg;
    let filteredData = null;
    let ASTMfilter = null;
    let filteredASTM = [];
    let currentSizeRanges = [];
    let allSizeData = [];
    
    // Filter state
    let yearRange = $state("2015-2018");
    let race = $state("all");
    let age = $state("11");
    let ASTMyear = $state("2015");
    let ASTMrange = $state("junior");
    

    $effect(() => {
        // Get current stage data safely
        const stage = copy?.scrolly1?.[value];
        if (!stage) return;
        
        // Update filters if values changed
        if (stage.yearRange) yearRange = stage.yearRange;
        if (stage.race) race = stage.race;
        if (stage.age) age = stage.age;
        if (stage.year) ASTMyear = stage.year;
        if (stage.sizeRange) ASTMrange = stage.sizeRange;

        updateData();
    });
    
    $effect(() => {
        if (containerWidth > 0 && containerHeight > 0 && filteredData) {
            renderChart();
        }
    });

    function updateData() {
        const waistlineResults = filterAndProcessWaistlineData(
            waistlinesData,
            { yearRange, race, age }
        );
        filteredData = waistlineResults.filteredData;

        const astmResults = filterAndProcessASTMData(
            ASTMsizes,
            { year: ASTMyear, sizeRange: ASTMrange },
            omittedSizes,
            colors.sizeBandBase
        );
        
        ASTMfilter = astmResults.filter;
        filteredASTM = astmResults.filteredData;
        currentSizeRanges = astmResults.currentSizeRanges;
        allSizeData = astmResults.allSizeData;
        
        if (containerWidth > 0 && containerHeight > 0) {
            renderChart();
        }
    }
  
    onMount(() => {
        updateData();
    });
    
    function renderChart() {
        if (!filteredData || !ASTMfilter || width <= 0 || height <= 0) return;
        
        const chartData = generateChartData({
            filteredData,
            currentSizeRanges,
            allSizeData,
            width,
            height,
            margin,
            findSizesCallback: (value) => findSizesForMeasurement(allSizeData, value),
            avatarFunctions: {
                determineAvatarSize,
                generateRandomAvatar
            },
            avatarDimensions: {
                width: avatarWidth,
                height: avatarHeight
            }
        });
        
        d3.select(svg).selectAll('*').remove();
        
        const chart = d3.select(svg)
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);
        
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
        if (typeof avatar.x !== 'number' || typeof avatar.y !== 'number') {
            console.warn('Avatar missing position coordinates:', avatar);
            return null;
        }
        
        // Constrain position to ensure avatars stay within bounds
        const x = Math.max(0, Math.min(width - avatarWidth/2, avatar.x));
        const y = Math.max(0, Math.min(height - avatarHeight/2, avatar.y));
        
        const avatarGroup = selection.append('g')
            .attr('class', 'avatar-group')
            .classed('percentile', isPercentile)
            .classed('standard', !isPercentile)
            .attr('transform', `translate(${x - avatarWidth/2}, ${y - avatarHeight/2})`)
                
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
                .attr('y', 0);
        });
                
        return avatarGroup;
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
    
    :global(.avatar-group.standard image) {
        filter: grayscale(100%);
    }
    
    :global(.avatar-group.percentile image) {
        filter: none;
    }
    
    :global(.avatar-group) {
        transition: transform 0.2s ease;
    }
</style>