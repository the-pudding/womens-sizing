<script>
    // TODO
    // Mobile
    import * as d3 from 'd3';
    import sizeCharts from "$data/sizeCharts.json";
    import ASTMsizes from "$data/ASTMsizes.csv";
    import generatedPercentiles from '$data/generatedPercentiles.json';
    import Scrolly from '../helpers/Scrolly.svelte';
    import copy from '$data/copy.json';
    import { flip } from 'svelte/animate';
    import Ransom from "$components/womens_sizes/Ransom.svelte";
    import Leet from "$components/womens_sizes/Leet.svelte";
    import {fly} from 'svelte/transition';

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
                
                // 1. Categorize the brand
                const isASTM = brandName === "ASTM";
                const isLuxury = regularSizes.some(d => d.marketType === "luxury");
                const isNonLuxury = regularSizes.length > 0 && !isASTM && !isLuxury;

                // 2. Find the waist value of the *last* regular size for sorting
                let lastItemSortValue = Infinity; 
                if (regularSizes.length > 0) {
                    const lastItem = regularSizes[regularSizes.length - 1];
                    const waistValue = lastItem.waistMax ?? lastItem.waistMin;
                    const numericValue = parseFloat(waistValue);

                    if (!isNaN(numericValue)) {
                        lastItemSortValue = numericValue;
                    }
                }

                return {
                    brandName: brandName,
                    brandSizes: brandSizes,
                    isASTM: isASTM,
                    isNonLuxury: isNonLuxury,
                    isLuxury: isLuxury,
                    lastItemSortValue: lastItemSortValue
                };
            })
            .filter(brand => {
                // 3. Apply your three rules
                const showASTM = brand.isASTM && value >= 0;
                const showNonLuxury = brand.isNonLuxury && value >= 1;
                const showLuxury = brand.isLuxury && value >= 1;

                return showASTM || showNonLuxury || showLuxury;
            })
            .sort((a, b) => {
                // 4. New sorting logic
                
                // Rule 1: ASTM brand always comes first
                if (a.isASTM && !b.isASTM) {
                    return 1; // a comes before b
                }
                if (!a.isASTM && b.isASTM) {
                    return -1; // b comes before a
                }

                // Rule 2: For all other cases (both are ASTM or both are not),
                // sort by the last item's waist value.
                return a.lastItemSortValue - b.lastItemSortValue;
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
    let tooltipSide = $state('left');

    function showTooltip(size, e) {
        tooltipBrand = size.brand || "ASTM";
        tooltipAlphaSize = size.alphaSize;
        tooltipNumericSizeMin = size.numericSizeMin;
        tooltipNumericSizeMax = size.numericSizeMax;
        tooltipWaistMin = size.waistMin;
        tooltipWaistMax = size.waistMax;
        tooltipSizeRange = size.sizeRange.toLowerCase();

        const screenWidth = window.innerWidth;

        tooltipY = e.y; 
        tooltipX = e.x;
        tooltipSide = tooltipX > screenWidth / 2 ? 'right' : 'left';
        
        tooltipVisible = true;
    }

    function hideTooltip() {
        tooltipVisible = false;
    }
    
    // SCALE
    const xScale = $derived(
        d3.scaleLinear()
            .domain([20, 62])
            .range([0, containerWidth - margin.left - margin.right])
    );
    const tickValues = $derived(d3.range(xScale.domain()[0], xScale.domain()[1] + 1));

    // MEDIAN
    const medianWaistline = (() => {
        const targetData = generatedPercentiles.find(d => 
            d.yearRange === "2021-2023" && 
            d.race === "all" && 
            d.age === "20 and over"
        );

        const value = targetData ? targetData.percent50 : null;

        // 1. Convert the value (which could be string, number, or null) to a number
        const numericValue = parseFloat(value);

        // 2. Check if the conversion was successful (it will be NaN if not)
        if (!isNaN(numericValue)) {
            // 3. Round to one decimal place
            return Math.round(numericValue * 10) / 10;
        }

        // If no data, or value was null, or it couldn't be converted, return null
        return null;
    })();

    const median15Waistline = (() => {
        const targetData = generatedPercentiles.find(d => 
            d.yearRange === "2021-2023" && 
            d.race === "all" && 
            d.age === "14-15"
        );

        const value = targetData ? targetData.percent50 : null;

        // 1. Convert the value (which could be string, number, or null) to a number
        const numericValue = parseFloat(value);

        // 2. Check if the conversion was successful (it will be NaN if not)
        if (!isNaN(numericValue)) {
            // 3. Round to one decimal place
            return Math.round(numericValue * 10) / 10;
        }

        // If no data, or value was null, or it couldn't be converted, return null
        return null;
    })();

    // REACTIVE 
    $effect(() => {
        if (containerWidth > 0) {
            d3.select("#size-chart .x-axis g")
                .call(d3.axisBottom(xScale).tickValues(tickValues).tickFormat(d => {
                    return d % 5 === 0 ? `${d}"` : "";
                }));
        }
    })
</script>

<div class="outer-container">
    <div class="text-block">
        <h2>
            <Leet string="Pain is" />
            <Ransom string="universal" />
            <Leet string="sizing is not" />
        </h2>
        {#each copy.sizeIntro as block}
            <p>{@html block.value}</p>
        {/each}
    </div>
    <div class="sticky-container">
        <div class="visual-container">
            <p class="axis-label">Waistline in Inches</p>
            <div id="size-chart" class="chart-container" bind:clientHeight={containerHeight} bind:clientWidth={containerWidth}>
                 {#each filteredBrandData() as brand, i (brand.brandName)}
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

                    <div 
                        id={brand.brandName} 
                        class="brand-row" 
                        class:visible={(brand.brandName == "ASTM" && value == 0) || value > 0}
                        style="padding: {(containerHeight-100)/brandData.length*0.5}px;
                        opacity: {((value == 6 && !brand.isLuxury) || (value == 8 && brand.brandName !== "Anthropologie")) ? 0.3 : 1}" 
                        transition:fly={{ y: 20, duration: 500, delay: (brandData.length - 1 - i) * 100 }}
                        animate:flip>
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
                                    opacity: {(value < 7 || value == undefined) ? 0 : 1}"
                            ></div>
                        {/if}
                        <!-- Pills and circles for each specific size point -->
                        {#each brand.brandSizes as size}
                            {@const hasRange = size.waistMax !== null && size.waistMax !== undefined && size.waistMax !== size.waistMin}
                            <div style="opacity: {size.sizeRange?.toLowerCase() == 'plus' && (value < 7 || value == undefined) ? 0 : 1}">
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
                                    {#if (value == 2 && size.alphaSize == "L")  ||
                                        (value == 4 && Math.abs(+size.waistMin - median15Waistline) <= 1) ||
                                        (value == 9 && Math.abs(+size.waistMin - medianWaistline) <= 1)}
                                        <div transition:fly={{duration: 250, y:50 }} class="size-name" style="left: {xScale(size.waistMin)}px;">
                                            {#if size.alphaSize !== ""}
                                                <p>{size.alphaSize}</p>
                                            {/if}
                                            {#if size.numericSizeMin !== "" && size.alphaSize !== ""}
                                                <div class="break"></div>
                                            {/if}
                                            {#if size.numericSizeMin !== ""}
                                                <p>{size.numericSizeMin}</p>
                                            {/if}
                                        </div>
                                    {/if}
                                <!-- Else just the min circle -->
                                {:else}
                                    <div 
                                        onmouseenter={(e) => showTooltip(size, e)} 
                                        onmouseleave={hideTooltip} 
                                        role="tooltip"
                                        class="size-circle size-circle-{size.sizeRange}" 
                                        style="left: {xScale(size.waistMin)}px;"></div>
                                    {#if (value == 0 && brand.brandName == "ASTM" && (size.numericSizeMin == "4" || size.numericSizeMin == "8" || size.numericSizeMin == "12" || size.numericSizeMin == "16"))  ||
                                        (value == 2 && size.alphaSize == "L")  ||
                                        (value == 3 && brand.brandName == "ASTM" && size.numericSizeMin == "10") ||
                                        (value == 4 && Math.abs(+size.waistMin - median15Waistline) <= 1) ||
                                        (value == 5 && brand.brandName == "ASTM" && size.numericSizeMin == "18") || 
                                        (value == 9 && Math.abs(+size.waistMin - medianWaistline) <= 1)}
                                        <div transition:fly={{duration: 250, y:50 }} class="size-name" style="left: {xScale(size.waistMin)}px;">
                                            {#if size.alphaSize !== ""}
                                                <p>{size.alphaSize}</p>
                                            {/if}
                                            {#if size.numericSizeMin !== "" && size.alphaSize !== ""}
                                                <div class="break"></div>
                                            {/if}
                                            {#if size.numericSizeMin !== ""}
                                                <p>{size.numericSizeMin}</p>
                                            {/if}
                                        </div>
                                    {/if}
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
                <div 
                    class="median" 
                    class:visible={value > 2}
                    style="left: {xScale(median15Waistline) + margin.left}px">
                    <div class="median-label">
                        <p>Age 15</p>
                        <p>median</p>
                        <p>{median15Waistline}"</p>
                    </div>
                    <div class="median-line" style="left: {xScale(median15Waistline)}px"></div>
                </div>
                <div 
                    class="median" 
                    class:visible={value > 4}
                    style="left: {xScale(medianWaistline) + margin.left}px">
                    <div class="median-label">
                        <p>Adult</p>
                        <p>median</p>
                        <p>{medianWaistline}"</p>
                    </div>
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
    <div id="tooltip" class:visible={tooltipVisible} style="left: {tooltipX}px; top: {tooltipY}px; transform: translate({tooltipSide === 'right' ? '-110%' : '10%'}, 0%);">
        <p>{tooltipBrand}</p>
        <p><strong>Size range:</strong> {tooltipSizeRange}</p>
        <p><strong>Letter size:</strong> {tooltipAlphaSize}</p>
        <p><strong>Numeric size:</strong> 
            {#if tooltipNumericSizeMax && tooltipNumericSizeMax !== tooltipNumericSizeMin}
                {tooltipNumericSizeMin}–{tooltipNumericSizeMax}
            {:else}
                {tooltipNumericSizeMin}
            {/if}
        </p>
        <p><strong>Waist size:</strong> 
            {#if tooltipWaistMax && tooltipWaistMax !== tooltipWaistMin}
                {tooltipWaistMin}–{tooltipWaistMax}"
            {:else}
                {tooltipWaistMin}"
            {/if}
        </p>
    </div>
    
    <!-- Scrolly -->
    <div class="scrolly-outer">
        <Scrolly bind:value>
            {#each copy.sizeScroll as stage, i}
                <div
                    class="step" id="step-{i}">
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
        min-width: 180px;
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

    .text-block h2 {
        width: 100%;
        max-width: 800px;
        margin: 5rem 0;
        text-align: center;
    }
    .text-block p {
        width: min(100%, 550px);
        font-size: 1.1rem;
        line-height: 1.65;
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

    .chart-container {
        width: 100%;
        padding: 2rem 2rem 4rem 2rem;
        height: 90svh;
        margin: 0 auto;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
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
        opacity: 0;
    }

    .median.visible {
        opacity: 1;
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
        margin-top: -1rem;
        padding-bottom: 0.5rem;
    }

    .median-label p {
        margin: 0;
        text-align: center;
        line-height: 1.25;
    }

    .brand-row {
        width: 100%;
        position: relative;
        transition: opacity 500ms linear;
        z-index: 999;
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
        background: var(--ws-blue);
    }

    .size-circle-Regular {
        background: var(--ws-purple);
    }

    .size-circle-Plus {
        background: var(--ws-green);
    }

    #ATSM .size-circle {
        background: var(--ws-blue);
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
        background: var(--ws-purple);
        transition: all 250ms linear;
    }

    .brand-line-reg {
        background: var(--ws-purple);
    }

    .brand-line-plus {
        background: var(--ws-green);
    }

    #ASTM .brand-line {
        background: var(--ws-blue);
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

    .brand-name p {
          text-shadow: -2px -2px 0 var(--color-bg), 2px -2px 0 var(--color-bg), -2px 2px 0 var(--color-bg), 2px 2px 0 var(--color-bg);

    }

    .size-name {
        position: absolute;
        top: calc(50% - 1.5rem); 
        transform: translate(-25%, -50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        font-family: var(--mono);
        text-transform: uppercase;
        font-weight: 700;
        font-size: 10px;
        pointer-events: none;
        background: var(--color-bg);
        border-radius: 8px;
        padding: 0.3rem;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
        transition: opacity 100ms linear;
    }

    .size-name p {
        margin: 0;
        text-align: center;
    }

    .break {
        border-top: 1px solid var(--color-fg);
        width: 100%;
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
        background: var(--ws-purple);
    }

    .pill-plus {
        background: var(--ws-green);
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
        padding: 40vh 5% 70vh;
        justify-content: flex-end;
        align-items: center;
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

    #step-11 {
        opacity: 0;
        pointer-events: none;
    }

    @media (max-width: 850px) {
      .title-text {
        max-width: 440px;
      }

      .step {
        justify-content: center;
      }
    }

    @media (max-width: 700px) {
      .step .text {
        padding: 0.5rem 1.5rem;
        max-width: 400px;
      }

      .step .text p {
        font-size: var(--16px);
      }

      .text-block {
        padding: 1rem;
      }

      .text-block p {
        font-size: var(--16px);
      }
    }
</style>
