<script>
  import { onMount } from 'svelte';
  import { 
    scaleLinear, 
    range, 
    min, 
    max, 
    groups, 
    forceSimulation, 
    forceX, 
    forceY, 
    forceCollide, 
    selectAll, 
    axisBottom, 
    easeCubicInOut 
  } from 'd3';
  import { tweened } from 'svelte/motion';
  import Scrolly from '../helpers/Scrolly.svelte';
  import copy from '$data/copy.json';
  import ASTMsizes from "$data/ASTMsizes.json";
  import pointsData from '$data/pointsData_JD.csv';
  import { generateRandomAvatar } from '../utils/avatar-generator.js';
	import { fade, fly } from 'svelte/transition';
  import Ransom from "$components/womens_sizes/Ransom.svelte";
  import Leet from "$components/womens_sizes/Leet.svelte";
  import Text from "$components/womens_sizes/Text.svelte";
  import checkScrollDir from "../../utils/checkScrollDir.js";
  import ArrowDraw from "$components/womens_sizes/ArrowDraw.svelte";
	import { reducedMotion, initMotionWatcher } from "$utils/reduceMotion.js";
  import { isMobile, initMobileWatcher } from '$utils/isMobile.js';


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
  let margin = { top: 20, right: 4, bottom: 36, left: 16 };
  let width = $derived(containerWidth - margin.left - margin.right);
  let height = $derived(containerHeight - margin.top - margin.bottom);
  // let avatarWidth = $derived(width / 20);
  // let avatarHeight = $derived(avatarWidth * 1.2);
  let avatarHeight = $derived($isMobile ? height/12 : height/9)
  let avatarWidth = $derived(Math.round(avatarHeight * (290 / 969)));

  /*** SCALES ***/
  const xScale = $derived(scaleLinear().domain([20, 60]).range([margin.left, width - margin.right - margin.left]));
  const tickValues = $derived(range(xScale.domain()[0], xScale.domain()[1] + 1));

  /*** TWEENS ***/
  let animatedBand = tweened({ y: 0, height: 0 }, { duration: 500, easing: easeCubicInOut });
  let animatedHighlight = tweened({ x: 0, y: 0, width: 0, height: 0 }, { duration: 500, easing: easeCubicInOut });

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
      : (currentId > 2 && currentId < 10) || (currentId == "exit" && introScroll) || (currentId == "to-enter" && !introScroll)
      ? "value14_15"
      : currentId < 11
      ? "value20_29"
      : currentId < 12
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
    const sizeGroups = groups(filteredASTM, d => d[sizeType]);


    const mappedSizes = sizeGroups.map((d, i) => {
      let minSize;
      let maxSize;
      if (d[1].length == 1) {
        if (i == sizeGroups.length - 1) {
          minSize = (+d[1][0].waist + +max(sizeGroups[i - 1][1], d => d.waist)) / 2;
          maxSize = +d[1][0].waist + 1;
        } else if (i == 0) {
          minSize = +d[1][0].waist - 1;
          maxSize = (+d[1][0].waist + +min(sizeGroups[i + 1][1], d => d.waist)) / 2;
        } else {
          minSize = (+d[1][0].waist + +max(sizeGroups[i - 1][1], d => d.waist)) / 2;
          maxSize = (+d[1][0].waist + +min(sizeGroups[i + 1][1], d => d.waist)) / 2;
        }
      } else {
        minSize = (+d[1][0].waist + +max(sizeGroups[i - 1][1], d => d.waist)) / 2;
        maxSize = (+d[1][1].waist + +min(sizeGroups[i + 1][1], d => d.waist)) / 2;
      }

      return {
        ...d,
        alphaSize: currentId < 9 ? d[1][0].alphaSize : d[0],
        size: currentId < 9 ? d[0] : d[1][0].size,
        min: minSize,
        max: maxSize
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
        avatar: generateRandomAvatar(point.percentile, point, valueKey)
      };
    });
    return avatars
  }

