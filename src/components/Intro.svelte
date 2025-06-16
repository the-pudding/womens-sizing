<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
    import generatedPercentiles from '../data/generatedPercentiles.json';
    import ASTMsizes from "../data/ASTMsizes.json";
    import copy from "../data/copy.json";
    
    import { generateRandomAvatar } from './utils/avatar-generator.js';
    import Scrolly from './helpers/Scrolly.svelte';
  
    // Responsive dimensions
    let containerHeight = $state(0);
    let containerWidth = $state(0);
    let margin = { top: 40, right: 10, bottom: 10, left: 10 };
    let width = $derived(containerWidth - margin.left - margin.right);
    let height = $derived(containerHeight - margin.top - margin.bottom);
    
    // Scrolly and chart state
    let value = $state(0);
    let svg;
    let filteredData = null;
    let ASTMfilter = null;
    let currentSizeRanges = [];
    
    // Filter states defined in copy.json and set via scrollytelling
    let yearRange = $state("2015-2018");
    let race = $state("all");
    let age = $state("11");
    let ASTMyear = $state("2015");
    let ASTMrange = $state("junior");
    let sizeBands = $state("S,M,L");
    let sizeType = $state("alpha");
    let bandColor = $state("gradient");
    let showBands = $state(true);
    
    // =============================================================================
    // DATA PROCESSING FUNCTIONS
    // =============================================================================
    
    /**
     * Filters percentile data based on provided criteria
     */
    function filterPercentileData(criteria) {
      return generatedPercentiles.find(item => 
        item.yearRange === criteria.yearRange &&
        item.race === criteria.race &&
        item.age === criteria.age
      ) || null;
    }

    /**
     * Filters and processes ASTM data based on provided criteria
     */
    function filterAndProcessASTMData(criteria) {
      const filter = ASTMsizes.find(item => 
        item.year === criteria.year &&
        item.sizeRange === criteria.sizeRange
      ) || null;
      
      if (!filter) return { filter: null, currentSizeRanges: [] };
      
      const filteredData = ASTMsizes.filter(item => 
        item.year === criteria.year &&
        item.sizeRange === criteria.sizeRange
      );
      
      const sizeRanges = processSizeData(filteredData, criteria);
      
      return { filter, currentSizeRanges: sizeRanges };
    }

    /**
     * Process size data to determine size ranges (unified for both alpha and numeric)
     */
    function processSizeData(filteredASTM, criteria) {
      if (!filteredASTM || filteredASTM.length === 0) return [];
      
      const sizesToInclude = criteria.sizeBands.split(',').map(s => s.trim());
      const isNumeric = criteria.sizeType === 'numeric';
      
      // Group measurements by size
      const sizeGroups = {};
      filteredASTM.forEach(item => {
        const size = isNumeric ? item.size : item.alphaSize;
        if (!size) return;
        
        if (!sizeGroups[size]) {
          sizeGroups[size] = [];
        }
        sizeGroups[size].push(parseFloat(item.waist));
      });
      
      // Get min/max for each size
      const sizeData = {};
      Object.keys(sizeGroups).forEach(size => {
        if (sizeGroups[size].length === 0) return;
        sizeData[size] = {
          min: Math.min(...sizeGroups[size]),
          max: Math.max(...sizeGroups[size]),
          size: size
        };
      });
      
      // Sort sizes
      const sortedSizes = isNumeric 
        ? sortNumericSizes(Object.keys(sizeData)).map(size => sizeData[size]).filter(Boolean)
        : ["XXS", "XS", "S", "M", "L", "XL", "XXL"].filter(size => sizeData[size]).map(size => sizeData[size]);
      
      if (sortedSizes.length === 0) return [];
      
      // Calculate ranges with transition points
      const ranges = sortedSizes.map((currentSize, i) => {
        let rangeMin, rangeMax;
        
        if (i === 0) {
          rangeMin = currentSize.min - 1;
        } else {
          rangeMin = (currentSize.min + sortedSizes[i-1].max) / 2;
        }
        
        if (i === sortedSizes.length - 1) {
          rangeMax = currentSize.max + 1;
        } else {
          rangeMax = (currentSize.max + sortedSizes[i+1].min) / 2;
        }
        
        return {
          size: currentSize.size,
          min: rangeMin,
          max: rangeMax,
          index: i
        };
      });
      
      // Filter to included sizes and apply colors
      const filteredRanges = ranges.filter(range => sizesToInclude.includes(range.size));
      applySizeColors(filteredRanges, criteria.bandColor);
      
      return filteredRanges;
    }

    /**
     * Sort numeric sizes properly
     */
    function sortNumericSizes(sizes) {
      return sizes
        .map(size => ({
          size,
          numValue: parseInt(size.replace(/\D/g, ''), 10)
        }))
        .filter(item => !isNaN(item.numValue))
        .sort((a, b) => a.numValue - b.numValue)
        .map(item => item.size);
    }

    /**
     * Apply color gradient to size ranges
     */
    function applySizeColors(ranges, baseColor) {
      if (!ranges || ranges.length === 0) return;
      
      const centerIndex = Math.floor(ranges.length / 2);
      const maxDistance = Math.max(centerIndex, ranges.length - 1 - centerIndex);
      
      ranges.forEach((range, index) => {
        const distance = Math.abs(index - centerIndex);
        const opacity = 1 - (distance / maxDistance) * 0.7;
        
        range.color = baseColor === "gradient" ? "#C2D932" : baseColor;
        range.opacity = baseColor === "gradient" ? opacity : 0.3;
      });
    }
    
    // =============================================================================
    // DATA GENERATION FUNCTIONS
    // =============================================================================

    /**
     * Create data points from percentile data
     */
    function createDataPoints(data) {
      if (!data) return [];
      
      const points = [];
      for (let percentile = 1; percentile <= 100; percentile++) {
        const value = parseFloat(data[`percent${percentile}`]);
        if (!isNaN(value)) {
          points.push({
            id: `p${percentile}`,
            value: value,
            percentile: percentile,
            avatar: generateRandomAvatar('small')
          });
        }
      }
      return points;
    }

    /**
     * Run force simulation to position avatars
     */
    function positionAvatars(points, xScale, innerWidth, innerHeight) {
      const avatarWidth = 80;
      const avatarHeight = 140;
      
      const simulation = d3.forceSimulation(points)
        .force('x', d3.forceX(d => xScale(d.value)).strength(0.95))
        .force('y', d3.forceY(innerHeight * 0.5).strength(0.05))
        .force('collide', d3.forceCollide(avatarHeight / 4).strength(0.8));
      
      // Run simulation
      for (let i = 0; i < 300; ++i) {
        simulation.tick();
      }
      
      // Ensure positions exist and are within bounds
      points.forEach(point => {
        if (!point.x) point.x = xScale(point.value);
        if (!point.y) point.y = innerHeight * 0.5;
        
        point.x = Math.max(avatarWidth/2, Math.min(innerWidth - avatarWidth/2, point.x));
        point.y = Math.max(avatarHeight/2, Math.min(innerHeight - avatarHeight/2, point.y));
      });
      
      return { avatarWidth, avatarHeight };
    }
    
    // =============================================================================
    // CHART RENDERING FUNCTIONS
    // =============================================================================

    /**
     * Renders size bands in the chart
     */
    function renderSizeBands(selection, xScale, innerHeight) {
      if (!showBands || !currentSizeRanges || currentSizeRanges.length === 0) return;
      
      currentSizeRanges.forEach(sizeRange => {
        const x = xScale(sizeRange.min);
        const rectWidth = xScale(sizeRange.max) - x;
        
        selection.append('rect')
          .attr('x', x)
          .attr('y', 0)
          .attr('width', rectWidth)
          .attr('height', innerHeight)
          .attr('fill', sizeRange.color)
          .attr('opacity', sizeRange.opacity)
          .attr('class', `size-band size-${sizeRange.size}`);
          
        selection.append('text')
          .attr('x', x + rectWidth / 2)
          .attr('y', innerHeight - 10)
          .attr('text-anchor', 'middle')
          .attr('font-size', '16px')
          .attr('font-weight', 'bold')
          .attr('fill', 'rgba(0,0,0,0.3)')
          .text(sizeRange.size);
      });
    }

    /**
     * Renders axes for the chart
     */
    function renderAxes(selection, xScale, innerHeight) {
      // Small ticks
      selection.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0, ${innerHeight})`)
        .call(d3.axisBottom(xScale).tickSize(15).ticks(30).tickFormat(''));
      
      // Major ticks with labels
      const xAxisLabels = selection.append('g')
        .attr('class', 'x-axis-labels')
        .attr('transform', `translate(0, ${innerHeight})`)
        .call(d3.axisBottom(xScale).tickSize(30).ticks(10));
      
      xAxisLabels.selectAll('text')
        .style('font-size', '12px')
        .attr('dy', '1.2em');
    }

    /**
     * Renders metadata above the chart
     */
    function renderMetadata(selection, innerWidth) {
      if (!filteredData || !ASTMfilter) return;
      
      const metadataText = `${filteredData.yearRange}, Age: ${filteredData.age}, Race: ${filteredData.race} | ASTM: ${ASTMfilter.year}, ${ASTMfilter.sizeRange}`;
      
      selection.append('text')
        .attr('class', 'metadata')
        .attr('x', innerWidth / 2)
        .attr('y', -25)
        .attr('text-anchor', 'middle')
        .style('font-size', '14px')
        .text(metadataText);
    }

    /**
     * Renders avatars
     */
    function renderAvatars(selection, points, avatarWidth, avatarHeight) {
      selection.selectAll('*').remove();
      
      points.forEach(point => {
        const avatarGroup = selection.append('g')
          .attr('class', 'avatar-group')
          .attr('transform', `translate(${point.x - avatarWidth/2}, ${point.y - avatarHeight/2})`);
        
        point.avatar.layers.forEach(layer => {
          avatarGroup.append('image')
            .attr('href', layer.path)
            .attr('width', avatarWidth)
            .attr('height', avatarHeight)
            .attr('x', 0)
            .attr('y', 0);
        });
      });
    }
    
    // =============================================================================
    // MAIN COMPONENT LOGIC
    // =============================================================================
    
    // Update settings when scroll position changes
    $effect(() => {
        const stage = copy?.scrolly1?.[value];
        if (!stage) return;
        
        if (stage.yearRange) yearRange = stage.yearRange;
        if (stage.race) race = stage.race;
        if (stage.age) age = stage.age;
        if (stage.year) ASTMyear = stage.year;
        if (stage.sizeRange) ASTMrange = stage.sizeRange;
        if (stage.sizeBands) sizeBands = stage.sizeBands;
        if (stage.sizeType) sizeType = stage.sizeType;
        if (stage.bandColor) bandColor = stage.bandColor;
        if (stage.hasOwnProperty('showBands')) showBands = stage.showBands;
        
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
        filteredData = filterPercentileData({ yearRange, race, age });
        
        const astmResults = filterAndProcessASTMData({
            year: ASTMyear, 
            sizeRange: ASTMrange,
            sizeType: sizeType,
            sizeBands: sizeBands,
            bandColor: bandColor
        });
        
        ASTMfilter = astmResults.filter;
        currentSizeRanges = astmResults.currentSizeRanges;
        
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
        
        // Create data points with avatars
        const points = createDataPoints(filteredData);
        
        // Calculate dimensions
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;
        
        // Create scale
        const xScale = d3.scaleLinear()
          .domain([20, 50])
          .range([0, innerWidth]);
        
        // Position avatars
        const { avatarWidth, avatarHeight } = positionAvatars(points, xScale, innerWidth, innerHeight);
        
        // Set up SVG
        const svgSelection = d3.select(svg);
        let mainGroup = svgSelection.select('.main-chart-group');
        
        if (mainGroup.empty()) {
            svgSelection.selectAll('*').remove();
            mainGroup = svgSelection.append('g')
                .attr('class', 'main-chart-group')
                .attr('transform', `translate(${margin.left}, ${margin.top})`);
            
            mainGroup.append('g').attr('class', 'size-bands');
            mainGroup.append('g').attr('class', 'axes');
            mainGroup.append('g').attr('class', 'avatars');
            mainGroup.append('g').attr('class', 'metadata');
        }
        
        svgSelection
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom);
        
        // Clear and redraw chart elements
        const sizeBandsGroup = svgSelection.select('.size-bands');
        const axesGroup = svgSelection.select('.axes');
        const avatarsGroup = svgSelection.select('.avatars');
        const metadataGroup = svgSelection.select('.metadata');
        
        sizeBandsGroup.selectAll('*').remove();
        axesGroup.selectAll('*').remove();
        metadataGroup.selectAll('*').remove();
        
        renderSizeBands(sizeBandsGroup, xScale, innerHeight);
        renderAxes(axesGroup, xScale, innerHeight);
        renderMetadata(metadataGroup, innerWidth);
        renderAvatars(avatarsGroup, points, avatarWidth, avatarHeight);
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
                <p>Settings: {yearRange}, {race}, {age}</p>
                <p>ASTM: {ASTMyear}, {ASTMrange}</p>
                <p>Sizes: {sizeBands} ({sizeType})</p>
                <p>Bands: {showBands ? 'On' : 'Off'}</p>
            </div>
        </div>
    </div>
    
    <div class="scrolly-outer">
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
    
    :global(.avatar-group) {
        transition: transform 0.75s ease, opacity 0.5s ease;
    }
    
    :global(.size-band) {
        transition: opacity 0.5s ease, fill 0.5s ease;
    }
</style>