<script>
    import { onMount } from "svelte";
    import * as d3 from "d3";
    import waistlines from "$data/waistlines.json";
    import { writable, derived } from "svelte/store";

    let svg;

    const getUniqueOptions = (key) => [...new Set(waistlines.map(d => d[key]))].sort();

    // Store dropdown options separately
    const fieldOptions = writable([
        getUniqueOptions("yearRange"),
        getUniqueOptions("age"),
        getUniqueOptions("race")
    ]);

    // Dropdown fields setup
    const filterFields = [
        { key: "yearRange", label: "Year Range" },
        { key: "age", label: "Age" },
        { key: "race", label: "Race" }
    ];

    // Default selections for two groups
    const filters = writable([
        { yearRange: "2015-2018", age: "20 and over", race: "black" },
        { yearRange: "2015-2018", age: "20 and over", race: "asian" }
    ]);

    // Derived store for filtered data
    const filteredData = derived(filters, ($filters) =>
        $filters.map(f =>
            waistlines.filter(d =>
                Object.keys(f).every(key => !f[key] || d[key] === f[key])
            )
        )
    );

    function drawChart(data1, data2) {
        const width = 600, height = 400, margin = { top: 20, right: 30, bottom: 40, left: 50 };

        d3.select(svg).selectAll("*").remove();
        const svgContainer = d3.select(svg)
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        const xScale = d3.scaleLinear().domain([0, 100]).range([0, width - margin.left - margin.right]);
        const yScale = d3.scaleLinear().domain([20, 60]).range([height - margin.top - margin.bottom, 0]);

        svgContainer.append("g")
            .attr("transform", `translate(0, ${height - margin.top - margin.bottom})`)
            .call(d3.axisBottom(xScale));

        svgContainer.append("g")
            .call(d3.axisLeft(yScale));

        svgContainer.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -margin.left + 20)
            .attr("x", -(height - margin.top - margin.bottom) / 2)
            .style("text-anchor", "middle")
            .style("font-size", "14px")
            .text("Waistline measurement (in inches)");

        svgContainer.append("text")
            .attr("x", (width - margin.left - margin.right)/2)
            .attr("y", height - margin.top + 20)
            .style("text-anchor", "middle")
            .style("font-size", "14px")
            .text("Percentiles");

        function processData(data, color) {
            if (!data.length) return;

            const percentiles = Object.keys(data[0])
                .filter(key => key.startsWith("percent"))
                .map(key => ({ percentile: parseInt(key.replace("percent", "")), waist: data[0][key], color }));

            svgContainer.selectAll(`.point-${color}`)
                .data(percentiles)
                .enter().append("circle")
                .attr("cx", d => xScale(d.percentile))
                .attr("cy", d => yScale(d.waist))
                .attr("r", 5)
                .style("fill", color);
        }

        processData(data1, "blue");
        processData(data2, "red");
    }

onMount(() => {
    filteredData.subscribe(([data1, data2]) => {
        drawChart(data1, data2);
    });
})
 

</script>

<div class="chart-container">
    <h3>Genetics factor heavily into how our bodies are shaped</h3>
    <!-- Dynamically generating dropdowns -->
    {#each $filters as filter, i}
        <h6>Group {i + 1}</h6>
        <div>
            {#each filterFields as field, j}
                <label for="{field.key}-{i}">{field.label}:</label>
                <select id="{field.key}-{i}" bind:value={filter[field.key]}>
                    {#each $fieldOptions[j] as option} 
                        <option value={option}>{option}</option>
                    {/each}
                </select>
            {/each}
        </div>
    {/each}

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