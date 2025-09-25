// chart-controller.js
// Provides unified interface for chart operations

import { filterAndProcessWaistlineData, filterAndProcessASTMData } from './data-processing';
import { generateChartData } from './data-generation';
import { renderChartElements } from './chart-rendering';
import * as d3 from 'd3';

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
  };
}