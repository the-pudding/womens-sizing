<!-- 
  WaistlineChart.svelte - A specialized beeswarm chart for waistline data
-->

<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';
  import { generateDataFromPercentiles } from './utils/dataUtils.js';
  import { 
    createForceSimulation, 
    runSimulation, 
    createAxes,
    createDots,
    createChartHeader
  } from './utils/chartUtils.js';
  
  // Component props
  let { 
    stats = null,
    width = 800,
    height = 300,
    radius = 6,
    colors = {
      dots: '#4682b4',
      percentileDot: '#e41a1c',
      axes: '#333'
    },
    margin = { top: 40, right: 40, bottom: 60, left: 60 },
    title = 'Waistline Distribution',
    xAxisLabel = 'Waistline (cm)',
    overlapFactor = 0.2
  } = $props();
  
  // Internal state
  let svg;
  let chartElement = $state(null);
  let generatedData = $state([]);
  let percentileMarkers = $state([]);
  let xRange = $state([20, 50]); // Will be dynamically adjusted
  
  // Reactive update when stats change
  $effect(() => {
    if (stats) {
      const generated = generateDataFromPercentiles(stats);
      generatedData = generated.points;
      percentileMarkers = generated.markers;
      xRange = generated.range;
      
      if (chartElement) {
        renderBeeswarmChart();
      }
    }
  });
  
  // Initialize the chart after the component mounts
  onMount(() => {
    if (stats) {
      const generated = generateDataFromPercentiles(stats);
      generatedData = generated.points;
      percentileMarkers = generated.markers;
      xRange = generated.range;
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
    
    // Add chart title and metadata
    createChartHeader(chart, title, stats, innerWidth);
    
    // Create the x scale using the dynamic range
    const xScale = d3.scaleLinear()
      .domain(xRange)
      .range([0, innerWidth]);
    
    // Add axes
    createAxes(chart, xScale, innerHeight, xAxisLabel, innerWidth);
    
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
    createDots(chart, generatedData, radius, colors);
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
  
  :global(.dots circle:hover) {
    cursor: pointer;
  }
</style>