<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';
  import { tweened } from 'svelte/motion';
  import Scrolly from '../helpers/Scrolly.svelte';
  
  import ASTMsizes from "$data/ASTMsizes.json";
  import pointsData from '$data/pointsData_AS.csv';
  import { generateRandomAvatar, determineAvatarSize } from '../utils/avatar-generator.js';
	import { fade } from 'svelte/transition';
  import Ransom from "$components/womens_sizes/Ransom.svelte";
  import Leet from "$components/womens_sizes/Leet.svelte";
  import Text from "$components/womens_sizes/Text.svelte";
  // import checkScrollDir from "../../utils/checkScrollDir.js";
	// import { on } from 'svelte/events';
	import { log } from 'three/tsl';


  /*** SCROLLY ***/
  let value = $state(0);
  let { startStage = 0, endStage = null, introScroll, story } = $props();
  // console.log(story)
  // let filteredStages = $derived(story ? story.slice(
  //     startStage, 
  //     endStage !== null ? endStage + 1 : undefined
  // ) : []);
  let currentStage = $derived(filteredStages?.[value]);
  let currentId = $derived(isNaN(value) ? value : +currentStage?.id);
  let scrollY = $state(0)
  // let scrollDir = $derived(checkScrollDir(scrollY));

  /*** DIMENSIONS ***/
  let containerWidth = $state(0);
  let containerHeight = $state(0);
  let margin = { top: 20, right: 20, bottom: 20, left: 20 };
  let width = $derived(containerWidth - margin.left - margin.right);
  let height = $derived(containerHeight - margin.top - margin.bottom);
  // let avatarWidth = $derived(width / 20);
  // let avatarHeight = $derived(avatarWidth * 1.2);
  let avatarHeight = $derived( height / 6.5)
  let avatarWidth = $derived(avatarHeight * .4)

  /*** SCALES ***/
  const xScale = $derived(d3.scaleLinear().domain(introScroll ? [20, 45]: [20, 50]).range([margin.left, width - margin.right - margin.left]));
  const tickValues = $derived(d3.range(xScale.domain()[0], xScale.domain()[1] + 1));

  /*** TWEENS ***/
  let animatedBand = tweened({ y: 0, height: 0 }, { duration: 500, easing: d3.easeCubicInOut });
  let animatedHighlight = tweened({ x: 0, y: 0, width: 0, height: 0 }, { duration: 500, easing: d3.easeCubicInOut });

  /*** FILTERS ***/
  /*%%%%%%%%%%%%%
  * Allow script to filter here
  *****/

  let ASTMFilters = $derived({ year: story[value].year, sizeRange: story[value].sizeRange });
  let waistlineFilters = $state({ yearRange: story[value].yearRange, race: "all", age: story[value].age });
  let omittedSizeFilters = $derived(story[value].omit ? story[value].omit.split(",") : []);
  let valueKey = $derived("value" +  story[value].age);


  let sizeLabel = $derived(
    valueKey == "value10_11" ? "Age: 10-11" :
    valueKey == "value14_15" ? "Age: 14-15" :
    valueKey == "value20_29" ? "Age: 20-29" : 
    valueKey == "value20over" ? "Age: 20+" :
    ""
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
  let filteredASTM = $derived(filterASTMData(ASTMsizes));
  function filterASTMData(ASTMsizes) {
    return ASTMsizes.filter(item => 
      item.year === story[value].year &&
      item.sizeRange === story[value].sizeRange
    );
  }

  // calculating mapped sizes based on sizeType
  let processedASTMData = $derived(processASTMSizeData(filteredASTM));

  function processASTMSizeData(filteredASTM) {
    let sizeType = story[value].sizeType;
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
        alphaSize: value < 9 ? d[1][0].alphaSize : d[0],
        size: value < 9 ? d[0] : d[1][0].size,
        min,
        max
      }
    });

    return {
      currentSizeRanges: mappedSizes
    }
  } 

  let currentSizeRanges = $derived(processedASTMData.currentSizeRanges);

