<script>
    // TODO
    // Mobile
    import * as d3 from 'd3';
    import sizeCharts from "../data/sizeCharts.json";
    import ASTMsizes from "../data/ASTMsizes.json";
    import generatedPercentiles from '../data/generatedPercentiles.json';
    import Scrolly from './helpers/Scrolly.svelte';
    import copy from '../data/copy.json';
    import { flip } from 'svelte/animate';
    import Ransom from "$components/Ransom.svelte";
    import Leet from "$components/Leet.svelte";

    // DIMENSIONS
    let containerHeight = $state(0);
    let containerWidth = $state(0);
    const margin = {top: 0, bottom: 16, left: 32, right: 32}

    // SCROLLY
    let value = $state(0);

    // DATA
    let brandData = d3.groups(sizeCharts, (d) => d.brand);
    const ASTM2021 = ASTMsizes.filter(d => 
            d.year === "2021" && 
            d.sizeRange === "straight"
        ).map(d => ({
                ...d,
                brandName: "ASTM",
                waistMin: parseFloat(d.waist),
                waistMax: parseFloat(d.waist),
                numericSizeMin: d.size,
                numericSizeMax: d.size
        })).filter(d => !isNaN(d.waistMin));
    
    // Adds ASTM to other data
    brandData.unshift(["ASTM", ASTM2021]);

        const filteredBrandData = $derived(() => {
        return brandData
            .map(([brandName, brandSizes]) => {
                const regularSizes = brandSizes.filter(d => 
                    d.sizeRange && d.sizeRange.toLowerCase() === 'regular' &&
                    d.waistMin !== null && d.waistMin !== undefined
                );
                const allSizesAreBelowMedian = regularSizes.every(d => {
                    const waistMax = d.waistMax ?? d.waistMin;
                    return waistMax <= medianWaistline;
                });
                const shouldDisplayBrand = brandName === "ASTM" || (regularSizes.length > 0 && allSizesAreBelowMedian);

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

    // TOOLTIP
    let tooltipVisible = $state(false);
    let tooltipBrand = $state();
    let tooltipAlphaSize = $state();
    let tooltipNumericSizeMin = $state();
    let tooltipNumericSizeMax = $state();
    let tooltipWaistMin = $state();
    let tooltipWaistMax = $state();
    let tooltipSizeRange = $state();
    let tooltipX = $state();
    let tooltipY = $state();

    function showTooltip(size, e) {
        tooltipBrand = size.brand || "ASTM";
        tooltipAlphaSize = size.alphaSize;
        tooltipNumericSizeMin = size.numericSizeMin;
        tooltipNumericSizeMax = size.numericSizeMax;
        tooltipWaistMin = size.waistMin;
        tooltipWaistMax = size.waistMin;
        tooltipSizeRange = size.sizeRange.toLowerCase();
        tooltipX = e.x;
        tooltipY = e.y;
        tooltipVisible = true;
    }

    function hideTooltip() {
        tooltipVisible = false;
    }
    
    // SCALE
    const xScale = $derived(
        d3.scaleLinear()
            .domain([20, 65])
            .range([0, containerWidth - margin.left - margin.right])
    );

    // MEDIAN
    const medianWaistline = (() => {
        const targetData = generatedPercentiles.find(d => 
            d.yearRange === "2021-2023" && 
            d.race === "all" && 
            d.age === "20 and over"
        );
        return targetData ? targetData.percent50 : null;
    })();

    // REACTIVE 
    $effect(() => {
        if (containerWidth > 0) {
            d3.select("#size-chart .x-axis g")
                .call(d3.axisBottom(xScale));
        }
    })
</script>

<div class="outer-container">
    <div class="text-block">
        {#each copy.ASTMtransition as block}
            <div class="subtitle">
                {#if block.subhed}
                    <h3>
                        <Leet string="Brands don't even use the" />
                        <Ransom string="universal" />
                        <Ransom string="size" />
                    </h3>
                {/if}
                <p>{@html block.text}</p>
            </div>
        {/each}
    </div>
    <div class="sticky-container">
        <div class="visual-container">
            <div id="size-chart" class="chart-container" bind:clientHeight={containerHeight} bind:clientWidth={containerWidth}>
                 {#each filteredBrandData() as brand (brand.brandName)}
                    <!-- Get all sizes for each range -->
                    {@const regularSizes = brand.brandSizes.filter(d => d.sizeRange && d.sizeRange.toLowerCase() === 'regular' || brand.brandName == "ASTM")}
                    {@const plusSizes = brand.brandSizes.filter(d => d.sizeRange && d.sizeRange.toLowerCase() === 'plus')}

                    <!-- Calculate min/max waist values -->
                    {@const brandMinWaistReg = d3.min(regularSizes, (d) => d.waistMin)}
                    {@const maxWaistMinReg = d3.max(regularSizes, d => d.waistMin)}
                    {@const largestRegSize = regularSizes.find(d => d.waistMin === maxWaistMinReg)}
                    {@const brandMaxWaistReg = largestRegSize ? (largestRegSize.waistMax ?? largestRegSize.waistMin) : null}

                    {@const brandMinWaistPlus = d3.min(plusSizes, (d) => d.waistMin)}
                    {@const maxWaistMinPlus = d3.max(plusSizes, d => d.waistMin)}
                    {@const largestPlusSize = plusSizes.find(d => d.waistMin === maxWaistMinPlus)}
                    {@const brandMaxWaistPlus = largestPlusSize ? (largestPlusSize.waistMax ?? largestPlusSize.waistMin) : null}

                    <div id={brand.brandName} class="brand-row" style="padding: {(containerHeight-100)/brandData.length*0.5}px;" animate:flip>
                        <!-- Line for regular sizes -->
                        {#if brandMinWaistReg && brandMaxWaistReg}
                            <div
                                class="brand-line brand-line-reg"
                                style="
                                    left: {xScale(brandMinWaistReg)}px;
                                    width: {xScale(brandMaxWaistReg) - xScale(brandMinWaistReg)}px;"
                            ></div>
                        {/if}
                        <!-- Line for plus sizes -->
                        {#if brandMinWaistPlus && brandMaxWaistPlus}
                            <div
                                class="brand-line brand-line-plus"
                                style="
                                    left: {xScale(brandMinWaistPlus)}px;
                                    width: {xScale(brandMaxWaistPlus) - xScale(brandMinWaistPlus)}px;
                                    opacity: {(value < 2 || value == undefined) ? 0 : 1}"
                            ></div>
                        {/if}
                        <!-- Pills and circles for each specific size point -->
                        {#each brand.brandSizes as size}
                            {@const hasRange = size.waistMax !== null && size.waistMax !== undefined && size.waistMax !== size.waistMin}
                            <div style="opacity: {size.sizeRange?.toLowerCase() == 'plus' && (value < 2 || value == undefined) ? 0 : 1}">
                                <!-- If there is a range render pills and min/max circles -->
                                {#if hasRange}
                                    <div class="pill pill-{size.sizeRange?.toLowerCase()}"
                                        style="left: {xScale(size.waistMin)}px;
                                            width: {xScale(size.waistMax) - xScale(size.waistMin)}px;">
                                    </div>
                                    <div onmouseenter={(e) => showTooltip(size, e)} 
                                        onmouseleave={hideTooltip} 
                                        role="tooltip"
                                        class="size-circle size-circle-{size.sizeRange}" 
                                        style="left: {xScale(size.waistMin)}px;"></div>
                                    <div 
                                        onmouseenter={(e) => showTooltip(size, e)} 
                                        onmouseleave={hideTooltip} 
                                        role="tooltip"
                                        class="size-circle size-circle-{size.sizeRange}" 
                                        style="left: {xScale(size.waistMax)}px;"></div>
                                <!-- Else just the min circle -->
                                {:else}
                                    <div 
                                        onmouseenter={(e) => showTooltip(size, e)} 
                                        onmouseleave={hideTooltip} 
                                        role="tooltip"
                                        class="size-circle size-circle-{size.sizeRange}" 
                                        style="left: {xScale(size.waistMin)}px;"></div>
                                {/if}
                            </div>
                        {/each}
                        <!-- Brand name label -->
                        <div class="brand-name" style="left: {xScale(brandMinWaistReg)}px;">
                            <p>{brand.brandName}</p>
                        </div>
                    </div>
                {/each}
                <!-- Median markings -->
                <div class="median" style="left: {xScale(medianWaistline) + margin.left}px">
                    <div class="median-label">Median waist: {medianWaistline}" </div>
                    <div class="median-line" style="left: {xScale(medianWaistline)}px"></div>
                </div>
                <!-- X Axis -->
                <div class="x-axis">
                    <svg>
                        <g class="axis" transform="translate({margin.left}, {margin.bottom})"></g>
                    </svg>
                </div>
            </div>
        </div>
    </div>

    <!-- Tooltip -->
    <div id="tooltip" class:visible={tooltipVisible} style="left: {tooltipX}px; top: {tooltipY}px">
        <p>{tooltipBrand}</p>
        <p><strong>Size range:</strong> {tooltipSizeRange}</p>
        <p><strong>Alpha size:</strong> {tooltipAlphaSize}</p>
        <p><strong>Numeric size:</strong> 
            {#if tooltipNumericSizeMax}
                {tooltipNumericSizeMin}–{tooltipNumericSizeMax}
            {:else}
                {tooltipNumericSizeMin}
            {/if}
        </p>
        <p><strong>Waist size:</strong> {tooltipWaistMin}–{tooltipWaistMax}"</p>
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
   #tooltip {
        position: fixed;
        opacity: 0;
        background: var(--color-bg);
        border-radius: 8px;
        padding: 1rem;
        z-index: 1000;
        font-family: var(--mono);
        font-size: var(--12px);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
        transition: opacity 100ms linear;
        pointer-events: none;
    }

    #tooltip.visible {
        opacity: 1;
    }

    #tooltip p {
        margin: 0;
    }

    #tooltip p:first-of-type {
        font-weight: 700;
        text-transform: uppercase;
    }

    .outer-container {
        position: relative;
        width: 100%;
    }

    .text-block {
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: center;
        padding: 2rem;
        margin-top: 8rem;
    }

    .subtitle {
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: center;
    }

    .text-block h3 {
        max-width: 800px;
        text-align: center;
    }
    .text-block p {
        width: min(100%, 550px);
        margin-bottom: 60px;
        margin-top: 60px;
        font-size: 1.1rem;
        line-height: 1.6;
        text-align: left;
        font-family: var(--sans);
        font-size: var(--18px);
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
        pointer-events: none;
    }

    .median-line {
        width: 2px;
        height: 100%;
        border-left: 2px dashed var(--ws-orange);
    }

    .median-label {
        font-family: var(--mono);
        text-transform: uppercase;
        font-weight: 700;
        font-size: var(--12px);
        color: var(--ws-orange);
    }

    .brand-row {
        width: 100%;
        position: relative;
    }

    .size-circle {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        transition: all 500ms linear;
        cursor: pointer;
        background: var(--ws-green);
    }

    .size-circle-Regular {
        background: var(--ws-blue);
    }

    .size-circle-Plus {
        background: var(--ws-purple);
    }

    #ATSM .size-circle {
        background: var(--ws-green);
    }

    .size-circle:hover {
        transform: translateY(-50%) scale(2);
    }

    .brand-line {
        position: absolute;
        top: 50%;
        height: 2px;
        transform: translateY(-50%);
        z-index: -1;
        background: var(--ws-green);
        transition: all 250ms linear;
    }

    .brand-line-reg {
        background: var(--ws-blue);
    }

    .brand-line-plus {
        background: var(--ws-purple);
    }

    #ASTM .brand-line {
        background: var(--ws-green);
    }

    .brand-name {
        position: absolute;
        top: calc(50% - 1rem); 
        transform: translateY(-50%);
        font-family: var(--mono);
        text-transform: uppercase;
        font-weight: 700;
        font-size: var(--14px);
        pointer-events: none;
    }

    .pill {
        position: absolute;
        top: 50%;
        height: 8px;
        transform: translateY(-50%);
        z-index: -1;
        opacity: 0.2;
    }

    .pill-regular {
        background: var(--ws-blue);
    }

    .pill-plus {
        background: var(--ws-purple);
    }

    .x-axis {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 50px;
        margin: 0;
        padding: 0 ;
        z-index: 1000;
    }

    .x-axis svg {
        width: 100%;
        height: 100%;
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
        font-size: var(--18px);
    }
    .step .text {
        max-width: 500px;
        width: 90%;
        padding: 20px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
        margin: 0;
        pointer-events: auto;
    }
</style>
