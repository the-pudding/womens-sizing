<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
    import waistlinesData from '../data/waistlines.json';
    import ASTMsizes from "../data/ASTMsizes.json";
    
    // Component props
    let { 
      width = Math.max(window.innerWidth * 0.9, 800), // At least 800px wide
      height = Math.max(window.innerHeight * 0.7, 500), // At least 500px tall
      margin = { 
        top: 60, 
        right: width * 0.05, 
        bottom: 60, 
        left: width * 0.05 
      },
      colors = {
        dots: '#4682b4',
        percentileDot: '#e41a1c',
        sizeBase: '#C2D932' // Base color for size M
      }
    } = $props();
    
    let svg;
    let chartElement = $state(null);
    let ready = $state(false);
    let filteredData = $state(null);
    let sizeRanges = $state([]);
    
    const filterCriteria = {
      yearRange: "2015-2018",
      race: "all",
      age: "20 and over"
    };
    
    // Initialize on mount with responsive dimensions
    onMount(() => {
      // Make sure width and height are responsive
      width = Math.max(window.innerWidth * 0.9, 800); // At least 800px wide
      height = Math.max(window.innerHeight * 0.7, 500); // At least 500px tall
      
      // Update margins proportionally
      margin = { 
        top: 60, 
        right: width * 0.05, 
        bottom: 60, 
        left: width * 0.05 
      };
      
      // Process ASTM size data to create size ranges
      processASMTSizeData();
      
      // Find matching waistlines data
      filteredData = waistlinesData.find(item => 
        item.yearRange === filterCriteria.yearRange &&
        item.race === filterCriteria.race &&
        item.age === filterCriteria.age
      );
      
      ready = true;
  
      setTimeout(() => {
        if (chartElement) {
          renderChart();
        }
      }, 0);
      
      // Add window resize handler for responsiveness
      const handleResize = () => {
        width = Math.max(window.innerWidth * 0.9, 800);
        height = Math.max(window.innerHeight * 0.7, 500);
        
        margin = { 
          top: 60, 
          right: width * 0.05, 
          bottom: 60, 
          left: width * 0.05 
        };
        
        if (chartElement && filteredData) {
          renderChart();
        }
      };
      
      window.addEventListener('resize', handleResize);
      
      // Cleanup resize listener
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    });
    
    // Process the ASTM size data to determine size ranges
    function processASMTSizeData() {
      // Filter for 'straight' size range only (assuming this is the relevant category)
      const straightSizes = ASTMsizes.filter(item => item.sizeRange === "straight");
      
      // Group by alphaSize (XS, S, M, L, XL, etc.)
      const sizeGroups = {};
      straightSizes.forEach(item => {
        const alphaSize = item.alphaSize;
        if (!sizeGroups[alphaSize]) {
          sizeGroups[alphaSize] = [];
        }
        sizeGroups[alphaSize].push(parseFloat(item.waist));
      });
      
      // Determine min and max waist for each alphaSize
      const alphaSizeRanges = {};
      Object.keys(sizeGroups).forEach(alphaSize => {
        alphaSizeRanges[alphaSize] = {
          min: Math.min(...sizeGroups[alphaSize]),
          max: Math.max(...sizeGroups[alphaSize]),
          alphaSize: alphaSize
        };
      });
      
      // Sort the alpha sizes in order (XXS, XS, S, M, L, XL, XXL)
      const sizeOrder = ["XXS", "XS", "S", "M", "L", "XL", "XXL"];
      const sortedSizes = sizeOrder
        .filter(size => alphaSizeRanges[size]) // Only include sizes that exist in data
        .map(size => alphaSizeRanges[size]);
      
      // Calculate transition points between sizes
      const finalRanges = [];
      for (let i = 0; i < sortedSizes.length; i++) {
        const currentSize = sortedSizes[i];
        let rangeMin, rangeMax;
        
        // If it's the first size (e.g., XXS), extend 1 inch below
        if (i === 0) {
          rangeMin = currentSize.min - 1;
        } else {
          // Calculate midpoint between this size's min and previous size's max
          rangeMin = (currentSize.min + sortedSizes[i-1].max) / 2;
        }
        
        // If it's the last size (e.g., XXL), extend 1 inch above
        if (i === sortedSizes.length - 1) {
          rangeMax = currentSize.max + 1;
        } else {
          // Calculate midpoint between this size's max and next size's min
          rangeMax = (currentSize.max + sortedSizes[i+1].min) / 2;
        }
        
        // Calculate distance from "M" for opacity
        // Closer to M = higher opacity
        const distanceFromM = Math.abs(sizeOrder.indexOf(currentSize.alphaSize) - sizeOrder.indexOf("M"));
        const maxDistance = Math.max(
          sizeOrder.indexOf("M"),
          sizeOrder.length - 1 - sizeOrder.indexOf("M")
        );
        const opacity = 1 - (distanceFromM / maxDistance) * 0.7; // Minimum opacity of 0.3
        
        finalRanges.push({
          alphaSize: currentSize.alphaSize,
          min: rangeMin,
          max: rangeMax,
          opacity: opacity
        });
      }
      
      sizeRanges = finalRanges;
      console.log("Size ranges:", sizeRanges);
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
      
      // Generate all percentile points but only mark specific ones as 'percentile' type
      allPercentiles.forEach(p => {
        points.push({
          id: `p${p}`,
          value: percentiles[p],
          percentile: p,
          // Only mark the specified percentiles as 'percentile' type for red color
          type: highlightPercentiles.includes(p) ? 'percentile' : 'standard'
        });
      });
      
      // Generate points between each known percentile to visualize the distribution
      // Calculate points proportionally to the percentile range
      const percentileRanges = [
        { start: 5, end: 10, range: 5 },      // 5 percentile points (5th to 10th)
        { start: 10, end: 25, range: 15 },    // 15 percentile points (10th to 25th)
        { start: 25, end: 50, range: 25 },    // 25 percentile points (25th to 50th)
        { start: 50, end: 75, range: 25 },    // 25 percentile points (50th to 75th)
        { start: 75, end: 90, range: 15 },    // 15 percentile points (75th to 90th)
        { start: 90, end: 95, range: 5 }      // 5 percentile points (90th to 95th)
      ];
      
      // Total percentile range covered by all segments
      const totalRange = percentileRanges.reduce((sum, segment) => sum + segment.range, 0); // 90 percentile points
      
      // We need to distribute 85 points (100 total - 7 known percentiles - 8 extra points outside the range)
      const totalPointsToDistribute = 85;
      
      // Calculate points for each segment proportionally to its percentile range
      const segments = percentileRanges.map(segment => {
        const proportionalCount = Math.round((segment.range / totalRange) * totalPointsToDistribute);
        return {
          start: segment.start,
          end: segment.end,
          count: proportionalCount
        };
      });
      
      // Add exactly 4 points to the left of the 5th percentile
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
      
      // Add exactly 4 points to the right of the 95th percentile
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
      
      // Fill in the points between known percentiles
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
      
      // Calculate axis range based on actual values with a small padding
      const allValues = points.map(p => p.value);
      const min = Math.min(d3.min(allValues), 24); // Ensure minimum is no lower than 24
      const max = d3.max(allValues);
      const padding = (max - min) * 0.05;
      
      // Make sure the range encompasses all size ranges too
      let xMin = Math.min(min, d3.min(sizeRanges, d => d.min));
      let xMax = Math.max(max, d3.max(sizeRanges, d => d.max));
      
      return {
        points,
        xRange: [xMin - padding, xMax + padding]
      };
    }
    
    // Render the chart
    function renderChart() {
      if (!chartElement || !filteredData || sizeRanges.length === 0) return;
      
      // Generate data
      const { points, xRange } = generateDataPoints(filteredData);
      
      // Clear existing content
      d3.select(svg).selectAll('*').remove();
      
      // Calculate inner dimensions
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;
      
      // Create main chart group
      const chart = d3.select(svg)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);
      
      // Create x scale
      const xScale = d3.scaleLinear()
        .domain(xRange)
        .range([0, innerWidth]);
      
      // Draw the size range background bands
      const sizeBackground = chart.append('g')
        .attr('class', 'size-backgrounds');
      
      sizeRanges.forEach(sizeRange => {
        const x = xScale(sizeRange.min);
        const rectWidth = xScale(sizeRange.max) - x;
        
        // Create background rectangle for this size range
        sizeBackground.append('rect')
          .attr('x', x)
          .attr('y', 0)
          .attr('width', rectWidth)
          .attr('height', innerHeight)
          .attr('fill', colors.sizeBase)
          .attr('opacity', sizeRange.opacity)
          .attr('class', `size-band size-${sizeRange.alphaSize}`);
          
        // Add size label in the middle of the range
        sizeBackground.append('text')
          .attr('x', x + rectWidth / 2)
          .attr('y', innerHeight / 2)
          .attr('text-anchor', 'middle')
          .attr('dominant-baseline', 'middle')
          .attr('font-size', '24px')
          .attr('font-weight', 'bold')
          .attr('fill', 'rgba(0,0,0,0.15)')
          .attr('pointer-events', 'none')
          .text(sizeRange.alphaSize);
      });
      
      // Add metadata
      const metadataText = `${filteredData.yearRange}, Age: ${filteredData.age}, Race: ${filteredData.race}`;
      chart.append('text')
        .attr('class', 'metadata')
        .attr('x', innerWidth / 2)
        .attr('y', -25)
        .attr('text-anchor', 'middle')
        .style('font-size', '14px')
        .text(metadataText);
      
      // Add title
      chart.append('text')
        .attr('class', 'chart-title')
        .attr('x', innerWidth / 2)
        .attr('y', -45)
        .attr('text-anchor', 'middle')
        .style('font-size', '18px')
        .style('font-weight', 'bold')
        .text('Waistline Distribution & Clothing Sizes');
      
      // Add x-axis
      chart.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0, ${innerHeight})`)
        .call(d3.axisBottom(xScale))
        .call(g => g.select('.domain').attr('stroke-width', 2)); // Make axis line thicker
      
      // Add x-axis label
      chart.append('text')
        .attr('class', 'x-axis-label')
        .attr('x', innerWidth / 2)
        .attr('y', innerHeight + 40)
        .attr('text-anchor', 'middle')
        .style('font-size', '14px')
        .text('Waistline (in inches)');
      
      // Sort points for proper layering - lower y values should be drawn first (behind)
      // Then red percentile markers should be on top of everything else
      points.sort((a, b) => {
        // If one is a percentile and the other isn't, percentile comes last (on top)
        if (a.type === 'percentile' && b.type !== 'percentile') return 1;
        if (a.type !== 'percentile' && b.type === 'percentile') return -1;
        
        // Otherwise sort by y position (smaller y, which is higher on screen, comes first)
        return a.y - b.y;
      });
      
      // Set up force simulation
      const simulation = d3.forceSimulation(points)
        .force('x', d3.forceX(d => xScale(d.value)).strength(0.95))
        .force('y', d3.forceY(innerHeight / 2).strength(0.05))
        .force('collide', d3.forceCollide(d => d.type === 'percentile' ? 10 : 7))
        .stop();
      
      // Run simulation
      for (let i = 0; i < 150; ++i) simulation.tick();
      
      // Create dots (now rectangles)
      const dots = chart.append('g')
        .attr('class', 'dots')
        .selectAll('rect')
        .data(points)
        .join('rect')
        .attr('x', d => d.x - 5) // Center the rectangle horizontally (half of width)
        .attr('y', d => d.y - 12.5) // Center the rectangle vertically (half of height)
        .attr('width', 10) // Fixed width for all rectangles
        .attr('height', 25) // Fixed height for all rectangles
        .attr('fill', d => d.type === 'percentile' ? colors.percentileDot : colors.dots)
        .attr('stroke', '#fff')
        .attr('stroke-width', d => d.type === 'percentile' ? 1.5 : 0.5)
        .attr('opacity', d => d.type === 'percentile' ? 1 : 0.7);
      
      // Add tooltips
      dots.append('title')
        .text(d => {
          const baseText = d.type === 'percentile' ? 
            `${d.percentile}th Percentile: ${d.value.toFixed(1)}″` : 
            `Value: ${d.value.toFixed(1)}″${d.percentile ? `\nPercentile: ~${d.percentile}` : ''}`;
            
          // Find which size this measurement falls into
          const size = sizeRanges.find(range => d.value >= range.min && d.value <= range.max);
          return baseText + (size ? `\nSize: ${size.alphaSize}` : '');
        });
      
      // Add interactivity
      dots
        .on('mouseover', function() {
          d3.select(this)
            .attr('opacity', 1)
            .attr('stroke-width', d => d.type === 'percentile' ? 2 : 1);
        })
        .on('mouseout', function() {
          d3.select(this)
            .attr('opacity', d => d.type === 'percentile' ? 1 : 0.7)
            .attr('stroke-width', d => d.type === 'percentile' ? 1.5 : 0.5);
        });
    }
  </script>
  
  <main>
    <div class="chart-container">
      {#if ready && filteredData && sizeRanges.length > 0}
        <svg 
          bind:this={svg} 
          width={width}
          height={height}
          bind:this={chartElement}
        ></svg>
      {:else if !filteredData}
        <p class="error-message">No data found for the selected filters</p>
      {:else}
        <p>Loading chart...</p>
      {/if}
    </div>
  </main>
  
  <style>
    main {
      padding: 0;
      width: 100%;
      max-width: 100%;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 80vh;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    
    .chart-container {
      width: 95%;
      max-width: 1800px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #eee;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      background-color: white;
    }
    
    svg {
      display: block;
      width: 100%;
      height: auto;
      max-width: 100%;
    }
    
    .error-message {
      color: #d32f2f;
      text-align: center;
      font-weight: 500;
      padding: 2rem;
    }
    
    :global(.dots rect:hover) {
      cursor: pointer;
    }
    
    :global(.x-axis path),
    :global(.x-axis line) {
      stroke: #333;
    }
    
    :global(.x-axis text) {
      font-size: 12px;
      font-weight: 500;
    }
    
    :global(.size-band) {
      transition: opacity 0.2s;
    }
    
    :global(.size-band:hover) {
      opacity: 0.8 !important;
    }
  </style>