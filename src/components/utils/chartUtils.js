/**
 * D3-specific utility functions for chart creation and manipulation
 */
 import * as d3 from 'd3';

 /**
  * Creates and configures a D3 force simulation for beeswarm layout
  * @param {Array} data - Data points to position
  * @param {Function} xScale - D3 scale function for x-axis
  * @param {number} radius - Radius of each point
  * @param {number} overlapFactor - How much overlap to allow (0-1)
  * @param {number} height - Height of the chart
  * @returns {Object} - Configured D3 force simulation
  */
 export function createForceSimulation(data, xScale, radius, overlapFactor, height) {
   // Calculate collision radius based on desired overlap
   const collisionRadius = radius * (1 - overlapFactor);
   
   // Create and configure the simulation
   const simulation = d3.forceSimulation(data)
     // Force all points to be at their x position based on the data value
     .force('x', d3.forceX(d => xScale(d.value)).strength(1))
     // Force points to be at vertical center with some randomness
     .force('y', d3.forceY(height / 2).strength(0.1))
     // Force to prevent circles from overlapping (adjusted for overlap factor)
     .force('collide', d3.forceCollide(collisionRadius))
     // Stop the simulation after setup
     .stop();
   
   return simulation;
 }
 
 /**
  * Runs the force simulation for a specified number of iterations
  * @param {Object} simulation - D3 force simulation
  * @param {number} iterations - Number of iterations to run
  */
 export function runSimulation(simulation, iterations = 120) {
   for (let i = 0; i < iterations; ++i) {
     simulation.tick();
   }
 }
 
 /**
  * Creates and appends axes to the chart
  * @param {Object} chart - D3 selection for the chart
  * @param {Function} xScale - D3 scale function for x-axis
  * @param {number} height - Height of the chart
  * @param {string} xAxisLabel - Label text for x-axis
  * @param {number} width - Width of the chart for positioning the label
  */
 export function createAxes(chart, xScale, height, xAxisLabel, width) {
   // Create the x-axis
   const xAxis = d3.axisBottom(xScale);
   
   // Add the x-axis to the chart
   chart.append('g')
     .attr('class', 'x-axis')
     .attr('transform', `translate(0, ${height})`)
     .call(xAxis);
   
   // Add x-axis label
   chart.append('text')
     .attr('class', 'x-axis-label')
     .attr('x', width / 2)
     .attr('y', height + 40)
     .attr('text-anchor', 'middle')
     .text(xAxisLabel);
 }
 
 /**
  * Creates interactive dots for the beeswarm chart
  * @param {Object} chart - D3 selection for the chart
  * @param {Array} data - Array of data points
  * @param {number} radius - Dot radius
  * @param {Object} colors - Colors for different dot types
  * @returns {Object} - D3 selection containing the dots
  */
 export function createDots(chart, data, radius, colors) {
   const dots = chart.append('g')
     .attr('class', 'dots')
     .selectAll('circle')
     .data(data)
     .join('circle')
     .attr('cx', d => d.x)
     .attr('cy', d => d.y)
     .attr('r', d => d.type === 'percentile' ? radius * 1.5 : radius)
     .attr('fill', d => d.type === 'percentile' ? colors.percentileDot : colors.dots)
     .attr('stroke', '#fff')
     .attr('stroke-width', d => d.type === 'percentile' ? 1.5 : 0.5)
     .attr('opacity', d => d.type === 'percentile' ? 1 : 0.7);
   
   // Add tooltips
   dots.append('title')
     .text(d => d.type === 'percentile' ? 
       `${d.percentile}th Percentile: ${d.value.toFixed(2)}` : 
       `Value: ${d.value.toFixed(2)}\nPercentile: ~${d.percentile}`);
   
   // Add event listeners for interactive features
   dots
     .on('mouseover', function(event, d) {
       d3.select(this)
         .attr('r', d.type === 'percentile' ? radius * 2 : radius * 1.5)
         .attr('opacity', 1);
     })
     .on('mouseout', function(event, d) {
       d3.select(this)
         .attr('r', d.type === 'percentile' ? radius * 1.5 : radius)
         .attr('opacity', d.type === 'percentile' ? 1 : 0.7);
     });
   
   return dots;
 }
 
 /**
  * Creates and positions the chart title and metadata
  * @param {Object} chart - D3 selection for the chart
  * @param {string} title - Chart title
  * @param {Object} stats - Statistics object with metadata
  * @param {number} width - Width of the chart for positioning
  */
 export function createChartHeader(chart, title, stats, width) {
   // Add chart title
   chart.append('text')
     .attr('class', 'chart-title')
     .attr('x', width / 2)
     .attr('y', -20)
     .attr('text-anchor', 'middle')
     .style('font-size', '16px')
     .style('font-weight', 'bold')
     .text(title);
   
   // Add metadata text if stats are provided
   if (stats) {
     const metadataText = `${stats.yearRange}, Age: ${stats.age}, Race: ${stats.race}, n=${stats.participants}`;
     chart.append('text')
       .attr('class', 'metadata')
       .attr('x', width / 2)
       .attr('y', -5)
       .attr('text-anchor', 'middle')
       .style('font-size', '12px')
       .text(metadataText);
   }
 }