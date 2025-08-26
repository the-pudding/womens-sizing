<script>
    import { onMount } from 'svelte';
    import copy from "../data/copy.json";
    import Scrolly from './helpers/Scrolly.svelte';
    import Ransom from "$components/Ransom.svelte";
    import Leet from "$components/Leet.svelte";
    import sizeCharts from '../data/sizeCharts.json';
	import { on } from 'svelte/events';
    import * as d3 from 'd3';

    let containerHeight = $state(0);
    let containerWidth = $state(0);
    let value = $state(0);
    let inViewTrigger = $state(false);

    const filteredApparel = sizeCharts.filter(
      d => d.brand == "J.Crew" 
        && d.sizeRange == "Regular"
        && d.garmentType == "Apparel"
    );

    const minMeasurement = d3.min(sizeCharts, d => parseFloat(d.waistMin));
    const maxMeasurement = d3.max(sizeCharts, d => parseFloat(d.hipMin))

    const medianMeasurements = {
        bustMin: 40,
        waistMin: 37.68,
        hipMin: 42
    };

    const xScale = $derived(d3.scaleLinear()
        .domain([20, 65])
        .range([0, containerWidth]));

    console.log({minMeasurement, maxMeasurement, filteredApparel, medianMeasurements})

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
</script>

<div class="outer-container" id="proportions">
    <div class="text-block">
        {#each copy.ASTMtransition as block}
            <div class="subtitle">
                {#if block.subhed}
                    <h3>
                        <Leet string="Mass produced clothes" />
                        <Ransom string="do not fit" />
                        <Leet string="every body" />
                    </h3>
                {/if}
                <p>{@html block.text}</p>
            </div>
        {/each}
    </div>
    <div class="sticky-container">
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
                            >
                            {#each result.paths as path}
                                <path d={path} />
                            {/each}
                            <text class="label" x={result.textPositions.bustX - 10} y={30} text-anchor="end">{dress.bustMin}" </text>
                            <text class="label" x={result.textPositions.waistX - 10} y={containerHeight/2 - 6} text-anchor="end">{dress.waistMin}"</text>
                            <text class="label" x={result.textPositions.hipX - 10} y={containerHeight-42} text-anchor="end">{dress.hipMin}"</text>
                        </g>
                    {/each}
                </svg>
                {/if}
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
    .outer-container {
        position: relative;
        width: 100%;
    }
    
    .sticky-container {
        position: sticky;
        top: 0;
        height: 100vh;
        width: 100%;
        z-index: 1;
    }
  
    .visual-container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-end; /* Align to bottom to keep 20% space at top */
        padding-bottom: 0; /* Images touch bottom of screen */
    }
    
    svg {
      width: 100%;
      height: 100%;
    }

    .brand-group {
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
    }

    .visible {
        opacity: 1;
        transition: opacity 0.3s ease-in-out;
    }

    .brand-group path {
        fill: none;
        stroke: var(--ws-blue);
        stroke-width: 1;
        transition: all 0.3s ease-in-out;
    }

    .brand-group.highlight path, .brand-group.biggest path {
        stroke: var(--ws-orange);
        stroke-width: 4;
    }

    .brand-group.smallest path {
        stroke: var(--ws-purple);
        stroke-width: 4;
    }

    .brand-group .label {
        font-family: var(--mono);
        font-weight: 700;
        fill: var(--color-fg);
        opacity: 0;
        transition: all 0.3s ease-in-out;
    }

    .brand-group.highlight .label, .brand-group.biggest .label {
        opacity: 1;
        fill: var(--ws-orange);
    }

    .brand-group.smallest .label {
        opacity: 1;
        fill: var(--ws-purple);
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
    }
    .base-image,
    .overlay-image {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        max-width: 100%;
        max-height: 100%;
        width: auto;
        height: auto;
        object-fit: contain;
    }
    
    .base-image {
        z-index: 1;
    }
    
    .overlay-image {
        z-index: 2;
        transition: opacity 0.3s ease-in-out;
    }
    
    .scrolly-outer {
        position: relative;
        z-index: 2;
    }
    
    .step {
        height: 100vh;
        display: flex;
        justify-content: flex-start; 
        align-items: center;
        padding-left: 4rem;
    }
    
    .step .text {
        max-width: 400px;
        width: 90%;
        padding: 20px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        margin: 0;
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