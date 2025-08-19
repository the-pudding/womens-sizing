<script>
  import * as d3 from 'd3';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import Scrolly from './helpers/Scrolly.svelte';
  import copy from '../data/copy.json';
  import waistlinesData from '../data/waistlines.json';
  import ASTMsizes from "../data/ASTMsizes.json";
  // import { 
  //   filterASTMData, processASTMSizeData, findSizesForMeasurement, generateDataPoints 
  // } from './utils/chart-utilities.js';
  // import { generateRandomAvatar, determineAvatarSize } from './utils/avatar-generator.js';
	import { onMount } from 'svelte';

  /*** SCROLLY ***/
  let value = $state(0);

  /*** DIMENSIONS ***/
  let containerWidth = $state(0);
  let containerHeight = $state(0);
  let margin = { top: 20, right: 20, bottom: 40, left: 20 };
  let width = $derived(containerWidth - margin.left - margin.right);
  let height = $derived(containerHeight - margin.top - margin.bottom);
  let avatarWidth = $derived(width / 15);
  let avatarHeight = $derived(avatarWidth * 1.4);

  /*** SCALES ***/
  const xScale = $derived(d3.scaleLinear().domain([20, 65]).range([0, width]));

  /*** TWEENS ***/
  let animatedBand = tweened({ y: 0, height: 0 }, { duration: 500, easing: d3.easeCubicInOut });
  const positionTweens = new Map();

  /*** FILTERS ***/
  let ASTMFilters = $state({ year: "2021", sizeRange: "straight" });
  let waistlineFilters = $state({ yearRange: "2021-2023", race: "all", age: "10-11" });
  let omittedSizeFilters = $derived(value >= 1 ? [] : ["XXL", "XL", "XS", "XXS"]);

  /*** DATA PROCESSING ***/
  let filteredASTM = $derived(filterASTMData(ASTMsizes, ASTMFilters));
  function filterASTMData(ASTMsizes, ASTMFilters) {
    return ASTMsizes.filter(item => 
      item.year === ASTMFilters.year &&
      item.sizeRange === ASTMFilters.sizeRange
    );
  }

  let filteredData = $derived(waistlinesData.find(item =>
    item.yearRange === waistlineFilters.yearRange &&
    item.race === waistlineFilters.race &&
    item.age === waistlineFilters.age
  ));

  let processedASTMData = $derived(processASTMSizeData(filteredASTM, omittedSizeFilters));
  let currentSizeRanges = $derived(processedASTMData.currentSizeRanges);
  let { points } = $derived(generateDataPoints(filteredData, currentSizeRanges));

  function processASTMSizeData(filteredASTM) {
    const sizeGroups = d3.groups(filteredASTM, d => d.alphaSize);

    const mappedSizes = sizeGroups.map((d, i) => {
      let min;
      let max;
      if (d[1].length == 1 && i == 0) {
        min = +d[1][0].waist - 1;
        max = (+d[1][0].waist + +d3.min(sizeGroups[i + 1][1], d => d.waist)) / 2;
      } else if (d[1].length == 1 && i == sizeGroups.length - 1) {
        min = (+d[1][0].waist + +d3.max(sizeGroups[i - 1][1], d => d.waist)) / 2;
        max = +d[1][0].waist + 1;
      } else {
        min = (+d[1][0].waist + +d3.max(sizeGroups[i - 1][1], d => d.waist)) / 2;
        max = (+d[1][1].waist + +d3.min(sizeGroups[i + 1][1], d => d.waist)) / 2;
      }

      return {
        ...d,
        size: d[0],
        min,
        max
      }
    });

    return {
      currentSizeRanges: mappedSizes
    }
  } 

  function generateDataPoints(filteredData, currentSizeRanges) {
    console.log({filteredData, currentSizeRanges});

    return {
      filteredData,
      currentSizeRanges
    }
  }

  console.log(points)

  // console.log(processedASTMData)
  /*** CHART UPDATES ***/
  // function updateChart(value) {
  //   if (value <= 2 || value == undefined) {
  //     waistlineFilters = { yearRange: "2021-2023", race: "all", age: "10-11" };
  //   } else {
  //     waistlineFilters = { yearRange: "2021-2023", race: "all", age: "14-15" };
  //   }
  // }

  $effect(() => {
    //Updates chart based on scroll value
    // updateChart(value);

    // Sets up axis
    if (containerWidth > 0) {
      d3.select("#beeswarm .x-axis").call(d3.axisBottom(xScale));
    }

    // Background band tweens
    const targetY = value <= 1 || value == undefined ? height / 4 : 0;
    const targetHeight = value <= 1 || value == undefined ? (height - margin.top - margin.bottom) / 2 : height - margin.top - margin.bottom;
    animatedBand.set({ y: targetY, height: targetHeight });
  });

  onMount(() => {
    // Initial setup for avatars
  });