let positionedAvatars = $derived.by(() => {
    if (!pointsData?.length || containerWidth === 0 || containerHeight === 0) return [];

    const data = pointsData
        .map(d => {
            const val = d[valueKey] === "" ? null : +d[valueKey];
            const targetX = xScale(val);
            
            if (d.id.startsWith("p")) {
                let targetY;
                
                if (d.id === "p50") {
                    targetY = height / 2;
                } else {
                    targetY = height/2 + avatarHeight/2.5;
                }

                return { 
                    ...d, 
                    value: val, 
                    fx: targetX, 
                    fy: targetY 
                };
            }

            return { ...d, value: val };
        })
        .filter(d => d.value !== null && !isNaN(d.value));
    
    const xStrength = $isMobile ? 5 : 1;
    const yStrength = $isMobile ? 0.1 : 0.1;
    const collideRadius = $isMobile ? (avatarHeight / 5) : (avatarHeight / 5);

    const sim = forceSimulation(data)
        .force('x', forceX(d => xScale(d.value)).strength(xStrength))
        .force('y', forceY(height/2).strength(yStrength))
        .force('collide', forceCollide(collideRadius).iterations(3))
        .alphaDecay(0.02)
        .stop();

    for (let i = 0; i < 300; ++i) sim.tick();

    return data.sort((a, b) => {
      const aIsP = a.id.startsWith("p");
      const bIsP = b.id.startsWith("p");

      if (aIsP && !bIsP) {
          return 1;
      } else if (!aIsP && bIsP) {
          return -1;
      } else if (aIsP && bIsP) {
          return a.y - b.y;
      } else {
          return 0;
      }
    }).map((d, i) => ({
        ...d,
        x: d.x,
        y: d.y,
        randomDelay: Math.random() * 0.2
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
      selectAll("#beeswarm .x-axis")
        .call(axisBottom(xScale).tickValues(tickValues).tickFormat(d => {
          return d % 5 === 0 ? `${d}"` : "";
        }));
      }

    // Background band tweens
    const targetY = currentId <= 1 || (currentId == "to-enter" && introScroll)  ? height / 4 : 1;
    const targetHeight = currentId <= 1 || (currentId == "to-enter" && introScroll) ? (height - margin.top - margin.bottom) / 2 : height - margin.top - margin.bottom - 1;
    animatedBand.set({ y: targetY, height: targetHeight });

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
            highlightStart = xScale(currentSizeRanges[6].min);
            highlightWidth = Math.max(0, xScale(currentSizeRanges[6].max) - xScale(currentSizeRanges[6].min)); 
        } else if (currentId === 10) {
            highlightStart = xScale(currentSizeRanges[8].min);
            highlightWidth = Math.max(0, xScale(currentSizeRanges[8].max) - xScale(currentSizeRanges[8].min));
        } else if (currentId === 11) {
            highlightStart = xScale(currentSizeRanges[9].min);
            highlightWidth = Math.max(0, xScale(currentSizeRanges[9].max) - xScale(currentSizeRanges[9].min));
        } else if (currentId === 12) {
            highlightStart = xScale(currentSizeRanges[10].min);
            highlightWidth = Math.max(0, xScale(currentSizeRanges[10].max) - xScale(currentSizeRanges[10].min));
        } else if (currentId === 13) {
            highlightStart = xScale(currentSizeRanges[0].min);
            highlightWidth = Math.max(0, xScale(currentSizeRanges[9].max) - xScale(currentSizeRanges[0].min));
        }  else if (currentId >= 14) {
            highlightStart = xScale(currentSizeRanges[10].min);
            highlightWidth = Math.max(0, xScale(60) - xScale(currentSizeRanges[10].min));
        } else {
            const minWaist = min(currentSizeRanges, d => d.min);
            const maxWaist = max(currentSizeRanges, d => d.max);
            highlightStart = xScale(minWaist);
            highlightWidth = Math.max(0, xScale(maxWaist) - xScale(minWaist));
        }

        animatedHighlight.set({ x: highlightStart, y: targetY, width: highlightWidth, height: targetHeight });
    }
  });

  onMount(() => {
      initMotionWatcher();

      const stop = initMobileWatcher(700);
      return stop; // Clean up when the app unmounts
  });
</script>

<svelte:window bind:scrollY={scrollY} />

