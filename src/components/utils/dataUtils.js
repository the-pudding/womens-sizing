
 import * as d3 from 'd3';

 export function generateDataFromPercentiles(stats) {
   if (!stats) return [];
   
   // Extract percentile values
   const percentiles = {
     5: parseFloat(stats.percent5),
     10: parseFloat(stats.percent10),
     15: parseFloat(stats.percent15),
     25: parseFloat(stats.percent25),
     50: parseFloat(stats.percent50),
     75: parseFloat(stats.percent75),
     85: parseFloat(stats.percent85),
     90: parseFloat(stats.percent90),
     95: parseFloat(stats.percent95)
   };
   
   // Create a d3 quantile scale to map random values to the distribution
   const quantileScale = d3.scaleQuantile()
     .domain([0, 0.05, 0.1, 0.15, 0.25, 0.5, 0.75, 0.85, 0.9, 0.95, 1])
     .range([
       percentiles[5] - 2, // Estimate below 5th percentile
       percentiles[5],
       percentiles[10],
       percentiles[15],
       percentiles[25],
       percentiles[50],
       percentiles[75],
       percentiles[85],
       percentiles[90],
       percentiles[95],
       percentiles[95] + 2 // Estimate above 95th percentile
     ]);
   
   // Generate 100 data points following the percentile distribution
   return Array.from({ length: 100 }, (_, i) => {
     const random = Math.random(); // Random value 0-1
     return {
       id: i,
       value: quantileScale(random),
       percentile: Math.round(random * 100),
       // Add additional properties that will be useful for future implementations
       type: 'standard', // For future customization of dot type
       iconPath: null, // For future custom PNG implementation
       category: i % 4 // Example categorical variable for future filtering
     };
   });
 }
 
 /**
  * Filters waistline data based on demographic criteria
  * @param {Array} data - Array of waistline data objects
  * @param {Object} filters - Object with yearRange, race, and age filters
  * @returns {Object} - The filtered data object or null if not found
  */
 export function filterDataByDemographics(data, filters) {
   if (!data || !data.length) return null;
   
   const { yearRange, race, age } = filters;
   
   return data.find(d => 
     d.yearRange === yearRange && 
     d.race === race && 
     d.age === age
   ) || null;
 }
 
 /**
  * Extracts unique values for a given field from the dataset
  * @param {Array} data - Array of data objects
  * @param {string} field - Field to extract unique values from
  * @returns {Array} - Array of unique values, sorted if numeric
  */
 export function getUniqueValues(data, field) {
   if (!data || !data.length) return [];
   
   const values = [...new Set(data.map(d => d[field]))];
   
   // Sort numerically if the field is 'age'
   if (field === 'age') {
     return values.sort((a, b) => parseInt(a) - parseInt(b));
   }
   
   return values;
 }