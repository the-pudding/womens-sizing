
import * as d3 from 'd3';

/**
 * Filters and processes waistline data based on provided criteria
 * @param {Array} waistlinesData - The full waistlines dataset
 * @param {Object} criteria - Filter criteria (yearRange, race, age)
 * @returns {Object} Object containing filtered data
 */
export function filterAndProcessWaistlineData(waistlinesData, criteria) {
  const filteredData = waistlinesData.find(item => 
    item.yearRange === criteria.yearRange &&
    item.race === criteria.race &&
    item.age === criteria.age
  ) || null;
  
  return {
    filteredData
  };
}

/**
 * Filters and processes ASTM data based on provided criteria
 * @param {Array} ASTMsizes - The full ASTM dataset
 * @param {Object} criteria - Filter criteria (year, sizeRange, sizeType)
 * @param {Array} omittedSizes - Sizes to exclude
 * @param {String} baseColor - Base color for size bands
 * @returns {Object} Object containing filtered and processed data
 */
export function filterAndProcessASTMData(ASTMsizes, criteria, omittedSizes, baseColor) {
  // Get single filter object for reference/metadata
  const filter = ASTMsizes.find(item => 
    item.year === criteria.year &&
    item.sizeRange === criteria.sizeRange
  ) || null;
  
  if (!filter) return { filter: null, filteredData: [], currentSizeRanges: [], allSizeData: [] };
  
  const filteredData = ASTMsizes.filter(item => 
    item.year === criteria.year &&
    item.sizeRange === criteria.sizeRange
  );
  
  // Use the sizeType parameter to determine which type of sizes to process
  const sizeData = criteria.sizeType === 'numeric' 
    ? processNumericSizeData(filteredData, omittedSizes, baseColor)
    : processASTMSizeData(filteredData, omittedSizes, baseColor);
  
  return {
    filter,
    filteredData,
    currentSizeRanges: sizeData.currentSizeRanges,
    allSizeData: sizeData.allSizeData
  };
}

/**
 * Generates all data needed for chart rendering
 * @param {Object} params - Parameters for chart data generation
 * @returns {Object} Complete chart data ready for rendering
 */
export function generateChartData({
  filteredData,
  currentSizeRanges,
  allSizeData,
  width,
  height,
  margin,
  highlightedPercentiles = [5, 25, 50, 75, 95],
  findSizesCallback,
  avatarFunctions = {},
  avatarDimensions = {}
}) {
  // Use provided avatar functions or placeholders
  const determineSize = avatarFunctions.determineAvatarSize || determineAvatarSize;
  const generateAvatar = avatarFunctions.generateRandomAvatar || generateRandomAvatar;
  
  // Generate data points with highlighted percentiles
  const { points, xRange } = generateDataPoints(filteredData, currentSizeRanges, highlightedPercentiles);
  
  // Calculate dimensions
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  
  // Create scale
  const xScale = d3.scaleLinear()
    .domain(xRange)
    .range([0, innerWidth]);
  
  // Generate avatar data
  const avatarData = points.map(point => {
    const avatarSizeType = determineSize(point, allSizeData, findSizesCallback);
    
    return {
      ...point,
      avatarSizeType,
      avatar: generateAvatar(avatarSizeType)
    };
  });
  
  // Use responsive dimensions for collision detection if provided
  const avatarWidth = avatarDimensions.width || 80; // Default fallback
  const avatarHeight = avatarDimensions.height || 180; // Default fallback
  
  // Run simulation to position avatars with responsive dimensions
  const simulation = d3.forceSimulation(avatarData)
    .force('x', d3.forceX(d => xScale(d.value)).strength(0.95))
    .force('y', d3.forceY(d => {
      return d.type === 'percentile' ? innerHeight * 0.5 : innerHeight * 0.45;
    }).strength(0.05))
    .force('collide', d3.forceCollide(d => {
      // Use different collision radius based on percentile status
      if (d.type === 'percentile') {
        return avatarHeight / 3;
      }
      return avatarHeight / 4;
    }).strength(0.8));
  
  // Run simulation for a fixed number of iterations
  for (let i = 0; i < 300; ++i) {
    simulation.tick();
  }
  
  // Check if simulation added x,y coordinates properly
  if (!avatarData[0]?.hasOwnProperty('x') || !avatarData[0]?.hasOwnProperty('y')) {
    // Fallback: position avatars manually
    avatarData.forEach(avatar => {
      avatar.x = xScale(avatar.value);
      avatar.y = avatar.type === 'percentile' ? innerHeight * 0.5 : innerHeight * 0.45;
    });
  }
  
  // Ensure avatars stay within bounds
  avatarData.forEach(avatar => {
    avatar.x = Math.max(avatarWidth/2, Math.min(innerWidth - avatarWidth/2, avatar.x));
    avatar.y = Math.max(avatarHeight/2, Math.min(innerHeight - avatarHeight/2, avatar.y));
  });
  
  // Sort avatars by y-position
  avatarData.sort((a, b) => a.y - b.y);
  
  return {
    points,
    avatarData,
    xScale,
    innerWidth,
    innerHeight,
    xRange,
    currentSizeRanges,
    avatarWidth,
    avatarHeight
  };
}

