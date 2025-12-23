<script>
    // Imports roughly stay the same
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
    import waistlinesData from '../data/waistlines.json';
    import ASTMsizes from "../data/ASTMsizes.json";
    import { 
      filterASTMData, 
      processASTMSizeData, 
      findSizesForMeasurement,
      generateDataPoints
    } from './utils/chart-utilities.js';
    import { generateRandomAvatar, determineAvatarSize} from './utils/avatar-generator.js';
	import { shadow } from 'three/tsl';

    // Variables
    let svg;
    let value 

    // Dimensions: grabs the container width and height, adds margins, and calulates chart width and height
    let containerHeight = $state(0);
	let containerWidth = $state(0);
    let margin = { top: 20, right: 20, bottom: 40, left: 20 };
    let width = $derived(containerWidth - margin.left - margin.right);
    let height = $derived(containerHeight - margin.top - margin.bottom);

    // Sets the avatar dimensions based on the chart width and height
    let avatarWidth = $derived(width / 15);
    let avatarHeight = $derived(avatarWidth * 1.4);

    // Data
    let filteredASTM = $state([]);
    let currentSizeRanges = $state([]);
    let allSizeData = $state([]);
    let filteredData = $state([]); 

    // Props
    let { 
      scrollIndex,
      waistlineFilters = {
        yearRange: "2015-2018",
        race: "all",
        age: "10–11"
      },
    
      ASTMFilters = {
        year: "2021",
        sizeRange: "straight"
      },
      
      omittedSizes = ["XXL", "XL", "XS", "XXS"], 
    //   omittedSizes = [], 
      
      colors = {
        dots: '#4682b4',
        percentileDot: '#e41a1c',
        sizeBandBase: '#C2D932'
      }
    } = $props();

    // Generating points
    let { points, xRange } = $derived(
        generateDataPoints(filteredData, currentSizeRanges)
    );

    // Generate random avatar
    let avatarData = $derived(points.map(point => {
        // Determine the appropriate avatar size type
        const avatarSizeType = determineAvatarSize(point, allSizeData, 
                               value => findSizesForMeasurement(allSizeData, value));
        
        return {
          ...point,
          avatarSizeType: avatarSizeType,
          avatar: generateRandomAvatar(avatarSizeType)
        };
    }));

    // Sets scale and axis
    const xScale = $derived(
        d3.scaleLinear().domain(xRange).range([0, width])
    );
    const tickVals = Array.from({ length: 31 }, (_, i) => i);
    // console.log(tickVals);
    // Running simulation to position avatars
    let positionedAvatars = $derived(() => {
        // console.log("🔥 positionedAvatars recomputing");

        const avatars = avatarData;
        
        if (!avatars || !xScale || !width || !height || avatars.length === 0) return [];

        const data = avatars.map(d => ({ ...d }));

        const avatarW = width / 15;
        const avatarH = avatarW * 1.4;

        const sim = d3.forceSimulation(data)
            .force('x', d3.forceX(d => xScale(d.value)).strength(0.95))
            .force('y', d3.forceY(d => d.type === 'percentile' ? height / 2 : height * 0.4).strength(0.05))
            .force('collide', d3.forceCollide(avatarH / 4))
            .stop();

        const ticks = Math.ceil(Math.log(sim.alphaMin()) / Math.log(1 - sim.alphaDecay()));
        for (let i = 0; i < ticks; ++i) sim.tick();

        data.forEach(d => {
            d.x = Math.max(0, Math.min(width - avatarW, d.x));
            d.y = d.type === 'percentile'
                ? (height - avatarH) / 2
                : Math.max(0, Math.min(height - avatarH, d.y));
        });

        return avatars.map((avatar, i) => ({
            ...avatar,
            x: data[i]?.x,
            y: data[i]?.y
        })).sort((a, b) => {
            if (a.type === 'percentile' && b.type !== 'percentile') return 1;
            if (a.type !== 'percentile' && b.type === 'percentile') return -1;
            return 0;
        });
    });

    onMount(() => {
        //applies filters
      filteredASTM = filterASTMData(ASTMsizes, ASTMFilters);
      
      const sizeData = processASTMSizeData(filteredASTM, omittedSizes, colors.sizeBandBase);
      currentSizeRanges = sizeData.currentSizeRanges;
      allSizeData = sizeData.allSizeData;
      
      filteredData = waistlinesData.find(item => 
        item.yearRange === waistlineFilters.yearRange &&
        item.race === waistlineFilters.race &&
        item.age === waistlineFilters.age
      );
    });

    // Event handlers
    function handleMouseEnter(d) {
        // console.log(d)
    }

    function handleMouseLeave(d) {
        
    }

    function updateChart(scrollIndex) {
        if (scrollIndex == 0) {
            // console.log("step0")
        } else if (scrollIndex == 1) {
            // console.log("step1")
        } else {
            // console.log("other steps")
        }
    }

    // Updating when variables change
    $effect(() => {
        updateChart(scrollIndex);
    });
