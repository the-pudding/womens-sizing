<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
    import waistlinesData from '../../data/waistlines.json';
    import ASTMsizes from "../../data/ASTMsizes.json";
    import { 
      filterASTMData, 
      processASTMSizeData, 
      findSizesForMeasurement,
      generateDataPoints,
      createForceSimulation,
      formatTooltipText
    } from '../utils/chart-utilities.js';
    
    let { 
      width = 800,
      height = 600,
      margin = { top: 40, right: 20, bottom: 50, left: 20 },
      
      waistlineFilters = {
        yearRange: "2015-2018",
        race: "all",
        age: "20 and over"
      },
  
      ASTMFilters = {
        year: "2021",
        sizeRange: "straight"
      },
      
      omittedSizes = ["XXL", "XL", "XS", "XXS"], 
      
      colors = {
        dots: '#4682b4',
        percentileDot: '#e41a1c',
        sizeBandBase: '#C2D932'
      }
    } = $props();
    
    let svg;
    let chartElement = $state(null);
    let chartContainer = $state(null);
    let ready = $state(false);
    let filteredData = $state(null);
    let filteredASTM = $state([]);
    let currentSizeRanges = $state([]);
    let allSizeData = $state([]);
    let resizeObserver = $state(null);
    
    // Initialize on mount
    onMount(() => { 
      // Filter ASTM data using utility function
      filteredASTM = filterASTMData(ASTMsizes, ASTMFilters);
      
      // Process size data using utility function
      const sizeData = processASTMSizeData(filteredASTM, omittedSizes, colors.sizeBandBase);
      currentSizeRanges = sizeData.currentSizeRanges;
      allSizeData = sizeData.allSizeData;
      
      // Find matching waistline data
      filteredData = waistlinesData.find(item => 
        item.yearRange === waistlineFilters.yearRange &&
        item.race === waistlineFilters.race &&
        item.age === waistlineFilters.age
      );
      
      ready = true;
      
      // Set up resize observer
      if (typeof ResizeObserver !== 'undefined' && chartContainer) {
        resizeObserver = new ResizeObserver(() => {
          updateDimensions();
          if (ready && filteredData) renderChart();
        });
        resizeObserver.observe(chartContainer);
      }
      
      // Initial render
      setTimeout(() => {
        if (chartElement && chartContainer) {
          updateDimensions();
          renderChart();
        }
      }, 10);
      
      // Cleanup
      return () => {
        if (resizeObserver) resizeObserver.disconnect();
      };
    });
    
    // Update chart dimensions based on container size
    function updateDimensions() {
      if (!chartContainer) return;
      
      const containerRect = chartContainer.getBoundingClientRect();
      width = containerRect.width;
      height = window.innerHeight * 0.9;
      
      margin = { 
        top: Math.max(20, Math.floor(height * 0.05)), 
        right: Math.max(10, Math.floor(width * 0.025)), 
        bottom: Math.max(30, Math.floor(height * 0.06)), 
        left: Math.max(10, Math.floor(width * 0.025))
      };
      
      if (svg) {
        d3.select(svg)
          .attr('width', width)
          .attr('height', height);
      }
    }
    
    // Render the chart
    function renderChart() {
      if (!chartElement || !filteredData) return;
      
      // Generate data points using utility function
      const { points, xRange } = generateDataPoints(filteredData, currentSizeRanges);
      
      // Clear existing content
      d3.select(svg).selectAll('*').remove();
      
      // Calculate inner dimensions
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;
      
      // Set SVG dimensions
      d3.select(svg)
        .attr('width', width)
        .attr('height', height);
      
      // Create main chart group
      const chart = d3.select(svg)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);
      
      // Create x scale
      const xScale = d3.scaleLinear()
        .domain(xRange)
        .range([0, innerWidth]);
      
      // Draw size range background bands
      if (currentSizeRanges.length > 0) {
        const sizeBackground = chart.append('g').attr('class', 'size-backgrounds');
        
        currentSizeRanges.forEach(sizeRange => {
          const x = xScale(sizeRange.min);
          const rectWidth = xScale(sizeRange.max) - x;
          
          // Background rectangle
          sizeBackground.append('rect')
            .attr('x', x)
            .attr('y', 0)
            .attr('width', rectWidth)
            .attr('height', innerHeight)
            .attr('fill', sizeRange.color)
            .attr('opacity', sizeRange.opacity)
            .attr('class', `size-band size-${sizeRange.size}`);
            
          // Size label
          sizeBackground.append('text')
            .attr('x', x + rectWidth / 2)
            .attr('y', innerHeight - 10)
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'middle')
            .attr('font-size', `${Math.min(18, Math.max(12, Math.floor(rectWidth / 12)))}px`)
            .attr('font-weight', 'bold')
            .attr('fill', 'rgba(0,0,0,0.3)')
            .attr('pointer-events', 'none')
            .text(sizeRange.size);
        });
      }
      
      // Add metadata
      const metadataText = `${filteredData.yearRange}, Age: ${filteredData.age}, Race: ${filteredData.race} | ASTM: ${ASTMFilters.year}, ${ASTMFilters.sizeRange}`;
      chart.append('text')
        .attr('class', 'metadata')
        .attr('x', innerWidth / 2)
        .attr('y', -25)
        .attr('text-anchor', 'middle')
        .style('font-size', '14px')
        .text(metadataText);
      
      // Add x-axis with small ticks
      chart.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0, ${innerHeight})`)
        .call(
          d3.axisBottom(xScale)
            .tickSize(15)
            .ticks(30)
            .tickFormat('')
        );
  
      // Add x-axis with major ticks and labels
      chart.append('g')
        .attr('class', 'x-axis-labels')
        .attr('transform', `translate(0, ${innerHeight})`)
        .call(
          d3.axisBottom(xScale)
            .tickSize(30)
            .ticks(Math.min(10, Math.floor(innerWidth / 100)))
        )
        .selectAll('text')
        .style('font-size', '12px')
        .attr('dy', '1em');
      
      // Responsive rectangle sizing
      const baseRectWidth = 80;
      const baseRectHeight = 150;
      const scaleFactor = Math.max(0.5, Math.min(1, width / 800));
      const rectWidth = baseRectWidth * scaleFactor;
      const rectHeight = baseRectHeight * scaleFactor;
      
      // Set up force simulation with utility function
      const simulation = createForceSimulation(
        points, 
        xScale, 
        innerHeight, 
        rectHeight,
        width
      );
  
      // Run simulation
      for (let i = 0; i < (width < 600 ? 200 : 300); ++i) simulation.tick();
      
      // Sort points by y-position (lower y values drawn first - will be at the back)
      points.sort((a, b) => a.y - b.y);
      
      // Create separate groups for standard and percentile dots
      const dotsBackground = chart.append('g').attr('class', 'dots-background');
      const dotsForeground = chart.append('g').attr('class', 'dots-foreground');
      
      // Path to the avatar image
      const avatarPath = '/assets/avatars/2-avatar.png';
      
      // Create standard dots (in background) using the avatar image
      const regularDots = dotsBackground.selectAll('image')
        .data(points.filter(d => d.type !== 'percentile'))
        .join('image')
        .attr('href', avatarPath)
        .attr('x', d => d.x - rectWidth/2)
        .attr('y', d => d.y - rectHeight/2)
        .attr('width', rectWidth)
        .attr('height', rectHeight)
        .style('opacity', 0.7)
        .style('filter', 'none'); // No filter for regular dots
      
      // Create percentile dots (in foreground) using the avatar image with visual distinction
      const percentileDots = dotsForeground.selectAll('image')
        .data(points.filter(d => d.type === 'percentile'))
        .join('image')
        .attr('href', avatarPath)
        .attr('x', d => d.x - rectWidth/2)
        .attr('y', d => d.y - rectHeight/2)
        .attr('width', rectWidth)
        .attr('height', rectHeight)
        .style('opacity', 1)
        .style('filter', 'hue-rotate(330deg) saturate(180%)'); // Reddish hue for percentile avatars
      
      // Create tooltip functions that use our utility
      const getTooltipForRegular = d => formatTooltipText(
        d, 
        value => findSizesForMeasurement(allSizeData, value)
      );
      
      const getTooltipForPercentile = d => formatTooltipText(
        d, 
        value => findSizesForMeasurement(allSizeData, value)
      );
      
      // Add tooltips to standard dots
      regularDots
        .append('title')
        .text(getTooltipForRegular);
      
      // Add tooltips to percentile dots
      percentileDots
        .append('title')
        .text(getTooltipForPercentile);
      
      // Add hover effects to standard dots
      regularDots
        .on('mouseover', function() {
          d3.select(this)
            .style('opacity', 1)
            .style('filter', 'brightness(1.2)');
        })
        .on('mouseout', function() {
          d3.select(this)
            .style('opacity', 0.7)
            .style('filter', 'none');
        });
      
      // Add hover effects to percentile dots
      percentileDots
        .on('mouseover', function() {
          d3.select(this)
            .style('filter', 'hue-rotate(330deg) saturate(180%) brightness(1.2) drop-shadow(0 0 3px rgba(255,255,255,0.7))');
        })
        .on('mouseout', function() {
          d3.select(this)
            .style('filter', 'hue-rotate(330deg) saturate(180%)');
        });
    }
  </script>
  
  <main>
    <div class="chart-container" bind:this={chartContainer}>
      {#if ready && filteredData}
        <svg 
          bind:this={svg} 
          width={width}
          height={height}
          bind:this={chartElement}
        ></svg>
      {:else if !filteredData}
        <p class="error-message">No data found for the selected filters</p>
      {:else}
        <p class="loading-message">Loading chart...</p>
      {/if}
    </div>
  </main>
  
  <style>
    main {
      padding: 0;
      width: 100%;
      max-width: 100%;
      margin: 0 auto;
      height: 100vh;
      display: flex;
      flex-direction: column;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    
    .chart-container {
      width: 90%;
      height: 90vh;
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
      max-width: 100%;
      max-height: 100%;
    }
    
    .error-message {
      color: #d32f2f;
      text-align: center;
      font-weight: 500;
      padding: 2rem;
    }
    
    .loading-message {
      color: #555;
      text-align: center;
      font-weight: 500;
      padding: 2rem;
    }
    
    :global(.dots rect:hover) {
      cursor: pointer;
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
    
    @media (max-width: 768px) {
      .chart-container {
        width: 95%;
        height: 80vh;
        padding: 2px;
      }
      
      :global(.x-axis-labels text) {
        font-size: 10px;
      }
      
      :global(.metadata) {
        font-size: 12px !important;
      }
    }
    
    @media (max-width: 480px) {
      .chart-container {
        width: 98%;
        height: 70vh;
        padding: 1px;
      }
      
      :global(.x-axis-labels text) {
        font-size: 8px;
      }
      
      :global(.metadata) {
        font-size: 10px !important;
      }
    }
  </style>