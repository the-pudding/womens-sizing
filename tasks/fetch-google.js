import fs from "fs";
import csv from "csvtojson";
import docs from "../google.config.js";
import archieml from "archieml";


const CWD = process.cwd();

// Function to determine data structure dynamically
const transformData = (rawData) => {
    if (rawData.length === 0) return [];

    const headers = Object.keys(rawData[0]);

    if (headers.includes("Year Range") && headers.includes("Mean")) {
        return rawData.map(row => ({
            yearRange: row["Year Range"],
            race: row["Race"],
            age: row["Age"],
            participants: Number(row["Participants"]) || null,
            mean: Number(row["Mean"]) || null,
            standardDev: Number(row["Standard Deviation"]) || null,
            percentiles: [
				{
					percent_5: row["percent_5"] ? parseFloat(row["percent_5"]) : "",
					percent_10: row["percent_10"] ? parseFloat(row["percent_10"]) : "",
					percent_15: row["percent_15"] ? parseFloat(row["percent_15"]) : "",
					percent_25: row["percent_25"] ? parseFloat(row["percent_25"]) : "",
					percent_50: row["percent_50"] ? parseFloat(row["percent_50"]) : "",
					percent_75: row["percent_75"] ? parseFloat(row["percent_75"]) : "",
					percent_85: row["percent_85"] ? parseFloat(row["percent_85"]) : "",
					percent_90: row["percent_90"] ? parseFloat(row["percent_90"]) : "",
					percent_95: row["percent_95"] ? parseFloat(row["percent_95"]) : "",
				},
			],
            link: row["Link"] || null
        }));
    } else if (headers.includes("brand") && headers.includes("garmentType")) {
        // Structure 2: Apparel Size Data
        return rawData.map(row => ({
            brand: row["brand"],
            parentCompany: row["parentCompany"],
            marketType: row["marketType"], 
            sizeRange: row["sizeRange"],
            garmentType: row["garmentType"],
            alphaSize: row["alphaSize"],
			numericSizeMin: row["numericSizeMin"] ? String(row["numericSizeMin"]).trim() : null,
			numericSizeMax: row["numericSizeMax"] ? String(row["numericSizeMax"]).trim() : null,
			numericBottoms: row["numericBottoms"] ? String(row["numericBottoms"]).trim() : null,
            bustMin: row["bustMin"] ? Number(row["bustMin"]) : null,
            bustMax: row["bustMax"] ? Number(row["bustMax"]) : null,
            waistMin: row["waistMin"] ? Number(row["waistMin"]) : null,
            waistMax: row["waistMax"] ? Number(row["waistMax"]) : null,
            hipMin: row["hipMin"] ? Number(row["hipMin"]) : null,
            hipMax: row["hipMax"] ? Number(row["hipMax"]) : null,
            dateCollected: row["dateCollected"],
            link: row["link"] || null
        }));
    } else {
        console.warn("⚠️ Unrecognized CSV structure, returning raw JSON.");
        return rawData; // If unknown structure, just return parsed JSON
    }
};

// Function to fetch CSV and convert to JSON
const fetchGoogle = async ({ id, gid }) => {
    console.log(`Fetching... ${id}`);
  
    const base = "https://docs.google.com";
    const post = gid
      ? `spreadsheets/u/1/d/${id}/export?format=csv&id=${id}&gid=${gid}`
      : `document/d/${id}/export?format=txt`;
    const url = `${base}/${post}`;
  
    try {
      const response = await fetch(url);
      const text = await response.text();
  
      if (gid) {
        const rawData = await csv().fromString(text);
        const formattedData = transformData(rawData);
        
        return JSON.stringify(formattedData, null, 2); // Pretty-print JSON
      } else {
   
        try {
          const parsed = archieml.load(text);
          
          return JSON.stringify(parsed, null, 2); // Pretty-print JSON
        } catch (parseErr) {
          console.warn(`⚠️ Error parsing document with ArchieML: ${parseErr}`);
        }
      }
    } catch (err) {
      throw new Error(`Error fetching from Google: ${err}`);
    }
  };

// Run fetch for each document
(async () => {
    for (let d of docs) {
        try {
            const jsonStr = await fetchGoogle(d);
            const filePath = `${CWD}/${d.filepath.replace(".csv", ".json")}`;
            
            fs.writeFileSync(filePath, jsonStr);
            console.log(`✅ Saved JSON to ${filePath}`);
        } catch (err) {
            console.error(err);
        }
    }
})();

