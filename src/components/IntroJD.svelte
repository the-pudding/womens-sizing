<script>
  import * as d3 from 'd3';
  import { tweened } from 'svelte/motion';
  import Scrolly from './helpers/Scrolly.svelte';
  import copy from '../data/copy.json';
  import waistlinesData from '../data/waistlines.json';
  import ASTMsizes from "../data/ASTMsizes.json";
  import { generateRandomAvatar, determineAvatarSize } from './utils/avatar-generator.js';
	import { fade } from 'svelte/transition';
  import Ransom from "$components/Ransom.svelte";
  import Leet from "$components/Leet.svelte";
  import checkScrollDir from "$utils/checkScrollDir.js";

  /*** SCROLLY ***/
  let value = $state(0);
  let { startStage = 0, endStage = null } = $props();
   let filteredStages = $derived(copy.intro ? copy.intro.slice(
        startStage, 
        endStage !== null ? endStage + 1 : undefined
    ) : []);
  let currentStage = $derived(filteredStages?.[value]);
  let currentId = $derived(+currentStage?.id);
  let scrollY = $state(0)
  let scrollDir = $derived(checkScrollDir(scrollY));

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

  /*** FILTERS ***/
  let ASTMFilters = $state({ year: "2021", sizeRange: "straight" });
  let waistlineFilters = $state({ yearRange: "2021-2023", race: "all", age: "10-11" });
  let omittedSizeFilters = $derived(currentId >= 2 ? [] : ["XXL", "XL", "XS", "XXS"]);

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

  let currentSizeRanges = $derived(processedASTMData.currentSizeRanges);

  let { points } = $derived(generateDataPoints(filteredData, currentSizeRanges));
  function generateDataPoints(data) {
    // Return an empty array early if data is invalid.
    // if (!data || typeof data.percent5 !== 'number') {
    //   return { points: [] };
    // }

    const allPercentiles = [5, 10, 25, 50, 75, 90, 95];
    const highlightPercentile = 50;

    // Parse all percentiles and filter out invalid data.
    const percentilePoints = allPercentiles
      .map(p => {
        const value = data[`percent${p}`];
        const parsedValue = typeof value === 'number' || (typeof value === 'string' && !isNaN(parseFloat(value)))
          ? parseFloat(value)
          : null;
        return { p, value: parsedValue };
      })
      .filter(d => d.value !== null)
      .map(d => ({
        id: `p${d.p}`,
        value: d.value,
        percentile: d.p,
        type: highlightPercentile == d.p ? 'percentile' : 'standard'
      }));

    const percentiles = Object.fromEntries(percentilePoints.map(d => [d.percentile, d.value]));

    const percentileRanges = [
      { start: 5, end: 10, range: 5 },
      { start: 10, end: 25, range: 15 },
      { start: 25, end: 50, range: 25 },
      { start: 50, end: 75, range: 25 },
      { start: 75, end: 90, range: 15 },
      { start: 90, end: 95, range: 5 }
    ];
    
    const totalRange = percentileRanges.reduce((sum, s) => sum + s.range, 0);
    const totalPointsToDistribute = 85;

    // Generate points between percentiles and for the tails.
    const pointsInRanges = percentileRanges.flatMap(segment => {
      const count = Math.round((segment.range / totalRange) * totalPointsToDistribute);
      const startValue = percentiles[segment.start];
      const endValue = percentiles[segment.end];

      if (typeof startValue !== 'number' || typeof endValue !== 'number') return [];

      const points = [];
      const step = (endValue - startValue) / (count + 1);
      for (let i = 0; i < count; i++) {
        const value = startValue + step * (i + 1);
        const percentile = segment.start + (segment.end - segment.start) * (i + 1) / (count + 1);
        points.push({
          id: `segment-${segment.start}-${segment.end}-${i}`,
          value: value,
          percentile: Math.round(percentile),
          type: 'standard'
        });
      }
      return points;
    });

    // Handle the tails separately for clarity.
    const tailPoints = [];
    const createTailPoints = (p1, p2, isLeftTail) => {
      const p1Value = percentiles[p1];
      const p2Value = percentiles[p2];
      if (typeof p1Value === 'number' && typeof p2Value === 'number') {
        const segmentWidth = Math.abs(p2Value - p1Value);
        const shift = segmentWidth * 0.25;
        for (let i = 0; i < 4; i++) {
          const value = isLeftTail ? p1Value - (i + 1) * shift : p1Value + (i + 1) * shift;
          const percentile = isLeftTail ? i + 1 : 96 + i;
          tailPoints.push({
            id: `${isLeftTail ? 'low' : 'high'}-${i}`,
            value,
            percentile,
            type: 'standard'
          });
        }
      }
    };

    createTailPoints(5, 10, true);
    createTailPoints(95, 90, false);

    const allPoints = [...percentilePoints, ...pointsInRanges, ...tailPoints];

    allPoints.sort((a, b) => {
      // If 'a' is a percentile and 'b' is not, 'a' should come after 'b'
      if (a.type === 'percentile' && b.type !== 'percentile') {
          return 1;
      }
      // If 'b' is a percentile and 'a' is not, 'b' should come after 'a'
      if (a.type !== 'percentile' && b.type === 'percentile') {
          return -1;
      }
      // Otherwise, maintain the relative order
      return 0;
  });
    
    return {
      points: allPoints
    };
  }

  let avatarImages = generateAvatarImgs(points);
  function generateAvatarImgs(points) { // Added 'points' as an argument
    // Ensure points is not empty before mapping
    if (!points || points.length === 0) return [];

    let avatars = points.map(point => {
      return {
        ...point,
        // The avatar object is already generated here
        avatar: generateRandomAvatar("mid")
      };
    });
    return avatars
  }

  let positionedAvatars = $derived(() => {
    if (!points || points.length === 0) return [];

    const data = points.map(d => ({ ...d }));

    const sim = d3.forceSimulation(data)
      .force('x', d3.forceX(d => xScale(d.value)).strength(0.95))
      .force('y', d3.forceY(d => d.type === 'percentile' ? height / 2 : height * 0.4).strength(0.05))
      .force('collide', d3.forceCollide(avatarHeight / 4))
      .stop();

    const ticks = Math.ceil(Math.log(sim.alphaMin()) / Math.log(1 - sim.alphaDecay()));
    for (let i = 0; i < ticks; ++i) sim.tick();

    data.forEach(d => {
      d.x = Math.max(0, Math.min(width - avatarWidth, d.x));
      d.y = d.type === 'percentile'
        ? (height - avatarHeight) / 2
        : Math.max(0, Math.min(height - avatarHeight, d.y));
    });

    return points.map((point, i) => ({ ...points, x: data[i]?.x, y: data[i]?.y }));
  });

  /*** CHART UPDATES ***/
  function updateChart(currentId) {
    if (currentId <= 2 || isNaN(currentId)) {
      waistlineFilters = { yearRange: "2021-2023", race: "all", age: "10-11" };
    } else {
      waistlineFilters = { yearRange: "2021-2023", race: "all", age: "14-15" };
    }
  }

  function setDelay(i, scrollDir) {
    let delay;
    if (scrollDir == "down") {
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
    //Updates chart based on scroll value
    updateChart(currentId);

    console.log(value, currentId)
    console.log("scrollDir", scrollDir);

    // Sets up axis
    if (containerWidth > 0) {
      d3.selectAll("#beeswarm .x-axis").call(d3.axisBottom(xScale));
    }

    // Background band tweens
    const targetY = currentId <= 1 || isNaN(currentId) ? height / 4 : 0;
    const targetHeight = currentId <= 1 || isNaN(currentId) ? (height - margin.top - margin.bottom) / 2 : height - margin.top - margin.bottom;
    animatedBand.set({ y: targetY, height: targetHeight });
  });
