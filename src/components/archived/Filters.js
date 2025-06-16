import waistlines from "$data/waistlines.json";
import ASTMsizes from "$data/ASTMsizes.json";
import * as d3 from "d3";
import { get } from "svelte/store";
import { ASTMFilters } from "./stores";

export function getFilteredWaistlineData(filters) {
    return waistlines.filter(d =>
        Object.keys(filters).every(key => !filters[key] || d[key] === filters[key])
    );
}

export function getFilteredASTMData(filters) {
    return ASTMsizes.filter(d =>
        (!filters.year || d.year.trim() === filters.year) &&
        (!filters.sizeRange || d.sizeRange.trim() === filters.sizeRange)
    );
}

//dropdown labels
export function getUniqueOptions(dataset, key) {
    return [...new Set(dataset.map(d => d[key]))].sort();
}

//this filter applies to chart w/ ASTM sizes on y-axis
export function findMatchingASTMSizes(waistlineData, ASTMData) {
    const selectedPercentiles = ["percent5", "percent25", "percent50", "percent75", "percent95"];

    const ASTMSizeCategories = [
        "00", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", 
        "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"
    ];

    return waistlineData.flatMap(d => {
        return Object.keys(d)
            .filter(key => selectedPercentiles.includes(key))
            
            //compares waistline circumference of cdc data to waist measurements of ASTM sizes within +/- 1 
            .map(key => {
                const waistValue = parseFloat(d[key]);
                const matches = ASTMData.filter(astm => 
                    Math.abs(parseFloat(astm.waist) - waistValue) <= 1
                );

                const sizes = matches.map(astm => astm.size).filter(s => ASTMSizeCategories.includes(s));

                if (sizes.length) {
                    return {
                        percentile: parseInt(key.replace("percent", "")), 
                        waist: waistValue,
                        sizes: sizes,
                        minSize: sizes[0], 
                        maxSize: sizes[sizes.length - 1]
                    };
                }
                return null;
            }).filter(Boolean);
    });
}


//color bands that highlight alpha sizes S/M/L...
export const sizeBackgroundColors = {
        "XXS": "#FFDDC1",
        "XS": "rgba(128, 0, 128, 0.15)",
        "S": "rgba(255, 105, 180, 0.15)",
        "M": "rgba(30, 144, 255, 0.15)",
        "L": "rgba(34, 139, 34, 0.15)",
        "XL": "rgba(10, 39, 94, 0.15)",
        "XXL": "rgba(255, 255, 0, 0.15)"
    };

    //this filter applies to chart w/ waist measurements on y-axis
    export function filterMatchingASTMSizes(waistlineData, ASTMData) {
        //hardcoded these selections for now
        const selectedPercentiles = ["percent5", "percent25", "percent50", "percent75", "percent95"];

        //This matches the ASTM size to any given CDC waistline measurement. it returns the corresponding size range and also extracts the waist values for those sizes
        return waistlineData.flatMap(d => {
            return Object.keys(d)
                .filter(key => selectedPercentiles.includes(key))
                .map(key => {
                    const waistValue = parseFloat(d[key]);
                    const matches = ASTMData.filter(astm => 
                        Math.abs(parseFloat(astm.waist) - waistValue) <= 1
                    );

                    const matchedSizes = matches.map(astm => ({
                        size: astm.size,
                        waist: parseFloat(astm.waist)
                    }));

                    return {
                        percentile: parseInt(key.replace("percent", "")), 
                        waist: waistValue,
                        matchedSizes: matchedSizes,
                        minWaist: matchedSizes.length ? d3.min(matchedSizes, s => s.waist) : null,
                        maxWaist: matchedSizes.length ? d3.max(matchedSizes, s => s.waist) : null,
                        sizeLabels: matchedSizes.map(s => s.size)
                    };
                });
        });
    }

    export function getSizeBackgrounds() {
        const ASTMData = getFilteredASTMData(get(ASTMFilters)); 
        const groupedSizes = {};

        //this groups all numeric sizes that fall within the S/M/L sizing category and finds the min/max range of waistline values for each
        ASTMData.forEach(d => {
            if (sizeBackgroundColors[d.alphaSize]) {
                const waist = parseFloat(d.waist);
                if (!groupedSizes[d.alphaSize]) {
                    groupedSizes[d.alphaSize] = { min: waist, max: waist };
                } else {
                    groupedSizes[d.alphaSize].min = Math.min(groupedSizes[d.alphaSize].min, waist);
                    groupedSizes[d.alphaSize].max = Math.max(groupedSizes[d.alphaSize].max, waist);
                }
            }
        });

        //this makes a seamless transition between color bands by finding the midpoint between each size group
        let backgrounds = [];
        const sortedKeys = Object.keys(groupedSizes).sort((a, b) => groupedSizes[a].min - groupedSizes[b].min);

        for (let i = 0; i < sortedKeys.length; i++) {
            const label = sortedKeys[i];
            const min = groupedSizes[label].min;
            const max = groupedSizes[label].max;
            const nextMin = groupedSizes[sortedKeys[i + 1]]?.min || max;

            backgrounds.push({
                min: i === 0 ? d3.min(Object.values(groupedSizes).map(d => d.min)) - 1 : (min + (groupedSizes[sortedKeys[i - 1]]?.max || min)) / 2, 
                max: (max + nextMin) / 2,
                color: sizeBackgroundColors[label],
                label
            });
        }
        return backgrounds;
    }



    //for flat line scatterplot
    export function getAlphaSizeLabel(waistValue) {
        // Find the closest waist match
        let closest = sizeLabels[0];
        let minDiff = Math.abs(waistValue - closest.waist);
      
        for (const size of sizeLabels) {
          const diff = Math.abs(waistValue - size.waist);
          if (diff < minDiff) {
            closest = size;
            minDiff = diff;
          }
        }
      
        return closest.alphaSize;
      }
      