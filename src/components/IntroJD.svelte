<!-- Intro.svelte -->
<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
    import generatedPercentiles from '../data/generatedPercentiles.json';
    import ASTMsizes from "../data/ASTMsizes.json";
    import copy from "../data/copy.json";
    import { annotate } from 'rough-notation';
    import { fade } from 'svelte/transition';
    
    import { generateRandomAvatar } from './utils/avatar-generator.js';
    import Scrolly from './helpers/Scrolly.svelte';
    import Ransom from "$components/Ransom.svelte";
    import Leet from "$components/Leet.svelte";
  
    let containerHeight = $state(0);
	let containerWidth = $state(0);
    let margin = { top: 20, right: 20, bottom: 40, left: 20 };
    let width = $derived(containerWidth - margin.left - margin.right);
    let height = $derived(containerHeight - margin.top - margin.bottom);
    let avatarWidth = $derived(width / 15);
    let avatarHeight = $derived(avatarWidth * 1.4);

    let value = $state(0);
    let svg;
    let { startStage = 0, endStage = null, introScroll = true } = $props();
    let filteredStages = $derived(copy.intro ? copy.intro.slice(
        startStage, 
        endStage !== null ? endStage + 1 : undefined
    ) : []);

    // SCALE
    const xScale = $derived(
        d3.scaleLinear()
            .domain([20, 65])
            .range([0, width])
    );

    // DATA
    //cdc waistline data
    let yearRange = $state();
    let race = $state();

    //ASTM standard sizing
    let ASTMfilter = null;
    let currentSizeRanges = [];
    let age = $state();
    let ASTMyear = $state("2021");
    let ASTMrange = $state("straight");

    let filteredData = $derived(ASTMsizes.filter(d => d.year == ASTMyear && d.sizeRange == ASTMrange));
    let bandData = $derived(d3.groups(filteredData, (d) => d.alphaSize));
    let cleanBandData = $derived(
        bandData.map((d,i) => ({ 
            ...d, 
            waistMin: d[1].length == 1 ? +d[1][0].waist : +d[1][0].waist,
            waistMax: d[1].length == 1 && i == 0 ? d3.min(bandData[i+1][1], d => +d.waist) 
                : d[1].length == 1 && i == bandData.length - 1 ? d3.max(bandData[i-1][1], d => +d.waist)
                : +d[1][1].waist
        }))
    );

    onMount(() => {

    });

    $effect(() => {
        console.log(cleanBandData);

        if (containerWidth > 0) {
            d3.select(".x-axis")
                .call(d3.axisBottom(xScale));
        }
    })
</script>
  
<div class="outer-container">
    <div class="sticky-container">
        <div class="visual-container">
            {#if introScroll && (value == undefined || value == 0)}
                <div transition:fade={{duration: 500}} class="intro-title">
                    <p class="mono"><Leet string="meet your typical" /></p>
                    <Ransom string="tween" />
                    <p class="title-text">{@html copy.introText}</p>
                </div>
            {/if}
            <div class="chart-container" bind:clientHeight={containerHeight} bind:clientWidth={containerWidth}>
                <svg bind:this={svg} width={width} height={height}>
                    <g class="size-backgrounds">
                        <!-- for each of the ranges, add a g element with a rect and text inside -->
                        {#each cleanBandData as sizeRange, i}
                            {@const x = xScale(sizeRange.waistMin)}
                            {@const rectWidth = xScale(sizeRange.waistMax) - x}
                            <g class="size-band-group">
                                <!-- assign data and styles inline -->
                                <rect
                                    x={x}
                                    y={0}
                                    width={rectWidth}
                                    height={height}
                                    class="size-band"
                                />
                                <text
                                    x={x + rectWidth / 2}
                                    y={height}
                                >  {sizeRange[1][0].alphaSize} </text>
                            </g>
                        {/each}
                    </g>
                    <!-- group for x-axis -->
                    <g class="axis x-axis" transform="translate(0, {height})"></g>
                </svg>
            </div>
        </div>
        {#if (introScroll && value !== undefined && value >= 1) || (!introScroll && value !== undefined)}
            <div transition:fade={{duration: 500}} class="age-container">
                <p>Ages
                {#key filteredStages[value].age}
                    {filteredStages[value].age}
                {/key}
                </p>
            </div>
        {/if}
    </div>
    
    <div class="scrolly-outer">
        <Scrolly bind:value>
            {#each filteredStages as stage, i}
                <div class="step" 
                     class:centered={stage.stepPosition === "center"} 
                     class:centered-vertical={stage.stepPosition === "center-vertical"} 
                     class:right-aligned={!stage.stepPosition || stage.stepPosition === "right"}
                     class:left-aligned={!stage.stepPosition || stage.stepPosition === "left"}>
                    {#if stage.text}
                        <div class="text">
                            <p>{@html stage.text}</p>
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
        height: 100vh;
        width: 100%;
        z-index: 1;
        padding: 2rem;
    }

    .age-container {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        font-family: var(--mono);
        font-weight: 700;
        font-size: var(--16px);
        text-transform: uppercase;
        gap: 0.5rem;
    }

    .age-num {
        width: 120px;
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

    .mono {
        font-family: var(--mono);
        font-weight: 700;
        font-size: var(--24px);
    }

    .title-text {
        font-family: var(--sans);
        font-size: var(--20px);
        max-width: 500px;
    }
  
    .visual-container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .chart-container {
        width: 100%;
        height: 100%;
        margin: 0 auto;
        padding: 5px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }
  
    svg {
        display: block;
        width: 100%;
        height: 100%;
    }

    :global(.x-axis-labels .tick text) {
        font-family: var(--mono);
        font-size: var(--14px);
        font-weight: 700;

    }
    
    .scrolly-outer {
        position: relative;
        z-index: 2;
    }
    
    .step {
        height: 100vh;
        display: flex;
        align-items: center;
        padding: 0 2rem;
        font-family: var(--sans);
        font-size: var(--20px);
    }
    
    .step.right-aligned {
        justify-content: flex-end;
        padding-right: 10rem;
    }
    .step.left-aligned {
        justify-content: flex-start;
        padding-left: 2rem;
    }
    
    .step.centered {
        justify-content: center;
        align-items: center;
    }
    
    .step.centered-vertical {
        justify-content: center;
        align-items: center;
    }
    
    .step .text {
        max-width: 500px;
        width: 90%;
        padding: 20px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        margin: 0;
    }
    
    :global(.avatar-group) {
        transition: transform 0.75s ease, opacity 0.5s ease;
    }
    
    :global(.size-band) {
        transition: opacity 0.5s ease, fill 0.5s ease;
    }

    :global(.size-band-highlight) {
        transition: opacity 0.5s ease, stroke 0.5s ease;
    }

    :global(.size-band-text) {
        fill: var(--color-fg);
        font-family: var(--mono);
        font-size: 16px;
        font-weight: 700;
    }

    :global(.bold) {
        font-family: var(--mono);
        font-weight: 700;
        text-transform: uppercase;
    }
</style>