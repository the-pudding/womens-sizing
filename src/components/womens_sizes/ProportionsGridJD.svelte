<script>
    import sizeCharts from '$data/sizeCharts.json';
    import * as d3 from 'd3';
    import { fade } from 'svelte/transition';
    import Select from "$components/helpers/Select.svelte";

    let { value, parentWidth, parentHeight } = $props();

    let containerHeight = $state(0);
    let containerWidth = $state(0);
    const margin = {top: 0, bottom: 0, left: 32, right: 32}

    let brandPositions = $state([]);
    
    let tooltipVisible = $state(false);
    let tooltipX = $state();
    let tooltipY = $state();
    let tooltipBrand = $state();
    let tooltipBust= $state();
    let tooltipWaist = $state();
    let tooltipHip = $state();

    const brands = [...new Set(sizeCharts.filter(d => d.garmentType === "Apparel").map(d => d.brand))];
    let selectedBrand = $state("J.Crew");
    const sizeListMin = [...new Set(sizeCharts.filter(d => d.garmentType === "Apparel" && (d.bustMin !== null || d.bustMax !== null)).map(d => d.numericSizeMin))];
    const sizeListMax = [...new Set(sizeCharts.filter(d => d.garmentType === "Apparel" && (d.bustMin !== null || d.bustMax !== null)).map(d => d.numericSizeMax))];
    const allUniqueSizes = [...new Set(
        [...sizeListMin, ...sizeListMax]
            // Filter out null (js type) and "null" (string type)
            .filter(d => d !== null && d !== "null")
            // Convert all remaining values to strings for consistent sorting
            .map(String)
    )];

    const zeroStrings = [];
    const otherSizes = [];

    allUniqueSizes.forEach(size => {
        // Check if the string consists only of '0's (handles "0", "00", "000")
        if (/^0+$/.test(size)) {
            zeroStrings.push(size);
        } else {
            otherSizes.push(size);
        }
    });

    zeroStrings.sort((a, b) => b.length - a.length);

    otherSizes.sort((a, b) => {
        const parseSize = (size) => {
            const s = String(size);
            const isWide = s.toUpperCase().endsWith('W');
            // Use parseFloat instead of parseInt to handle cases where the size might be a decimal, 
            // though parseInt is usually fine for clothing sizes.
            const numericBase = parseFloat(s); 
            return { numericBase, isWide };
        };

        const parsedA = parseSize(a);
        const parsedB = parseSize(b);

        // Primary sort: Numeric value
        const numericDiff = parsedA.numericBase - parsedB.numericBase;

        if (numericDiff !== 0) {
            return numericDiff;
        }

        // Secondary sort: Handle the 'W' suffix (16 < "16W")
        if (parsedA.isWide && !parsedB.isWide) {
            return 1;
        }
        if (!parsedA.isWide && parsedB.isWide) {
            return -1;
        }
        
        return 0;
    });

    const finalSortedSizeList = ["All sizes", ...zeroStrings, ...otherSizes];

    const medianMeasurements = {
        bustMin: 40,
        waistMin: 37.68,
        hipMin: 42
    };

    const xScale = $derived(d3.scaleLinear()
        .domain([20, 60])
        .range([0, containerWidth - margin.left - margin.right]));

    let selectedSize = $state("All sizes");

    // EVENTS
    function handleSizeChange(event) {
        selectedSize = event.detail;
        // console.log("Selected brand:", selectedBrand);
    }

    function handleMouseEnter(dress, e) {
        let group = d3.select(e.currentTarget);

        group.classed("highlight", true);
        
        tooltipBrand = dress.brand;
        tooltipBust = dress.bustMin;
        tooltipWaist = dress.waistMin;
        tooltipHip = dress.hipMin;
        tooltipX = e.x+10;
        tooltipY = e.y+10;
        tooltipVisible = true;
    }

    function handleMouseExit() {
        tooltipVisible = false;

        d3.selectAll(".brand-group").classed("highlight", false);
    }

    // draws the paths
    function createPaths(dress, centerX, offsetY, type) {  
      // turn into numbers
      const bustMin = parseFloat(dress.bustMin);
      const waistMin = parseFloat(dress.waistMin);
      const hipMin = parseFloat(dress.hipMin);

      
      const halfBust = xScale(bustMin) / 2;
      const halfWaist = xScale(waistMin) / 2;
      const halfHip = xScale(hipMin) / 2;
        
      // y offsets, for now bust, waist and top are evenly spaced
      const yBust = offsetY + 0;
      const yWaist = offsetY + containerHeight/2;
      const yHip = offsetY + containerHeight;

      // finds the left and right sides
      const bustLeft = centerX - halfBust;
      const bustRight = centerX + halfBust;
      const waistLeft = centerX - halfWaist;
      const waistRight = centerX + halfWaist;
      const hipLeft = centerX - halfHip;
      const hipRight = centerX + halfHip;

      const handleOffset = containerHeight * 0.15; // 10% of container height for handle extension

      if (type == "brand") {
        // Left Path
        const leftPath = `
            M ${bustLeft} ${yBust}
            C ${bustLeft} ${yBust + handleOffset}, ${waistLeft} ${yWaist - handleOffset}, ${waistLeft} ${yWaist}
            C ${waistLeft} ${yWaist + handleOffset}, ${hipLeft} ${yHip - handleOffset}, ${hipLeft} ${yHip}
        `;

        // Right Path
        const rightPath = `
            M ${bustRight} ${yBust}
            C ${bustRight} ${yBust + handleOffset}, ${waistRight} ${yWaist - handleOffset}, ${waistRight} ${yWaist}
            C ${waistRight} ${yWaist + handleOffset}, ${hipRight} ${yHip - handleOffset}, ${hipRight} ${yHip}
        `;

        return {
            paths: [leftPath, rightPath],
            textPositions: {
                bustX: bustLeft,
                waistX: waistLeft,
                hipX: hipLeft
            },
            bustRight,
            waistRight,
            hipRight
        };
      } else {
        // This part needs similar adjustment if you want the median path to also be smooth
        // For now, keeping it as is for demonstration, but you should update it
        const fullPath = `
            M ${bustLeft} ${yBust}
            C ${bustLeft} ${yBust + handleOffset}, ${waistLeft} ${yWaist - handleOffset}, ${waistLeft} ${yWaist}
            C ${waistLeft} ${yWaist + handleOffset}, ${hipLeft} ${yHip - handleOffset}, ${hipLeft} ${yHip}
            L ${hipRight} ${yHip}
            C ${hipRight} ${yHip - handleOffset}, ${waistRight} ${yWaist + handleOffset}, ${waistRight} ${yWaist}
            C ${waistRight} ${yWaist - handleOffset}, ${bustRight} ${yBust + handleOffset}, ${bustRight} ${yBust}
            Z`;

        return {
            fullPath,
            bustLeft,
            bustRight,
            waistLeft,
            waistRight,
            hipLeft,
            hipRight,
            yBust,
            yWaist,
            yHip
        };
      }
    }
