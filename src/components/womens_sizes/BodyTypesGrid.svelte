<script>
    import * as d3 from 'd3';
    let { value } = $props();
    import copy from "$data/copy.json";
    import { fade } from 'svelte/transition';
</script>

{#if value >= 9}
    <div class="body-types-grid" transition:fade={{ duration: 400 }}>
        {#each copy.bodyTypes as bodyType, i} 
            <div class="box" class:visible={(value == 9 && bodyType == "Hourglass") || value >= 10}>
                <p>{bodyType}</p>
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
    }

    .box {
        width: 100%;
        aspect-ratio: 1 / 1;
        border: 1px solid var(--ws-blue);
        display: flex;
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
</style>