<div class="outer-container" class:intro={introScroll} class:middle={!introScroll}>
  <div class="sticky-container">
    <div class="visual-container">
      {#if (isNaN(currentId) || currentId == 0) && introScroll && currentId !== "exit"}
          <div transition:fade={{duration: $reducedMotion ? 0 : 500}} class="intro-title">
              <h1 class="visually-hidden">{copy.metaTitle}</h1>
              <h2>
                <p class="mono"><Leet string="meet your typical" /></p>
                <Ransom string="tween" />
              </h2>
              <p class="title-text">{@html copy.heroText}</p>
              <div class="scroll-hint">
                <p> Scroll</p>
               <ArrowDraw />
              </div>
          </div>
      {/if}
      {#if (currentId >= 2 && currentId < 7) || (currentId >= 8)}
        <div transition:fade={{duration: $reducedMotion ? 0 : 500}} class="size-key">
          <p>{sizeLabel}</p>
          <p>Sizes: {filteredASTM && filteredASTM.length > 0 ? filteredASTM[0].sizeRange : ''}</p>
        </div>
      {/if}
      <div id="beeswarm" 
        class="chart-container" 
        bind:clientHeight={containerHeight} 
        bind:clientWidth={containerWidth}
        style="opacity: {currentId == 7 || currentId == 15 || currentId == "exit" || (currentId == "to-enter" && !introScroll) ? 0 : 1}">
        {#if currentId >= 2}
          <p class="axis-label">Waistline in Inches</p>
        {/if}
        <svg width={width} height={height}>
          {#if currentSizeRanges}
            {@const minWaist = min(currentSizeRanges, d => d.min)}
            {@const maxWaist = max(currentSizeRanges, d => d.max)}
            <g class="size-backgrounds">
              {#each currentSizeRanges as sizeRange, i}
                {@const x = xScale(sizeRange.min)}
                {@const rectWidth = xScale(sizeRange.max) - x}
                <g class="size-band-group" 
                  id="band-{sizeRange.alphaSize}" 
                  class:omit={(omittedSizeFilters.includes(sizeRange.size) || currentId < 1 || currentId == "to-enter" )}
                  style="transition-delay: {$reducedMotion ? 0 : setDelay(i, scrollDir)}s">
                  <rect style="transition: {$reducedMotion ? 'none' : 'all var(--ms-500) ease-in-out'}" x={x} y={$animatedBand.y} width={rectWidth} height={$animatedBand.height} fill="#9ABBD9"/>
                  <text style="transition: {$reducedMotion ? 'none' : 'all var(--ms-500) ease-in-out'}" x={x + rectWidth / 2} y={currentId <= 1 || isNaN(currentId) ? $animatedBand.height*1.5 : height - margin.top - margin.bottom - 20} text-anchor="middle">{currentId <= 8 || (currentId == "to-enter" && introScroll) || (currentId == "exit" && introScroll) || (currentId == "to-enter" && !introScroll) ? sizeRange.alphaSize : sizeRange.size}</text>
                </g>
              {/each}
            </g>
            <g class="highlight-band" style="transition: {$reducedMotion ? 'none' : 'opacity var(--ms-500) ease-in-out'}" class:visible={currentId == 1 || currentId == 6 || currentId == 7 || (currentId == "exit" && introScroll) || (currentId == "to-enter" && !introScroll) || currentId >= 8}>
              <rect style="transition: {$reducedMotion ? 'none' : 'all var(--ms-500) ease-in-out'}" x={$animatedHighlight.x} y={$animatedHighlight.y} width={$animatedHighlight.width} height={$animatedHighlight.height}/>
            </g>
          {/if}

          <g class="axis x-axis" 
              transform="translate(0, {height - margin.top - margin.bottom})"
              opacity={currentId >= 2 ? 1 : 0}></g>

          <!-- {#if positionedAvatars && avatarImages}
            <g class="avatars">
              {#each positionedAvatars as point, i}
                <g class="avatar-group" 
                    id={point.id}
                    class:scaled={(point.type == 'percentileMid' && currentId <= 1 && introScroll) || (point.type == 'percentileMid' && currentId == "to-enter" && introScroll)}
                    style="
                      transition: {prefersReducedMotion ? 'none' : 'all var(--ms-500) ease-in-out'};
                      --x: {point.x - avatarWidth / 2}px; 
                      --y: {point.y - avatarHeight / 2}px; 
                      --delay: {currentId == 'to-enter' ? '0s' : point.randomDelay + 's'};
                    "
                    opacity={(point.type == 'percentileMid' && currentId <= 1 && introScroll) || (point.type == 'percentileMid' && currentId == "to-enter" && introScroll) || currentId > 1 || currentId == "exit" || (currentId == "to-enter" && !introScroll) ? 1 : 0}
                  >

                </g>
              {/each}
            </g>
          {/if} -->
        </svg>

        <div class="avatar-overlay" style="width: {width}px; height: {height}px;">
          {#if positionedAvatars && avatarImages}
              {#each positionedAvatars as point, i}
                {@const isColorized = point.type == 'percentileMid' || (currentId == 5 && (point.id == 'p10' || point.id == 'p90'))}
                {@const isScaled = (point.type == 'percentileMid' && currentId <= 1 && introScroll) || (point.type == 'percentileMid' && currentId == "to-enter" && introScroll)}
                {@const isVisible = (point.type == 'percentileMid' && currentId <= 1 && introScroll) || (point.type == 'percentileMid' && currentId == "to-enter" && introScroll) || currentId > 1 || currentId == "exit" || (currentId == "to-enter" && !introScroll)}
                
                <div class="avatar-html-group" 
                    id={point.id}
                    class:colorized={isColorized}
                    class:scaled={isScaled}
                    style="
                      --x: {point.x - avatarWidth / 2}px; 
                      --y: {point.y - avatarHeight / 2}px; 
                      --delay: {$reducedMotion ? 0 : currentId == 'to-enter' ? '0s' : point.randomDelay + 's'};
                      opacity: {isVisible ? 1 : 0};
                      width: {avatarWidth}px;
                      height: {avatarHeight}px;
                    "
                  >
                  {#if avatarImages}
                    {@const avatar = avatarImages.find(a => a.id === point.id)}
                      {#each avatar.avatar.layers as layer}
                        <img
                            src={layer.path}
                            alt=""
                            class="avatar-layer-img"
                            style="width: 100%; height: 100%;"
                          />
                      {/each}

                      {#if (point.percentile == "50" && currentId >= 1) || (currentId == 5 && (point.percentile == "10" || point.percentile == "90"))}
                        <div transition:fly={{ y: 10, duration: $reducedMotion ? 0 : 250}} class="html-label">
                          {#if point.percentile == "50"}
                            <p>Median</p>
                          {:else}
                            <p>{point.percentile}th</p>
                            <p>percentile</p>
                          {/if}
                        </div>
                      {/if}
                  {/if}
                </div>
              {/each}
          {/if}
        </div>
      </div>
    </div>
  </div>

  <div class="scrolly-outer">
    <Scrolly bind:value>
      {#each filteredStages as stage}
        <div 
          class="step step{stage.id} step-{stage.textPos}"
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

    .visually-hidden {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }

    h2 {
      display: flex;
      align-items: center;
      flex-direction: column;
      width: 100%;
    }

    .size-key {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      margin: 0;
      background: var(--color-bg);
      border-radius: 8px;
      border: 2px solid var(--ws-orange);
      padding: 1rem;
      z-index: 1000;
      font-family: var(--mono);
      font-size: var(--12px);
      font-weight: 700;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
      width: 150px;
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

    .scroll-hint {
      position: absolute;
      right: 0;
      bottom: 0;
      font-family: var(--mono);
      font-weight: 700;
      font-size: var(--14px);
      text-transform: uppercase;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 1rem;
    }

    .chart-container {
        width: 100%;
        padding: 1rem;
        height: 100%;
        /* max-height: 600px; */
        margin: 0 auto;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        transition: opacity var(--1s) ease-in-out; 
        pointer-events: none;
    }

    .chart-container svg {
        width: auto;
        pointer-events: none;
    }

    .avatar-overlay {
        position: absolute;
        pointer-events: none;
        overflow: visible;
    }

    .avatar-html-group {
      position: absolute;
      top: 0;
      left: 0;
      height: var(--avatar-height); 
      width: var(--avatar-width);
      filter: grayscale(100%);
      -webkit-filter: grayscale(100%);
      
      -webkit-transform: translate(var(--x), var(--y));
      transform: translate(var(--x), var(--y));

      transition: 
          transform var(--ms-500) cubic-bezier(0.4, 0, 0.2, 1) var(--delay), 
          opacity var(--ms-500) ease-in-out var(--delay),
          filter var(--ms-500) ease-in-out;
  }

    .avatar-html-group.colorized {
        filter: grayscale(0%);
        -webkit-filter: grayscale(0%);
    }

  .avatar-html-group.scaled {
      transform: translate(var(--x), var(--y)) scale(2);
      z-index: 100;
  }

    .avatar-layer-img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: contain;
  }

    .html-label {
        position: absolute;
        bottom: -24px;
        left: 50%;
        transform: translateX(-50%);
        background: white;
        padding: 8px;
        border-radius: 4px;
        white-space: nowrap;
        font-family: var(--mono);
        font-size: 10px;
        font-weight: 700;
        text-transform: uppercase;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .html-label p {
      margin: 0rem;
      text-align: center;
      line-height: 1;
    }

    .shadow {
      filter: drop-shadow(1px 2px 3px rgba(0, 0, 0, 0.1));
    }
    
    .highlight-band {
        fill: none;
        stroke: var(--ws-orange);
        stroke-width: 3;
        opacity: 0;
        /* transition: transform var(--ms-500) ease-in-out; */
        /* stroke-dasharray: 2, 2; */
    }

    .highlight-band.visible {
        opacity: 1;
        /* transition: opacity var(--ms-500) ease-in-out;  */
    }

    @media (prefers-reduced-motion: reduce) {
      /* Kill transitions on the group AND the rectangle */
      .highlight-band, 
      .highlight-band.visible,
      .highlight-band rect {
          transition: none !important;
          animation: none !important;
      }
  }

    .size-band-group {
       transition: all var(--ms-500) ease-in-out; 
    }

    .omit {
        opacity: 0;
        transition: opacity var(--ms-500) ease-in-out;
    }

    .size-band-group text {
      font-family: var(--mono);
      font-size: var(--14px);
      font-weight: 700;
    }

    .avatar-label {
      text-anchor: middle;
      font-family: var(--mono);
      font-size: var(--12px);
      font-weight: 700;
      text-transform: uppercase
    }

    :global(.x-axis .tick text) {
        font-family: var(--mono);
        font-size: var(--14px);
        font-weight: 700;
      }

    :global(#band-S, #band-L, #band-12, #band-16) {
        transition-delay: var(--ms-500);
    }

    :global(#band-XS, #band-XL) {
        transition-delay: var(--1s);
    }

    :global(#band-XXS, #band-XXL) {
        transition-delay: var(--1-5s);
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
        pointer-events: none;
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
        box-sizing: content-box;
        justify-content: flex-end;
    }

    .step .text p {
      font-size: var(--18px);
    }

    .step .text {
        max-width: 500px;
        width: 90%;
        padding: 1rem 2rem;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
        margin: 0;
        pointer-events: auto;
    }
    .step.step0 {
        margin: 0 auto;
        padding: 0;

    }
    .step-center{
      justify-content: center;
    }

    .step-left {
      justify-content: flex-start;
    }

    .step-right {
      justify-content: flex-end;
    }

    @media (max-width: 1000px) {
      .intro-title {
        width: 100%;
        left: 0;
        padding: 6rem 0 0 0;
        justify-content: flex-start;
      }

      .title-text {
        position: absolute;
        right: 0;
        top: 45%;
        transform: translateY(-50%);
        padding: 0 3rem 0 0;
        max-width: 540px;
      }

      .size-band-group text {
        font-size: var(--12px);
      }

      :global(.x-axis .tick text, .axis-group .tick text) {
        font-size: var(--12px);
      }

    }

    @media (max-width: 850px) {
      .title-text {
        max-width: 440px;
      }

      .step-center, .step-left, .step-right {
        justify-content: center;
      }
    }

    @media (max-width: 700px) {
      .intro-title {
        padding: 5rem 1rem 0 1rem;
      }

      .title-text {
        position: relative;
        transform: translate(0, 0);
        top: auto;
        left: auto;
        right: auto;
        max-width: none;
        padding: 0;
        margin: 0;
        font-size: var(--16px);
      }

      .mono {
        margin: 0;
      }

      .step .text {
        padding: 0.5rem 1.5rem;
        max-width: 400px;
      }

      .step .text p {
        font-size: var(--16px);
      }

      .size-key {
        padding: 0.5rem;
        width: 130px;
      }

      .size-band-group text {
        font-size: 10px;
      }

      /* :global(.size-band-group:nth-child(even) text) {
        opacity: 0;
      } */
    }

    @media (max-width: 500px) {
      .intro-title {
        height: 100%;
        justify-content: space-between;
        padding-bottom: 10rem;
      }

      /* .size-band-group:first-child text {
        transform: translateX(-8px);
      }

      .size-band-group:last-child text {
        transform: translateX(8px);
      } */

      .size-band-group:nth-of-type(odd) text {
        transform: translateY(12px);
      }
    }
</style>