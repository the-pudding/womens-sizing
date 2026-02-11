<script>
    import { 
        scaleLinear, 
        range, 
        groups, 
        select, 
        axisBottom
    } from 'd3';
    import ASTMsizes from '$data/ASTMsizes.json';
    import copy from '$data/copy.json';
    import Scrolly from '../helpers/Scrolly.svelte';
    import Ransom from "$components/womens_sizes/Ransom.svelte";
    import Leet from "$components/womens_sizes/Leet.svelte";

    // DIMENSIONS
    let containerWidth = $state(0);

    // TOOLTIP
    let tooltipVisible = $state(false);
    let tooltipSize = $state();

    function showTooltip(size, e) {
        if (size.size == "0" || size.size == "00") return;
        tooltipVisible = true;
        tooltipSize = +size.size;

        const waist1995Data = formData[0][1].find(d => d.size == tooltipSize);
        const waist2021Data = formData[1][1].find(d => d.size == tooltipSize);

        const waist1995 = waist1995Data?.waist;
        const waist2021 = waist2021Data?.waist;

        if (waist1995 && waist2021) {
             barbellData = {
                startCircle: xScale(waist1995),
                endCircle: xScale(waist2021),
                diff: waist2021 - waist1995
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
    let barbellData = $state(null);
    
    // DERIVED VALUES (Fixed boxEnd error)
    const boxStart = $derived(barbellData?.startCircle ?? 0);
    const boxEnd = $derived(barbellData?.endCircle ?? 0);
    const boxWidth = $derived(boxEnd - boxStart);

    const formData = groups(
        ASTMsizes.map(d => ({ ...d, waist: +d.waist }))
            .filter(d => d.sizeRange == "Women's" && (d.year == "1995" || d.year == "2021")),
        d => d.year
    ).sort((a, b) => a[0] - b[0]);

    // SCALE
    const margin = 16;
    const xScale = $derived(
        scaleLinear()
            .domain([22, 42])
            .range([margin, containerWidth - margin])
    );
    const tickValues = $derived(range(xScale.domain()[0], xScale.domain()[1] + 1));
    
    // SCROLLY
    let value = $state(0);

    function updateChart(val) {
        if (val == "to-enter"){
            move1995 = false;
            move2021 = false;
        } else if (val == 0) {
            setTimeout(() => { move1995 = true; }, 500);
            move2021 = false;
            barbellData = { startCircle: xScale(24), endCircle: xScale(36.5), diff: 36.5-24 };
        } else if (val == 1) {
            move1995 = true;
            setTimeout(() => { move2021 = true; }, 500);
            barbellData = { startCircle: xScale(25.38), endCircle: xScale(40.5), diff: 40.5-25.38 };
        } else if (val >= 2) {
            move1995 = true;
            move2021 = true;
            if (val == 2) barbellData = { startCircle: xScale(27), endCircle: xScale(29.5), diff: 2.5 };
            if (val >= 3) barbellData = { startCircle: xScale(34.5), endCircle: xScale(38.25), diff: 3.75 };
        }
    }

    $effect(() => {
        updateChart(value);
        if (containerWidth > 0) {
            select("#vanity-sizes .axis-group")
                .call(axisBottom(xScale).tickValues(tickValues).tickFormat(d => d % 2 === 0 ? `${d}"` : ""));
        }
    });
</script>

<div class="outer-container">
    <div class="text-block">
        <h2>
            <Leet string="The villain arc of" />
            <Ransom string="vanity" />
            <Ransom string="sizing" />
        </h2>
        {#each copy.vanityIntro as block}
            <p>{@html block.value}</p>
        {/each}
    </div>

    <div class="sticky-container">
        <div class="visual-container">
            <div class="chart-container" id="vanity-sizes">
                
                {#each formData as year, i}
                    <div class="year-row" class:visible={(year[0] == 1995 && value >= 0) || (year[0] == 2021 && value >= 1)}>
                        <div class="year-label">
                            <p>{year[0]} sizes</p>
                        </div>
                        <div class="form-wrapper" bind:clientWidth={containerWidth}>
                            {#each year[1] as size}
                                <div onmouseenter={(e) => showTooltip(size, e)} 
                                    onmouseleave={hideTooltip} 
                                    role="tooltip"
                                    class="size" 
                                    style="left: {((year[0] == 1995 && move1995) || (year[0] == 2021 && move2021) ? xScale(size.waist) : xScale(24))}px;
                                    pointer-events: {move1995 && move2021 && value >= 5 && (size.size != '0' && size.size != '00') ? 'auto' : 'none'};"
                                    class:scaled={(value == 2 && size.size == "8" && !tooltipVisible) 
                                        || (value == 4 && size.size == "18" && !tooltipVisible)
                                        || (tooltipVisible && size.size == tooltipSize)}>
                                    <p class="size-label">{size.size}</p>
                                    <img src="assets/blue-dress-form.png" alt="dress form" />
                                    <p class="size-inches"
                                        class:visible={tooltipVisible && tooltipSize == +size.size}>
                                        {size.waist}"</p>
                                </div>
                            {/each}
                        </div>
                    </div>

                    {#if i === 0}
                        <div class="year-row axis-row">
                            <div class="year-label spacer"></div>
                            <div class="form-wrapper axis-container">
                                <svg class="x-axis-svg">
                                    <g class="axis-group" transform="translate(0, 10)"></g>
                                </svg>
                                <p class="axis-label">Waistline in Inches</p>
                            </div>
                        </div>
                    {/if}
                {/each}

                <div class="chart-overlays" style="--label-offset: var(--label-width); --padding-offset: 0.5rem;">
                    <div class="highlight-box"
                        class:visible={(value >= 2 && value !== 3 && value !== 5 && value !== 6 && value !== 'exit' && barbellData) || tooltipVisible}
                        style="left: calc(var(--label-offset) + (2 * var(--padding-offset)) + {boxStart}px); width: {boxWidth}px">
                    </div>

                    {#if barbellData}
                        <p class="diff"
                            class:visible={(value >= 2 && value !== 3 && value !== 5 && value !== 6 && value !== 'exit' && barbellData) || tooltipVisible}
                            style="left: calc(var(--label-offset) + (2 * var(--padding-offset)) + {boxStart + (boxWidth / 2)}px);">
                            {Math.round(barbellData.diff * 10) / 10}"
                        </p>
                    {/if}

                    <div class="averages" class:visible={value >= 3}>
                        <div class="avg-start" style="left: calc(var(--label-offset) + (2 * var(--padding-offset)) + {xScale(34.88)}px);"></div>
                        <div class="avg-end" style="left: calc(var(--label-offset) + (2 * var(--padding-offset)) + {xScale(38.54)}px);"></div>
                    </div>

                    <div class="barbell" class:visible={(barbellData && move1995 && value !== 3 && value !== 5 && value !== 6 && value !== 'exit') || tooltipVisible}>
                        <div class="line" style="left: calc(var(--label-offset) + (2 * var(--padding-offset)) + {boxStart}px); width: {boxWidth}px"></div>
                        <div class="circle-start" style="left: calc(var(--label-offset) + (2 * var(--padding-offset)) + {boxStart}px);"></div>
                        <div class="circle-end" style="left: calc(var(--label-offset) + (2 * var(--padding-offset)) + {boxEnd}px);"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="tooltip" class:visible={tooltipVisible}></div>

    <div class="scrolly-outer">
        <Scrolly bind:value>
            {#each copy.vanityScroll as stage, i}
                <div id="step-{i}" class="step">
                    <div class="text"><p>{@html stage.text}</p></div>
                </div>
            {/each}
        </Scrolly>
    </div>
</div>

<style>
    :root { 
        --label-width: 100px; 
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

    .text-block h2 {
        width: 100%;
        max-width: 800px;
        text-align: center;
        margin: 0 0 6rem 0;
    }

    .text-block p {
        width: min(100%, 550px);
        line-height: 1.65;
        text-align: left;
        font-family: var(--sans);
        font-size: var(--18px);
    }

    .sticky-container { 
        position: sticky; 
        top: 0; 
        height: 100vh; 
        width: 100%; 
        z-index: 1; 
    }
    
    .visual-container { 
        width: 100%; height: 100%; 
        display: flex; justify-content: center; align-items: center; 
    }

    .chart-container {
        width: 100%; 
        padding: 1rem 1rem; 
        margin: 0 auto; 
        position: relative;
        display: flex; 
        flex-direction: column; 
        justify-content: space-around;
    }

    .year-row {
        width: 100%; 
        display: flex; 
        flex-direction: row; 
        justify-content: center;
        height: 160px;
        opacity: 0; 
        transition: opacity var(--ms-250) ease-in-out;
    }
    .year-row.visible { opacity: 1; z-index: 10; }

    .year-label { 
        width: var(--label-width); 
        flex-shrink: 0; 
        display: flex;
        align-items: center;
    }
    .year-label p { 
        font-family: var(--mono); 
        font-weight: 700; 
        font-size: 24px; 
        line-height: 1.2;
    }

    .form-wrapper {
        flex-grow: 1; 
        position: relative;
        padding: 0 1rem; 
        box-sizing: border-box;
        display: flex;
        align-items: center;
    }
    
    .form-wrapper.axis-container {
        display: inline-block;
    }

    .axis-row { height: 80px; opacity: 1; }
    .x-axis-svg { 
        width: 100%; 
        height: 40px; 
        overflow: visible; 
    }

    .axis-label { 
        text-align: center; 
        font-family: var(--mono); 
        font-size: 14px; 
        font-weight: 700; 
        text-transform: uppercase; 
        margin: 0;
    }

    :global(.x-axis-svg .tick text) {
        font-family: var(--mono);
        font-size: var(--14px);
        font-weight: 700;
    }

    .size {
        position: absolute; 
        height: 120px; 
        aspect-ratio: 1/2;
        transform: translateX(-50%); 
        transition: all var(--ms-500) ease-in-out;
        cursor: pointer; 
        display: flex; 
        align-items: center; 
        justify-content: center;
    }
    .size .size-label { 
        position: absolute; 
        top: 10%; 
        font-family: var(--mono); 
        font-weight: 700; 
        z-index: 10; 
    }

    .size .size-inches { 
        position: absolute; 
        top: -24px; 
        font-family: var(--mono); 
        font-size: var(--12px);
        font-weight: 700; 
        z-index: 10; 
        opacity: 0;
        transition: opacity var(--ms-250) linear;
    }

    .size .size-inches.visible { 
        opacity: 1; 
    }
    .size img { 
        height: 100%; 
        width: auto; 
        object-fit: contain; 
    }

    .size:hover, .size.scaled { 
        transform: translateX(-50%) scale(1.2); 
    }

    .chart-overlays {
        position: absolute; 
        top: 0; 
        left: 0; 
        width: 100%; 
        height: 100%;
        pointer-events: none; 
        padding: 1rem; 
        box-sizing: border-box;
    }

    .highlight-box {
        background: rgba(154,187,217,0.3); 
        width: 0; 
        height: 500px;
        position: absolute; 
        top: 50%; 
        transform: translateY(-50%); 
        z-index: -1;
        opacity: 0; 
        transition: all var(--ms-250) linear;
    }

    .highlight-box.visible {
         opacity: 1; 
    }

    .barbell, .averages { 
        opacity: 0; 
        transition: opacity var(--ms-250) linear; 
    }
    .barbell.visible, .averages.visible { 
        opacity: 1; 
    }

    .line { 
        border-top: 3px solid var(--color-fg); 
        position: absolute; 
        bottom: calc(50% + 28px); 
    }

    .circle-start, .circle-end {
        width: 10px; 
        height: 10px; 
        border-radius: 50%; 
        background: var(--color-fg);
        position: absolute; 
        bottom: calc(50% + 25px); 
        transform: translateX(-50%);
    }

    .avg-start, .avg-end {
        width: 16px; 
        height: 16px; 
        border-radius: 50%; 
        background: var(--ws-orange);
        position: absolute; 
        bottom: calc(50% + 22px); 
        transform: translateX(-50%);
        font-family: var(--mono);
        font-weight: 700;
        font-size: var(--14px);
    }
    .avg-start::before { 
        content: "1988\a–94"; 
        white-space: pre-wrap;
        position: relative; 
        display: inline-block;
        color: var(--ws-orange); 
        font-family: var(--mono); 
        width: 60px; 
        text-align: center;
        top: -26px;
        left: 50%; 
        font-size: 12px; 
        line-height: 1;
        transform: translateX(-50%);
    }
    .avg-end::before { 
        content: "2021\a–23"; 
        white-space: pre-wrap;
        position: relative; 
        display: inline-block;
        color: var(--ws-orange); 
        font-family: var(--mono); 
        width: 60px; 
        text-align: center;
        top: -26px;
        left: 50%; 
        font-size: 12px; 
        line-height: 1;
        transform: translateX(-50%);
    }

    .diff {
        position: absolute; 
        bottom: calc(50%); 
        transform: translateX(-50%);
        padding: 4px 8px; 
        font-family: var(--mono); 
        font-weight: 700; 
        font-size: 12px;
        background: var(--color-bg); 
        border-radius: 8px; 
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        border: 2px solid var(--color-fg);
        opacity: 0; 
        transition: opacity 250ms;
        z-index: 1000;
    }
    .diff.visible { opacity: 1; }

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
    }

    #step-6  {
        opacity: 0;
        pointer-events: none;
    }

    .step .text { 
        max-width: 500px; 
        width: 90%; 
        padding: 20px; 
        background: white; 
        border-radius: 8px; 
        box-shadow: 0 4px 15px rgba(0,0,0,0.1); 
        pointer-events: auto;
        font-family: var(--sans);
    }
    
    #tooltip { 
        position: fixed; 
        opacity: 0;
        pointer-events: none; 
    }

    @media (max-width: 1000px) {
        :global(.x-axis-svg .tick text) {
            font-size: var(--12px);
        }
    }

    @media (max-width: 700px) { 
        :root { --label-width: 60px; } 

        .year-label p {
            font-size: var(--20px);
        }

        .size img {
            height: 80%;
        }

        .text-block {
            padding: 1rem;
        }

        .step .text {
            padding: 0.5rem 1.5rem;
            max-width: 400px;
            font-size: var(--16px);
        }

        .text-block p {
            font-size: var(--16px);
        }
    }

    @media (max-width: 500px) { 
        :root { --label-width: 20px; } 

        .year-label p {
            font-size: var(--14px);
        }

        .size img {
            height: 50%;
        }

        .size .size-label { 
            top: 18%; 
            font-size: 10px; 
        }

        .size .size-inches { 
            top: -12px; 
        }

        .axis-label {
            margin-top: 1rem;
        }

        .diff {
            bottom: calc(50% - 24px); 
        }

        .avg-start, .avg-end {
            width: 12px; 
            height: 12px; 
            bottom: calc(50% + 24px); 
        }

        :global(.x-axis-svg .tick:nth-of-type(even) text) {
            display: none;
        }
    }
</style>