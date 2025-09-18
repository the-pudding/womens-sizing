<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';
  import { tweened } from 'svelte/motion';
  import Scrolly from './helpers/Scrolly.svelte';
  import copy from '../data/copy.json';
  import waistlinesData from '../data/waistlines.json';
  import ASTMsizes from "../data/ASTMsizes.json";
  import pointsData from '$data/pointsData.csv';
  import { generateRandomAvatar, determineAvatarSize } from './utils/avatar-generator.js';
	import { fade } from 'svelte/transition';
  import Ransom from "$components/Ransom.svelte";
  import Leet from "$components/Leet.svelte";
  import checkScrollDir from "$utils/checkScrollDir.js";
	import { on } from 'svelte/events';


  /*** SCROLLY ***/
  let value = $state(0);
  let { startStage = 0, endStage = null, introScroll = null } = $props();
   let filteredStages = $derived(copy.intro ? copy.intro.slice(
        startStage, 
        endStage !== null ? endStage + 1 : undefined
    ) : []);
  let currentStage = $derived(filteredStages?.[value]);
  let currentId = $derived(isNaN(value) ? value : +currentStage?.id);
  let scrollY = $state(0)
  let scrollDir = $derived(checkScrollDir(scrollY));

  /*** DIMENSIONS ***/
  let containerWidth = $state(0);
  let containerHeight = $state(0);
  let margin = { top: 20, right: 20, bottom: 40, left: 20 };
  let width = $derived(containerWidth - margin.left - margin.right);
  let height = $derived(containerHeight - margin.top - margin.bottom);
  let avatarWidth = $derived(width / 14);
  let avatarHeight = $derived(avatarWidth * 1.4);

  /*** SCALES ***/
  const xScale = $derived(d3.scaleLinear().domain([20, 65]).range([margin.left, width - margin.right - margin.left]));
  const tickValues = $derived(d3.range(xScale.domain()[0], xScale.domain()[1] + 1));

  /*** TWEENS ***/
  let animatedBand = tweened({ y: 0, height: 0 }, { duration: 500, easing: d3.easeCubicInOut });
  let animatedHighlight = tweened({ x: 0, y: 0, width: 0, height: 0 }, { duration: 500, easing: d3.easeCubicInOut });

  /*** FILTERS ***/
  let ASTMFilters = $derived(
    currentId >= 5 || (currentId == "exit" && introScroll) || (currentId == "to-enter" && !introScroll)
      ? { year: "2021", sizeRange: "straight" }
      : { year: "2015", sizeRange: "juniors" }
  );
  let waistlineFilters = $state({ yearRange: "2021-2023", race: "all", age: "10-11" });
  let omittedSizeFilters = $derived(currentId >= 3 && currentId !== "to-enter" ? [] : ["XXL", "XL", "XS", "XXS"]);
  let valueKey = $derived(
    currentId <= 3 || (currentId == "to-enter" && introScroll)
      ? "value10_11"
      : (currentId > 3 && currentId < 9) || (currentId == "exit" && introScroll) || (currentId == "to-enter" && !introScroll)
      ? "value14_15"
      : currentId < 10
      ? "value20_29"
      : "value20over"
  );
  let sizeLabel = $derived(
    valueKey == "value10_11" ? "Ages 10-11" :
    valueKey == "value14_15" ? "Ages 14-15" :
    valueKey == "value20_29" ? "Ages 20-29" : "Ages 20+"
  )

  /*** DATA PROCESSING ***/
  let filteredASTM = $derived(filterASTMData(ASTMsizes, ASTMFilters));
  function filterASTMData(ASTMsizes, ASTMFilters) {
    return ASTMsizes.filter(item => 
      item.year === ASTMFilters.year &&
      item.sizeRange === ASTMFilters.sizeRange
    );
  }

  let processedASTMData = $derived(processASTMSizeData(filteredASTM));
  function processASTMSizeData(filteredASTM) {
    let sizeType = currentId < 9 || (currentId == "to-enter" && introScroll) || (currentId == "exit" && introScroll) || (currentId == "to-enter" && !introScroll) ? "alphaSize" : "size";
    const sizeGroups = d3.groups(filteredASTM, d => d[sizeType]);

    // console.log(sizeType)

    const mappedSizes = sizeGroups.map((d, i) => {
      let min;
      let max;
      if (d[1].length == 1) {
        if (i == sizeGroups.length - 1) {
          min = (+d[1][0].waist + +d3.max(sizeGroups[i - 1][1], d => d.waist)) / 2;
          max = +d[1][0].waist + 1;
        } else if (i == 0) {
          min = +d[1][0].waist - 1;
          max = (+d[1][0].waist + +d3.min(sizeGroups[i + 1][1], d => d.waist)) / 2;
        } else {
          min = (+d[1][0].waist + +d3.max(sizeGroups[i - 1][1], d => d.waist)) / 2;
          max = (+d[1][0].waist + +d3.min(sizeGroups[i + 1][1], d => d.waist)) / 2;
        }
      } else {
        min = (+d[1][0].waist + +d3.max(sizeGroups[i - 1][1], d => d.waist)) / 2;
        max = (+d[1][1].waist + +d3.min(sizeGroups[i + 1][1], d => d.waist)) / 2;
      }

      return {
        ...d,
        alphaSize: currentId < 9 ? d[1][0].alphaSize : d[0],
        size: currentId < 9 ? d[0] : d[1][0].size,
        min,
        max
      }
    });

    return {
      currentSizeRanges: mappedSizes
    }
  } 

  let currentSizeRanges = $derived(processedASTMData.currentSizeRanges);

  let avatarImages = $derived(generateAvatarImgs(pointsData));
  function generateAvatarImgs(pointsData) { // Added 'points' as an argument
    // Ensure points is not empty before mapping
    if (!pointsData || pointsData.length === 0) return [];

    let avatars = pointsData.map(point => {
      return {
        ...point,
        // The avatar object is already generated here
        avatar: generateRandomAvatar("mid", point)
      };
    });
    return avatars
  }

  let positionedAvatars = $derived(() => {
    if (!pointsData || pointsData.length === 0) return [];

    // Clean and copy data
    const data = pointsData.map(d => {
      const value = d[valueKey] === "" ? null : +d[valueKey];
      return {
        ...d,
        value: value
      };
    }).filter(d => d.value!== null && !isNaN(d.value)); // drop rows with no x value

    // Bail if no valid rows
    if (data.length === 0) return [];

    const sim = d3.forceSimulation(data)
      .force('x', d3.forceX(d => (xScale(d.value) - avatarWidth )).strength(0.95))
      // Use a single, conditional y-force
      .force('y', d3.forceY(d => height / 2 - avatarHeight/2).strength(d => d.id === "p50" ? 1.0 : 0.25))
      // Increase the collision radius for the highlighted avatar to create a larger, symmetrical gap
      .force('collide', d3.forceCollide(d => d.id === "p50" ? (avatarHeight / 3) : (avatarHeight / 5)))
      .stop();

    const ticks = Math.ceil(Math.log(sim.alphaMin()) / Math.log(1 - sim.alphaDecay()));
    for (let i = 0; i < ticks; ++i) sim.tick();

    data.forEach(d => {
      // Clamp x to stay within boundaries
      d.x = Math.max(0, Math.min(width - avatarWidth/2, d.x));
      
      // Clamp y to stay within boundaries, considering the avatar's height
      d.y = Math.max(0, Math.min(height - avatarHeight/2, d.y));
    });

    // Important: spread the single row, not the whole array
    return data.map((d, i) => ({
      ...d,
      // Add half the avatar's height to the y-position to center it vertically
      x: d.x,
      y: d.y
    }));
  });

  function setDelay(i, scrollDir) {
    let delay;
    if (scrollDir == "down" || scrollDir == undefined) {
      if (i == 2 || i == 4) {
        delay = 0.25
      } else if (i == 1 || i == 5) {
        delay = 0.5
      } else if (i == 0 || i == 6) {
        delay = 0.75
      } else {
        delay = 0;
      }
    } else {
      delay = 0;
    }

    return delay
  }

  $effect(() => {
    // console.log({currentId, currentSizeRanges})
    // Sets up axis
    if (containerWidth > 0) {
      d3.selectAll("#beeswarm .x-axis")
        .call(d3.axisBottom(xScale).tickValues(tickValues).tickFormat(d => {
          return d % 5 === 0 ? d : "";
        }));
      }

    // Background band tweens
    const targetY = currentId <= 2 || (currentId == "to-enter" && introScroll)  ? height / 4 : 1;
    const targetHeight = currentId <= 2 || (currentId == "to-enter" && introScroll) ? (height - margin.top - margin.bottom) / 2 : height - margin.top - margin.bottom - 1;
    animatedBand.set({ y: targetY, height: targetHeight });

    // console.log({targetHeight})

    if (currentSizeRanges) {
        let highlightStart;
        let highlightWidth;

        if (currentId == 2) {
          highlightStart = xScale(currentSizeRanges[3].min);
          highlightWidth = Math.max(0, xScale(currentSizeRanges[3].max) - xScale(currentSizeRanges[3].min));
        } else if (currentId == 8 || (currentId == "to-enter" && !introScroll)) {
          highlightStart = xScale(currentSizeRanges[3].min);
          highlightWidth = Math.max(0, xScale(currentSizeRanges[3].max) - xScale(currentSizeRanges[3].min));
        } else if (currentId === 9) {
            highlightStart = xScale(currentSizeRanges[8].min);
            highlightWidth = Math.max(0, xScale(currentSizeRanges[8].max) - xScale(currentSizeRanges[8].min));
        } else if (currentId === 10 || currentId === 11) {
            highlightStart = xScale(currentSizeRanges[10].min);
            highlightWidth = Math.max(0, xScale(currentSizeRanges[10].max) - xScale(currentSizeRanges[10].min));
        } else if (currentId === 12) {
            highlightStart = xScale(currentSizeRanges[0].min);
            highlightWidth = Math.max(0, xScale(currentSizeRanges[5].max) - xScale(currentSizeRanges[0].min));
        }  else if (currentId >= 13) {
            highlightStart = xScale(currentSizeRanges[9].min);
            highlightWidth = Math.max(0, xScale(65) - xScale(currentSizeRanges[9].min));
        } else {
            const minWaist = d3.min(currentSizeRanges, d => d.min);
            const maxWaist = d3.max(currentSizeRanges, d => d.max);
            highlightStart = xScale(minWaist);
            highlightWidth = Math.max(0, xScale(maxWaist) - xScale(minWaist));
        }

        animatedHighlight.set({ x: highlightStart, y: targetY, width: highlightWidth, height: targetHeight });
    }
  });

  $effect(() => {
    console.log({currentId})
  })
