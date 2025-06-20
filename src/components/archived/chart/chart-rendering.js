// chart-rendering.js
// Responsible for rendering chart elements

import * as d3 from 'd3';

/**
 * Renders all chart elements
 * @param {Object} params - Parameters for rendering
 */
export function renderChartElements({
  chart,
  chartData,
  metadata,
  renderFunctions,
  styleOptions = {}
}) {
  const { xScale, innerWidth, innerHeight, currentSizeRanges, avatarData, avatarWidth, avatarHeight } = chartData;
  const { filteredData, ASTMfilter } = metadata;
  
  // Apply style options
  const { bandColor, showBands = true } = styleOptions;
  
  // Create layer groups for proper rendering order
  const sizeBandsGroup = chart.append('g').attr('class', 'size-bands');
  const axesGroup = chart.append('g').attr('class', 'axes');
  const avatarsGroup = chart.append('g').attr('class', 'avatars');
  const metadataGroup = chart.append('g').attr('class', 'metadata');
  
  // Only render size bands if showBands is true
  if (showBands) {
    renderSizeBands(
      sizeBandsGroup, 
      currentSizeRanges, 
      xScale, 
      innerHeight, 
      { bandColor }
    );
  }
  
  // Render axes
  renderAxes(
    axesGroup, 
    xScale, 
    innerHeight, 
    innerWidth
  );
  
  // Render metadata
  renderMetadata(
    metadataGroup, 
    filteredData, 
    ASTMfilter, 
    innerWidth
  );
  
  // Render avatars if the render function is provided
  if (renderFunctions && renderFunctions.renderAvatar && avatarData) {
    // Render all avatars
    avatarData.forEach(avatar => {
      renderFunctions.renderAvatar(
        avatarsGroup, 
        avatar, 
        avatarWidth, 
        avatarHeight, 
        avatar.type === 'percentile'
      );
    });
  }
}

/**
 * Renders size bands in the chart
 * @param {Object} selection - D3 selection for size bands
 * @param {Array} currentSizeRanges - Size ranges to render
 * @param {Function} xScale - D3 scale function
 * @param {Number} innerHeight - Chart inner height
 * @param {Object} styleOptions - Style options including bandColor
 */
export function renderSizeBands(selection, currentSizeRanges, xScale, innerHeight, styleOptions = {}) {
  if (!currentSizeRanges || currentSizeRanges.length === 0) return;
  
  const { bandColor } = styleOptions;
  const isSolidColor = bandColor && bandColor !== 'gradient';
  
  currentSizeRanges.forEach(sizeRange => {
    const x = xScale(sizeRange.min);
    const rectWidth = xScale(sizeRange.max) - x;
    
    // Background band with conditional styling
    selection.append('rect')
      .attr('x', x)
      .attr('y', 0)
      .attr('width', rectWidth)
      .attr('height', innerHeight)
      .attr('fill', isSolidColor ? bandColor : sizeRange.color)
      .attr('opacity', isSolidColor ? 0.3 : sizeRange.opacity)
      .attr('class', `size-band size-${sizeRange.size} ${isSolidColor ? 'solid' : 'gradient'}`);
      
    // Size label
    selection.append('text')
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

/**
 * Renders axes for the chart
 * @param {Object} selection - D3 selection for axes
 * @param {Function} xScale - D3 scale function
 * @param {Number} innerHeight - Chart inner height
 * @param {Number} innerWidth - Chart inner width
 */
export function renderAxes(selection, xScale, innerHeight, innerWidth) {
  // Add x-axis with small ticks
  selection.append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0, ${innerHeight})`)
    .call(
      d3.axisBottom(xScale)
        .tickSize(15)
        .ticks(30)
        .tickFormat('')
    );
  
  // Add x-axis with major ticks and labels
  selection.append('g')
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

/**
 * Renders metadata above the chart
 * @param {Object} selection - D3 selection for metadata
 * @param {Object} filteredData - Filtered waistline data
 * @param {Object} ASTMfilter - ASTM filter
 * @param {Number} innerWidth - Chart inner width
 */
export function renderMetadata(selection, filteredData, ASTMfilter, innerWidth) {
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