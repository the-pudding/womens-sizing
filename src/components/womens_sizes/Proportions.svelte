<script>
    import { onMount } from 'svelte';
    import copy from "$data/copy.json";
    import Scrolly from '../helpers/Scrolly.svelte';
    import Ransom from "$components/womens_sizes/Ransom.svelte";
    import Leet from "$components/womens_sizes/Leet.svelte";
    import Select from "$components/helpers/Select.svelte";
    import sizeCharts from '$data/sizeCharts.json';
	import { on } from 'svelte/events';
    import { 
        scaleLinear, 
        min, 
        max, 
        select, 
        selectAll,  
    } from 'd3';

    let containerHeight = $state(0);
    let containerWidth = $state(0);
    const margin = {top: 0, bottom: 0, left: 32, right: 32}
    let value = $state(0);
    
    let tooltipVisible = $state(false);
    let tooltipX = $state();
    let tooltipY = $state();
    let tooltipBrand = $state();
    let tooltipBust= $state();
    let tooltipWaist = $state();
    let tooltipHip = $state();

    const brands = [...new Set(sizeCharts.filter(d => d.garmentType === "Apparel").map(d => d.brand))];
    let selectedBrand = $state("J.Crew");

    function handleBrandChange(event) {
        selectedBrand = event.detail;
        // console.log("Selected brand:", selectedBrand);
    }

    const filteredApparel = $derived(sizeCharts.filter(
      d => d.brand == selectedBrand 
        && d.sizeRange == "Regular"
        && d.garmentType == "Apparel"
    ));

    const minMeasurement = min(sizeCharts, d => parseFloat(d.waistMin));
    const maxMeasurement = max(sizeCharts, d => parseFloat(d.hipMin));

    const medianMeasurements = {
        bustMin: 40,
        waistMin: 37.68,
        hipMin: 42
    };

    const xScale = $derived(scaleLinear()
        .domain([20, 65])
        .range([0, containerWidth - margin.left - margin.right]));

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
            }
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
    function handleMouseEnter(dress, e) {
        let group = select(e.currentTarget);

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

        selectAll(".brand-group").classed("highlight", false);
    }
</script>

