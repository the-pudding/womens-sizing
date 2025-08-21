<script>
    // TO-DO
    // Mobile
    import * as d3 from 'd3';
    import ASTMsizes from '../data/ASTMsizes.json';
    import copy from '../data/copy.json';
    import Scrolly from './helpers/Scrolly.svelte';
    import Ransom from "$components/Ransom.svelte";
    import Leet from "$components/Leet.svelte";

    // DIMENSIONS
    let containerHeight = $state(0);
    let containerWidth = $state(0);
    let imageWidth = $state(0);

    // TOOLTIP
    let tooltipVisible = $state(false);
    let tooltipX = $state();
    let tooltipY = $state();
    let tooltipSize = $state();

    function showTooltip(size, e) {
        tooltipVisible = true;
        tooltipSize = +size.size;

        const waist1995Data = formData[0][1].filter(d => d.size == tooltipSize)[0];
        const waist2021Data = formData[1][1].filter(d => d.size == tooltipSize)[0];

        const waist1995 = waist1995Data ? waist1995Data.waist : null;
        const waist2021 = waist2021Data ? waist2021Data.waist : null;

        if (waist1995 && waist2021) {
             barbellData = {
                startCircle: xScale(waist1995),
                endCircle: xScale(waist2021),
                diff: waist2021-waist1995
            }
        } else {
            barbellData = null;
        }
    }

    function hideTooltip() {
        tooltipVisible = false;
        barbellData = null;
    }

    // DATA
    let move1995 = $state(false);
    let move2021 = $state(false);
    let barbellData = $state({});
    const boxStart = $derived((barbellData?.startCircle ?? 0) + 148);
    const boxEnd = $derived((barbellData?.endCircle ?? 0) + 148);
    const boxWidth = $derived((barbellData?.endCircle ?? 0) - (barbellData?.startCircle ?? 0));
    const avgStart = $derived(xScale(34.88));
    const avgEnd = $derived(xScale(38.74));

    const formData = d3.groups(
        ASTMsizes.map(d => ({ ...d, waist: +d.waist }))
            .filter(d => d.sizeRange == "straight" && (d.year == 1995 || d.year == 2021)),
        d => d.year
    ).sort((a, b) => a[0] - b[0]);

    // SCALE
    const xScale = $derived(
        d3.scaleLinear()
            .domain([22, 42])
            .range([0, containerWidth - 32])
    );
    
    // SCROLLY
    let value = $state(0);

    function updateChart(value) {
        if (value == "to-enter"){
            move1995 = false;
            move2021 = false;
        } else if (value == 0) {
            setTimeout(() => {
                move1995 = true;
            },500);
            move2021 = false;
            barbellData = {
                startCircle: xScale(24),
                endCircle: xScale(36.5),
                diff: 36.5-24
            }
        } else if (value == 1) {
            move1995 = true;
            setTimeout(() => {
                move2021 = true;
            },500);
            barbellData = {
                startCircle: xScale(25.38),
                endCircle: xScale(40.5),
                diff: 40.5-25.38
            }
        } else if (value == 2) {
            move1995 = true;
            move2021 = true;
            barbellData = {
                startCircle: xScale(27),
                endCircle: xScale(29.5),
                diff: 29.5-27
            }
        } else if (value == 3) {
            move1995 = true;
            move2021 = true;
            barbellData = {
                startCircle: xScale(34.5),
                endCircle: xScale(38.25),
                diff: 38.25-34.5
            }
        } else if (value >= 4) {
            move1995 = true;
            move2021 = true;
            barbellData = {
                startCircle: xScale(34.5),
                endCircle: xScale(38.25),
                diff: 38.25-34.5
            }
        }
    }

    // REACTIVE 
    $effect(() => {
        updateChart(value);

        console.log({move1995, move2021, value});

        if (containerWidth > 0) {
            d3.select("#vanity-sizes .x-axis g")
                .call(d3.axisBottom(xScale));
        }
    })
</script>

