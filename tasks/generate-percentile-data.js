import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as d3 from 'd3';

// Get the directory of the current script, no matter where you run the command from
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Construct the absolute path
const filePathASTM = path.join(__dirname, "../src/data/ASTMsizes.json");
const filePathWaistlines = path.join(__dirname, "../src/data/waistlines.json");

const fileContentASTM = fs.readFileSync(filePathASTM, "utf8");
const fileContentWaistlines = fs.readFileSync(filePathWaistlines, "utf8");

const ASTMsizes = JSON.parse(fileContentASTM);
const waistlines = JSON.parse(fileContentWaistlines);

console.log(waistlines.slice(0,20))

let ASTMFilters = { year: "2021", sizeRange: "straight" };
let waistlineFilters = { yearRange: "2021-2023", race: "all", age: "20 and over" };

let filteredASTM = filterASTMData(ASTMsizes, ASTMFilters);
function filterASTMData(ASTMsizes, ASTMFilters) {
    return ASTMsizes.filter(item => 
        item.year === ASTMFilters.year &&
        item.sizeRange === ASTMFilters.sizeRange
    );
}

let filteredData = waistlines.find(item =>
    item.yearRange === waistlineFilters.yearRange &&
    item.race === waistlineFilters.race &&
    item.age === waistlineFilters.age
);

let processedASTMData = processASTMSizeData(filteredASTM);
function processASTMSizeData(filteredASTM) {
    const sizeGroups = d3.groups(filteredASTM, d => d.alphaSize);

    const mappedSizes = sizeGroups.map((d, i) => {
        let min;
        let max;
        if (d[1].length == 1 && i == 0) {
        min = +d[1][0].waist - 1;
        max = (+d[1][0].waist + +d3.min(sizeGroups[i + 1][1], d => d.waist)) / 2;
        } else if (d[1].length == 1 && i == sizeGroups.length - 1) {
        min = (+d[1][0].waist + +d3.max(sizeGroups[i - 1][1], d => d.waist)) / 2;
        max = +d[1][0].waist + 1;
        } else {
        min = (+d[1][0].waist + +d3.max(sizeGroups[i - 1][1], d => d.waist)) / 2;
        max = (+d[1][1].waist + +d3.min(sizeGroups[i + 1][1], d => d.waist)) / 2;
        }

        return {
        ...d,
        size: d[0],
        min,
        max
        }
    });

    return {
        currentSizeRanges: mappedSizes
    }
} 

 let currentSizeRanges = processedASTMData.currentSizeRanges;

 let { points } = generateDataPoints(filteredData, currentSizeRanges);

function generateDataPoints(data) {
    // Return an empty array early if data is invalid.
    // if (!data || typeof data.percent5 !== 'number') {
    //   return { points: [] };
    // }

    const allPercentiles = [5, 10, 25, 50, 75, 90, 95];
    const highlightPercentile = 50;

    // Parse all percentiles and filter out invalid data.
    const percentilePoints = allPercentiles
      .map(p => {
        const value = data[`percent${p}`];
        const parsedValue = typeof value === 'number' || (typeof value === 'string' && !isNaN(parseFloat(value)))
          ? parseFloat(value)
          : null;
        return { p, value: parsedValue };
      })
      .filter(d => d.value !== null)
      .map(d => ({
        id: `p${d.p}`,
        yearRange: waistlineFilters.yearRange,
        age: waistlineFilters.age,
        value: d.value,
        percentile: d.p,
        type: highlightPercentile == d.p ? 'percentile' : 'standard'
      }));

    const percentiles = Object.fromEntries(percentilePoints.map(d => [d.percentile, d.value]));

    const percentileRanges = [
      { start: 5, end: 10, range: 5 },
      { start: 10, end: 25, range: 15 },
      { start: 25, end: 50, range: 25 },
      { start: 50, end: 75, range: 25 },
      { start: 75, end: 90, range: 15 },
      { start: 90, end: 95, range: 5 }
    ];
    
    const totalRange = percentileRanges.reduce((sum, s) => sum + s.range, 0);
    const totalPointsToDistribute = 85;

    // Generate points between percentiles and for the tails.
    const pointsInRanges = percentileRanges.flatMap(segment => {
      const count = Math.round((segment.range / totalRange) * totalPointsToDistribute);
      const startValue = percentiles[segment.start];
      const endValue = percentiles[segment.end];

      if (typeof startValue !== 'number' || typeof endValue !== 'number') return [];

      const points = [];
      const step = (endValue - startValue) / (count + 1);
      for (let i = 0; i < count; i++) {
        const value = startValue + step * (i + 1);
        const percentile = segment.start + (segment.end - segment.start) * (i + 1) / (count + 1);
        points.push({
          id: `segment-${segment.start}-${segment.end}-${i}`,
          yearRange: waistlineFilters.yearRange,
          age: waistlineFilters.age,
          value: value,
          percentile: Math.round(percentile),
          type: 'standard'
        });
      }
      return points;
    });

    // Handle the tails separately for clarity.
    const tailPoints = [];
    const createTailPoints = (p1, p2, isLeftTail) => {
      const p1Value = percentiles[p1];
      const p2Value = percentiles[p2];
      if (typeof p1Value === 'number' && typeof p2Value === 'number') {
        const segmentWidth = Math.abs(p2Value - p1Value);
        const shift = segmentWidth * 0.25;
        for (let i = 0; i < 4; i++) {
          const value = isLeftTail ? p1Value - (i + 1) * shift : p1Value + (i + 1) * shift;
          const percentile = isLeftTail ? i + 1 : 96 + i;
          tailPoints.push({
            id: `${isLeftTail ? 'low' : 'high'}-${i}`,
            yearRange: waistlineFilters.yearRange,
            age: waistlineFilters.age,
            value,
            percentile,
            type: 'standard'
          });
        }
      }
    };

    createTailPoints(5, 10, true);
    createTailPoints(95, 90, false);

    const allPoints = [...percentilePoints, ...pointsInRanges, ...tailPoints];

    allPoints.sort((a, b) => {
      // If 'a' is a percentile and 'b' is not, 'a' should come after 'b'
      if (a.type === 'percentile' && b.type !== 'percentile') {
          return 1;
      }
      // If 'b' is a percentile and 'a' is not, 'b' should come after 'a'
      if (a.type !== 'percentile' && b.type === 'percentile') {
          return -1;
      }
      // Otherwise, maintain the relative order
      return 0;
  });
    
    return {
      points: allPoints
    };
  }

// console.log({points})

const csvString = d3.csvFormat(points);
const csvFilePath = path.join(__dirname, "../src/data/generated-points.csv");
fs.writeFileSync(csvFilePath, csvString, "utf8");
console.log(`Successfully saved data to ${csvFilePath}`);