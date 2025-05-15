<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
    import waistlinesData from '../data/waistlines.json';
    import ASTMsizes from "../data/ASTMsizes.json";
    import { 
      filterASTMData, 
      processASTMSizeData, 
      findSizesForMeasurement,
      generateDataPoints,
      createForceSimulation,
      formatTooltipText
    } from './utils/chart-utilities.js';
    import { generateRandomAvatar, determineAvatarSize, AVATAR_SIZE } from './utils/avatar-generator.js';

    let svg;
    let containerHeight = $state(0);
	let containerWidth = $state(0);
    let margin = { top: 20, right: 20, bottom: 40, left: 20 };
    let width = $derived(containerWidth - margin.left - margin.right);
    let height = $derived(containerHeight - margin.top - margin.bottom);
    let filteredASTM = $state([]);
    let currentSizeRanges = $state([]);
    let allSizeData = $state([]);
    let filteredData = $state([]);  

    let { points, xRange } = $derived(
        generateDataPoints(filteredData, currentSizeRanges)
    );

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

    const xScale = $derived(
        d3.scaleLinear().domain(xRange).range([0, width])
    );

    let { 
      waistlineFilters = {
        yearRange: "2015-2018",
        race: "all",
        age: "20 and over"
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

    let simulation = $derived(() => {
        if (!avatarData.length || !xScale) return null;

        const data = avatarData.map(d => ({ ...d })); // clone to avoid mutating original

        const sim = d3.forceSimulation(data)
            .force('x', d3.forceX(d => xScale(d.value)).strength(0.95))
            .force('y', d3.forceY(d => {
                return d.type === 'percentile' ? height * 0.5 : height * 0.4;
            }).strength(0.05))
            .force('collide', d3.forceCollide(d => { return (width / 15) * 1.4 / 4}))
            .stop();

        const ticks = Math.ceil(Math.log(sim.alphaMin()) / Math.log(1 - sim.alphaDecay()));
        for (let i = 0; i < ticks; ++i) sim.tick();

        const avatarWidth = width / 15;
        const avatarHeight = avatarWidth * 1.4;

        data.forEach(d => {
            d.x = Math.max(0, Math.min(width - avatarWidth, d.x));
            d.y = Math.max(0, Math.min(height - avatarHeight, d.y));
        });

        // return nodes with x/y
        return data.sort((a, b) => a.y - b.y);
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

    $effect(() => {
        if (simulation) {
		console.log('simulation result:', simulation());
	}
    });
</script>

<div class="chart-container" bind:clientHeight={containerHeight} bind:clientWidth={containerWidth}>
    <svg bind:this={svg} width={width} height={height}>
        <g class="size-backgrounds">
            {#each currentSizeRanges as sizeRange, i}
                {@const x = xScale(sizeRange.min)}
                {@const rectWidth = xScale(sizeRange.max) - x}
                <g class="size-band-group">
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
        {#if avatarData.length > 0}
            <g class="avatars">
                {#if simulation}
                    {@const sim = simulation()}
                    {#each avatarData as avatar, i}
                        {#if sim[i]}
                            <g class="avatar-group">
                                {#each avatar.avatar.layers as imgPath}
                                    {@const imageWidth = 100}
                                    {@const imageHeight = 100}
                                    <image
                                        x={sim[i].x}
                                        y={sim[i].y}
                                        width={width/15}
                                        height={(width / 15) * 1.4}
                                        href={imgPath.path}
                                        class="avatar"
                                        class:grayscale={avatar.type !== 'percentile'}
                                    />
                                {/each}
                            </g>
                        {/if}
                    {/each}
                {/if}
            </g>
        {/if}
    </svg>
</div>

<style>
    .chart-container {
      width: calc(100% - 4rem);
      height: 80vh;
      margin: 0 auto;
      padding: 5px;
      border: 1px solid #eee;
      border-radius: 8px;
      background-color: white;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .grayscale {
        filter: grayscale(100%);
    }
</style>