/**
 * Renders all chart elements
 * @param {Object} params - Parameters for rendering
 */
export function renderChartElements({
  chart,
  chartData,
  metadata,
  renderFunctions,
  styleOptions = {},
  customRenderers = {}
}) {
  const { avatarData, xScale, innerWidth, innerHeight, currentSizeRanges, avatarWidth, avatarHeight } = chartData;
  const { filteredData, ASTMfilter } = metadata;
  
  // Apply style options
  const { bandColor } = styleOptions || {};
  
  // Use custom renderers or default renderers
  const renderSizeBandsFunc = customRenderers.renderSizeBands || 
    ((chart, ranges, scale, height, styleOpts) => renderSizeBands(chart, ranges, scale, height, styleOpts));
  
  const renderAxesFunc = customRenderers.renderAxes || 
    ((chart, scale, height, width) => renderAxes(chart, scale, height, width));
  
  const renderMetadataFunc = customRenderers.renderMetadata || 
    ((chart, filtered, filter, width) => renderMetadata(chart, filtered, filter, width));
  
  // Render size bands with style options
  renderSizeBandsFunc(chart, currentSizeRanges, xScale, innerHeight, {
    bandColor
  });
  
  // Render avatars
  if (renderFunctions && renderFunctions.renderAvatar) {
    const avatarsGroup = chart.append('g').attr('class', 'avatars');
    
    // Use responsive avatar dimensions if provided
    const avatarW = avatarWidth || 80; // Default fallback
    const avatarH = avatarHeight || 180; // Default fallback
    
    // Render all avatars in the sorted order
    avatarData.forEach(avatar => {
      renderFunctions.renderAvatar(
        avatarsGroup, 
        avatar, 
        avatarW, 
        avatarH, 
        avatar.type === 'percentile'
      );
    });
  }
  
  // Render axes
  renderAxesFunc(chart, xScale, innerHeight, innerWidth);
  
  // Render metadata
  renderMetadataFunc(chart, filteredData, ASTMfilter, innerWidth);
}

/**
 * Renders size bands in the chart
 * @param {Object} chart - D3 selection for the chart
 * @param {Array} currentSizeRanges - Size ranges to render
 * @param {Function} xScale - D3 scale function
 * @param {Number} innerHeight - Chart inner height
 * @param {Object} styleOptions - Style options including bandColor
 */