</script>

{#if value >= 8 && value !== "exit"}
    <div class="select-wrapper">
        <p class="key">
            <span class="purple-span" style="height: 40px; display: flex; align-items: center;">Regular</span>
            <span class="green-span" style="height: 40px; display: flex; align-items: center;">Plus</span>
        </p>
        <div class="dropdown" class:visible={value >= 10}>
            <p>Highlight</p>
            <Select options={finalSortedSizeList} value={selectedSize} on:change={handleSizeChange}/>
        </div>
    </div>
    <div class="outer-container" id="proportions" transition:fade={{ duration: 400 }}>
        {#each brands as brand, i}
            {@const filteredApparel = sizeCharts.filter(
                d => d.brand == brand
                    // && d.sizeRange == "Regular"
                    && d.garmentType == "Apparel"
                    && (d.bustMin !== null || d.bustMax !== null)
                )
            }
            <div class="brand-container"
                style="opacity: {value !== 9 || (value == 9 && brand == "H&M") ? 1 : 0.3}">
                <h3>{brand}</h3>
                <div class="visual-container" bind:clientHeight={containerHeight} bind:clientWidth={containerWidth}>
                    {#if containerWidth && containerHeight}
                        {@const medianPathData = createPaths(medianMeasurements, containerWidth / 2, 0, "median")}
                        
                        <svg>
                            <g class="median-group">
                                <path d={medianPathData.fullPath} fill="#9ABBD9" stroke="none" opacity=0.3 />
                                {#each filteredApparel as dress}
                                    {@const result = createPaths(dress, containerWidth / 2, 0, "brand")}
                                    <g class="brand-group" 
                                    class:selected={selectedSize == dress.numericSizeMin || selectedSize == dress.numericSizeMax} 
                                    class:faded={selectedSize && !(selectedSize == dress.numericSizeMin || selectedSize == dress.numericSizeMax || selectedSize == "All sizes")}>
                                        {#each result.paths as path}
                                            <path class="main-path main-path-{dress.sizeRange}" d={path} />
                                        {/each}
                                    </g>
                                {/each}
                            </g>
                        </svg>

                        {#each filteredApparel as dress}
                            {@const result = createPaths(dress, containerWidth / 2, 0, "brand")}
                            {#if selectedSize == dress.numericSizeMin || selectedSize == dress.numericSizeMax}
                                <div class="html-label-layer range-{dress.sizeRange}">
                                    <div class="html-label {dress.sizeRange == 'Regular' ? 'purple-label' : 'green-label'}"
                                        style="left: {dress.sizeRange == 'Regular' ? result.textPositions.bustX - 10 : result.bustRight + 10}px; 
                                            top: {10}px;">
                                        {dress.bustMin}"
                                    </div>
                                    
                                    <div class="html-label {dress.sizeRange == 'Regular' ? 'purple-label' : 'green-label'}"
                                        style="left: {dress.sizeRange == 'Regular' ? result.textPositions.waistX - 10 : result.waistRight + 10}px; 
                                            top: {containerHeight/2 + 2}px;">
                                        {dress.waistMin}"
                                    </div>
                                    
                                    <div class="html-label {dress.sizeRange == 'Regular' ? 'purple-label' : 'green-label'}"
                                        style="left: {dress.sizeRange == 'Regular' ? result.textPositions.hipX - 10 : result.hipRight + 10}px; 
                                            top: {containerHeight - 10}px;">
                                        {dress.hipMin}"
                                    </div>
                                </div>
                            {/if}
                        {/each}
                    {/if}
                </div>
            </div>
        {/each}
    </div>
{/if}

<style>
    #tooltip {
        position: fixed;
        opacity: 0;
        background: var(--color-bg);
        border-radius: 8px;
        padding: 1rem;
        z-index: 1000;
        font-family: var(--mono);
        font-size: var(--12px);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
        transition: opacity 100ms linear;
        pointer-events: none;
    }

    #tooltip.visible {
        opacity: 1;
    }

    #tooltip p {
        margin: 0;
    }

    #tooltip p:first-of-type {
        font-weight: 700;
        text-transform: uppercase;
    }

    .outer-container {
        position: relative; 
        width: 100%;          
        display: flex; 
        flex-direction: row;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        margin: 0;
        padding: 0;
    }

    .brand-container {
        width: 33.333%;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), 
                    opacity 0.6s ease-out;
    }

    @media (min-width: 900px) { 
        .brand-container {
            width: 20%; 
        }
    }
    
    .sticky-container {
        position: sticky;
        display: flex;
        justify-content: end;
        top: 0;
        height: 100vh;
        width: 100%;
        z-index: 1;
    }
  
    .visual-container {
        width: 100%;
        aspect-ratio: 3 / 2;
        display: flex;
        position: relative;
        justify-content: center;
        align-items: flex-end;
        padding-bottom: 0;
    }

    .visual-container {
        position: relative; /* Ensure this is here */
    }

    /* Container for HTML labels to ensure they don't block SVG mouse events */
    .html-label-layer {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none; /* Let clicks pass through to the SVG */
    }

    .range-Regular .html-label {
        transform: translate(-100%, -50%);
    }

    /* For Plus: no horizontal shift needed (it will start at coordinate + 10px and grow right) */
    .range-Plus .html-label {
        transform: translate(0, -50%);
    }

    /* Remove the transform from the base .html-label class if you added the above */
    .html-label {
        position: absolute;
        padding: 0.25rem;
        border-radius: 8px;
        font-family: var(--mono);
        font-weight: 700;
        font-size: var(--12px);
        color: var(--color-fg);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
        white-space: nowrap;
        z-index: 10;
        /* transform: translate(-100%, -50%); <-- Remove this from here */
    }

    .purple-label {
        background: rgba(181, 123, 220, 0.5);
    }

    .green-label {
       background: rgba(194, 217, 50, 0.5);
    }

    h3 {
        font-family: var(--mono);
        font-size: var(--18px);
        text-transform: uppercase;
        font-weight: 700;
        margin: 0;
    }

    .select-wrapper {
        position: absolute;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 2rem;
        font-family: var(--mono);
        font-weight: 700;
        font-size: var(--14px);
        top: 2rem;
        left: 2rem;
    }

    .key {
        display: flex;
        flex-direction: row;
    }

    .key p {
        height: 40px;
        margin: 0;
        padding: 0;
    }

    .dropdown {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease-in-out;
        z-index: 1000;
    }

    .dropdown.visible {
        opacity: 1;
        pointer-events: auto;
    }
    
    svg {
      width: 100%;
      height: 100%;
    }

    .brand-group {
        opacity: 1;
        transition: opacity 0.3s ease-in-out;
        pointer-events: none;
    }

    .brand-group.visible {
        opacity: 1;
        transition: opacity 0.3s ease-in-out;
    }

    .brand-group .main-path {
        fill: none;
        stroke-width: 1;
        transition: all 0.3s ease-in-out;
        pointer-events: none;
    }

    .brand-group .main-path-Regular {
        stroke: var(--ws-purple);
    }

    .brand-group .main-path-Plus {
        stroke: var(--ws-green);
    }

    .brand-group.selected .main-path {
        stroke-width: 3 !important;
    }
    .brand-group.faded .main-path {
        opacity: 0.3;
    }

    .brand-group .hidden-path {
        fill: none;
        stroke: transparent;
        stroke-width: 12;
        cursor: pointer;
        pointer-events: auto;
    }

    .brand-group.smallest .main-path {
        stroke: var(--ws-purple);
        stroke-width: 4;
    }

    .brand-group.biggest .main-path {
        stroke: var(--ws-orange);
        stroke-width: 4;
    }

    .brand-group.highlight .main-path  {
        stroke: var(--ws-green) !important;
        stroke-width: 4 !important;
    }

    .brand-group .label {
        font-family: var(--mono);
        font-weight: 700;
        font-size: var(--12px);
        fill: var(--color-fg);
        opacity: 1;
        transition: all 0.3s ease-in-out;
    }

    .brand-group.smallest .label {
        opacity: 1;
        fill: var(--ws-purple);
    }

    .brand-group.biggest .label {
        opacity: 1;
        fill: var(--ws-orange);
    }

    .brand-group.highlight .label {
        opacity: 1 !important;
        fill: var(--ws-green) !important;
    }

    .median-group text {
       font-family: var(--mono);
       font-weight: 700; 
       text-transform: uppercase;
    }

    .text-block {
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: center;
        padding: 2rem;
        margin-top: 8rem;
    }

    .subtitle {
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: center;
    }

    .text-block h3 {
        max-width: 800px;
        text-align: center;
    }
    .text-block p {
        width: min(100%, 550px);
        margin-bottom: 60px;
        margin-top: 60px;
        font-size: 1.1rem;
        line-height: 1.65;
        text-align: left;
        font-family: var(--sans);
        font-size: var(--18px);
    }
    
    .scrolly-outer {
        position: relative;
        z-index: 2;
        pointer-events: none;
    }
    
    .step {
        height: 100vh;
        display: flex;
        justify-content: left;
        align-items: center;
        padding-right: 2rem;
        padding-left: 2rem;
        font-family: var(--sans);
        font-size: var(--20px);
    }
    
    .step .text {
        max-width: 400px;
        width: 90%;
        padding: 20px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        margin: 0;
        pointer-events: auto;
    }
    
    :global(.interact) {
        font-family: var(--mono);
        font-weight: 700; 
        text-transform: uppercase;
        display: flex;
        align-items: center;
    }

    :global(.interact::before) {
        content: '';
        background-image: url('$svg/interact.svg');
        background-size: contain;
        background-repeat: no-repeat;
        width: 24px;
        height: 24px;
        display: inline-block;
        margin: -0.5rem 0.25rem 0 0;
        animation: wiggle 0.75s infinite;
    }

    @keyframes wiggle {
        0% { transform: translateX(0px); }
        50% { transform: translateX(1px); }
        100% { transform: translateX(0px); }
    }

    @media (max-width: 768px) {
        .step .text {
            max-width: 300px;
            padding: 15px;
        }
        
        .image-container {
            height: 75vh; 
        }
    }
</style>
