// /utils/chart/index.js
// Main export file for chart utilities

// Import from local modules
import { 
    filterAndProcessWaistlineData,
    filterAndProcessASTMData
  } from './data-processing';
  
  import {
    generateDataPoints,
    formatTooltipText,
    findSizesForMeasurement,
    generateChartData
  } from './data-generation';
  
  import {
    renderChartElements,
    renderSizeBands,
    renderAxes,
    renderMetadata
  } from './chart-rendering';
  
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