<div class="outer-container">
    <div class="text-block">
        {#each copy.section2 as block}
        <div class="subtitle">
            {#if block.subhed}
                <h3>
                    <Leet string="This has been a" />
                    <Ransom string="problem" />
                    <Leet string="for a very, very long time" />
                </h3>
            {/if}
            <p>{@html block.text}</p>
        </div>
    {/each}
    </div>
    <div class="sticky-container">
        <div class="visual-container">
            <div class="chart-container" id="vanity-sizes">
                {#each formData as year, i}
                    <div class="year-wrapper" class:visible={(year[0] == 1995 && value >= 0) || (year[0] == 2021 && value >= 1)}>
                        <div class="year-label">
                            <Ransom string={year[0]} />
                        </div>
                        <div class="form-wrapper" bind:clientHeight={containerHeight} bind:clientWidth={containerWidth}>
                            {#each year[1] as size, i}
                                <div onmouseenter={(e) => showTooltip(size, e)} 
                                    onmouseleave={hideTooltip} 
                                    role="tooltip"
                                    class="size" 
                                    style="left: {((year[0] == 1995 && move1995) || (year[0] == 2021 && move2021) ? (xScale(size.waist) - (imageWidth/2) + 16) : (xScale(24)) - (imageWidth/2) + 16)}px;
                                    pointer-events: {move1995 && move2021 && value >= 4 ? "auto" : "none"};"
                                    class:scaled={(value == 2 && size.size == "8" && !tooltipVisible) 
                                        || (value == 4 && size.size == "18" && !tooltipVisible)
                                        || (tooltipVisible && size.size == tooltipSize)}>
                                    <p>{size.size}</p>
                                    <img 
                                        src="assets/blue-dress-form.png" 
                                        alt="illustrated dress form" 
                                        bind:clientWidth={imageWidth}
                                    />
                                </div>
                            {/each}
                        </div>
                    </div>
                {/each}
                <div class="x-axis">
                    <svg>
                        <g class="axis" transform="translate(16, 10)"></g>
                    </svg>
                </div>
                    <div 
                        class="highlight-box"
                        class:visible={(value >= 2 && value !== 3 && barbellData) || tooltipVisible}
                        style="left: {boxStart}px;
                        width: {boxWidth}px"
                    >   
                        {#if barbellData}
                            <p class="diff">{Math.round(barbellData.diff * 10) / 10}"</p>
                        {/if}
                    </div>
                    <div class="averages" class:visible={value >= 3}>
                        <div class="avg-start" class:visible={value >= 3} style="left: {xScale(34.88)+ 148}px;"></div>
                        <div class="avg-end" class:visible={value >= 3} style="left: {xScale(38.74)+ 148}px;"></div>
                    </div>
                    <div class="barbell" class:visible={barbellData && move1995 && value !== 3}>
                        <div class="line" style="left: {boxStart}px; width: {boxWidth}px"></div>
                        <div class="circle-start" style="left: {boxStart}px;"></div>
                        <div class="circle-end" style="left: {boxEnd}px;"></div>
                    </div>
            </div>
        </div>
    </div>
    <!-- Tooltip -->
    <div id="tooltip" class:visible={tooltipVisible} style="left: {tooltipX}px; top: {tooltipY}px">
        
    </div>

    <div class="scrolly-outer">
            <Scrolly bind:value>
                {#each copy.vanitySizing as stage, i}
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
        height: 70svh;
        max-height: 600px;
        margin: 0 auto;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }

    .year-wrapper {
        width: 100%;
        display: flex;
        flex-direction: row;
        height: 200px;
        opacity: 0;
        transition: opacity 200ms ease-in-out;
    }

    .year-wrapper.visible {
        opacity: 1;
        z-index: 1000;
    }

    .year-label {
        width: 100px;
    }

    .form-wrapper {
        width: calc(100% - 100px);
        position: relative;
    }

    .x-axis {
        position: absolute;
        bottom: 50%;
        left: 100px;
        width: calc(100% - 100px);
        height: 50px;
        margin: 0;
        padding: 0 2rem;
        z-index: 900;
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

    .barbell {
        z-index: 998;
        opacity: 0;
        transition: opacity 250ms linear, left 250ms linear 250ms, width 250ms linear 250ms;
    }

    .barbell.visible {
        opacity: 1;
    }

    .averages {
        z-index: 999;
        opacity: 0;
        transition: opacity 250ms linear, left 250ms linear 250ms, width 250ms linear 250ms;
    }

    .averages.visible {
        opacity: 1;
    }

    .circle-start, .circle-end {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: var(--color-fg);
        position: absolute;
        bottom: calc(50% + 36px);
        transform: translate(-50%, 0);
        transition: opacity 250ms linear, left 250ms linear 250ms, width 250ms linear 250ms;
    }

    .avg-start, .avg-end {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: var(--ws-orange);
        position: absolute;
        bottom: calc(50% + 32px);
        transform: translate(-50%, 0);
        transition: all 500ms linear;
        opacity: 0;
        z-index: 1000;
    }

    .avg-start.visible, .avg-end.visible {
        opacity: 1;
    }

    .avg-start::before, .avg-end::before  {
        position: absolute;
        bottom: -20px;
        left: 50%;
        transform: translate(-50%, 0);
        width: 100px;
        font-family: var(--mono);
        font-weight: 700;
        font-size: var(--14px);
        color: var(--ws-orange);
        text-align: center;
    }

    .avg-start::before {
        content: "'88-'94";
    }

    .avg-end::before {
        content: "'21-'23";
    }

    .barbell .line {
        border-top: 3px solid var(--color-fg);
        transition: opacity 250ms linear, left 250ms linear 250ms, width 250ms linear 250ms;
        position: absolute;
        bottom: calc(50% + 39px);
        transform: translate(0, 0);
    }

    .highlight-box {
        background: rgba(154,187,217,0.3);
        height: 100%;
        position: absolute;
        top: 0%;
        z-index: 1;
        opacity: 0;
        transition: opacity 250ms linear, left 250ms linear 250ms, width 250ms linear 250ms;
    }

    .highlight-box.visible {
        opacity: 1;
    }

    .diff {
        position: absolute;
        top: 35%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 0.25rem 0.5rem;
        font-family: var(--mono);
        font-weight: 700;
        font-size: var(--16px);
        color: var(--color-fg);
        background-color: var(--color-bg);
        border: 2px solid var(--color-fg);
        border-radius: 4px;
        z-index: 1000;
    }

    .size {
        position: absolute;
        height: 120px;
        transition: all 500ms ease-in-out;
        cursor: pointer;
    }

    .size p {
        position: absolute;
        top: 10%;
        left: 50%;
        transform: translate(-50%, 0%);
        font-family: var(--mono);
        font-weight: 700;
        font-size: var(--14px);
        text-align: center;
        z-index: 1000;
        pointer-events: none;
    }

    .size img {
        height: 100%;
    }

    .size:hover {
       transform: scale(1.2);
    }

    .size.scaled {
        transform: scale(1.2);
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
    }

    :global(.tick text) {
        font-family: var(--mono);
        font-weight: 700;
        font-size: var(--14px);
    }
</style>