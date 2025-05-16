<!-- AvatarChart.svelte -->

<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';
  import waistlinesData from '../data/waistlines.json';
  import ASTMsizes from "../data/ASTMsizes.json";
  import { 
    filterASTMData, 
    processASTMSizeData, 
    findSizesForMeasurement,
    generateDataPoints,
    createForceSimulation,
    formatTooltipText
  } from './utils/chart-utilities.js';
  import { generateRandomAvatar, determineAvatarSize, AVATAR_SIZE } from './utils/avatar-generator.js';
  
  let { 
    width = 2100,
    height = 1300,
    margin = { top: 40, right: 10, bottom: 10, left: 10 },
    
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
  //   omittedSizes = [], 
    
    colors = {
      dots: '#4682b4',
      percentileDot: '#e41a1c',
      sizeBandBase: '#C2D932'
    }
  } = $props();
  
  let svg;
  let chartElement;
  let filteredData;
  let filteredASTM = [];
  let currentSizeRanges = [];
  let allSizeData = [];
  

  onMount(() => {
      //applies filters
    filteredASTM = filterASTMData(ASTMsizes, ASTMFilters);
    
    const sizeData = processASTMSizeData(filteredASTM, omittedSizes, colors.sizeBandBase);
    currentSizeRanges = sizeData.currentSizeRanges;
    allSizeData = sizeData.allSizeData;
    
    filteredData = waistlinesData.find(item => 
      item.yearRange === waistlineFilters.yearRange &&
      item.race === waistlineFilters.race &&
      item.age === waistlineFilters.age
    );
    
    renderChart();
  });
  
  // Render a single avatar with layers
  function renderAvatar(selection, avatar, avatarWidth, avatarHeight, isPercentile = false) {
    // Create a group for this avatar
    const avatarGroup = selection.append('g')
      .attr('class', isPercentile ? 'avatar percentile' : 'avatar')
      .attr('transform', `translate(${avatar.x - avatarWidth/2}, ${avatar.y - avatarHeight/2})`)
      // .style('opacity', isPercentile ? 1 : 0.9);
    
    // Calculate tooltip text
    const tooltipText = formatTooltipText(
      avatar, 
      value => findSizesForMeasurement(allSizeData, value)
    );
    
    // Add tooltip
    avatarGroup.append('title').text(tooltipText);
    
    // Render each layer of the avatar
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
  
  // Render the chart
  function renderChart() {
    if (!chartElement || !filteredData) return;
    
    // Generate data points using utility function
    const { points, xRange } = generateDataPoints(filteredData, currentSizeRanges);
    
    // Generate random avatars for each point
    const avatarData = points.map(point => {
      // Determine the appropriate avatar size type
      const avatarSizeType = determineAvatarSize(point, allSizeData, 
                             value => findSizesForMeasurement(allSizeData, value));
      
      return {
        ...point,
        avatarSizeType: avatarSizeType,
        avatar: generateRandomAvatar(avatarSizeType)
      };
    });
    
    // Clear any existing content
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
    
    // Fixed avatar sizing for desktop - three different sizes
    const smallAvatarWidth = 80;
    const smallAvatarHeight = 180;
    const midAvatarWidth = 100;  
    const midAvatarHeight = 160; 
    const largeAvatarWidth = 75;  
    const largeAvatarHeight = 160; 
    
    // Run simulation to position avatars - adjust collision radius based on avatar size
    const simulation = d3.forceSimulation(avatarData)
      .force('x', d3.forceX(d => xScale(d.value)).strength(0.95))
      .force('y', d3.forceY(d => {
        return d.type === 'percentile' ? innerHeight * 0.5 : innerHeight * 0.4;
      }).strength(0.05))
      .force('collide', d3.forceCollide(d => {
        // Use different collision radius based on avatar size
        let baseRadius;
        
        switch(d.avatarSizeType) {
          case AVATAR_SIZE.LARGE:
            baseRadius = largeAvatarHeight/4;
            break;
          case AVATAR_SIZE.MID:
            baseRadius = midAvatarHeight/4;
            break;
          case AVATAR_SIZE.SMALL:
          default:
            baseRadius = smallAvatarHeight/4;
            break;
        }
        
        return d.type === 'percentile' ? baseRadius * 1.3 : baseRadius;
      }))
      .stop();
    
    // Run simulation
    for (let i = 0; i < 300; ++i) simulation.tick();
    
    // Sort avatars by y-position (lower y values drawn first - will be at the back)
    avatarData.sort((a, b) => a.y - b.y);
    
    //Draw size range background bands
    if (currentSizeRanges.length > 0) {
      const sizeBackground = chart.append('g').attr('class', 'size-backgrounds');
      
      currentSizeRanges.forEach(sizeRange => {
        const x = xScale(sizeRange.min);
        const rectWidth = xScale(sizeRange.max) - x;
        
        // Background band
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
          .attr('font-size', '16px')
          .attr('font-weight', 'bold')
          .attr('fill', 'rgba(0,0,0,0.3)')
          .attr('pointer-events', 'none')
          .text(sizeRange.size);
      });
    }
    
    // Create regular avatars
    const avatarsGroup = chart.append('g').attr('class', 'avatars');
    
   // Render all avatars in the sorted order (rather than separating percentiles)
      avatarData.forEach(avatar => {
      // Use different dimensions based on avatar size type
      let avatarWidth, avatarHeight;
      
      switch(avatar.avatarSizeType) {
          case AVATAR_SIZE.LARGE:
          avatarWidth = largeAvatarWidth;
          avatarHeight = largeAvatarHeight;
          break;
          case AVATAR_SIZE.MID:
          avatarWidth = midAvatarWidth;
          avatarHeight = midAvatarHeight;
          break;
          case AVATAR_SIZE.SMALL:
          default:
          avatarWidth = smallAvatarWidth;
          avatarHeight = smallAvatarHeight;
          break;
      }
      
      renderAvatar(avatarsGroup, avatar, avatarWidth, avatarHeight, avatar.type === 'percentile');
      });
    
    // metadata above the chart 
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
          .ticks(10)
      )
      .selectAll('text')
      .style('font-size', '12px')
      .attr('dy', '1em');
  }
</script>

<main>
  <div class="chart-container">
    <svg 
      bind:this={svg} 
      width={width}
      height={height}
      bind:this={chartElement}
    ></svg>
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
</style>