<div class="outer-container" id="proportions">
    <!-- I'm not sure we actually need this block of text - AS -->
    <!-- <div class="text-block">
        {#each copy.proportionsIntro as block}
            <div class="subtitle">
                {#if block.subhed}
                    <h3>
                        <Leet string="Mass produced clothes do not fit" />
                        <Ransom string="every" />
                        <Ransom string="body" />
                    </h3>
                {/if}
                <p>{@html block.text}</p>
            </div>
        {/each}
    </div> -->
    <div class="sticky-container">
        <div class="select-wrapper" class:visible={value >= 3}>
            <Select options={brands} value={selectedBrand} on:change={handleBrandChange}/>
        </div>
        <div class="visual-container" bind:clientHeight={containerHeight} bind:clientWidth={containerWidth}>
            {#if containerWidth && containerHeight}
                {@const medianPathData = createPaths(medianMeasurements, containerWidth / 2, 0, "median")}
                <svg>
                    <g class="median-group">
                        <path 
                            d={medianPathData.fullPath} 
                            fill="#9ABBD9" 
                            stroke="none" 
                            opacity=0.3 />
                        <g class="med-bust">
                           <line 
                                x1={medianPathData.bustLeft} 
                                y1={medianPathData.yBust+36} 
                                x2={medianPathData.bustRight} 
                                y2={medianPathData.yBust+36} 
                                stroke="black" 
                                stroke-width="2" 
                                stroke-dasharray="5,5" />
                            <text x={containerWidth/2} y={medianPathData.yBust+30} text-anchor="middle">Median Bust: NA*</text>
                        </g>
                        <g class="med-waist">
                            <line 
                                x1={medianPathData.waistLeft} 
                                y1={medianPathData.yWaist} 
                                x2={medianPathData.waistRight} 
                                y2={medianPathData.yWaist} 
                                stroke="black" 
                                stroke-width="2" 
                                stroke-dasharray="5,5" />
                            <text x={containerWidth/2} y={containerHeight/2 - 6} text-anchor="middle">Median Waist: {medianMeasurements.waistMin}"</text>
                        </g>
                        <g class="med-hip">
                            <line 
                                x1={medianPathData.hipLeft} 
                                y1={medianPathData.yHip-36} 
                                x2={medianPathData.hipRight} 
                                y2={medianPathData.yHip-36} 
                                stroke="black" 
                                stroke-width="2" 
                                stroke-dasharray="5,5" />
                            <text x={containerWidth/2} y={medianPathData.yHip-42} text-anchor="middle">Median Hip: {medianMeasurements.hipMin}"</text>
                        </g>
                    </g>
                    {#each filteredApparel as dress, i}
                        {@const result = createPaths(dress, containerWidth / 2, 0, "brand")}
                        <g 
                            class="brand-group" 
                            id={`size-${dress.numericSizeMin}`}
                            class:visible={dress.numericSizeMin == 18 && value >= 1
                                || dress.numericSizeMin == 12 && value >= 2
                                || value >= 3}
                            class:highlight={dress.numericSizeMin == 18 && value == 1
                                || dress.numericSizeMin == 12 && value == 2}
                            class:biggest={value > 2 && i == filteredApparel.length - 1}
                            class:smallest={value > 2 && i == 0}
                            role="tooltip"
                                    onmouseenter={(e) => handleMouseEnter(dress, e)} 
                                    onmouseleave={handleMouseExit} 
                            >
                            {#each result.paths as path}
                                <path class="hidden-path" d={path} />
                                <path class="main-path" d={path} />
                            {/each}
                            <text class="label" x={result.textPositions.bustX - 10} y={30} text-anchor="end">{dress.bustMin}" </text>
                            <text class="label" x={result.textPositions.waistX - 10} y={containerHeight/2 - 6} text-anchor="end">{dress.waistMin}"</text>
                            <text class="label" x={result.textPositions.hipX - 10} y={containerHeight-42} text-anchor="end">{dress.hipMin}"</text>
                        </g>
                    {/each}
                </svg>
                {/if}
                <div id="tooltip" class:visible={tooltipVisible} style="left: {tooltipX}px; top: {tooltipY}px">
                    <p>{tooltipBrand}</p>
                    <p><strong>Bust:</strong> {tooltipBust}"</p>
                    <p><strong>Waist:</strong> {tooltipWaist}"</p>
                    <p><strong>Hip:</strong>{tooltipHip}"</p>
                </div>
        </div>
    </div>


    <div class="scrolly-outer">
        <Scrolly bind:value>
            {#each copy.proportions as stage, i}
                <div class="step">
                    <div class="text">
                        <p>{@html stage.text}</p>
                    </div>
                </div>
            {/each}
        </Scrolly>
    </div>
</div>

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
        max-width: 1000px;
        height: 100%;
        display: flex;
        position: relative;
        justify-content: center;
        align-items: flex-end; /* Align to bottom to keep 20% space at top */
        padding-bottom: 0; /* Images touch bottom of screen */
    }

    .select-wrapper {
        position: absolute;
        top: 2rem;
        left: 2rem;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease-in-out;
        z-index: 1000;
    }

     .select-wrapper.visible {
        opacity: 1;
        pointer-events: auto;
    }
    
    svg {
      width: 100%;
      height: 100%;
    }

    .brand-group {
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
        pointer-events: none;
    }

    .brand-group.visible {
        opacity: 1;
        transition: opacity 0.3s ease-in-out;
    }

    .brand-group .main-path {
        fill: none;
        stroke: var(--ws-blue);
        stroke-width: 1;
        transition: all 0.3s ease-in-out;
        pointer-events: none;
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
        fill: var(--color-fg);
        opacity: 0;
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
        line-height: 1.6;
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
