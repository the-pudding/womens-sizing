 import * as d3 from 'd3';

 /**
  * Generates synthetic data points based on percentile distribution stats
  * @param {Object} stats - Object containing percentile information
  * @returns {Object} - Contains generated points, markers, and range
  */
 export function generateDataFromPercentiles(stats) {
   if (!stats) return { points: [], markers: [], range: [20, 50] };
   
   // Extract percentile values
   const percentiles = {
    //  0: parseFloat(stats.percent5 || "0") - 3, // Estimate for 0th percentile
     5: parseFloat(stats.percent5 || "0"),
     10: parseFloat(stats.percent10 || "0"),
     15: parseFloat(stats.percent15 || "0"),
     25: parseFloat(stats.percent25 || "0"),
     50: parseFloat(stats.percent50 || "0"),
     75: parseFloat(stats.percent75 || "0"),
     85: parseFloat(stats.percent85 || "0"),
     90: parseFloat(stats.percent90 || "0"),
     95: parseFloat(stats.percent95 || "0"),
    //  100: parseFloat(stats.percent95 || "0") + 3 // Estimate for 100th percentile
   };
   
   // Create markers for each percentile point
   const markers = Object.entries(percentiles).map(([percentile, value]) => ({
     percentile: parseInt(percentile),
     value: value,
     isKey: [5, 10, 25, 50, 75, 90, 95].includes(parseInt(percentile))
   }));
   
   // Create a quantile scale that maps random values to the distribution
   const quantileScale = d3.scaleQuantile()
     .domain([0, 0.05, 0.1, 0.15, 0.25, 0.5, 0.75, 0.85, 0.9, 0.95, 1])
     .range([
       percentiles[0],  // 0th percentile estimate
       percentiles[5],  // 5th percentile
       percentiles[10], // 10th percentile
       percentiles[15], // 15th percentile
       percentiles[25], // 25th percentile
       percentiles[50], // 50th percentile
       percentiles[75], // 75th percentile
       percentiles[85], // 85th percentile
       percentiles[90], // 90th percentile
       percentiles[95], // 95th percentile
       percentiles[100] // 100th percentile estimate
     ]);
   
   // Generate data points with better distribution
   const points = [];
   
   // Generate points with better distribution
   for (let i = 0; i < 15; i++) {
     // Points for 0-5th percentile (more points in this range)
     const randomLow = Math.random() * 0.05;
     points.push({
       id: `low-${i}`,
       value: quantileScale(randomLow),
       percentile: Math.round(randomLow * 100),
       type: 'standard'
     });
     
     // Points for 5-95th percentile (regular distribution)
     const randomMid = 0.05 + Math.random() * 0.9;
     points.push({
       id: `mid-${i}`,
       value: quantileScale(randomMid),
       percentile: Math.round(randomMid * 100),
       type: 'standard'
     });
     
     // Points for 95-100th percentile (more points in this range)
     const randomHigh = 0.95 + Math.random() * 0.05;
     points.push({
       id: `high-${i}`,
       value: quantileScale(randomHigh),
       percentile: Math.round(randomHigh * 100),
       type: 'standard'
     });
   }
   
   // Add specific points for each percentile of interest
   [5, 10, 25, 50, 75, 90, 95].forEach(p => {
     points.push({
       id: `p${p}`,
       value: percentiles[p],
       percentile: p,
       type: 'percentile'
     });
   });
   
   // Calculate the dynamic x-axis range
   const allValues = points.map(p => p.value);
   const minValue = d3.min(allValues) - 2;
   const maxValue = d3.max(allValues) + 2;
   const dynamicRange = [minValue, maxValue];
   
   return { 
     points: points, 
     markers: markers, 
     range: dynamicRange 
   };
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