</script>

<svelte:window bind:scrollY={scrollY} />

<div class="outer-container">
  <div class="sticky-container">
    <div class="visual-container">
      {#if isNaN(currentId) || currentId == 0}
          <div transition:fade={{duration: 500}} class="intro-title">
              <p class="mono"><Leet string="meet your typical" /></p>
              <Ransom string="tween" />
              <p class="title-text">{@html copy.introText}</p>
          </div>
      {/if}
      <div id="beeswarm" class="chart-container" bind:clientHeight={containerHeight} bind:clientWidth={containerWidth}>
        <svg width={width} height={height}>
          {#if currentSizeRanges}
            <g class="size-backgrounds">
              {#each currentSizeRanges as sizeRange, i}
                {@const x = xScale(sizeRange.min)}
                {@const rectWidth = xScale(sizeRange.max) - x}
                <g class="size-band-group" 
                  id="{sizeRange.size}-band" 
                  class:omit={omittedSizeFilters.includes(sizeRange.size) || currentId < 1 || isNaN(currentId) }
                  style="transition-delay: {setDelay(i, scrollDir)}s">
                  <rect x={x} y={$animatedBand.y} width={rectWidth} height={$animatedBand.height} fill="#C2D932"/>
                  <text x={x + rectWidth / 2} y={currentId <= 1 || isNaN(currentId) ? $animatedBand.height*1.5 : height - margin.top - margin.bottom - 20} text-anchor="middle">{sizeRange.size}</text>
                </g>
              {/each}
            </g>
          {/if}

          <g class="axis x-axis" 
              transform="translate(0, {height - margin.top - margin.bottom})"
              opacity={currentId >= 2 ? 1 : 0}></g>

          {#if positionedAvatars()}
            <g class="avatars">
              {#each positionedAvatars() as point, i}
                <g class="avatar-group" 
                  transform={`translate(${point.x}, ${point.y}) scale(${(point[i].type == 'percentile' && (currentId <= 1 || isNaN(currentId))) ? 2 : 1})`}
                  opacity={(point[i].type == 'percentile' && (currentId <= 1 || isNaN(currentId))) || currentId > 1 ? 1 : 0}
                  >
                  {#if avatarImages && avatarImages.length > i}
                    {@const currentAvatar = avatarImages[i]} 
                    {#each currentAvatar.avatar.layers as layer}
                        <image
                            x={0} y={0} width={avatarWidth} height={avatarHeight}
                            href={layer.path}
                            class="avatar"
                            class:grayscale={point[i].type !== 'percentile'}
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

    :global(.avatar-group) {
        transition: all 0.5s ease-in-out;
    }

    :global(#M-band rect) {
        opacity: 0.95;
    }

    :global(#S-band, #L-band) {
        transition-delay: 0.5s;
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
        height: 100svh;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-right: 2rem;
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