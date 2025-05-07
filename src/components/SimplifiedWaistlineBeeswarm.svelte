<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';    
    import waistlinesData from '../data/waistlines.json';
    

    const filterCriteria = {
      yearRange: "2015-2018",
      race: "all",
      age: "20 and over"
    };
    
    // Chart configuration
    let width = 1000;
    let height = 800;
    let margin = { top: 40, right: 40, bottom: 60, left: 40 };
    let colors = {
      dots: '#4682b4',
      percentileDot: '#e41a1c'
    };
    
    // Internal state
    let svg;
    let chartElement = $state(null);
    let ready = $state(false);
    let filteredData = $state(null);
    
    // Initialize on mount
    onMount(() => {
      ready = true;
      
      filteredData = waistlinesData.find(item => 
            item.yearRange === filterCriteria.yearRange &&
            item.race === filterCriteria.race &&
            item.age === filterCriteria.age
            );

      // Wait for next tick to ensure DOM is ready
      setTimeout(() => {
        if (chartElement) {
          renderChart();
        }
      }, 0);
    });
    
    function generateDataPoints() {
      const highlightPercentiles = [5, 25, 50, 75, 95];
      const allPercentiles = [5, 10, 25, 50, 75, 90, 95];
      const percentiles = {};
      
      allPercentiles.forEach(p => {
        percentiles[p] = parseFloat(filteredData[`percent${p}`]);
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
      // Distribute a total of ~85 points between segments based on their size
      const segments = [
        { start: 5, end: 10, count: 12 },      // 5th to 10th
        { start: 10, end: 25, count: 18 },     // 10th to 25th
        { start: 25, end: 50, count: 24 },     // 25th to 50th
        { start: 50, end: 75, count: 24 },     // 50th to 75th
        { start: 75, end: 90, count: 18 },     // 75th to 90th
        { start: 90, end: 95, count: 12 }      // 90th to 95th
      ];
      
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
      const min = d3.min(allValues);
      const max = d3.max(allValues);
      const padding = (max - min) * 0.05;
      
      console.log(`Generated ${points.length} data points (${points.filter(p => p.type === 'percentile').length} percentile markers, ${points.filter(p => p.type === 'standard').length} standard points)`);
      
      return {
        points,
        xRange: [min - padding, max + padding]
      };
    }
    
    // Render the chart
    function renderChart() {
      if (!chartElement) return;
      
      // Generate data
      const { points, xRange } = generateDataPoints();
      
      // Clear existing content
      d3.select(svg).selectAll('*').remove();
      
      // Calculate inner dimensions
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;
      
      // Create main chart group
      const chart = d3.select(svg)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);
      
      // Add metadata
      const metadataText = `${filteredData.yearRange}, Age: ${filteredData.age}, Race: ${filteredData.race}`;
      chart.append('text')
        .attr('class', 'metadata')
        .attr('x', innerWidth / 2)
        .attr('y', -10)
        .attr('text-anchor', 'middle')
        .style('font-size', '12px')
        .text(metadataText);
      
      // Create x scale
      const xScale = d3.scaleLinear()
        .domain(xRange)
        .range([0, innerWidth]);
      
      // Add x-axis
      chart.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0, ${innerHeight})`)
        .call(d3.axisBottom(xScale));
      
      // Set up force simulation
      const simulation = d3.forceSimulation(points)
        .force('x', d3.forceX(d => xScale(d.value)).strength(0.95)) // Slightly reduced for more variance
        .force('y', d3.forceY(innerHeight / 2).strength(0.05)) // Much weaker y-force for more vertical spread
        .force('collide', d3.forceCollide(d => d.type === 'percentile' ? 10 : 7))
        .stop();
      
      // Run simulation for longer to get better distribution
      for (let i = 0; i < 150; ++i) simulation.tick();
      
      // Create dots
      const dots = chart.append('g')
        .attr('class', 'dots')
        .selectAll('circle')
        .data(points)
        .join('circle')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', d => d.type === 'percentile' ? 10 : 7)
        .attr('fill', d => d.type === 'percentile' ? colors.percentileDot : colors.dots)
        .attr('stroke', '#fff')
        .attr('stroke-width', d => d.type === 'percentile' ? 1.5 : 0.5)
        .attr('opacity', d => d.type === 'percentile' ? 1 : 0.7);
      
      // Add tooltips
      dots.append('title')
        .text(d => d.type === 'percentile' ? 
          `${d.percentile}th Percentile: ${d.value.toFixed(2)}` : 
          `Value: ${d.value.toFixed(2)}${d.percentile ? `\nPercentile: ~${d.percentile}` : ''}`);
      
      // Add interactivity
      dots
        .on('mouseover', function() {
          d3.select(this).attr('r', d => d.type === 'percentile' ? 14 : 10).attr('opacity', 1);
        })
        .on('mouseout', function() {
          d3.select(this).attr('r', d => d.type === 'percentile' ? 10 : 7).attr('opacity', d => d.type === 'percentile' ? 1 : 0.7);
        });
    }
  </script>
  
  <main>   
    <div class="chart-container">
      {#if ready}
        <svg 
          bind:this={svg} 
          width={width}
          height={height}
          bind:this={chartElement}
        ></svg>
      {:else}
        <p>Loading chart...</p>
      {/if}
    </div>

  </main>
  
  <style>
    main {
      padding: 1rem;
      max-width: 900px;
      margin: 0 auto;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    
    h1 {
      color: #333;
      text-align: center;
      margin-bottom: 2rem;
    }
    
    .chart-container {
      margin: 2rem 0;
      border: 1px solid #eee;
      border-radius: 8px;
      padding: 1rem;
    }
    
    svg {
      display: block;
      width: 100%;
      height: auto;
      max-width: 100%;
    }
    
    :global(.dots circle:hover) {
      cursor: pointer;
    }
  </style>