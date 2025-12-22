<script>
    import { onMount } from 'svelte';
    import Ransom from "$components/womens_sizes/Ransom.svelte";
    import * as d3 from 'd3';
    import copy from "$data/copy.json";
    import bodice from "$svg/graded-sizes-full-bodice-alt.svg";
    import blockAmanda from "$svg/block-amanda.svg";
    import blockStandard from "$svg/block-standard.svg";
    import { fade } from 'svelte/transition';
    import inView from "$actions/inView.js";
	import { on } from 'svelte/events';

    const shapeGrid = ["apple", "peach", "pear", "brick"];
    const clothingGrid = ["top", "dress", "pants"];

    let blockCentered = $state(true);

    function loopGrading() {
        const centralSize = 8;
        const baseSelector = "#bodice-svg svg g";
        const groups = d3.selectAll(baseSelector);
        const outerSizes = groups.filter(function() {
            const id = d3.select(this).attr("id");
            return id && id.startsWith("size") && id !== `size${centralSize}`;
        });

        outerSizes
            .transition()
            .delay(function() {
                const id = d3.select(this).attr("id");
                const sizeNumber = parseInt(id.replace("size", ""));
                const distance = Math.abs(sizeNumber - centralSize);
                return distance * 200;
            })
            .duration(400)
            .style("opacity", 1)
            .on("end", function(d, i, nodes) {
                if (i === nodes.length - 1) {

                    outerSizes
                        .transition()
                        .delay(2000)
                        .duration(800)
                        .style("opacity", 0)
                        .on("end", function(d, i, nodes) {
                            if (i === nodes.length - 1) {
                                loopGrading();
                            }
                        });
                }
            });
    }

    function loopBlock() {
        setInterval(() => {
            blockCentered = !blockCentered;
        }, 4000);
    }

    onMount(() => {
        loopGrading();
        loopBlock();
    });
</script>


<div class="title-page-container">
    <div class="title-page-content">
        <div class="ransom-wrapper">
            <div class="wrapper">
                <Ransom class="title-page-title" string={"sew"} />  
            </div>
            <div class="wrapper">
                <Ransom class="title-page-title" string={"what?"} />  
            </div>
        </div>

        <div class="title-page-body">
            {#each copy.sewingSection as graf, i}
                <p>{graf.value}</p>
                {#if i == 1}
                    <div class="grid">
                        {#each shapeGrid as shape, i}
                            <div class="shape">
                                <p>{shape}</p>
                            </div>
                        {/each}
                    </div>
                {/if}
                {#if i == 4}
                    <div id="bodice-svg">
                        {@html bodice}
                    </div>
                {/if}
                {#if i == 5}
                    <div class="grid">
                        {#each clothingGrid as item, i}
                            <div class="shape">
                                <p>{item}</p>
                            </div>
                        {/each}
                    </div>
                {/if}
                {#if i == 7}
                    <div class="block">
                        <div class="block-wrapper" style="transform: {!blockCentered ? 'translate(-90%, -50%)' : 'translate(-50%, -50%)'}">
                            {@html blockStandard}
                            <p style="opacity: {blockCentered ? 0 : 1}">Standard bodice block</p>
                        </div>
                        <div class="block-wrapper" style="transform: {!blockCentered ? 'translate(-10%, -50%)' : 'translate(-50%, -50%)'}">
                            {@html blockAmanda}
                            <p style="opacity: {blockCentered ? 0 : 1}">My bodice block</p>
                        </div>
                    </div>
                {/if}
            {/each}
        </div>
    </div>
</div>

<style>
    .title-page-container {
        width: 100%;
        min-height: 100vh;
        /* background: linear-gradient(135deg, #FBFFE9 0%, #f8fdf0 100%); */
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .title-page-content {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1rem;
        text-align: center;
    }
    
    .ransom-wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    
    .title-page-body {
        width: 100%;
        font-size: var(--18px);
        line-height: 1.6;
        text-align: left;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 2rem 0;
        font-family: var(--sans);
    }
    
    .title-page-body p {
        margin-bottom: 1.5rem;
        font-size: var(--18px);
        max-width: 720px;
        padding: 0 3rem;
    }

    #bodice-svg {
        width: 100%;
        max-width: 720px;
        aspect-ratio: 1 / 1;
        height: auto;
    }

    :global(#bodice-svg svg) {
        width: 100%;
        height: 100%;
    }

    .grid {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        font-family: var(--mono);
        font-weight: 700;
        text-transform: uppercase;
        gap: 2rem;
        margin: 2rem 0;
        max-width: 1000px;
        width: 100%;
    }

    .shape {
        border: 2px solid var(--ws-blue);
        aspect-ratio: 1 / 1;
        width: 25%;
        display: flex;
        justify-content: center;
        align-items: flex-end;
    }

    .block {
        width: 100%;
        aspect-ratio: 1 / 0.55;
        max-width: 1000px;
        position: relative;
    }

    .block-wrapper {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transition: transform 0.75s ease-in;
    }

    .block-wrapper p {
        font-family: var(--mono);
        font-weight: 700;
        text-transform: uppercase;
        transition: opacity 0.75s ease-in;
        margin-top: -1.5rem;
    }

</style>