</script>

<div class="outer-container">
    <div class="sticky-container">
        <div class="visual-container">
            <div id="beeswarm" class="chart-container" bind:clientHeight={containerHeight} bind:clientWidth={containerWidth}>
                <svg bind:this={svg} width={width} height={height}>
                    <!-- group for size color bands -->
                    <g class="size-backgrounds">
                        <!-- for each of the ranges, add a g element with a rect and text inside -->
                        {#each currentSizeRanges as sizeRange, i}
                            {@const x = xScale(sizeRange.min)}
                            {@const rectWidth = xScale(sizeRange.max) - x}
                            <g class="size-band-group">
                                <!-- assign data and styles inline -->
                                <rect
                                    x={x}
                                    y={0}
                                    width={rectWidth}
                                    height={height}
                                    fill={sizeRange.color}
                                    opacity={sizeRange.opacity}
                                    class="size-band"
                                />
                                <text
                                    x={x + rectWidth / 2}
                                    y={height}
                                >  {sizeRange.size} </text>
                            </g>
                        {/each}
                    </g>
                    <!-- group for x-axis -->
                    <g class="axis x-axis">
                        <!-- for each tick, add a g element with a line and a tick -->
                        {#each tickVals as tick, i}
                            {@const x = xScale(tick)}
                            <g
                                class="tick tick-{i}"
                                transform="translate({x},0)"
                            >
                                <line class="gridline" y1={height} y2="0" x1="0" x2="0" />
                                <text x={0} y={20} dx="" dy="" text-anchor={"middle"}
                                    >{tick}</text
                                >
                            </g>
                        {/each}
                    </g>
                    <!-- group avatars (only if data is ready) -->
                    {#if positionedAvatars()?.length > 0}
                        <g class="avatars">
                            <!-- for each avatar, add a g element -->
                            {#each positionedAvatars() as avatar}
                            <!-- hover events placed here -->
                            <g
                                class="avatar-group"
                                role="group"
                                onmouseenter={() => handleMouseEnter(avatar)}
                                onmouseleave={() => handleMouseLeave(avatar)}
                            >
                                <!-- for each avatar layer, add an image -->
                                {#each avatar.avatar.layers as imgPath}
                                    <!-- assign data and styles inline -->
                                    <image
                                        x={avatar.x}
                                        y={avatar.y}
                                        width={avatarWidth}
                                        height={avatarHeight}
                                        href={imgPath.path}
                                        class="avatar"
                                        class:grayscale={avatar.type !== 'percentile'}
                                        class:shadow={avatar.type === 'percentile'}
                                    />
                                {/each}
                            </g>
                            {/each}
                        </g>
                        {/if}
                </svg>
            </div>
        </div>
    </div>
    
    <!-- Scrolly -->
    <div class="scrolly-outer">
        <Scrolly bind:value>
            {#each copy.sizeCharts as stage, i}
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
    .chart-container {
      width: 100%;
      height: 100svh;
      margin: 0 auto;
      padding: 5px;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .grayscale {
        filter: grayscale(100%);
    }

    .shadow {
        filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.4));
    }
</style>