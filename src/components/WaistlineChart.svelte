<!-- 
  WaistlineChart.svelte - A specialized beeswarm chart for waistline data
-->

<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';
  import { generateDataFromPercentiles } from './utils/dataUtils';
  import { 
    createForceSimulation, 
    runSimulation, 
    drawPercentileLines,
    createAxes,
    createDots,
    createChartHeader
  } from './utils/chartUtils';
  
  // Component props
  let { 
    stats = null,
    width = 800,
    height = 400,
    radius = 6,
    colors = {
      dots: '#4682b4',
      percentileLines: '#999',
      medianLine: '#e41a1c',
      axes: '#333'
    },
    margin = { top: 40, right: 40, bottom: 60, left: 60 },
    title = 'Waistline Distribution',
    xAxisLabel = 'Waistline (cm)',
    xRange = [20, 50],
    overlapFactor = 0.1
  } = $props();
  
  // Internal state
  let svg;
  let chartElement = null;
  let generatedData = [];
  
  // Reactive update when stats change
  $effect(() => {
    if (stats) {
      generatedData = generateDataFromPercentiles(stats);
      if (chartElement) {
        renderBeeswarmChart();
      }
    }
  })
  
  // Initialize the chart after the component mounts
  onMount(() => {
    if (stats) {
      generatedData = generateDataFromPercentiles(stats);
      renderBeeswarmChart();
    }
  });

  /**
   * Main rendering function for the beeswarm chart
   */
  function renderBeeswarmChart() {
    if (!generatedData.length) return;
    
    // Clear any existing chart
    d3.select(svg).selectAll('*').remove();
    
    // Calculate the inner dimensions of the chart
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    // Create the main chart group with a translation to respect margins
    const chart = d3.select(svg)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
    
    // Create the x scale using the provided range
    const xScale = d3.scaleLinear()
      .domain(xRange)
      .range([0, innerWidth]);
    
    // Add chart title and metadata
    createChartHeader(chart, title, stats, innerWidth);
    
    // Add axes
    createAxes(chart, xScale, innerHeight, xAxisLabel, innerWidth);
    
    // Draw percentile lines
    drawPercentileLines(chart, stats, xScale, innerHeight, colors);
    
    // Set up force simulation for the beeswarm pattern
    const simulation = createForceSimulation(
      generatedData, 
      xScale, 
      radius, 
      overlapFactor, 
      innerHeight
    );
    
    // Run the simulation to position data points
    runSimulation(simulation);
    
    // Create the circles for each data point
    createDots(chart, generatedData, radius, colors.dots);
  }
</script>

<div class="beeswarm-container">
  <svg 
    bind:this={svg} 
    {width}
    {height}
    bind:this={chartElement}
  ></svg>
</div>

<style>
  .beeswarm-container {
    position: relative;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  
  svg {
    display: block;
    width: 100%;
    height: auto;
    max-width: 100%;
  }
  
  :global(.percentile-line) {
    opacity: 0.6;
  }
  
  :global(.percentile-line.p50) {
    opacity: 0.8;
  }
  
  :global(.dots circle:hover) {
    cursor: pointer;
  }
</style>