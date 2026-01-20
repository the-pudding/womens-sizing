<script>
    import * as d3 from 'd3';
    let { value } = $props();
    import copy from "$data/copy.json";
    import { fade } from 'svelte/transition';

    // SVGS
    import invertedTriangle from "$svg/bodyTypes/inverted-triangle.svg";
    import topHourglass from "$svg/bodyTypes/top-hourglass.svg";
    import oval from "$svg/bodyTypes/oval.svg";
    import rectangle from "$svg/bodyTypes/rectangle.svg";
    import hourglass from "$svg/bodyTypes/hourglass.svg";
    import diamond from "$svg/bodyTypes/diamond.svg";
    import triangle from "$svg/bodyTypes/triangle.svg";
    import bottomHourglass from "$svg/bodyTypes/bottom-hourglass.svg";
    import spoon from "$svg/bodyTypes/spoon.svg";

    const svgArray = [invertedTriangle, topHourglass, oval, rectangle, hourglass, diamond, triangle, bottomHourglass, spoon];

    const percentType = {
        "Inverted Triangle": 0.5,
        "Top Hourglass": 3,
        "Oval": 0,
        "Rectangle": 49,
        "Hourglass": 11.8,
        "Diamond": 0,
        "Triangle": 4.8,
        "Bottom Hourglass": 9.4,
        "Spoon": 21.5
    }

    $effect(() => {
        if (value == "to-enter") {
            d3.selectAll(".svg-wrapper svg #median").style("opacity", 0);
        } else if (value <= 1) {
            d3.selectAll(".svg-wrapper svg #median").transition(1000).ease(d3.easeCubicIn).style("opacity", 0);
        } else {
            d3.selectAll(".svg-wrapper svg #median").transition(1000).ease(d3.easeCubicIn).style("opacity", 0.3);
        }
    });
</script>

{#if (value == "to-enter" || value >= 0) && value <= 3}
    <div class="body-types-grid" transition:fade={{ duration: 400 }}>
        {#each copy.bodyTypes as bodyType, i} 
            {@const slugged = bodyType.toLowerCase().replace(/\s+/g, '-')}
            <div class="box" class:visible={(value == 0 && bodyType == "Hourglass") || value >= 1}>
                <div 
                    class="bar"
                    style="transform: translateY({
                        value >= 3 ? `${100-percentType[bodyType]}%` : '100%' });"
                >
                </div>
                <p>{bodyType}</p>
                <div class="svg-wrapper">
                    {@html svgArray[i]}
                </div>
            </div>
        {/each}
    </div>
{/if}

<style>
    .body-types-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
        width: 100%;
        height: 100%;
        justify-items: center;
        align-items: center;
        padding: 1rem;
    }

    .box {
        width: 100%;
        aspect-ratio: 1 / 1;
        border: 2px solid var(--ws-blue);
        display: flex;
        position: relative;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        opacity: 0;
        transition: all 0.3s ease-in;
        overflow: hidden;
    }

    .box.visible {
        opacity: 1;
    }

    .box p {
        margin: 0;
        padding: 0;
        font-family: var(--mono);
        font-size: var(--18px);
        text-transform: uppercase;
        font-weight: 700;
    }

    .svg-wrapper {
        width: 100%;
        height: calc(100% - 4rem);
    }

    :global(.box .svg-wrapper svg) {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: contain;
        position: relative;
    }

    :global(.box .svg-wrapper svg #median) {
        opacity: 0;
    }

    .bar {
        width: 100%;
        height:100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: var(--ws-green);
        z-index: 1;
        mix-blend-mode: multiply;
        opacity: 0.5;
        transition: transform 0.3s ease-in;
    }
</style>