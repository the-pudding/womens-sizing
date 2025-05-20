// /utils/chart/index.js
// Main export file for chart utilities

// Import from local modules
import { 
    filterAndProcessWaistlineData,
    filterAndProcessASTMData
  } from './data-processing.js';
  
  import {
    generateDataPoints,
    formatTooltipText,
    findSizesForMeasurement,
    generateChartData
  } from './data-generation.js';
  
  import {
    renderChartElements,
    renderSizeBands,
    renderAxes,
    renderMetadata
  } from './chart-rendering.js';
  
  // Re-export everything (removing the duplicate default export)
  export { 
    // Data processing
    filterAndProcessWaistlineData,
    filterAndProcessASTMData,
  
    // Data generation
    generateDataPoints,
    formatTooltipText,
    findSizesForMeasurement,
    generateChartData,
  
    // Chart rendering
    renderChartElements,
    renderSizeBands,
    renderAxes,
    renderMetadata
  };