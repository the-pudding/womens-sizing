<script>
    import { onMount } from "svelte";
    import * as d3 from "d3";
    import waistlines from "$data/waistlines.json";
    import ASTMsizes from "$data/ASTMsizes.json";
    import { writable, get } from "svelte/store"; 
    import { getFilteredWaistlineData, getFilteredASTMData,findMatchingASTMSizes, getUniqueOptions } from "../helpers/Filters.js"

    let svg;

    //the size range is wonky bc it starts at 00, so this and the color bands below are hardcoded
    const ASTMSizeCategories = [
        "00", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", 
        "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"
    ];
    
    const sizeBackgrounds = [
        { min: "00", max: "3", color: "rgba(128, 0, 128, 0.15)", label: "Extra Small" },  
        { min: "3", max: "7", color: "rgba(255, 105, 180, 0.15)", label: "Small" },  
        { min: "7", max: "11", color: "rgba(30, 144, 255, 0.15)", label: "Medium" },  
        { min: "11", max: "15", color: "rgba(34, 139, 34, 0.15)", label: "Large" },  
        { min: "15", max: "19", color: "rgba(10, 39, 94, 0.15)", label: "XL" },  
        { min: "19", max: "20", color: "rgba(255, 255, 0, 0.15)", label: "XXL" }  
    ];

    //default dropdown
    const waistlineFilters = writable({ yearRange: "2015-2018", age: "15", race: "all" });

    const ASTMFilters = writable({ year: "2021", sizeRange: "straight" });

    function drawASTMChart() {
        const width = 600, height = 400, margin = { top: 20, right: 40, bottom: 60, left: 80 };
        const circleRadius = 5; 

        d3.select(svg).selectAll("*").remove();
        const svgContainer = d3.select(svg)
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // X-axis: Percentiles (0-100)
        const xScale = d3.scaleLinear().domain([0, 100]).range([0, width - margin.left - margin.right]);

        // Y-axis: ASTM Sizes (Categorical)
        const yScale = d3.scalePoint().domain(ASTMSizeCategories).range([height - margin.top - margin.bottom, 0]);

        // Background color bands for size categories
        sizeBackgrounds.forEach(({ min, max, color, label }) => {
            const minY = yScale(max);
            const maxY = yScale(min);

            if (minY !== undefined && maxY !== undefined) {
            svgContainer.append("rect")
                .attr("x", 0)
                .attr("y", minY)
                .attr("width", width - margin.right)
                .attr("height", maxY - minY)
                .style("fill", color);


                // S/M/L Labels
                svgContainer.append("text")
                    .attr("x", width - margin.right - 80)
                    .attr("y", (minY + maxY) / 2)
                    .style("text-anchor", "start")
                    .style("font-size", "14px")
                    .style("fill", "black")
                    .text(label);
            }
        });

        // X-axis
        svgContainer.append("g")
            .attr("transform", `translate(0, ${height - margin.top - margin.bottom})`)
            .call(d3.axisBottom(xScale).tickValues([5, 25, 50, 75, 95])); 

        // X-axis Label
        svgContainer.append("text")
            .attr("x", (width - margin.left - margin.right) / 2)
            .attr("y", height - margin.top + 20)
            .style("text-anchor", "middle")
            .style("font-size", "14px")
            .text("Percentile");

        // Y-axis (labeling only even numbers)
        const tickValues = ["00", "0", "2", "4", "6", "8", "10", "12", "14", "16", "18", "20"];

        svgContainer.append("g")
            .call(d3.axisLeft(yScale)
                .tickValues(tickValues)
                .tickFormat(d => d)); 


        // Y-axis Label
        svgContainer.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -margin.left + 20)
            .attr("x", -(height - margin.top - margin.bottom) / 2)
            .style("text-anchor", "middle")
            .style("font-size", "14px")
            .text("ASTM Size");


        // Get filtered data
        const waistlineData = getFilteredWaistlineData(get(waistlineFilters));
        const ASTMData = getFilteredASTMData(get(ASTMFilters));

        // Find matching ASTM sizes for waistline percentiles
        const matchedData = findMatchingASTMSizes(waistlineData, ASTMData).filter(d => d.minSize);

      // Draw range bars and plot points for when multiple sizes match up to the CDC waist data
        matchedData.forEach(d => {
            if (d.sizes.length > 1) {
                svgContainer.append("line")
                    .attr("x1", xScale(d.percentile))
                    .attr("x2", xScale(d.percentile))
                    .attr("y1", yScale(d.minSize))
                    .attr("y2", yScale(d.maxSize))
                    .style("stroke", "blue")
                    .style("stroke-width", circleRadius * 2)
                    .style("stroke-opacity", 0.5)
                    .style("stroke-linecap", "round");
            }

            d.sizes.forEach(size => {
                svgContainer.append("circle")
                    .attr("cx", xScale(d.percentile))
                    .attr("cy", yScale(size))
                    .attr("r", circleRadius)
                    .style("fill", "blue");
            });
        });


        // Labels for ASTM sizes
        svgContainer.selectAll(".astm-label")
            .data(matchedData)
            .enter().append("text")
            .attr("x", d => xScale(d.percentile) - 15) 
            .attr("y", d => yScale(d.sizes[d.sizes.length - 1]) - 10) 
            .text(d => d.sizes.length > 1 ? `${d.sizes[0]} - ${d.sizes[d.sizes.length - 1]}` : d.sizes[0])
            .style("font-size", "12px")
            .style("fill", "black");

    }

    onMount(() => {
        drawASTMChart();
    });

    waistlineFilters.subscribe(() => drawASTMChart());
    ASTMFilters.subscribe(() => drawASTMChart());
</script>

<!-- Waistline Filters -->
<div class="chart-container">
    <div>
        <h3>Clothing sizes are distributed fairly evenly for girls in their early teens</h3>
        <p><em>The median 15-year-old wears around a size Medium. </em></p>
    </div>

    <div class="dropdown-container">
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