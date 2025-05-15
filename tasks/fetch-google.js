import fs from "fs";
import csv from "csvtojson";
import archieml from "archieml";
import docs from "../google.config.js";

const CWD = process.cwd();

// Transform structured CSV data
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
			percentiles: [{
				percent_5: parseFloat(row["percent_5"] || "") || "",
				percent_10: parseFloat(row["percent_10"] || "") || "",
				percent_15: parseFloat(row["percent_15"] || "") || "",
				percent_25: parseFloat(row["percent_25"] || "") || "",
				percent_50: parseFloat(row["percent_50"] || "") || "",
				percent_75: parseFloat(row["percent_75"] || "") || "",
				percent_85: parseFloat(row["percent_85"] || "") || "",
				percent_90: parseFloat(row["percent_90"] || "") || "",
				percent_95: parseFloat(row["percent_95"] || "") || "",
			}],
			link: row["Link"] || null
		}));
	}

	if (headers.includes("brand") && headers.includes("garmentType")) {
		return rawData.map(row => ({
			brand: row["brand"],
			parentCompany: row["parentCompany"],
			marketType: row["marketType"],
			sizeRange: row["sizeRange"],
			garmentType: row["garmentType"],
			alphaSize: row["alphaSize"],
			numericSizeMin: row["numericSizeMin"]?.trim() || null,
			numericSizeMax: row["numericSizeMax"]?.trim() || null,
			numericBottoms: row["numericBottoms"]?.trim() || null,
			bustMin: Number(row["bustMin"]) || null,
			bustMax: Number(row["bustMax"]) || null,
			waistMin: Number(row["waistMin"]) || null,
			waistMax: Number(row["waistMax"]) || null,
			hipMin: Number(row["hipMin"]) || null,
			hipMax: Number(row["hipMax"]) || null,
			dateCollected: row["dateCollected"],
			link: row["link"] || null
		}));
	}

	console.warn("⚠️ Unrecognized CSV structure, returning raw JSON.");
	return rawData;
};

const fetchGoogle = async ({ id, gid }) => {
	console.log(`Fetching... ${id}${gid ? ` (gid: ${gid})` : ""}`);

	const base = "https://docs.google.com";
	const url = gid
		? `${base}/spreadsheets/u/1/d/${id}/export?format=csv&id=${id}&gid=${gid}`
		: `${base}/document/d/${id}/export?format=txt`;

	try {
		const response = await fetch(url);
		const text = await response.text();

		if (!gid) {
			const parsed = archieml.load(text);
			return JSON.stringify(parsed, null, 2);
		}

		const rawData = await csv().fromString(text);
		const formatted = transformData(rawData);
		return JSON.stringify(formatted, null, 2);
	} catch (err) {
		throw new Error(`Error fetching Google file: ${err}`);
	}
};

(async () => {
	for (let d of docs) {
		try {
			const jsonStr = await fetchGoogle(d);
			const filePath = `${CWD}/${d.filepath.replace(".csv", ".json")}`;
			fs.writeFileSync(filePath, jsonStr);
			console.log(`✅ Saved JSON to ${filePath}`);
		} catch (err) {
			console.error(`❌ Failed for ${d.id}`, err);
		}
	}
})();
