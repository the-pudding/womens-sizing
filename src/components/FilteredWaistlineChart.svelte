// First, modify your script part to dynamically resize the chart
<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
    import waistlinesData from '../data/waistlines.json';
    import ASTMsizes from "../data/ASTMsizes.json";
    
    let { 
      // Default values that will be overridden by the responsive logic
      width = 800,
      height = 600,
      margin = { top: 40, right: 20, bottom: 50, left: 20 },
      
      waistlineFilters = {
        yearRange: "2015-2018",
        race: "all",
        age: "20–29"
      },
  
      ASTMFilters = {
        year: "2021",
        sizeRange: "straight"
      },
      
      // Sizes to exclude in viz
      omittedSizes = ["XXL", "XL", "XS", "XXS"], 
      
      colors = {
        dots: '#4682b4',
        percentileDot: '#e41a1c',
        sizeBandBase: '#C2D932' // Base color for the center size
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
    let allSizeData = $state([]); // Store all size data for tooltip lookup
    
    // Add responsive state variables
    let containerWidth = $state(0);
    let containerHeight = $state(0);
    let resizeObserver = $state(null);
    
    // Initialize on mount
    onMount(() => { 
      filterASTMData();
      processASTMSizeData();
      setCurrentSizeRanges();
      ready = true;

      filteredData = waistlinesData.find(item => 
        item.yearRange === waistlineFilters.yearRange &&
        item.race === waistlineFilters.race &&
        item.age === waistlineFilters.age
      );
      
      // Set up resize observer to handle responsive behavior
      setupResizeObserver();
      
      // Initial render with a small delay to ensure DOM is ready
      setTimeout(() => {
        if (chartElement && chartContainer) {
          updateDimensions();
          renderChart();
        }
      }, 10);
      
      // Clean up observer on component unmount
      return () => {
        if (resizeObserver) {
          resizeObserver.disconnect();
        }
      };
    });
    
    // Setup resize observer to update dimensions when container size changes
    function setupResizeObserver() {
      if (typeof ResizeObserver !== 'undefined' && chartContainer) {
        resizeObserver = new ResizeObserver(entries => {
          for (let entry of entries) {
            if (entry.target === chartContainer) {
              updateDimensions();
              if (ready && filteredData) {
                renderChart();
              }
            }
          }
        });
        
        resizeObserver.observe(chartContainer);
      } else {
        // Fallback for browsers without ResizeObserver
        window.addEventListener('resize', () => {
          updateDimensions();
          if (ready && filteredData) {
            renderChart();
          }
        });
      }
    }
    
    // Update chart dimensions based on container size
    function updateDimensions() {
      if (!chartContainer) return;
      
      // Get the container's dimensions
      const containerRect = chartContainer.getBoundingClientRect();
      containerWidth = containerRect.width;
      containerHeight = window.innerHeight * 0.9; // 90% of viewport height
      
      // Update the chart dimensions
      width = containerWidth;
      height = containerHeight;
      
      // Update margins proportionally if needed
      margin = { 
        top: Math.max(20, Math.floor(height * 0.05)), 
        right: Math.max(10, Math.floor(width * 0.025)), 
        bottom: Math.max(30, Math.floor(height * 0.06)), 
        left: Math.max(10, Math.floor(width * 0.025))
      };
      
      // Update SVG dimensions
      if (svg) {
        d3.select(svg)
          .attr('width', width)
          .attr('height', height);
      }
    }
    
    // Filter ASTM data based on ASTMFilters
    function filterASTMData() {
      filteredASTM = ASTMsizes.filter(item => 
        item.year === ASTMFilters.year &&
        item.sizeRange === ASTMFilters.sizeRange
      );
    }
    
    function setCurrentSizeRanges() {
      currentSizeRanges = alphaSizeRanges.filter(range => 
        !omittedSizes.includes(range.size)
      );
    
      applyColorGradient();
    }
    
    // Apply color gradient to size ranges based on distance from center
    function applyColorGradient() {
      if (currentSizeRanges.length === 0) return;
      
      // Find the center index
      const centerIndex = Math.floor(currentSizeRanges.length / 2);
      
      // Calculate maximum distance from center
      const maxDistance = Math.max(centerIndex, currentSizeRanges.length - 1 - centerIndex);
      
      // Assign colors and opacities based on distance from center
      currentSizeRanges.forEach((range, index) => {
        const distance = Math.abs(index - centerIndex);
        const opacity = 1 - (distance / maxDistance) * 0.7; // Minimum opacity of 0.3
        
        range.color = colors.sizeBandBase;
        range.opacity = opacity;
        
        // Mark the center size
        range.isCenter = index === centerIndex;
      });
    }
    
    // Process the ASTM size data to determine size ranges for alpha sizes
    function processASTMSizeData() {
      if (filteredASTM.length === 0) {
        console.warn("No ASTM size data available after filtering");
        return;
      }
      
      // Store all individual size data for tooltip lookups
      allSizeData = filteredASTM.map(item => ({
        alphaSize: item.alphaSize,
        numericSize: item.size,
        waist: parseFloat(item.waist)
      }));
      
      // Process Alpha Sizes (XS, S, M, L, XL, etc.)
      processAlphaSizes(filteredASTM);
    }
    
    // Process alpha sizes from the data
    function processAlphaSizes(sizes) {
      const alphaSizeOrder = ["XXS", "XS", "S", "M", "L", "XL", "XXL"];
      
      // Group measurements by alpha size
      const sizeGroups = {};
      sizes.forEach(item => {
        const alphaSize = item.alphaSize;
        if (!alphaSize) return; // Skip items without alpha size
        
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
      
      // If no sorted sizes, exit early
      if (sortedSizes.length === 0) {
        console.warn("No alpha sizes found in filtered data");
        return;
      }
      
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
    
    // Find sizes for a measurement that fall within +/- 1 inch
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
      // Define specific percentiles to highlight and track
      const highlightPercentiles = [5, 25, 50, 75, 95];
      const allPercentiles = [5, 10, 25, 50, 75, 90, 95];
      
      // Calculate inner dimensions for planning
      const innerWidth = width - margin.left - margin.right;
      
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
      
      // Use a fixed number of points regardless of screen size
      // This ensures all data points are always visible
      const totalPointsToDistribute = 85; // Always use all 85 points
      
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
      
      // Draw the size range background bands
      if (currentSizeRanges.length > 0) {
        const sizeBackground = chart.append('g')
          .attr('class', 'size-backgrounds');
        
        currentSizeRanges.forEach(sizeRange => {
          const x = xScale(sizeRange.min);
          const rectWidth = xScale(sizeRange.max) - x;
          
          // Create background rectangle for this size range
          sizeBackground.append('rect')
            .attr('x', x)
            .attr('y', 0)
            .attr('width', rectWidth)
            .attr('height', innerHeight)
            .attr('fill', sizeRange.color)
            .attr('opacity', sizeRange.opacity)
            .attr('class', `size-band size-${sizeRange.size}`);
            
          // Add size label just above the x-axis
          sizeBackground.append('text')
            .attr('x', x + rectWidth / 2)
            .attr('y', innerHeight - 10) // Just above the x-axis
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'middle')
            .attr('font-size', `${Math.min(18, Math.max(12, Math.floor(rectWidth / 12)))}px`)
            .attr('font-weight', 'bold')
            .attr('fill', 'rgba(0,0,0,0.3)')
            .attr('pointer-events', 'none')
            .text(sizeRange.size);
        });
      } else {
        console.warn("No size ranges to display");
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
      
      // Add x-axis with small ticks but no labels
      chart.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0, ${innerHeight})`)
        .call(
          d3.axisBottom(xScale)
            .tickSize(15) // Small ticks
            .ticks(30)
            .tickFormat('') // No labels
        );

      // Add x-axis with major ticks and labels
      chart.append('g')
        .attr('class', 'x-axis-labels')
        .attr('transform', `translate(0, ${innerHeight})`)
        .call(
          d3.axisBottom(xScale)
            .tickSize(30)
            .ticks(Math.min(10, Math.floor(innerWidth / 100))) // Responsive number of ticks
        )
        .selectAll('text')
        .style('font-size', '12px')
        .attr('dy', '1em'); // Move labels down a bit for better visibility
      
      // Sort points for proper layering 
      // 1. Higher y values (lower on screen) should be drawn on top of lower y values
      // 2. Red percentile markers should be on top of everything else
      points.sort((a, b) => {
        // First, ensure all percentile points are drawn on top
        if (a.type === 'percentile' && b.type !== 'percentile') return 1;
        if (a.type !== 'percentile' && b.type === 'percentile') return -1;
        
        // Among the same type, sort by y-position (lower on screen comes on top)
        return a.y - b.y;
      });
      
      // Use responsive rectangle sizing that scales with screen width
      const baseRectWidth = 40;
      const baseRectHeight = 100;
      
      // Scale factor based on screen width (won't go below 50% of original size)
      const scaleFactor = Math.max(0.5, Math.min(1, width / 800));
      
      // Calculate scaled rectangle dimensions
      const rectWidth = baseRectWidth * scaleFactor;
      const rectHeight = baseRectHeight * scaleFactor;
      
      // Set up force simulation with responsive vertical distribution
      // Position percentile points lower in the swarm (higher y values)
      const simulation = d3.forceSimulation(points)
        .force('x', d3.forceX(d => xScale(d.value)).strength(0.95)) // Strong horizontal positioning
        .force('y', d3.forceY(d => {
          // Position percentile points toward the bottom of the swarm
          if (d.type === 'percentile') {
            return innerHeight * 0.5; // 70% down from the top
          } else {
            return innerHeight * 0.4; // 40% down from the top for regular points
          }
        }).strength(width < 600 ? 0.2 : 0.05)) // Adjust based on screen width
        .force('collide', d3.forceCollide(d => {
          // Use smaller collision radius as requested
          return d.type === 'percentile' ? rectHeight/3 : rectHeight/4;
        }))
        .stop();

      // Run simulation with sufficient iterations for distribution
      const iterations = width < 600 ? 200 : 300;
      for (let i = 0; i < iterations; ++i) simulation.tick();
      
      // AFTER simulation completes, sort ALL points strictly by y-position
      // Lower on screen (higher y values) drawn LAST so they appear on top
      points.sort((a, b) => a.y - b.y); // Lower y values drawn first (will be at the back)
      
      // Create two separate groups for better layering control
      // First create the background group for regular points
      const dotsBackground = chart.append('g')
        .attr('class', 'dots-background');
      
      // Then create the foreground group for percentile points
      const dotsForeground = chart.append('g')
        .attr('class', 'dots-foreground');
        
      // Create dots for regular points (in background)
      const regularDots = dotsBackground.selectAll('rect')
        .data(points.filter(d => d.type !== 'percentile'))
        .join('rect')
        .attr('x', d => d.x - rectWidth/2) // Center the rectangle horizontally
        .attr('y', d => d.y - rectHeight/2) // Center the rectangle vertically
        .attr('width', rectWidth)
        .attr('height', rectHeight)
        .attr('fill', colors.dots)
        .attr('stroke', '#fff')
        .attr('stroke-width', 0.8)
        .attr('opacity', 0.7);
      
      // Create dots for percentile points (in foreground)
      const percentileDots = dotsForeground.selectAll('rect')
        .data(points.filter(d => d.type === 'percentile'))
        .join('rect')
        .attr('x', d => d.x - rectWidth/2) // Center the rectangle horizontally
        .attr('y', d => d.y - rectHeight/2) // Center the rectangle vertically
        .attr('width', rectWidth)
        .attr('height', rectHeight)
        .attr('fill', colors.percentileDot)
        .attr('stroke', '#fff')
        .attr('stroke-width', 2)
        .attr('opacity', 1);
      
      // Add tooltips and interactivity to regular dots
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
      
      // Add interactivity for tooltips and hover effects to regular dots
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
      
      // Add interactivity for tooltips and hover effects to percentile dots
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
    <!-- Bind the chart container to track resizing -->
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
      height: 100vh; /* Full viewport height */
      display: flex;
      flex-direction: column;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    
    .chart-container {
      width: 90%; /* 90% of the parent width */
      height: 90vh; /* 90% of viewport height */
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
    
    /* Media queries for responsive adjustments */
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