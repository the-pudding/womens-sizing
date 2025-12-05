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
</script>

{#if value >= 9}
    <div class="body-types-grid" transition:fade={{ duration: 400 }}>
        {#each copy.bodyTypes as bodyType, i} 
            {@const slugged = bodyType.toLowerCase().replace(/\s+/g, '-')}
            <div class="box" class:visible={(value == 9 && bodyType == "Hourglass") || value >= 10}>
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
        border: 1px solid var(--ws-blue);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        opacity: 0;
        transition: all 0.3s ease-in;
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
</style>