</script>

<div class="outer-container">
  <div class="sticky-container">
    <div class="visual-container">
      <div id="beeswarm" class="chart-container" bind:clientHeight={containerHeight} bind:clientWidth={containerWidth}>
        <svg width={width} height={height}>
          {#if currentSizeRanges}
            <g class="size-backgrounds">
              {#each currentSizeRanges as sizeRange, i}
                {@const x = xScale(sizeRange.min)}
                {@const rectWidth = xScale(sizeRange.max) - x}
                <g class="size-band-group" id="{sizeRange.size}-band" class:omit={omittedSizeFilters.includes(sizeRange.size)}>
                  <rect x={x} y={$animatedBand.y} width={rectWidth} height={$animatedBand.height} fill="#C2D932"/>
                  <text x={x + rectWidth / 2} y={value <= 1 || value == undefined ? $animatedBand.height*1.5 : height - margin.top - margin.bottom - 20} text-anchor="middle">{sizeRange.size}</text>
                </g>
              {/each}
            </g>
          {/if}

          <g class="axis x-axis" transform="translate(0, {height - margin.top - margin.bottom})"></g>

          <!-- {#if positionedAvatars()}
            <g class="avatars">
              {#each positionedAvatars() as position, i}
                <g class="avatar-group" transform={`translate(${position.x}, ${position.y})`}>
                  {#each position.avatar.layers as imgPath}
                    <image
                      x={0} y={0} width={avatarWidth} height={avatarHeight}
                      href={imgPath.path} class="avatar"
                      class:grayscale={position.type !== 'percentile'}
                    />
                  {/each}
                </g>
              {/each}
            </g>
          {/if} -->
        </svg>
      </div>
    </div>
  </div>

  <div class="scrolly-outer">
    <Scrolly bind:value>
      {#each copy.intro as stage}
        <div class="step">
          <div class="text"><p>{@html stage.text}</p></div>
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
        height: 100svh;
        width: 100%;
        z-index: 1;
    }
    .visual-container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }

    .chart-container {
        width: 100%;
        padding: 2rem;
        height: 100%;
        /* max-height: 600px; */
        margin: 0 auto;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }

    .grayscale {
        filter: grayscale(100%);
    }

    .size-band-group {
       transition: opacity 0.5s ease-in-out; 
    }

    .omit {
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
    }

    .size-band-group text {
      font-family: var(--mono);
      font-weight: 700;
    }

    :global(#M-band rect) {
        opacity: 0.95;
    }

    :global(#S-band rect, #L-band rect) {
        opacity: 0.65;
    }

    :global(#XS-band rect, #XL-band rect) {
        opacity: 0.45;
    }

    :global(#XXS-band rect, #XXL-band rect) {
        opacity: 0.25;
    }

    .scrolly-outer {
        position: relative;
        z-index: 2;
        pointer-events: none;
    }

    .step {
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-right: 2rem;
        font-family: var(--sans);
        font-size: var(--20px);
    }
    .step .text {
        max-width: 500px;
        width: 90%;
        padding: 20px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
        margin: 0;
    }
</style>