//   /*** AVATAR GENERATION ***/
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
        .force('y', d3.forceY(d => height / 2 - avatarHeight / 2).strength(d => d.id === "p50" ? 1.0 : 0.15))
        // Increase the collision radius for the highlighted avatar to create a larger, symmetrical gap
        .force('collide', d3.forceCollide(d => d.id === "p50" ? (avatarHeight / 4) : (avatarHeight / 5)))
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
    return data.sort((a, b) => a.y - b.y).map((d, i) => ({
        ...d,
        x: d.x,
        y: d.y
    }));
});


  function setDelay(i, scrollDir) {
    let delay = 0;
    // if (scrollDir == "down" || scrollDir == undefined) {
    //   if (i == 2 || i == 4) {
    //     delay = 0.25
    //   } else if (i == 1 || i == 5) {
    //     delay = 0.5
    //   } else if (i == 0 || i == 6) {
    //     delay = 0.75
    //   } else {
    //     delay = 0;
    //   }
    // } else {
    //   delay = 0;
    // }

    return delay
  }

  $effect(() => {

    // Sets up axis
    if (containerWidth > 0) {
      d3.selectAll("#beeswarm .x-axis")
        .call(d3.axisBottom(xScale).tickValues(tickValues).tickFormat(d => {
          return d % 5 === 0 ? d : "";
        }));
      }

    // Background band tweens
    const targetY = story[value].zoom == 1  ? height / 4 : 1;
    const targetHeight = story[value].zoom == 1 ? (height - margin.top - margin.bottom) / 2 : height - margin.top - margin.bottom - 1;
    animatedBand.set({ y: targetY, height: targetHeight });

    // console.log({targetHeight})
    // in gdoc script, highlightStart is a alphaSize or size based on the sizeType
    // in gdoc script, highlightWidth calculated by taking highlightEnd and subtracting highlightStart 
    if (currentSizeRanges) {
        let highlightStart;
        let highlightWidth;
        // // first find highlightStartRow based on gdoc value highlightStart. if it doesn't exist, default to smallest.
        // let highlightStartRow = currentSizeRanges.find(item => item[0] === story[value].highlightStart);
        // let highlightStart = highlightStartRow ? xScale(highlightStartRow.min) : xScale(currentSizeRanges[0].min);

        // // first find highlightEndRow based on gdoc value highlightEnd. if it doesn't exist, default to largest.
        // let highlightEndRow = currentSizeRanges.find(item => item[0] === story[value].highlightEnd);
        // console.log(highlightEndRow)
        // let highlightWidth = highlightEndRow ?  Math.max(0, xScale(highlightEndRow.max) - xScale(highlightStart.min)) : Math.max(0, xScale(currentSizeRanges[currentSizeRanges.length-1].max) - xScale(currentSizeRanges[0].min));
        // console.log(highlightStart, highlightWidth)
        const stageId = story[value].id;

        if (stageId == 2) {
          highlightStart = xScale(currentSizeRanges[3].min);
          highlightWidth = Math.max(0, xScale(currentSizeRanges[3].max) - xScale(currentSizeRanges[3].min));
        } else if (stageId == 8) {
          highlightStart = xScale(currentSizeRanges[3].min);
          highlightWidth = Math.max(0, xScale(currentSizeRanges[3].max) - xScale(currentSizeRanges[3].min));
        } else if (stageId === 9) {
            highlightStart = xScale(currentSizeRanges[8].min);
            highlightWidth = Math.max(0, xScale(currentSizeRanges[8].max) - xScale(currentSizeRanges[8].min));
        } else if (stageId === 10 || stageId === 11) {
            highlightStart = xScale(currentSizeRanges[10].min);
            highlightWidth = Math.max(0, xScale(currentSizeRanges[10].max) - xScale(currentSizeRanges[10].min));
        } else if (stageId === 12) {
            highlightStart = xScale(currentSizeRanges[0].min);
            highlightWidth = Math.max(0, xScale(currentSizeRanges[5].max) - xScale(currentSizeRanges[0].min));
        }  else if (stageId >= 13) {
            highlightStart = xScale(currentSizeRanges[10].min);
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
</script>

<svelte:window bind:scrollY={scrollY} />
<div class="outer-container" class:intro={introScroll} class:middle={!introScroll}>
  <div class="sticky-container">

    {#if (isNaN(value) || value == 0) && introScroll}
    <div transition:fade={{duration: 500}} class="intro-title">
        <p class="mono"><Leet string="meet your typical" /></p>
        <Ransom string="tween" />
        <!-- <p class="title-text">{@html copy.introText}</p> -->
    </div>
    {/if}

    <div class="visual-container">   
      {#if !story[value].zoom}
        <div transition:fade={{duration: 500}} class="size-key">
          <p>{sizeLabel}</p>
          <p>Size Range: {filteredASTM && filteredASTM.length > 0 ? filteredASTM[0].sizeRange : ''}</p>
        </div>
      {/if}
       <!-- BEESWARM: Hides if hideBeeswarm == 1 on this stage in gdoc -->
      <div id="beeswarm" 
      class="chart-container" 
      bind:clientHeight={containerHeight} 
      bind:clientWidth={containerWidth}
      style="opacity: {story[value].hideBeeswarm ? 0 : 1}">
      
      <svg width={width} height={height}>
      {#if currentSizeRanges}
        {@const minWaist = d3.min(currentSizeRanges, d => d.min)}
        {@const maxWaist = d3.max(currentSizeRanges, d => d.max)}
        <g class="size-backgrounds">
          {#each currentSizeRanges as sizeRange, i}
            {@const x = xScale(sizeRange.min)}
            {@const rectWidth = xScale(sizeRange.max) - x}
            
            <!-- SIZE BANDS: Hides if zoom == 1 on this stage in gdoc -->
            <g class="size-band-group" 
              id="band-{sizeRange.alphaSize}" 
              class:omit={(omittedSizeFilters.includes(sizeRange.size) || story[value].hideBands == 1 )}
              style="transition-delay: {setDelay(i)}s">
              <rect x={x} y={$animatedBand.y} width={rectWidth} height={$animatedBand.height} fill="#9ABBD9"/>
              <text x={x + rectWidth / 2} y={story[value].zoom == 1 || isNaN(value) ? $animatedBand.height*1.5 : height - margin.top - margin.bottom - 20} text-anchor="middle">{story[value].sizeType == "alphaSize" ? sizeRange.alphaSize : sizeRange.size}</text>
            </g>
          {/each}
        </g>

        <!-- ORANGE BAND: Only shows if both highlightStart and highlightEnd exist on this stage in gdoc -->
        <g class="highlight-band" class:visible={story[value].hideBands != 1}>
          <rect x={$animatedHighlight.x} y={$animatedHighlight.y} width={$animatedHighlight.width} height={$animatedHighlight.height}/>
        </g>
      {/if}
      
      <g class="axis x-axis" 
          transform="translate(0, {height - margin.top - margin.bottom})"
          opacity={story[value].zoom != 1 ? 1 : 0}></g>
      
      {#if positionedAvatars() && avatarImages}
        <g class="avatars">
          {#each positionedAvatars() as point, i}
            <g class="avatar-group" 
              id={point.id}
              transform={`translate(${point.x}, ${point.y}) scale(${(point.type == 'percentile' && story[value].zoom == 1) ? 2 : 1})`}
              opacity={point.type == 'percentile' || story[value].zoom != 1 ? 1 : 0}
              style="transition: {story[value].zoom == 1 ? "none" : "all 0.5s ease-in-out" };"
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
    <!-- <div class="text-container">
      {#each story as paragraph}
        {#if value >= paragraph.start && value <= paragraph.end}
        <div in:fade>        
          <Text copy={paragraph.text} />
        </div>
       {/if}
      {/each}
     
    </div> -->
  </div>

  <div class="scrolly-outer">
    <Scrolly bind:value>
      {#each story as stage}
        <div class="step step{stage.id} ">
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
        width: 60%;
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
        width: 90%;
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
        margin-top: -100vh;
    }
    .middle .scrolly-outer {
        margin-top: -60vh;
    }

    .intro .step:nth-child(2) {
      padding-top: 90vh;
    }

    .step {
        height: auto;
        padding: 40vh 10% 70vh;
        display: flex;
        align-items: center;
        font-family: var(--sans);
        font-size: var(--20px);
        box-sizing: content-box;
        justify-content: flex-end;
        /* border: solid red; */
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
    /* .step.step0 {
        margin: 0 auto;
        padding: 0;

    } */
    .step.step1, .step2, .step7, .step11 {
      /* padding-right: 30%; */
      justify-content: center;
    }

     @media (max-width: 900px) {
      .step .text{
        margin: 0 auto;
      }
    }
    .text-container {
      width: 30%;
      display: block;
      position: absolute;
      border: solid green;
      align-content: center;
      justify-content: center;
      right: 0;
      top: 0; 
    }
    .progress-bar {
      position: fixed;
      left:0;
      top:0;
      height: 20px;
      /* background-color: red; */
    }

    @media (max-width: 1000px) {
      .intro-title {
        justify-content: flex-start;
      }
    }
</style>