function renderSizeBands(chart, currentSizeRanges, xScale, innerHeight, styleOptions = {}) {
  if (!currentSizeRanges || currentSizeRanges.length === 0) return;
  
  const { bandColor } = styleOptions;
  const isSolidColor = bandColor && bandColor !== 'gradient';
  
  const sizeBackground = chart.append('g').attr('class', 'size-backgrounds');
  
  currentSizeRanges.forEach(sizeRange => {
    const x = xScale(sizeRange.min);
    const rectWidth = xScale(sizeRange.max) - x;
    
    // Background band with conditional styling
    sizeBackground.append('rect')
      .attr('x', x)
      .attr('y', 0)
      .attr('width', rectWidth)
      .attr('height', innerHeight)
      .attr('fill', isSolidColor ? bandColor : sizeRange.color)
      .attr('opacity', isSolidColor ? 0.3 : sizeRange.opacity)
      .attr('class', `size-band size-${sizeRange.size} ${isSolidColor ? 'solid' : 'gradient'}`);
      
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

/**
 * Renders axes for the chart
 * @param {Object} chart - D3 selection for the chart
 * @param {Function} xScale - D3 scale function
 * @param {Number} innerHeight - Chart inner height
 * @param {Number} innerWidth - Chart inner width
 */
function renderAxes(chart, xScale, innerHeight, innerWidth) {
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

/**
 * Renders metadata above the chart
 * @param {Object} chart - D3 selection for the chart
 * @param {Object} filteredData - Filtered waistline data
 * @param {Object} ASTMfilter - ASTM filter
 * @param {Number} innerWidth - Chart inner width
 */
function renderMetadata(chart, filteredData, ASTMfilter, innerWidth) {
  if (!filteredData || !ASTMfilter) return;
  
  const metadataText = `${filteredData.yearRange}, Age: ${filteredData.age}, Race: ${filteredData.race} | ASTM: ${ASTMfilter.year}, ${ASTMfilter.sizeRange}`;
  
  chart.append('text')
    .attr('class', 'metadata')
    .attr('x', innerWidth / 2)
    .attr('y', -25)
    .attr('text-anchor', 'middle')
    .style('font-size', '14px')
    .text(metadataText);
}

/**
 * Process ASTM size data to determine size ranges
 * @param {Array} filteredASTM - Filtered ASTM data
 * @param {Array} omittedSizes - Sizes to exclude
 * @param {String} baseColor - Base color for size bands
 * @returns {Object} Processed size data with ranges and styling
 */
export function processASTMSizeData(filteredASTM, omittedSizes, baseColor) {
  if (!filteredASTM || filteredASTM.length === 0) {
    return { 
      alphaSizeRanges: [],
      currentSizeRanges: [],
      allSizeData: []
    };
  }
  
  // Store data for tooltip lookups
  const allSizeData = filteredASTM.map(item => ({
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
  
  if (sortedSizes.length === 0) {
    return { 
      alphaSizeRanges: [],
      currentSizeRanges: [],
      allSizeData 
    };
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
  
  // Filter and style ranges
  const alphaSizeRanges = ranges;
  const currentSizeRanges = alphaSizeRanges.filter(range => 
    !omittedSizes.includes(range.size)
  );
  
  // Apply color gradient
  if (currentSizeRanges.length > 0) {
    const centerIndex = Math.floor(currentSizeRanges.length / 2);
    const maxDistance = Math.max(centerIndex, currentSizeRanges.length - 1 - centerIndex);
    
    currentSizeRanges.forEach((range, index) => {
      const distance = Math.abs(index - centerIndex);
      const opacity = 1 - (distance / maxDistance) * 0.7;
      
      range.color = baseColor;
      range.opacity = opacity;
      range.isCenter = index === centerIndex;
    });
  }
  
  return {
    alphaSizeRanges,
    currentSizeRanges,
    allSizeData
  };
}

/**
 * Process numeric size data to determine size ranges
 * @param {Array} filteredASTM - Filtered ASTM data
 * @param {Array} omittedSizes - Sizes to exclude
 * @param {String} baseColor - Base color for size bands
 * @returns {Object} Processed size data with ranges and styling
 */
function processNumericSizeData(filteredASTM, omittedSizes, baseColor) {
  if (!filteredASTM || filteredASTM.length === 0) {
    return { 
      numericSizeRanges: [],
      currentSizeRanges: [],
      allSizeData: []
    };
  }
  
  // Store data for tooltip lookups
  const allSizeData = filteredASTM.map(item => ({
    alphaSize: item.alphaSize,
    numericSize: item.size,
    waist: parseFloat(item.waist)
  }));
  
  // Group measurements by numeric size
  const sizeGroups = {};
  filteredASTM.forEach(item => {
    const numericSize = item.size;
    if (!numericSize) return;
    
    if (!sizeGroups[numericSize]) {
      sizeGroups[numericSize] = [];
    }
    sizeGroups[numericSize].push(parseFloat(item.waist));
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
  
  // Sort sizes numerically
  const numericSizes = Object.keys(sizeData)
    .map(size => ({
      size,
      numValue: parseInt(size.replace(/\D/g, ''), 10)
    }))
    .filter(item => !isNaN(item.numValue))
    .sort((a, b) => a.numValue - b.numValue)
    .map(item => item.size);
  
  const sortedSizes = numericSizes
    .map(size => sizeData[size])
    .filter(Boolean); // Remove undefined entries
  
  if (sortedSizes.length === 0) {
    return { 
      numericSizeRanges: [],
      currentSizeRanges: [],
      allSizeData 
    };
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
      sizeType: 'numeric',
      size: currentSize.size,
      min: rangeMin,
      max: rangeMax,
      exactMin: currentSize.min,
      exactMax: currentSize.max,
      index: i
    });
  }
  
  // Filter and style ranges
  const numericSizeRanges = ranges;
  const currentSizeRanges = numericSizeRanges.filter(range => 
    !omittedSizes.includes(range.size)
  );
  
  // Apply color gradient or solid color
  if (currentSizeRanges.length > 0) {
    const centerIndex = Math.floor(currentSizeRanges.length / 2);
    const maxDistance = Math.max(centerIndex, currentSizeRanges.length - 1 - centerIndex);
    
    currentSizeRanges.forEach((range, index) => {
      const distance = Math.abs(index - centerIndex);
      const opacity = 1 - (distance / maxDistance) * 0.7;
      
      range.color = baseColor;
      range.opacity = opacity;
      range.isCenter = index === centerIndex;
    });
  }
  
  return {
    numericSizeRanges,
    currentSizeRanges,
    allSizeData
  };
}

/**
 * Generate data points from percentile data
 * @param {Object} data - Waistline percentile data
 * @param {Array} currentSizeRanges - Processed size ranges
 * @param {Array} highlightedPercentiles - Which percentiles should be highlighted
 * @returns {Object} Points and x-axis range
 */
export function generateDataPoints(data, currentSizeRanges, highlightedPercentiles = [5, 25, 50, 75, 95]) {
  if (!data) return { points: [], xRange: [0, 100] };
  
  const allPercentiles = [5, 10, 25, 50, 75, 90, 95];
  const percentiles = {};
  
  allPercentiles.forEach(p => {
    percentiles[p] = parseFloat(data[`percent${p}`]);
  });
  
  const points = [];
  
  // Generate percentile points with the updated highlighting logic
  allPercentiles.forEach(p => {
    points.push({
      id: `p${p}`,
      value: percentiles[p],
      percentile: p,
      type: highlightedPercentiles.includes(p) ? 'percentile' : 'standard'
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
  const min = Math.min(Math.min(...allValues), 24);
  const max = Math.max(...allValues);
  const padding = (max - min) * 0.05;
  
  // Make sure range encompasses all size ranges
  let xMin = min;
  let xMax = max;
  
  if (currentSizeRanges.length > 0) {
    xMin = Math.min(xMin, Math.min(...currentSizeRanges.map(d => d.min)));
    xMax = Math.max(xMax, Math.max(...currentSizeRanges.map(d => d.max)));
  }
  
  return {
    points,
    xRange: [xMin - padding, xMax + padding]
  };
}

/**
 * Format tooltip text for a data point
 * @param {Object} point - Data point
 * @param {Function} findSizesFunction - Function to find matching sizes
 * @returns {String} Formatted tooltip text
 */
export function formatTooltipText(point, findSizesFunction) {
  const value = point.value;
  const valueStr = value.toFixed(1);
  
  // Base text differs for percentile vs standard points
  const baseText = point.type === 'percentile' ? 
    `${point.percentile}th Percentile: ${valueStr}″` : 
    `Value: ${valueStr}″${point.percentile ? `\nPercentile: ~${point.percentile}` : ''}`;
  
  // Find matching sizes
  const matchingSizes = findSizesFunction(value);
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
}

/**
 * Find sizes that match a given waist measurement
 * @param {Array} allSizeData - Processed size data array
 * @param {Number} value - Waist measurement to match
 * @returns {Object} Object containing matching alpha and numeric sizes
 */
export function findSizesForMeasurement(allSizeData, value) {
  // Check for sizes within +/- 1 inch
  const matchingSizes = allSizeData.filter(item => Math.abs(item.waist - value) <= 1);
  
  // Extract and deduplicate alpha and numeric sizes
  const alphaSizes = [...new Set(matchingSizes.map(item => item.alphaSize))].filter(Boolean);
  const numericSizes = [...new Set(matchingSizes.map(item => item.numericSize))].filter(Boolean);
  
  return {
    alphaSizes,
    numericSizes
  };
}

/**
 * Create a layout force simulation for distributing points
 * @param {Array} points - Data points to arrange
 * @param {Function} xScale - D3 scale function for x-axis
 * @param {Number} innerHeight - Chart inner height
 * @returns {Object} D3 force simulation
 */
export function createForceSimulation(points, xScale, innerHeight) {
  // Get avatar dimensions for collision radius calculation
  const getCollisionRadius = (d) => {
    if (d.type === 'percentile') {
      return 30; // Larger radius for percentile points
    }
    return 20; // Standard radius for regular points
  };
  
  return d3.forceSimulation(points)
    .force('x', d3.forceX(d => xScale(d.value)).strength(0.95))
    .force('y', d3.forceY(d => {
      return d.type === 'percentile' ? innerHeight * 0.5 : innerHeight * 0.45;
    }).strength(0.05))
    .force('collide', d3.forceCollide(getCollisionRadius).strength(0.8));
}

/**
 * Determine the appropriate avatar size based on measurement
 * This is a placeholder that will be replaced by the real implementation
 * from avatar-generator.js
 */
function determineAvatarSize(point, allSizeData, findSizesCallback) {
  // This function is imported from avatar-generator.js in the actual code
  // Here we just have a stub that returns a default value
  return 'SMALL';
}

/**
 * Generate a random avatar
 * This is a placeholder that will be replaced by the real implementation
 * from avatar-generator.js
 */
function generateRandomAvatar(sizeType) {
  // This function is imported from avatar-generator.js in the actual code
  // Here we just have a stub that returns a placeholder
  return {
    layers: [
      {
        path: `path/to/${sizeType.toLowerCase()}-avatar-1.svg`
      },
      {
        path: `path/to/${sizeType.toLowerCase()}-avatar-2.svg`
      }
    ]
  };
}// refactored-chart-utilities.js

import * as d3 from 'd3';

/**
 * Filters and processes waistline data based on provided criteria
 * @param {Array} waistlinesData - The full waistlines dataset
 * @param {Object} criteria - Filter criteria (yearRange, race, age)
 * @returns {Object} Object containing filtered data
 */
export function filterAndProcessWaistlineData(waistlinesData, criteria) {
  const filteredData = waistlinesData.find(item => 
    item.yearRange === criteria.yearRange &&
    item.race === criteria.race &&
    item.age === criteria.age
  ) || null;
  
  return {
    filteredData
  };
}

/**
 * Filters and processes ASTM data based on provided criteria
 * @param {Array} ASTMsizes - The full ASTM dataset
 * @param {Object} criteria - Filter criteria (year, sizeRange, sizeType)
 * @param {Array} omittedSizes - Sizes to exclude
 * @param {String} baseColor - Base color for size bands
 * @returns {Object} Object containing filtered and processed data
 */
export function filterAndProcessASTMData(ASTMsizes, criteria, omittedSizes, baseColor) {
  // Get single filter object for reference/metadata
  const filter = ASTMsizes.find(item => 
    item.year === criteria.year &&
    item.sizeRange === criteria.sizeRange
  ) || null;
  
  if (!filter) return { filter: null, filteredData: [], currentSizeRanges: [], allSizeData: [] };
  
  const filteredData = ASTMsizes.filter(item => 
    item.year === criteria.year &&
    item.sizeRange === criteria.sizeRange
  );
  
  // Use the sizeType parameter to determine which type of sizes to process
  const sizeData = criteria.sizeType === 'numeric' 
    ? processNumericSizeData(filteredData, omittedSizes, baseColor)
    : processASTMSizeData(filteredData, omittedSizes, baseColor);
  
  return {
    filter,
    filteredData,
    currentSizeRanges: sizeData.currentSizeRanges,
    allSizeData: sizeData.allSizeData
  };
}

/**
 * Generates all data needed for chart rendering
 * @param {Object} params - Parameters for chart data generation
 * @returns {Object} Complete chart data ready for rendering
 */
export function generateChartData({
  filteredData,
  currentSizeRanges,
  allSizeData,
  width,
  height,
  margin,
  highlightedPercentiles = [5, 25, 50, 75, 95],
  findSizesCallback,
  avatarFunctions = {},
  avatarDimensions = {}
}) {
  // Use provided avatar functions or placeholders
  const determineSize = avatarFunctions.determineAvatarSize || determineAvatarSize;
  const generateAvatar = avatarFunctions.generateRandomAvatar || generateRandomAvatar;
  
  // Generate data points with highlighted percentiles
  const { points, xRange } = generateDataPoints(filteredData, currentSizeRanges, highlightedPercentiles);
  
  // Calculate dimensions
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  
  // Create scale
  const xScale = d3.scaleLinear()
    .domain(xRange)
    .range([0, innerWidth]);
  
  // Generate avatar data
  const avatarData = points.map(point => {
    const avatarSizeType = determineSize(point, allSizeData, findSizesCallback);
    
    return {
      ...point,
      avatarSizeType,
      avatar: generateAvatar(avatarSizeType)
    };
  });
  
  // Use responsive dimensions for collision detection if provided
  const avatarWidth = avatarDimensions.width || 80; // Default fallback
  const avatarHeight = avatarDimensions.height || 180; // Default fallback
  
  // Run simulation to position avatars with responsive dimensions
  const simulation = d3.forceSimulation(avatarData)
    .force('x', d3.forceX(d => xScale(d.value)).strength(0.95))
    .force('y', d3.forceY(d => {
      return d.type === 'percentile' ? innerHeight * 0.5 : innerHeight * 0.45;
    }).strength(0.05))
    .force('collide', d3.forceCollide(d => {
      // Use different collision radius based on percentile status
      if (d.type === 'percentile') {
        return avatarHeight / 3;
      }
      return avatarHeight / 4;
    }).strength(0.8));
  
  // Run simulation for a fixed number of iterations
  for (let i = 0; i < 300; ++i) {
    simulation.tick();
  }
  
  // Check if simulation added x,y coordinates properly
  if (!avatarData[0]?.hasOwnProperty('x') || !avatarData[0]?.hasOwnProperty('y')) {
    // Fallback: position avatars manually
    avatarData.forEach(avatar => {
      avatar.x = xScale(avatar.value);
      avatar.y = avatar.type === 'percentile' ? innerHeight * 0.5 : innerHeight * 0.45;
    });
  }
  
  // Ensure avatars stay within bounds
  avatarData.forEach(avatar => {
    avatar.x = Math.max(avatarWidth/2, Math.min(innerWidth - avatarWidth/2, avatar.x));
    avatar.y = Math.max(avatarHeight/2, Math.min(innerHeight - avatarHeight/2, avatar.y));
  });
  
  // Sort avatars by y-position
  avatarData.sort((a, b) => a.y - b.y);
  
  return {
    points,
    avatarData,
    xScale,
    innerWidth,
    innerHeight,
    xRange,
    currentSizeRanges,
    avatarWidth,
    avatarHeight
  };
}

/**
 * Renders all chart elements
 * @param {Object} params - Parameters for rendering
 */
export function renderChartElements({
  chart,
  chartData,
  metadata,
  renderFunctions,
  styleOptions = {},
  customRenderers = {}
}) {
  const { avatarData, xScale, innerWidth, innerHeight, currentSizeRanges, avatarWidth, avatarHeight } = chartData;
  const { filteredData, ASTMfilter } = metadata;
  
  // Apply style options
  const { bandColor } = styleOptions || {};
  
  // Use custom renderers or default renderers
  const renderSizeBandsFunc = customRenderers.renderSizeBands || 
    ((chart, ranges, scale, height, styleOpts) => renderSizeBands(chart, ranges, scale, height, styleOpts));
  
  const renderAxesFunc = customRenderers.renderAxes || 
    ((chart, scale, height, width) => renderAxes(chart, scale, height, width));
  
  const renderMetadataFunc = customRenderers.renderMetadata || 
    ((chart, filtered, filter, width) => renderMetadata(chart, filtered, filter, width));
  
  // Render size bands with style options
  renderSizeBandsFunc(chart, currentSizeRanges, xScale, innerHeight, {
    bandColor
  });
  
  // Render avatars
  if (renderFunctions && renderFunctions.renderAvatar) {
    const avatarsGroup = chart.append('g').attr('class', 'avatars');
    
    // Use responsive avatar dimensions if provided
    const avatarW = avatarWidth || 80; // Default fallback
    const avatarH = avatarHeight || 180; // Default fallback
    
    // Render all avatars in the sorted order
    avatarData.forEach(avatar => {
      renderFunctions.renderAvatar(
        avatarsGroup, 
        avatar, 
        avatarW, 
        avatarH, 
        avatar.type === 'percentile'
      );
    });
  }
  
  // Render axes
  renderAxesFunc(chart, xScale, innerHeight, innerWidth);
  
  // Render metadata
  renderMetadataFunc(chart, filteredData, ASTMfilter, innerWidth);
}

/**
 * Renders size bands in the chart
 * @param {Object} chart - D3 selection for the chart
 * @param {Array} currentSizeRanges - Size ranges to render
 * @param {Function} xScale - D3 scale function
 * @param {Number} innerHeight - Chart inner height
 * @param {Object} styleOptions - Style options including bandColor
 */
function renderSizeBands(chart, currentSizeRanges, xScale, innerHeight, styleOptions = {}) {
  if (!currentSizeRanges || currentSizeRanges.length === 0) return;
  
  const { bandColor } = styleOptions;
  const isSolidColor = bandColor && bandColor !== 'gradient';
  
  const sizeBackground = chart.append('g').attr('class', 'size-backgrounds');
  
  currentSizeRanges.forEach(sizeRange => {
    const x = xScale(sizeRange.min);
    const rectWidth = xScale(sizeRange.max) - x;
    
    // Background band with conditional styling
    sizeBackground.append('rect')
      .attr('x', x)
      .attr('y', 0)
      .attr('width', rectWidth)
      .attr('height', innerHeight)
      .attr('fill', isSolidColor ? bandColor : sizeRange.color)
      .attr('opacity', isSolidColor ? 0.3 : sizeRange.opacity)
      .attr('class', `size-band size-${sizeRange.size} ${isSolidColor ? 'solid' : 'gradient'}`);
      
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

/**
 * Renders axes for the chart
 * @param {Object} chart - D3 selection for the chart
 * @param {Function} xScale - D3 scale function
 * @param {Number} innerHeight - Chart inner height
 * @param {Number} innerWidth - Chart inner width
 */
function renderAxes(chart, xScale, innerHeight, innerWidth) {
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

/**
 * Renders metadata above the chart
 * @param {Object} chart - D3 selection for the chart
 * @param {Object} filteredData - Filtered waistline data
 * @param {Object} ASTMfilter - ASTM filter
 * @param {Number} innerWidth - Chart inner width
 */
function renderMetadata(chart, filteredData, ASTMfilter, innerWidth) {
  if (!filteredData || !ASTMfilter) return;
  
  const metadataText = `${filteredData.yearRange}, Age: ${filteredData.age}, Race: ${filteredData.race} | ASTM: ${ASTMfilter.year}, ${ASTMfilter.sizeRange}`;
  
  chart.append('text')
    .attr('class', 'metadata')
    .attr('x', innerWidth / 2)
    .attr('y', -25)
    .attr('text-anchor', 'middle')
    .style('font-size', '14px')
    .text(metadataText);
}

/**
 * Process ASTM size data to determine size ranges
 * @param {Array} filteredASTM - Filtered ASTM data
 * @param {Array} omittedSizes - Sizes to exclude
 * @param {String} baseColor - Base color for size bands
 * @returns {Object} Processed size data with ranges and styling
 */
export function processASTMSizeData(filteredASTM, omittedSizes, baseColor) {
  if (!filteredASTM || filteredASTM.length === 0) {
    return { 
      alphaSizeRanges: [],
      currentSizeRanges: [],
      allSizeData: []
    };
  }
  
  // Store data for tooltip lookups
  const allSizeData = filteredASTM.map(item => ({
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
  
  if (sortedSizes.length === 0) {
    return { 
      alphaSizeRanges: [],
      currentSizeRanges: [],
      allSizeData 
    };
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
  
  // Filter and style ranges
  const alphaSizeRanges = ranges;
  const currentSizeRanges = alphaSizeRanges.filter(range => 
    !omittedSizes.includes(range.size)
  );
  
  // Apply color gradient
  if (currentSizeRanges.length > 0) {
    const centerIndex = Math.floor(currentSizeRanges.length / 2);
    const maxDistance = Math.max(centerIndex, currentSizeRanges.length - 1 - centerIndex);
    
    currentSizeRanges.forEach((range, index) => {
      const distance = Math.abs(index - centerIndex);
      const opacity = 1 - (distance / maxDistance) * 0.7;
      
      range.color = baseColor;
      range.opacity = opacity;
      range.isCenter = index === centerIndex;
    });
  }
  
  return {
    alphaSizeRanges,
    currentSizeRanges,
    allSizeData
  };
}

/**
 * Process numeric size data to determine size ranges
 * @param {Array} filteredASTM - Filtered ASTM data
 * @param {Array} omittedSizes - Sizes to exclude
 * @param {String} baseColor - Base color for size bands
 * @returns {Object} Processed size data with ranges and styling
 */
function processNumericSizeData(filteredASTM, omittedSizes, baseColor) {
  if (!filteredASTM || filteredASTM.length === 0) {
    return { 
      numericSizeRanges: [],
      currentSizeRanges: [],
      allSizeData: []
    };
  }
  
  // Store data for tooltip lookups
  const allSizeData = filteredASTM.map(item => ({
    alphaSize: item.alphaSize,
    numericSize: item.size,
    waist: parseFloat(item.waist)
  }));
  
  // Group measurements by numeric size
  const sizeGroups = {};
  filteredASTM.forEach(item => {
    const numericSize = item.size;
    if (!numericSize) return;
    
    if (!sizeGroups[numericSize]) {
      sizeGroups[numericSize] = [];
    }
    sizeGroups[numericSize].push(parseFloat(item.waist));
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
  
  // Sort sizes numerically
  const numericSizes = Object.keys(sizeData)
    .map(size => ({
      size,
      numValue: parseInt(size.replace(/\D/g, ''), 10)
    }))
    .filter(item => !isNaN(item.numValue))
    .sort((a, b) => a.numValue - b.numValue)
    .map(item => item.size);
  
  const sortedSizes = numericSizes
    .map(size => sizeData[size])
    .filter(Boolean); // Remove undefined entries
  
  if (sortedSizes.length === 0) {
    return { 
      numericSizeRanges: [],
      currentSizeRanges: [],
      allSizeData 
    };
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
      sizeType: 'numeric',
      size: currentSize.size,
      min: rangeMin,
      max: rangeMax,
      exactMin: currentSize.min,
      exactMax: currentSize.max,
      index: i
    });
  }
  
  // Filter and style ranges
  const numericSizeRanges = ranges;
  const currentSizeRanges = numericSizeRanges.filter(range => 
    !omittedSizes.includes(range.size)
  );
  
  // Apply color gradient or solid color
  if (currentSizeRanges.length > 0) {
    const centerIndex = Math.floor(currentSizeRanges.length / 2);
    const maxDistance = Math.max(centerIndex, currentSizeRanges.length - 1 - centerIndex);
    
    currentSizeRanges.forEach((range, index) => {
      const distance = Math.abs(index - centerIndex);
      const opacity = 1 - (distance / maxDistance) * 0.7;
      
      range.color = baseColor;
      range.opacity = opacity;
      range.isCenter = index === centerIndex;
    });
  }
  
  return {
    numericSizeRanges,
    currentSizeRanges,
    allSizeData
  };
}

/**
 * Generate data points from percentile data
 * @param {Object} data - Waistline percentile data
 * @param {Array} currentSizeRanges - Processed size ranges
 * @param {Array} highlightedPercentiles - Which percentiles should be highlighted
 * @returns {Object} Points and x-axis range
 */
export function generateDataPoints(data, currentSizeRanges, highlightedPercentiles = [5, 25, 50, 75, 95]) {
  if (!data) return { points: [], xRange: [0, 100] };
  
  const allPercentiles = [5, 10, 25, 50, 75, 90, 95];
  const percentiles = {};
  
  allPercentiles.forEach(p => {
    percentiles[p] = parseFloat(data[`percent${p}`]);
  });
  
  const points = [];
  
  // Generate percentile points with the updated highlighting logic
  allPercentiles.forEach(p => {
    points.push({
      id: `p${p}`,
      value: percentiles[p],
      percentile: p,
      type: highlightedPercentiles.includes(p) ? 'percentile' : 'standard'
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
  const min = Math.min(Math.min(...allValues), 24);
  const max = Math.max(...allValues);
  const padding = (max - min) * 0.05;
  
  // Make sure range encompasses all size ranges
  let xMin = min;
  let xMax = max;
  
  if (currentSizeRanges.length > 0) {
    xMin = Math.min(xMin, Math.min(...currentSizeRanges.map(d => d.min)));
    xMax = Math.max(xMax, Math.max(...currentSizeRanges.map(d => d.max)));
  }
  
  return {
    points,
    xRange: [xMin - padding, xMax + padding]
  };
}

/**
 * Format tooltip text for a data point
 * @param {Object} point - Data point
 * @param {Function} findSizesFunction - Function to find matching sizes
 * @returns {String} Formatted tooltip text
 */
export function formatTooltipText(point, findSizesFunction) {
  const value = point.value;
  const valueStr = value.toFixed(1);
  
  // Base text differs for percentile vs standard points
  const baseText = point.type === 'percentile' ? 
    `${point.percentile}th Percentile: ${valueStr}″` : 
    `Value: ${valueStr}″${point.percentile ? `\nPercentile: ~${point.percentile}` : ''}`;
  
  // Find matching sizes
  const matchingSizes = findSizesFunction(value);
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
}

/**
 * Find sizes that match a given waist measurement
 * @param {Array} allSizeData - Processed size data array
 * @param {Number} value - Waist measurement to match
 * @returns {Object} Object containing matching alpha and numeric sizes
 */
export function findSizesForMeasurement(allSizeData, value) {
  // Check for sizes within +/- 1 inch
  const matchingSizes = allSizeData.filter(item => Math.abs(item.waist - value) <= 1);
  
  // Extract and deduplicate alpha and numeric sizes
  const alphaSizes = [...new Set(matchingSizes.map(item => item.alphaSize))].filter(Boolean);
  const numericSizes = [...new Set(matchingSizes.map(item => item.numericSize))].filter(Boolean);
  
  return {
    alphaSizes,
    numericSizes
  };
}

/**
 * Create a layout force simulation for distributing points
 * @param {Array} points - Data points to arrange
 * @param {Function} xScale - D3 scale function for x-axis
 * @param {Number} innerHeight - Chart inner height
 * @returns {Object} D3 force simulation
 */
export function createForceSimulation(points, xScale, innerHeight) {
  // Get avatar dimensions for collision radius calculation
  const getCollisionRadius = (d) => {
    if (d.type === 'percentile') {
      return 30; // Larger radius for percentile points
    }
    return 20; // Standard radius for regular points
  };
  
  return d3.forceSimulation(points)
    .force('x', d3.forceX(d => xScale(d.value)).strength(0.95))
    .force('y', d3.forceY(d => {
      return d.type === 'percentile' ? innerHeight * 0.5 : innerHeight * 0.45;
    }).strength(0.05))
    .force('collide', d3.forceCollide(getCollisionRadius).strength(0.8));
}

/**
 * Creates a single unified function for all chart-related operations
 * @param {Object} config - Chart configuration
 * @returns {Object} Object containing chart rendering methods
 */
export function createChartController(config) {
  return {
    updateData: function(waistlineData, astmData, filters) {
      // Filter and process data in one step
      const waistlineResults = filterAndProcessWaistlineData(
        waistlineData,
        filters.waistline
      );
      
      // Process size bands settings
      let sizesToInclude = filters.sizeBands ? filters.sizeBands.split(',').map(s => s.trim()) : ["S", "M", "L"];
      const allPossibleSizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL"];
      const omittedSizes = allPossibleSizes.filter(size => !sizesToInclude.includes(size));
      
      const astmResults = filterAndProcessASTMData(
        astmData,
        {
          year: filters.astm.year,
          sizeRange: filters.astm.sizeRange,
          sizeType: filters.sizeType || 'alpha'
        },
        omittedSizes,
        filters.bandColor === "gradient" ? config.colors.sizeBandBase : filters.bandColor
      );
      
      return {
        waistline: waistlineResults,
        astm: astmResults
      };
    },
    
    renderChart: function(svg, data, options = {}) {
      // Skip if necessary data is missing
      if (!data.waistline.filteredData || !data.astm.filter) return null;
      
      // Parse percentiles to highlight if specified
      let highlightedPercentiles = [5, 25, 50, 75, 95]; // Default
      if (options.percentileHighlight) {
        highlightedPercentiles = options.percentileHighlight.split(',').map(p => parseInt(p.trim(), 10));
      }
      
      const chartData = generateChartData({
        filteredData: data.waistline.filteredData,
        currentSizeRanges: data.astm.currentSizeRanges,
        allSizeData: data.astm.allSizeData,
        width: config.width,
        height: config.height,
        margin: config.margin,
        highlightedPercentiles,
        findSizesCallback: (value) => findSizesForMeasurement(data.astm.allSizeData, value),
        avatarFunctions: options.avatarFunctions || {},
        avatarDimensions: options.avatarDimensions || {}
      });
      
      // Clear existing content
      d3.select(svg).selectAll('*').remove();
      
      // Set SVG dimensions
      d3.select(svg)
        .attr('width', config.width)
        .attr('height', config.height);
      
      // Create main chart group
      const chart = d3.select(svg)
        .append('g')
        .attr('transform', `translate(${config.margin.left}, ${config.margin.top})`);
      
      // Render all chart elements
      renderChartElements({
        chart,
        chartData,
        metadata: {
          filteredData: data.waistline.filteredData,
          ASTMfilter: data.astm.filter
        },
        renderFunctions: options.renderFunctions || {},
        styleOptions: {
          avatarStyle: options.avatarStyle,
          avatarDisplay: options.avatarDisplay,
          percentileStyle: options.percentileStyle,
          bandColor: options.bandColor
        }
      });
      
      return chartData;
    },
    
    updateFilters: function(newFilters) {
      // Validates and processes filter changes
      let processedFilters = { ...newFilters };
      
      // Process size bands if specified
      if (newFilters.sizeBands) {
        if (typeof newFilters.sizeBands === 'string') {
          processedFilters.sizeBands = newFilters.sizeBands;
        } else if (Array.isArray(newFilters.sizeBands)) {
          processedFilters.sizeBands = newFilters.sizeBands.join(',');
        }
      }
      
      // Process percentile highlights if specified
      if (newFilters.percentileHighlight) {
        if (typeof newFilters.percentileHighlight === 'string') {
          processedFilters.percentileHighlight = newFilters.percentileHighlight;
        } else if (Array.isArray(newFilters.percentileHighlight)) {
          processedFilters.percentileHighlight = newFilters.percentileHighlight.join(',');
        }
      }
      
      return processedFilters;
    }
  }