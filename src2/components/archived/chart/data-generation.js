// data-generation.js
// Responsible for generating data points and processing measurements

import * as d3 from 'd3';

/**
 * Generate data points from percentile data
 * @param {Object} data - Waistline percentile data
 * @param {Array} currentSizeRanges - Processed size ranges
 * @param {Array} highlightedPercentiles - Which percentiles should be highlighted
 * @returns {Object} Points and x-axis range
 */
export function generateDataPoints(data, currentSizeRanges, highlightedPercentiles = [5, 25, 50, 75, 95]) {
  if (!data) return { points: [], xRange: [20, 50] }; // Return fixed range even with no data
  
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
  
  // Always return fixed x-axis range [20, 50] regardless of data values
  return {
    points,
    xRange: [20, 50]
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
  avatarDimensions = {},
  avatarCache = new Map(),
  dataKey = "" // Optional data key for avatar ID generation
}) {
  // Use provided avatar functions
  const determineSize = avatarFunctions.determineAvatarSize;
  const generateAvatar = avatarFunctions.generateRandomAvatar;
  
  if (!determineSize || !generateAvatar) {
    console.error('Missing required avatar generation functions');
    return null;
  }
  
  // Generate data points with highlighted percentiles
  const { points, xRange } = generateDataPoints(filteredData, currentSizeRanges, highlightedPercentiles);
  
  // Calculate dimensions
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  
  // Create scale
  const xScale = d3.scaleLinear()
    .domain(xRange)
    .range([0, innerWidth]);
  
  // Generate avatar data with caching and demographic key
  const avatarData = points.map(point => {
    const avatarSizeType = determineSize(point, allSizeData, findSizesCallback);
    
    // Create a unique ID for this avatar to use as cache key
    // Include the dataKey to ensure avatars are regenerated when data changes
    const avatarId = dataKey 
      ? `avatar-${dataKey}-${point.id}-${avatarSizeType}`
      : `avatar-${point.id}-${avatarSizeType}`;
    
    // Simple caching based on avatar ID
    let avatar;
    if (avatarCache.has(avatarId)) {
      avatar = avatarCache.get(avatarId);
    } else {
      avatar = generateAvatar(avatarSizeType);
      avatarCache.set(avatarId, avatar);
    }
    
    return {
      ...point,
      avatarSizeType,
      avatar,
      id: avatarId // Use the ID for future reference
    };
  });
  
  // Use responsive dimensions for collision detection
  const avatarWidth = avatarDimensions.width || 80;
  const avatarHeight = avatarDimensions.height || 180;
  
  // Run simulation to position avatars
  runForceSimulation(avatarData, xScale, innerWidth, innerHeight, avatarWidth, avatarHeight);
  
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
 * Run force simulation to position avatars
 * @param {Array} avatarData - Avatar data to position
 * @param {Function} xScale - D3 scale function 
 * @param {Number} innerWidth - Chart inner width
 * @param {Number} innerHeight - Chart inner height
 * @param {Number} avatarWidth - Avatar width
 * @param {Number} avatarHeight - Avatar height
 */
function runForceSimulation(avatarData, xScale, innerWidth, innerHeight, avatarWidth, avatarHeight) {
  // Create a simulation that positions nodes along the x-axis according to their value
  // and applies a collision force to prevent overlap
  const simulation = d3.forceSimulation(avatarData)
    // X force - position based on the waist measurement value
    .force('x', d3.forceX(d => xScale(d.value)).strength(0.95))
    // Y force - slightly different for percentile vs standard points
    .force('y', d3.forceY(d => {
      return d.type === 'percentile' ? innerHeight * 0.5 : innerHeight * 0.45;
    }).strength(0.05))
    // Collision detection - prevent avatars from overlapping
    .force('collide', d3.forceCollide(d => {
      // Use different collision radius based on percentile status
      return d.type === 'percentile' ? avatarHeight / 3 : avatarHeight / 4;
    }).strength(0.8));
  
  // Run simulation for a fixed number of iterations to ensure convergence
  for (let i = 0; i < 300; ++i) {
    simulation.tick();
  }
  
  // Check if simulation correctly added x,y coordinates
  if (!avatarData[0]?.hasOwnProperty('x') || !avatarData[0]?.hasOwnProperty('y')) {
    // Fallback: position avatars manually
    avatarData.forEach(avatar => {
      avatar.x = xScale(avatar.value);
      avatar.y = avatar.type === 'percentile' ? innerHeight * 0.5 : innerHeight * 0.45;
    });
  }
  
  // Ensure avatars stay within bounds
  avatarData.forEach(avatar => {
    // Fix: Use innerWidth instead of just width for the upper bound constraint
    avatar.x = Math.max(avatarWidth/2, Math.min(innerWidth - avatarWidth/2, avatar.x));
    avatar.y = Math.max(avatarHeight/2, Math.min(innerHeight - avatarHeight/2, avatar.y));
  });
  
  // Sort avatars by y-position for proper layering
  avatarData.sort((a, b) => a.y - b.y);
}