<script>
    import { onMount } from "svelte";
    import * as d3 from "d3";
    import waistlines from "$data/waistlines.json";
    import ASTMsizes from "$data/ASTMsizes.json";
    import { get } from "svelte/store"; 
    import { getFilteredWaistlineData, getFilteredASTMData, getUniqueOptions, filterMatchingASTMSizes, sizeBackgroundColors, getSizeBackgrounds } from "../helpers/Filters.js"
    import { ASTMFilters, waistlineFilters } from "../helpers/stores.js";

    let svg;

    const width = 600, height = 500, margin = { top: 20, right: 40, bottom: 60, left: 80 };
    const circleRadius = 5;

    function drawWaistlineChart() {
        d3.select(svg).selectAll("*").remove();
        const svgContainer = d3.select(svg)
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // X-axis: Percentiles (0-100)
        const xScale = d3.scaleLinear().domain([0, 100]).range([0, width - margin.left - margin.right]);

        // X-axis Label
        svgContainer.append("text")
            .attr("x", (width - margin.left - margin.right) / 2)
            .attr("y", height - margin.top)
            .style("text-anchor", "middle")
            .style("font-size", "14px")
            .text("Percentile");

        // Y-axis: Waist Circumference (in inches)
        const filteredWaistlineData = getFilteredWaistlineData(get(waistlineFilters));
        const minWaist = 24;
        const maxWaist = d3.max(filteredWaistlineData, d => parseFloat(d.percent95));
        
        const yScale = d3.scaleLinear()
            .domain([minWaist, maxWaist + 2])
            .range([height - margin.top - margin.bottom, 0]);

        // Y-axis Label
        svgContainer.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -margin.left + 20)
            .attr("x", -(height - margin.top - margin.bottom) / 2)
            .style("text-anchor", "middle")
            .style("font-size", "14px")
            .text("Waistline Measurement (in inches)");

        // Background color bands -- logic is tucked inside Filters.js
        const sizeBackgrounds = getSizeBackgrounds();
        sizeBackgrounds.forEach(({ min, max, color, label }) => {
            svgContainer.append("rect")
                .attr("x", 0)
                .attr("y", yScale(max))
                .attr("width", width - margin.right)
                .attr("height", yScale(min) - yScale(max))
                .style("fill", color);

            svgContainer.append("text")
                .attr("x", width - margin.right - 80)
                .attr("y", (yScale(min) + yScale(max)) / 2)
                .style("text-anchor", "start")
                .style("font-size", "14px")
                .style("fill", "black")
                .text(label);
        });

        // X & Y Axes
        svgContainer.append("g")
            .attr("transform", `translate(0, ${height - margin.top - margin.bottom})`)
            .call(d3.axisBottom(xScale).tickValues([5, 25, 50, 75, 95]));
        
        svgContainer.append("g").call(d3.axisLeft(yScale));

        // Fetch filtered data
        const waistlineData = getFilteredWaistlineData(get(waistlineFilters));
        const ASTMData = getFilteredASTMData(get(ASTMFilters));
        const matchedData = filterMatchingASTMSizes(waistlineData, ASTMData);

        //added this bc waistvalues weren't rendering where there were no corresponding sizes b/c of how the logic is structured. for now, the upper percentiles are hardcoded
        const percentilesToEnsure = ["percent75", "percent95"];
        percentilesToEnsure.forEach(p => {
            waistlineData.forEach(d => {
                if (!matchedData.some(m => m.percentile === parseInt(p.replace("percent", "")))) {
                    matchedData.push({
                        percentile: parseInt(p.replace("percent", "")),
                        waist: parseFloat(d[p]),
                        sizes: []
                    });
                }
            });
        });

        // Red circles are the CDC waistline values; blue circles + lines represent size ranges that fall within +/-1 of the CDC waistline value
        matchedData.forEach(d => {
            svgContainer.append("circle")
                .attr("cx", xScale(d.percentile))
                .attr("cy", yScale(d.waist))
                .attr("r", circleRadius)
                .style("fill", "red");

            if (d.matchedSizes.length > 1) {
                svgContainer.append("line")
                    .attr("x1", xScale(d.percentile))
                    .attr("x2", xScale(d.percentile))
                    .attr("y1", yScale(d.minWaist))
                    .attr("y2", yScale(d.maxWaist))
                    .style("stroke", "blue")
                    .style("stroke-width", circleRadius * 2)
                    .style("stroke-opacity", 0.5)
                    .style("stroke-linecap", "round");
            }

            d.matchedSizes.forEach(({ waist }) => {
                svgContainer.append("circle")
                    .attr("cx", xScale(d.percentile))
                    .attr("cy", yScale(waist))
                    .attr("r", circleRadius)
                    .style("fill", "blue");
            });
        });

            // Labels for ASTM sizes
            svgContainer.selectAll(".astm-label")
                .data(matchedData)
                .enter().append("text")
                .attr("x", d => xScale(d.percentile) - 15)
                .attr("y", d => yScale(d.maxWaist || d.waist) - 10)
                .text(d => d.sizeLabels.length > 1 ? `Sizes ${d.sizeLabels[0]} - ${d.sizeLabels[d.sizeLabels.length - 1]}` : d.sizeLabels[0] ? `Size ${d.sizeLabels[0]}` : "")
                .style("font-size", "12px")
                .style("fill", "black");
    }


    onMount(() => {
        drawWaistlineChart();
    });

    waistlineFilters.subscribe(() => drawWaistlineChart());
    ASTMFilters.subscribe(() => drawWaistlineChart());
</script>

<!-- Waistline Filters -->
<div class="chart-container">
    <h4>But as they get older, the range of available clothing sizes starts to dramatically shrink</h4>
    <p><em>Three-quarters of adult women wear a size 14 or above, while standard clothing ranges stop at a size 20</em></p>
    <div>
        <label for="yearRange">Year Range:</label>
        <select id="yearRange" bind:value={$waistlineFilters.yearRange}>
            {#each getUniqueOptions(waistlines, "yearRange") as option}
                <option value={option}>{option}</option>
            {/each}
        </select>

        <label for="age">Age:</label>
        <select id="age" bind:value={$waistlineFilters.age}>
            {#each getUniqueOptions(waistlines, "age") as option}
                <option value={option}>{option}</option>
            {/each}
        </select>

        <label for="race">Race:</label>
        <select id="race" bind:value={$waistlineFilters.race}>
            {#each getUniqueOptions(waistlines, "race") as option}
                <option value={option}>{option}</option>
            {/each}
        </select>
        <label for="ASTMYear">ASTM Year:</label>
        <select id="ASTMYear" bind:value={$ASTMFilters.year}>
            {#each getUniqueOptions(ASTMsizes, "year") as option}
                <option value={option}>{option}</option>
            {/each}
        </select>
        <label for="ASTMType">ASTM Type:</label>
        <select id="ASTMType" bind:value={$ASTMFilters.sizeRange}>
            {#each getUniqueOptions(ASTMsizes, "sizeRange") as option}
                <option value={option}>{option}</option>
            {/each}
        </select>
    </div>


<!-- ASTM Filters -->



<!-- ASTM Size Chart -->
    <svg bind:this={svg}></svg>
</div>
<style>
    .chart-container {
        margin: 0 auto;
        /* display: flex; */
        align-items: center;
        width: 80%;
    }
</style>