</script>

<svelte:window bind:scrollY={scrollY} />

<div class="outer-container">
  <div class="sticky-container">
    <div class="visual-container">
      {#if (isNaN(currentId) || currentId == 0) && introScroll}
          <div transition:fade={{duration: 500}} class="intro-title">
              <p class="mono"><Leet string="meet your typical" /></p>
              <Ransom string="tween" />
              <!-- <p class="title-text">{@html copy.introText}</p> -->
          </div>
      {/if}
      {#if (currentId >= 3 && currentId < 7) || (currentId >= 8)}
        <p transition:fade={{duration: 500}} class="size-key">{sizeLabel}</p>
      {/if}
      <div id="beeswarm" 
        class="chart-container" 
        bind:clientHeight={containerHeight} 
        bind:clientWidth={containerWidth}
        style="opacity: {currentId == 7 || currentId == 14 || currentId == "exit" || (currentId == "to-enter" && !introScroll) ? 0 : 1}">
        <svg width={width} height={height}>
          {#if currentSizeRanges}
            {@const minWaist = d3.min(currentSizeRanges, d => d.min)}
            {@const maxWaist = d3.max(currentSizeRanges, d => d.max)}
            <g class="size-backgrounds">
              {#each currentSizeRanges as sizeRange, i}
                {@const x = xScale(sizeRange.min)}
                {@const rectWidth = xScale(sizeRange.max) - x}
                <g class="size-band-group" 
                  id="band-{sizeRange.alphaSize}" 
                  class:omit={(omittedSizeFilters.includes(sizeRange.size) || currentId < 2 || currentId == "to-enter" )}
                  style="transition-delay: {setDelay(i, scrollDir)}s">
                  <rect x={x} y={$animatedBand.y} width={rectWidth} height={$animatedBand.height} fill="#9ABBD9"/>
                  <text x={x + rectWidth / 2} y={currentId <= 2 || isNaN(currentId) ? $animatedBand.height*1.5 : height - margin.top - margin.bottom - 20} text-anchor="middle">{currentId <= 8 || (currentId == "to-enter" && introScroll) || (currentId == "exit" && introScroll) || (currentId == "to-enter" && !introScroll) ? sizeRange.alphaSize : sizeRange.size}</text>
                </g>
              {/each}
            </g>
            <g class="highlight-band" class:visible={currentId == 2 || currentId == 6 || (currentId == "exit" && introScroll) || (currentId == "to-enter" && !introScroll) || currentId >= 7}>
              <rect x={$animatedHighlight.x} y={$animatedHighlight.y} width={$animatedHighlight.width} height={$animatedHighlight.height}/>
            </g>
          {/if}

          <g class="axis x-axis" 
              transform="translate(0, {height - margin.top - margin.bottom})"
              opacity={currentId >= 3 ? 1 : 0}></g>

          {#if positionedAvatars() && avatarImages}
            <g class="avatars">
              {#each positionedAvatars() as point, i}
                <g class="avatar-group" 
                  id={point.id}
                  transform={`translate(${point.x}, ${point.y}) scale(${(point.type == 'percentile' && currentId <= 2 && introScroll) || (point.type == 'percentile' && currentId == "to-enter" && introScroll) ? 2 : 1})`}
                  opacity={(point.type == 'percentile' && currentId <= 2 && introScroll) || (point.type == 'percentile' && currentId == "to-enter" && introScroll) || currentId > 2 || currentId == "exit" || (currentId == "to-enter" && !introScroll) ? 1 : 0}
                  style="transition: {currentId == "to-enter" ? "none" : "all 0.5s ease-in-out" };"
                >
                  {#if avatarImages}
                    {@const avatar = avatarImages.find(a => a.id === point.id)}
                      {#each avatar.avatar.layers as layer}
                        <image
                            x={0}
                            y={0}
                            width={avatarWidth}
                            height={avatarHeight}
                            href={layer.path}
                            xlink:href={layer.path}
                            class="avatar"
                            class:grayscale={point.type !== 'percentile'}
                          />
                      {/each}
                  {/if}
                </g>
              {/each}
            </g>
          {/if}
        </svg>
      </div>
    </div>
  </div>

  <div class="scrolly-outer">
    <Scrolly bind:value>
      {#each filteredStages as stage}
        <div class="step">
          {#if stage.text}
            <div class="text"><p>{@html stage.text}</p></div>
          {/if}
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

    .size-key {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      font-family: var(--mono);
      font-weight: 700;
      margin: 0;
    }

    .intro-title {
        position: absolute;
        top: 0;
        right: 0;
        width: 60%;
        padding: 0 10% 0 0;
        height: 100svh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .title-text {
        font-family: var(--sans);
        font-size: var(--20px);
        max-width: 500px;
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
        transition: opacity 1s ease-in-out; 
    }

    .grayscale {
        filter: grayscale(100%);
    }
    
    .highlight-band {
        fill: none;
        stroke: var(--ws-orange);
        stroke-width: 3;
        opacity: 0;
        transition: transform 0.5s ease-in-out;
        /* stroke-dasharray: 2, 2; */
    }

    .highlight-band.visible {
        opacity: 1;
        transition: opacity 0.5s ease-in-out; 
    }

    .size-band-group {
       transition: all 0.5s ease-in-out; 
    }

    .omit {
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
    }

    .size-band-group rect {
      transition: all 0.5s ease-in-out;
    }

    .size-band-group text {
      font-family: var(--mono);
      font-weight: 700;
      transition: all 0.5s ease-in-out;
    }

    :global(.avatar-group) {
        /* transition: all 0.5s ease-in-out; */
        transform-box: fill-box;
        transform-origin: center;
    }

    :global(#band-S, #band-L, #band-12, #band-16) {
        transition-delay: 0.5s;
    }

    :global(#band-XS, #band-XL) {
        transition-delay: 1s;
    }

    :global(#band-XXS, #band-XXL) {
        transition-delay: 1.5s;
    }

    :global(#band-M rect, #band-14 rect) {
        opacity: 1;
    }

    :global(#band-S rect, #band-L rect, #band-12 rect, #band-16 rect) {
        opacity: 0.75;
    }

    :global(#band-XS rect, #band-XL rect, #band-10 rect, #band-18 rect) {
        opacity: 0.65;
    }

    :global(#band-XXS rect, #band-XXL rect, #band-8 rect, #band-20 rect) {
        opacity: 0.55;
    }

    :global(#band-6 rect) {
        opacity: 0.45;
    }

    :global(#band-4 rect) {
        opacity: 0.35;
    }

    :global(#band-2 rect) {
        opacity: 0.25;
    }

    :global(#band-0 rect) {
        opacity: 0.15;
    }

    :global(#band-00 rect) {
        opacity: 0.05;
    }

    .scrolly-outer {
        position: relative;
        z-index: 2;
    }

    .step {
        height: 100vh;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-right: 10%;
        font-family: var(--sans);
        font-size: var(--20px);
    }

    .step:first-of-type {
        height: 10svh;
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