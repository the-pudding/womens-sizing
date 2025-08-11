<script>
    // TO-DO
    // fix scales
    // add in pills
    // add in mouse events
    import * as d3 from 'd3';
    import sizeCharts from "../data/sizeCharts.json";
    import generatedPercentiles from '../data/generatedPercentiles.json';
    import Scrolly from './helpers/Scrolly.svelte';
    import copy from '../data/copy.json';
    import { flip } from 'svelte/animate';

    let containerHeight = $state(0);
    let containerWidth = $state(0);
    let value = $state(0);

    const brandData = d3.groups(sizeCharts, (d) => d.brand);
    const xScale = $derived(
        d3.scaleLinear()
            .domain([20, 65])
            .range([0, containerWidth - 64])
    );

    const medianWaistline = (() => {
        const targetData = generatedPercentiles.find(d => 
            d.yearRange === "2021-2023" && 
            d.race === "all" && 
            d.age === "20 and over"
        );
        return targetData ? targetData.percent50 : null;
    })();

    const filteredBrandData = $derived(() => {
        return brandData
            .map(([brandName, brandSizes]) => {
                const regularSizes = brandSizes.filter(d => 
                    d.sizeRange && d.sizeRange.toLowerCase() === 'regular' &&
                    d.waistMin !== null && d.waistMin !== undefined
                );
                const hasNearMedianSize = regularSizes.some(d => {
                    const waistMax = d.waistMax ?? d.waistMin;
                    return waistMax >= (medianWaistline - 1);
                });
                const shouldDisplayBrand = regularSizes.length > 0 && hasNearMedianSize;

                return {
                    brandName: brandName,
                    brandSizes: brandSizes,
                    shouldDisplayBrand: shouldDisplayBrand,
                };
            })
            .filter(brand => {
                return ((value <= 0 || value === undefined) && brand.shouldDisplayBrand) || value > 0;
            });
    });

    console.log(brandData)

    $effect(() => {
        console.log("Current value:", value);
        
        if (containerWidth > 0) {
            d3.select(".x-axis g")
                .call(d3.axisBottom(xScale));
        }
    })
</script>

<div class="outer-container">
    
    <div class="sticky-container">
        <div class="visual-container">
            <div id="size-chart" class="chart-container" bind:clientHeight={containerHeight} bind:clientWidth={containerWidth}>
                <div class="median" style="left: {xScale(medianWaistline)}px">
                    <div class="median-label">Median waist: {medianWaistline}" </div>
                    <div class="median-line"></div>
                </div>
                 {#each filteredBrandData() as brand (brand.brandName)}
                    {@const brandMinWaistReg = d3.min(brand.brandSizes, (d) => d.sizeRange && d.sizeRange.toLowerCase() === 'regular' ? d.waistMin : null)}
                    {@const brandMaxWaistReg = d3.max(brand.brandSizes, (d) => d.sizeRange && d.sizeRange.toLowerCase() === 'regular' ? d.waistMin : null)}
                    {@const brandMinWaistPlus = d3.min(brand.brandSizes, (d) => d.sizeRange && d.sizeRange.toLowerCase() === 'plus' ? d.waistMin : null)}
                    {@const brandMaxWaistPlus = d3.max(brand.brandSizes, (d) => d.sizeRange && d.sizeRange.toLowerCase() === 'plus' ? d.waistMin : null)}
                    <div class="brand-row" animate:flip>
                        {#each brand.brandSizes as size, i}
                            <div class="size-circle size-circle-{size.sizeRange}" 
                                style="left: {xScale(size.waistMin)}px;
                                opacity: {size.sizeRange.toLowerCase() == 'plus' && value < 2 ? 0 : 1}"></div>
                        {/each}
                        {#if brandMinWaistReg && brandMaxWaistReg}
                            <div
                                class="brand-line brand-line-reg"
                                style="
                                    left: {xScale(brandMinWaistReg)}px;
                                    width: {xScale(brandMaxWaistReg) - xScale(brandMinWaistReg)}px;
                                "
                            ></div>
                        {/if}
                        {#if brandMinWaistPlus && brandMaxWaistPlus}
                            <div
                                class="brand-line brand-line-plus"
                                style="
                                    left: {xScale(brandMinWaistPlus)}px;
                                    width: {xScale(brandMaxWaistPlus) - xScale(brandMinWaistPlus)}px;
                                    opacity: {value < 2 ? 0 : 1}"
                            ></div>
                        {/if}
                        <div class="brand-name" style="left: {xScale(brandMinWaistReg)}px;">
                            <p>{brand.brandName}</p>
                        </div>
                    </div>
                {/each}
                <div class="x-axis">
                    <svg>
                        <g class="axis" transform="translate(0, 0)"></g>
                    </svg>
                </div>
            </div>
        </div>
    </div>
    
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
        height: 90svh;
        margin: 0 auto;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }

    .median {
        position: absolute;
        top: 0;
        transform: translate(-50%, 0);
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .median-line {
        width: 1px;
        height: 100%;
        background: black;
    }

    .median-label {
        font-family: var(--mono);
        text-transform: uppercase;
        font-weight: 700;
        font-size: var(--14px);
    }

    .brand-row {
        width: 100%;
        padding: 1.5rem;
        position: relative;
    }

    .size-circle {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }

    .size-circle-Regular {
        background: var(--ws-blue);
    }

    .size-circle-Plus {
        background: var(--ws-orange);
        transition: all 250ms linear;
    }

    .brand-line {
        position: absolute;
        top: 50%;
        height: 1px;
        transform: translateY(-50%);
        z-index: -1;
    }

    .brand-line-reg {
        background: var(--ws-blue);
    }

    .brand-line-plus {
        background: var(--ws-orange);
        transition: all 250ms linear;
    }

    .brand-name {
        position: absolute;
        top: calc(50% - 1rem); 
        transform: translateY(-50%);
        font-family: var(--mono);
        text-transform: uppercase;
        font-weight: 700;
        font-size: var(--14px);
    }

    .x-axis {
        position: absolute;
        bottom: 0;
        left: 32px;
        width: calc(100% - 4rem);
        height: 50px;
        margin: 0;
        padding: 0 ;
        z-index: 1000;
    }

    .x-axis svg {
        width: 100%;
        height: 100%;
    }
    
    .x-axis .domain {
        stroke: var(--color-fg);
    }

    .x-axis .tick line {
        stroke: var(--color-fg);
    }

    .x-axis .tick text {
        font-family: var(--mono);
        font-weight: 700;
        font-size: var(--14px);
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

    .text-block h3 {
        max-width: 800px;
        margin: 0 auto;
        text-align: center;
    }
    .text-block p {
        width: min(100%, 550px);
        margin: 0 auto;
        margin-bottom: 60px;
        margin-top: 60px;
    }
</style>