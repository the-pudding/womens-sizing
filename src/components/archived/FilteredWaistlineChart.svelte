<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
    import waistlinesData from '../../data/waistlines.json';
    import ASTMsizes from "../../data/ASTMsizes.json";
    
    let { 
      width = 800,
      height = 500,
      margin = { top: 40, right: 20, bottom: 10, left: 20 },
      
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
    let alphaSizeRanges = $state([]);
    let currentSizeRanges = $state([]);
    let allSizeData = $state([]);
    let resizeObserver = $state(null);
    
    // Initialize on mount
    onMount(() => { 
      filterASTMData();
      processASTMSizeData();
      setCurrentSizeRanges();
      
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
        bottom: Math.max(30, Math.floor(height * 0.08)), 
        left: Math.max(10, Math.floor(width * 0.025))
      };
      
      if (svg) {
        d3.select(svg)
          .attr('width', width)
          .attr('height', height);
      }
    }
    
    // Filter ASTM data
    function filterASTMData() {
      filteredASTM = ASTMsizes.filter(item => 
        item.year === ASTMFilters.year &&
        item.sizeRange === ASTMFilters.sizeRange
      );
    }
    
    // Set current size ranges
    function setCurrentSizeRanges() {
      currentSizeRanges = alphaSizeRanges.filter(range => 
        !omittedSizes.includes(range.size)
      );
      
      // Apply color gradient
      if (currentSizeRanges.length > 0) {
        const centerIndex = Math.floor(currentSizeRanges.length / 2);
        const maxDistance = Math.max(centerIndex, currentSizeRanges.length - 1 - centerIndex);
        
        currentSizeRanges.forEach((range, index) => {
          const distance = Math.abs(index - centerIndex);
          const opacity = 1 - (distance / maxDistance) * 0.7;
          
          range.color = colors.sizeBandBase;
          range.opacity = opacity;
          range.isCenter = index === centerIndex;
        });
      }
    }
    
    // Process ASTM size data
    function processASTMSizeData() {
      if (filteredASTM.length === 0) return;
      
      // Store data for tooltip lookups
      allSizeData = filteredASTM.map(item => ({
        alphaSize: item.alphaSize,
        numericSize: item.size,
        waist: parseFloat(item.waist)
      }));
      
      // Process Alpha Sizes
      const alphaSizeOrder = ["XXS", "XS", "S", "M", "L", "XL", "XXL"];
      
      // Group measurements by alpha size
      const sizeGroups = {};
      filteredASTM.forEach(item => {
        const alphaSize = item.alphaSize;
        if (!alphaSize) return;
        
        if (!sizeGroups[alphaSize]) {
          sizeGroups[alphaSize] = [];
        }
        sizeGroups[alphaSize].push(parseFloat(item.waist));
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
      
      // Sort sizes in standard order
      const sortedSizes = alphaSizeOrder
        .filter(size => sizeData[size])
        .map(size => sizeData[size]);
      
      if (sortedSizes.length === 0) return;
      
      // Calculate ranges with transition points
      const ranges = [];
      
      for (let i = 0; i < sortedSizes.length; i++) {
        const currentSize = sortedSizes[i];
        let rangeMin, rangeMax;
        
        // If it's the first size, extend 1 inch below
        if (i === 0) {
          rangeMin = currentSize.min - 1;
        } else {
          // Calculate midpoint between this size's min and previous size's max
          rangeMin = (currentSize.min + sortedSizes[i-1].max) / 2;
        }
        
        // If it's the last size, extend 1 inch above
        if (i === sortedSizes.length - 1) {
          rangeMax = currentSize.max + 1;
        } else {
          // Calculate midpoint between this size's max and next size's min
          rangeMax = (currentSize.max + sortedSizes[i+1].min) / 2;
        }
        
        ranges.push({
          sizeType: 'alpha',
          size: currentSize.size,
          min: rangeMin,
          max: rangeMax,
          exactMin: currentSize.min,
          exactMax: currentSize.max,
          index: i
        });
      }
      
      alphaSizeRanges = ranges;
    }
    
    // Find sizes for a measurement
    function findSizesForMeasurement(value) {
      // Check for alpha sizes within +/- 1 inch
      const matchingAlphaSizes = allSizeData
        .filter(item => Math.abs(item.waist - value) <= 1)
        .map(item => item.alphaSize);
      
      // Check for numeric sizes within +/- 1 inch
      const matchingNumericSizes = allSizeData
        .filter(item => Math.abs(item.waist - value) <= 1)
        .map(item => item.numericSize);
      
      // Remove duplicates
      const uniqueAlphaSizes = [...new Set(matchingAlphaSizes)].filter(Boolean);
      const uniqueNumericSizes = [...new Set(matchingNumericSizes)].filter(Boolean);
      
      return {
        alphaSizes: uniqueAlphaSizes,
        numericSizes: uniqueNumericSizes
      };
    }
    
    // Generate data points from percentiles
    function generateDataPoints(data) {
      const highlightPercentiles = [5, 25, 50, 75, 95];
      const allPercentiles = [5, 10, 25, 50, 75, 90, 95];
      const percentiles = {};
      
      allPercentiles.forEach(p => {
        percentiles[p] = parseFloat(data[`percent${p}`]);
      });
      
      const points = [];
      
      // Generate percentile points
      allPercentiles.forEach(p => {
        points.push({
          id: `p${p}`,
          value: percentiles[p],
          percentile: p,
          type: highlightPercentiles.includes(p) ? 'percentile' : 'standard'
        });
      });
      
      // Generate points between percentiles
      const percentileRanges = [
        { start: 5, end: 10, range: 5 },
        { start: 10, end: 25, range: 15 },
        { start: 25, end: 50, range: 25 },
        { start: 50, end: 75, range: 25 },
        { start: 75, end: 90, range: 15 },
        { start: 90, end: 95, range: 5 }
      ];
      
      const totalRange = percentileRanges.reduce((sum, segment) => sum + segment.range, 0);
      const totalPointsToDistribute = 85; // Fixed number of points
      
      // Calculate points for each segment
      const segments = percentileRanges.map(segment => ({
        start: segment.start,
        end: segment.end,
        count: Math.round((segment.range / totalRange) * totalPointsToDistribute)
      }));
      
      // Add points to the left of 5th percentile
      const p5Value = percentiles[5];
      const p10Value = percentiles[10];
      const firstSegmentWidth = p10Value - p5Value;
      
      for (let i = 0; i < 4; i++) {
        const leftShift = (i + 1) * (firstSegmentWidth * 0.25);
        points.push({
          id: `low-${i}`,
          value: p5Value - leftShift,
          percentile: i + 1,
          type: 'standard'
        });
      }
      
      // Add points to the right of 95th percentile
      const p95Value = percentiles[95];
      const p90Value = percentiles[90];
      const lastSegmentWidth = p95Value - p90Value;
      
      for (let i = 0; i < 4; i++) {
        const rightShift = (i + 1) * (lastSegmentWidth * 0.25);
        points.push({
          id: `high-${i}`,
          value: p95Value + rightShift,
          percentile: 96 + i,
          type: 'standard'
        });
      }
      
      // Fill in points between percentiles
      segments.forEach(segment => {
        const startValue = percentiles[segment.start];
        const endValue = percentiles[segment.end];
        const step = (endValue - startValue) / (segment.count + 1);
        
        for (let i = 0; i < segment.count; i++) {
          const value = startValue + step * (i + 1);
          const percentile = segment.start + (segment.end - segment.start) * (i + 1) / (segment.count + 1);
          
          points.push({
            id: `segment-${segment.start}-${segment.end}-${i}`,
            value: value,
            percentile: Math.round(percentile),
            type: 'standard'
          });
        }
      });
      
      // Calculate axis range
      const allValues = points.map(p => p.value);
      const min = Math.min(d3.min(allValues), 24);
      const max = d3.max(allValues);
      const padding = (max - min) * 0.05;
      
      // Make sure range encompasses all size ranges
      let xMin = min;
      let xMax = max;
      
      if (currentSizeRanges.length > 0) {
        xMin = Math.min(xMin, d3.min(currentSizeRanges, d => d.min));
        xMax = Math.max(xMax, d3.max(currentSizeRanges, d => d.max));
      }
      
      return {
        points,
        xRange: [xMin - padding, xMax + padding]
      };
    }
    
    // Render the chart
    function renderChart() {
      if (!chartElement || !filteredData) return;
      
      // Generate data
      const { points, xRange } = generateDataPoints(filteredData);
      
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
      const baseRectWidth = 40;
      const baseRectHeight = 100;
      const scaleFactor = Math.max(0.5, Math.min(1, width / 800));
      const rectWidth = baseRectWidth * scaleFactor;
      const rectHeight = baseRectHeight * scaleFactor;
      
      // Set up force simulation
      const simulation = d3.forceSimulation(points)
        .force('x', d3.forceX(d => xScale(d.value)).strength(0.95))
        .force('y', d3.forceY(d => {
          return d.type === 'percentile' ? innerHeight * 0.5 : innerHeight * 0.4;
        }).strength(width < 600 ? 0.2 : 0.05))
        .force('collide', d3.forceCollide(d => {
          return d.type === 'percentile' ? rectHeight/3 : rectHeight/4;
        }))
        .stop();
  
      // Run simulation
      for (let i = 0; i < (width < 600 ? 200 : 300); ++i) simulation.tick();
      
      // Sort points by y-position (lower y values drawn first - will be at the back)
      points.sort((a, b) => a.y - b.y);
      
      // Create separate groups for standard and percentile dots
      const dotsBackground = chart.append('g').attr('class', 'dots-background');
      const dotsForeground = chart.append('g').attr('class', 'dots-foreground');
      
      // Create standard dots (in background)
      const regularDots = dotsBackground.selectAll('rect')
        .data(points.filter(d => d.type !== 'percentile'))
        .join('rect')
        .attr('x', d => d.x - rectWidth/2)
        .attr('y', d => d.y - rectHeight/2)
        .attr('width', rectWidth)
        .attr('height', rectHeight)
        .attr('fill', colors.dots)
        .attr('stroke', '#fff')
        .attr('stroke-width', 0.8)
        .attr('opacity', 0.7);
      
      // Create percentile dots (in foreground)
      const percentileDots = dotsForeground.selectAll('rect')
        .data(points.filter(d => d.type === 'percentile'))
        .join('rect')
        .attr('x', d => d.x - rectWidth/2)
        .attr('y', d => d.y - rectHeight/2)
        .attr('width', rectWidth)
        .attr('height', rectHeight)
        .attr('fill', colors.percentileDot)
        .attr('stroke', '#fff')
        .attr('stroke-width', 2)
        .attr('opacity', 1);
      
      // Add tooltips to standard dots
      regularDots
        .append('title')
        .text(d => {
          const value = d.value;
          const valueStr = value.toString();
          const baseText = `Value: ${valueStr}″${d.percentile ? `\nPercentile: ~${d.percentile}` : ''}`;
          const matchingSizes = findSizesForMeasurement(value);
          let sizeText = '';
          
          if (matchingSizes.alphaSizes.length > 0 || matchingSizes.numericSizes.length > 0) {
            if (matchingSizes.alphaSizes.length > 0) {
              sizeText += `\nAlpha Size: ${matchingSizes.alphaSizes.join(', ')}`;
            }
            if (matchingSizes.numericSizes.length > 0) {
              sizeText += `\nNumeric Size: ${matchingSizes.numericSizes.join(', ')}`;
            }
          } else {
            sizeText = '\nNo size match';
          }
          
          return baseText + sizeText;
        });
      
      // Add tooltips to percentile dots
      percentileDots
        .append('title')
        .text(d => {
          const value = d.value;
          const valueStr = value.toString();
          const baseText = `${d.percentile}th Percentile: ${valueStr}″`;
          const matchingSizes = findSizesForMeasurement(value);
          let sizeText = '';
          
          if (matchingSizes.alphaSizes.length > 0 || matchingSizes.numericSizes.length > 0) {
            if (matchingSizes.alphaSizes.length > 0) {
              sizeText += `\nAlpha Size: ${matchingSizes.alphaSizes.join(', ')}`;
            }
            if (matchingSizes.numericSizes.length > 0) {
              sizeText += `\nNumeric Size: ${matchingSizes.numericSizes.join(', ')}`;
            }
          } else {
            sizeText = '\nNo size match';
          }
          
          return baseText + sizeText;
        });
      
      // Add hover effects to standard dots
      regularDots
        .on('mouseover', function() {
          d3.select(this)
            .attr('opacity', 1)
            .attr('stroke-width', 1.5);
        })
        .on('mouseout', function() {
          d3.select(this)
            .attr('opacity', 0.7)
            .attr('stroke-width', 0.8);
        });
      
      // Add hover effects to percentile dots
      percentileDots
        .on('mouseover', function() {
          d3.select(this)
            .attr('stroke-width', 3);
        })
        .on('mouseout', function() {
          d3.select(this)
            .attr('stroke-width', 2);
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