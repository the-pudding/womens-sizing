// chart-utilities.js

import * as d3 from 'd3';

/**
 * Filters ASTM data based on provided filters
 */
export function filterASTMData(ASTMsizes, filters) {
  return ASTMsizes.filter(item => 
    item.year === filters.year &&
    item.sizeRange === filters.sizeRange
  );
}

/**
 * Find sizes that match a given waist measurement
 */
export function findSizesForMeasurement(allSizeData, value) {
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

/**
 * Process ASTM size data to determine size ranges
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
 * Generate data points from percentile data
 */
export function generateDataPoints(data, currentSizeRanges) {
  const highlightPercentiles = [5, 25, 50, 75, 95];
  const allPercentiles = [5, 10, 25, 50, 75, 90, 95];
  const percentiles = {};
  
  allPercentiles.forEach(p => {
    percentiles[p] = parseFloat(data[`percent${p}`]);
  });
  
  const points = [];
  
  // Generate percentile points
  allPercentiles.forEach(p => {
    points.push({
      id: `p${p}`,
      value: percentiles[p],
      percentile: p,
      type: highlightPercentiles.includes(p) ? 'percentile' : 'standard'
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
 */
export function formatTooltipText(point, findSizesFunction) {
  const value = point.value;
  const valueStr = value.toString();
  
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
 * Create a layout force simulation for distributing points
 */
export function createForceSimulation(points, xScale, innerHeight, rectHeight, width) {
  return d3.forceSimulation(points)
    .force('x', d3.forceX(d => xScale(d.value)).strength(0.95))
    .force('y', d3.forceY(d => {
      return d.type === 'percentile' ? innerHeight * 0.5 : innerHeight * 0.4;
    }).strength(0.05))
    .force('collide', d3.forceCollide(d => {
      return d.type === 'percentile' ? rectHeight/3 : rectHeight/4;
    }))
    .stop();
}