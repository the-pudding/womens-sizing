<script>
    import * as d3 from 'd3';
    import sizeCharts from '$data/sizeCharts.json';
    let { value, containerWidth, containerHeight } = $props();
    import { fade } from 'svelte/transition';

    const medianMeasurements = {
        bustMin: 40,
        waistMin: 37.68,
        hipMin: 42
    };

    let selectedBrand = $state("J.Crew");

    const filteredApparel = $derived(sizeCharts.filter(
      d => d.brand == selectedBrand 
        && d.sizeRange == "Regular"
        && d.garmentType == "Apparel"
    ));

    const margin = {top: 0, bottom: 0, left: 32, right: 32};

    const xScale = $derived(d3.scaleLinear()
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
</script>


<div class="svg-wrapper" transition:fade={{ duration: 400 }}>
{#if containerWidth && containerHeight}
    {@const medianPathData = createPaths(medianMeasurements, containerWidth / 2, 0, "median")}
    <svg>
        <g class="median-group" class:visible={value >= 4}>
            <path 
                d={medianPathData.fullPath} 
                fill="#9ABBD9" 
                stroke="none" 
                opacity=0.3 />
        </g>
        {#each filteredApparel as dress, i}
            {@const result = createPaths(dress, containerWidth / 2, 0, "brand")}
            <g 
                class="brand-group" 
                class:visible={value >= 5}
                id={`size-${dress.numericSizeMin}`}
                role="tooltip"
                >
                {#each result.paths as path}
                    <path class="hidden-path" d={path} />
                    <path 
                        class="main-path"
                        class:highlight={
                            (value == 6 && dress.numericSizeMin == 18) ||
                            (value == 7 && dress.numericSizeMin == 12)
                        }
                        d={path}
                    />
                {/each}
                <text class="label" x={result.textPositions.bustX - 10} y={30} text-anchor="end">{dress.bustMin}" </text>
                <text class="label" x={result.textPositions.waistX - 10} y={containerHeight/2 - 6} text-anchor="end">{dress.waistMin}"</text>
                <text class="label" x={result.textPositions.hipX - 10} y={containerHeight-42} text-anchor="end">{dress.hipMin}"</text>
            </g>
        {/each}
        <g class="median-group median-lines" class:visible={value >= 4}>
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
    </svg>
    {/if}
</div>

<style>
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
        stroke: var(--ws-purple);
        stroke-width: 2;
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

    .brand-group .main-path.highlight  {
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

    .median-group {
        opacity: 0;
         transition: all 0.3s ease-in-out;
    }

    .median-group.visible {
        opacity: 1;
    }

    .median-group text {
       font-family: var(--mono);
       font-weight: 700; 
       text-transform: uppercase;
    }
</style>
