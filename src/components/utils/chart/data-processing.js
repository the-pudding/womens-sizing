// data-processing.js
// Responsible for filtering and processing data

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
 * @param {Object} criteria - Filter criteria (year, sizeRange, sizeType, sizeBands)
 * @param {String} baseColor - Base color for size bands
 * @returns {Object} Object containing filtered and processed data
 */
export function filterAndProcessASTMData(ASTMsizes, criteria, baseColor) {
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
    ? processNumericSizeData(filteredData, criteria.sizeBands, baseColor)
    : processASTMSizeData(filteredData, criteria.sizeBands, baseColor);
  
  return {
    filter,
    filteredData,
    currentSizeRanges: sizeData.currentSizeRanges,
    allSizeData: sizeData.allSizeData
  };
}

/**
 * Process ASTM size data to determine size ranges
 * @param {Array} filteredASTM - Filtered ASTM data
 * @param {Array} includedSizes - Sizes to include
 * @param {String} baseColor - Base color for size bands
 * @returns {Object} Processed size data with ranges and styling
 */
function processASTMSizeData(filteredASTM, includedSizes, baseColor) {
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
  
  // Filter to include only the sizes specified (direct approach)
  const alphaSizeRanges = ranges;
  const currentSizeRanges = alphaSizeRanges.filter(range => 
    includedSizes.includes(range.size)
  );
  
  // Apply color gradient
  applySizeColorGradient(currentSizeRanges, baseColor);
  
  return {
    alphaSizeRanges,
    currentSizeRanges,
    allSizeData
  };
}

/**
 * Process numeric size data to determine size ranges
 * @param {Array} filteredASTM - Filtered ASTM data
 * @param {Array} includedSizes - Sizes to include
 * @param {String} baseColor - Base color for size bands
 * @returns {Object} Processed size data with ranges and styling
 */
function processNumericSizeData(filteredASTM, includedSizes, baseColor) {
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
  
  // Filter by included sizes
  const numericSizeRanges = ranges;
  const currentSizeRanges = numericSizeRanges.filter(range => 
    includedSizes.includes(range.size)
  );
  
  // Apply color gradient
  applySizeColorGradient(currentSizeRanges, baseColor);
  
  return {
    numericSizeRanges,
    currentSizeRanges,
    allSizeData
  };
}

/**
 * Apply color gradient to size ranges
 * @param {Array} ranges - Size ranges to style
 * @param {String} baseColor - Base color for gradient
 */
function applySizeColorGradient(ranges, baseColor) {
  if (!ranges || ranges.length === 0) return;
  
  const centerIndex = Math.floor(ranges.length / 2);
  const maxDistance = Math.max(centerIndex, ranges.length - 1 - centerIndex);
  
  ranges.forEach((range, index) => {
    const distance = Math.abs(index - centerIndex);
    const opacity = 1 - (distance / maxDistance) * 0.7;
    
    range.color = baseColor;
    range.opacity = opacity;
    range.isCenter = index === centerIndex;
  });
}