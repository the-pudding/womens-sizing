<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';
  import { tweened } from 'svelte/motion';
  import Scrolly from '../helpers/Scrolly.svelte';
  import copy from '$data/copy.json';
  import ASTMsizes from "$data/ASTMsizes.json";
  import pointsData from '$data/pointsData_JD.csv';
  import { generateRandomAvatar, determineAvatarSize } from '../utils/avatar-generator.js';
	import { fade } from 'svelte/transition';
  import Ransom from "$components/womens_sizes/Ransom.svelte";
  import Leet from "$components/womens_sizes/Leet.svelte";
  import Text from "$components/womens_sizes/Text.svelte";
  import checkScrollDir from "../../utils/checkScrollDir.js";
	import { on } from 'svelte/events';
	import { log } from 'three/tsl';


  /*** SCROLLY ***/
  let value = $state(0);
  let { startStage = 0, endStage = null, introScroll = null } = $props();
   let filteredStages = $derived(copy.introScroll ? copy.introScroll.slice(
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
  let margin = { top: 20, right: 20, bottom: 36, left: 20 };
  let width = $derived(containerWidth - margin.left - margin.right);
  let height = $derived(containerHeight - margin.top - margin.bottom);
  // let avatarWidth = $derived(width / 20);
  // let avatarHeight = $derived(avatarWidth * 1.2);
  let avatarHeight = $derived( height / 6.5)
  let avatarWidth = $derived(avatarHeight * .4)

  /*** SCALES ***/
  const xScale = $derived(d3.scaleLinear().domain([15, 65]).range([margin.left, width - margin.right - margin.left]));
  const tickValues = $derived(d3.range(xScale.domain()[0], xScale.domain()[1] + 1));

  /*** TWEENS ***/
  let animatedBand = tweened({ y: 0, height: 0 }, { duration: 500, easing: d3.easeCubicInOut });
  let animatedHighlight = tweened({ x: 0, y: 0, width: 0, height: 0 }, { duration: 500, easing: d3.easeCubicInOut });

  /*** FILTERS ***/
  /*%%%%%%%%%%%%%
  * Allow script to filter here
  *****/
  let ASTMFilters = $derived(
    currentId >= 4 || (currentId == "exit" && introScroll) || (currentId == "to-enter" && !introScroll)
      ? { year: "2021", sizeRange: "Women's" }
      : { year: "2015", sizeRange: "Junior's" }
  );
  // let waistlineFilters = $state({ yearRange: "2021-2023", race: "all", age: "10-11" });
  let omittedSizeFilters = $derived(currentId >= 2 && currentId !== "to-enter" ? [] : ["XXL", "XL", "XS", "XXS"]);
  let valueKey = $derived(
    currentId <= 2 || (currentId == "to-enter" && introScroll)
      ? "value10_11"
      : (currentId > 2 && currentId < 9) || (currentId == "exit" && introScroll) || (currentId == "to-enter" && !introScroll)
      ? "value14_15"
      : currentId < 10
      ? "value20_29"
      : currentId < 11
      ? "value30_39"
      : "value20over"
  );
  let sizeLabel = $derived(
    valueKey == "value10_11" ? "Age: 10-11" :
    valueKey == "value14_15" ? "Age: 14-15" :
    valueKey == "value20_29" ? "Age: 20-29" : 
    valueKey == "value30_39" ? "Age: 30-39" : "Age: 20+"
  )
    function getAvatarSizeForValueKey(valueKey) {
    switch(valueKey) {
      case "value10_11":
        return "junior";
      case "value14_15":
        return "small";
      case "value20_29":
        return "mid";
      case "value20over":
        return "mid";
      default:
        return "small"; // fallback
    }
  }

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


  /*** AVATAR GENERATION ***/
  let avatarImages = $derived(generateAvatarImgs(pointsData, valueKey));
  function generateAvatarImgs(pointsData) { // Added 'points' as an argument
    // Ensure points is not empty before mapping
    if (!pointsData || pointsData.length === 0) return [];

    let avatars = pointsData.map(point => {
      return {
        ...point,
        // The avatar object is already generated here
        // avatar: generateRandomAvatar("junior", point, valueKey)
        avatar: generateRandomAvatar(getAvatarSizeForValueKey(valueKey), point, valueKey)
      };
    });
    return avatars
  }

  let positionedAvatars = $derived(() => {
    // if (!pointsData || pointsData.length === 0) return [];
    if (!pointsData || pointsData.length === 0 || containerWidth === 0 || containerHeight === 0) return [];


    // Clean and copy data
    const data = pointsData.map(d => {
        const value = d[valueKey] === "" ? null : +d[valueKey];
        return {
            ...d,
            value: value
        };
    }).filter(d => d.value !== null && !isNaN(d.value)); // drop rows with no x value

    // Bail if no valid rows
    if (data.length === 0) return [];

    const sim = d3.forceSimulation(data)
        .force('x', d3.forceX(d => (xScale(d.value) - avatarWidth/1.2 )).strength(1))
        // Use a single, conditional y-force
        .force('y', d3.forceY(d => height / 2 - avatarHeight / 2).strength(d => d.id.startsWith("p") ? 1.0 : 0.15))
        // Increase the collision radius for the highlighted avatar to create a larger, symmetrical gap
        .force('collide', d3.forceCollide(d => d.id.startsWith("p") ? (avatarHeight / 4) : (avatarHeight / 5)))
        .stop();

    const ticks = Math.ceil(Math.log(sim.alphaMin()) / Math.log(1 - sim.alphaDecay()));
    for (let i = 0; i < ticks; ++i) sim.tick();

    data.forEach(d => {
        // Clamp x to stay within boundaries
        d.x = Math.max(0, Math.min(width - avatarWidth/2, d.x));

        // Clamp y to stay within boundaries, considering the avatar's height
        d.y = Math.max(0, Math.min(height - avatarHeight / 2, d.y));
    });

    // Sort by y-coordinate to control SVG render order (z-index)
    return data.sort((a, b) => {
        const aIsP = a.id.startsWith("p");
        const bIsP = b.id.startsWith("p");

        if (aIsP && !bIsP) {
            return 1;  // 'a' (which is 'p') comes after 'b'
        } else if (!aIsP && bIsP) {
            return -1; // 'a' (which is not 'p') comes before 'b'
        } else if (aIsP && bIsP) {
            // Both are 'p', sort them by y to control their relative stacking
            return a.y - b.y;
        } else {
            // Neither are 'p', so preserve their existing order
            return 0;
        }
      }).map((d, i) => ({
          ...d,
          x: d.x,
          y: d.y,
          // Creates a random delay between 0s and 1s
          randomDelay: Math.random() * 1
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

    // Sets up axis
    if (containerWidth > 0) {
      d3.selectAll("#beeswarm .x-axis")
        .call(d3.axisBottom(xScale).tickValues(tickValues).tickFormat(d => {
          return d % 5 === 0 ? `${d}"` : "";
        }));
      }

    // Background band tweens
    const targetY = currentId <= 1 || (currentId == "to-enter" && introScroll)  ? height / 4 : 1;
    const targetHeight = currentId <= 1 || (currentId == "to-enter" && introScroll) ? (height - margin.top - margin.bottom) / 2 : height - margin.top - margin.bottom - 1;
    animatedBand.set({ y: targetY, height: targetHeight });

    // console.log({targetHeight})

    if (currentSizeRanges) {
        let highlightStart;
        let highlightWidth;

        if (currentId == 1) {
          highlightStart = xScale(currentSizeRanges[3].min);
          highlightWidth = Math.max(0, xScale(currentSizeRanges[3].max) - xScale(currentSizeRanges[3].min));
        } else if (currentId == 8 || (currentId == "to-enter" && !introScroll)) {
          highlightStart = xScale(currentSizeRanges[3].min);
          highlightWidth = Math.max(0, xScale(currentSizeRanges[3].max) - xScale(currentSizeRanges[3].min));
        } else if (currentId === 9) {
            highlightStart = xScale(currentSizeRanges[8].min);
            highlightWidth = Math.max(0, xScale(currentSizeRanges[8].max) - xScale(currentSizeRanges[8].min));
        } else if (currentId === 10) {
            highlightStart = xScale(currentSizeRanges[9].min);
            highlightWidth = Math.max(0, xScale(currentSizeRanges[9].max) - xScale(currentSizeRanges[9].min));
        } else if (currentId === 11) {
            highlightStart = xScale(currentSizeRanges[10].min);
            highlightWidth = Math.max(0, xScale(currentSizeRanges[10].max) - xScale(currentSizeRanges[10].min));
        } else if (currentId === 12) {
            highlightStart = xScale(currentSizeRanges[0].min);
            highlightWidth = Math.max(0, xScale(currentSizeRanges[9].max) - xScale(currentSizeRanges[0].min));
        }  else if (currentId >= 13) {
            highlightStart = xScale(currentSizeRanges[10].min);
            highlightWidth = Math.max(0, xScale(65) - xScale(currentSizeRanges[10].min));
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
    console.log(currentId, currentSizeRanges)
  });
</script>

<svelte:window bind:scrollY={scrollY} />

<div class="outer-container" class:intro={introScroll} class:middle={!introScroll}>
  <div class="sticky-container">
    <div class="visual-container">
      {#if (isNaN(currentId) || currentId == 0) && introScroll}
          <div transition:fade={{duration: 500}} class="intro-title">
              <p class="mono"><Leet string="meet your typical" /></p>
              <Ransom string="tween" />
              <p class="title-text">{@html copy.heroText}</p>
          </div>
      {/if}
      {#if (currentId >= 2 && currentId < 7) || (currentId >= 8)}
        <div transition:fade={{duration: 500}} class="size-key">
          <p>{sizeLabel}</p>
          <p>Sizes: {filteredASTM && filteredASTM.length > 0 ? filteredASTM[0].sizeRange : ''}</p>
        </div>
      {/if}
      <div id="beeswarm" 
        class="chart-container" 
        bind:clientHeight={containerHeight} 
        bind:clientWidth={containerWidth}
        style="opacity: {currentId == 7 || currentId == 14 || currentId == "exit" || (currentId == "to-enter" && !introScroll) ? 0 : 1}">
        {#if currentId >= 2}
          <p class="axis-label">Inches</p>
        {/if}
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
                  class:omit={(omittedSizeFilters.includes(sizeRange.size) || currentId < 1 || currentId == "to-enter" )}
                  style="transition-delay: {setDelay(i, scrollDir)}s">
                  <rect x={x} y={$animatedBand.y} width={rectWidth} height={$animatedBand.height} fill="#9ABBD9"/>
                  <text x={x + rectWidth / 2} y={currentId <= 1 || isNaN(currentId) ? $animatedBand.height*1.5 : height - margin.top - margin.bottom - 20} text-anchor="middle">{currentId <= 8 || (currentId == "to-enter" && introScroll) || (currentId == "exit" && introScroll) || (currentId == "to-enter" && !introScroll) ? sizeRange.alphaSize : sizeRange.size}</text>
                </g>
              {/each}
            </g>
            <g class="highlight-band" class:visible={currentId == 1 || currentId == 6 || currentId == 7 || (currentId == "exit" && introScroll) || (currentId == "to-enter" && !introScroll) || currentId >= 8}>
              <rect x={$animatedHighlight.x} y={$animatedHighlight.y} width={$animatedHighlight.width} height={$animatedHighlight.height}/>
            </g>
          {/if}

          <g class="axis x-axis" 
              transform="translate(0, {height - margin.top - margin.bottom})"
              opacity={currentId >= 2 ? 1 : 0}></g>

          {#if positionedAvatars() && avatarImages}
            <g class="avatars">
              {#each positionedAvatars() as point, i}
                <g class="avatar-group" 
                  id={point.id}
                  transform={`translate(${point.x}, ${point.y}) scale(${(point.type == 'percentileMid' && currentId <= 1 && introScroll) || (point.type == 'percentileMid' && currentId == "to-enter" && introScroll) ? 2 : 1})`}
                  opacity={(point.type == 'percentileMid' && currentId <= 1 && introScroll) || (point.type == 'percentileMid' && currentId == "to-enter" && introScroll) || currentId > 1 || currentId == "exit" || (currentId == "to-enter" && !introScroll) ? 1 : 0}
                  style="transition: {currentId == 'to-enter' 
                    ? 'none' 
                    : `transform 0.5s ease-in-out, opacity 0.5s ease-in-out ${point.randomDelay}s`
                  };"
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
                            class:colorized={
                              point.type == 'percentileMid' ||
                              (currentId == 5 && (point.id == 'p10' || point.id == 'p90'))
                            }
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
        <div 
          class="step step{stage.id}"
          style="justify-content: {stage.id >= 10 ? 'flex-start' : 'flex-end'}"
        >
          {#if stage.text}
            <div class="text">
              <Text copy={stage.text} />
            </div>
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

    .size-key p {
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
        font-size: var(--18px);
        max-width: 500px;
    }

    .chart-container {
        width: 100%;
        padding: 1.5rem;
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

    .colorized {
      filter: none;
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

    :global(.avatar) {
      filter: grayscale(100%);
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
    .middle .scrolly-outer {
        margin-top: -60vh;
    }

    .intro .step:nth-child(2) {
      padding-top: 90vh;
    }

    .title-text {
      font-family: var(--sans);
      font-size: var(--18px);
      margin-top: 2rem;
    }

    .axis-label {
      position: absolute;
      bottom: 1rem;
      margin: 0 0 0 -1rem;
      font-family: var(--mono);
      font-size: var(--14px);
      font-weight: 700;
      text-transform: uppercase;
      text-anchor: middle;
    }

    .step {
        height: auto;
        padding: 40vh 5% 70vh;
        display: flex;
        align-items: center;
        font-family: var(--sans);
        font-size: var(--18px);
        box-sizing: content-box;
        justify-content: flex-end;
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
    .step.step0 {
        margin: 0 auto;
        padding: 0;

    }
    .step.step1, .step2, .step7, .step11 {
      /* padding-right: 30%; */
      justify-content: end;
    }

     @media (max-width: 900px) {
      .step .text{
        margin: 0 auto;
      }
    }
</style>