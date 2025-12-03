<script>
    import { onMount } from 'svelte';
    import copy from "$data/copy.json";
    import Scrolly from '../helpers/Scrolly.svelte';
    import * as d3 from 'd3';
    import bodice from "$svg/graded-sizes-full-bodice.svg";
    import { fade } from 'svelte/transition';
    import ProportionsSVG from "$components/womens_sizes/ProportionsSVG.svelte";

    let value = $state(0);
    let containerWidth = $state(0);
    let containerHeight = $state(0);
    let bodyTypes = ["Inverted Triangle", "Top Hourglass", "Oval", "Rectangle", "Hourglass", "Diamond", "Triangle", "Bottom Hourglass", "Spoon"];

    function handleStepChange(value) {
        console.log(value)
        const centralSize = 8;

        if (value == "to-enter" || value == 0) {
            d3.selectAll("#bodice-svg svg g")
                .filter(function() {
                    const id = d3.select(this).attr("id");
                    return id !== "size8";
                })
                .transition()
                .delay(function() {
                    const id = d3.select(this).attr("id");
                    const sizeNumber = parseInt(id.replace("size", ""));
                    const distance = Math.abs(sizeNumber - centralSize);
                    const inverseDelay = (8 - distance) * 150;
                    
                    return inverseDelay;
                })
                .duration(400)
                .style("opacity", 0); 
            d3.selectAll("#bodice-svg svg #size8").style("opacity", 1);
        } else if (value == 1) {
            d3.selectAll("#bodice-svg svg g")
                .filter(function() { 
                    return d3.select(this).attr("id") !== `size${centralSize}`;
                })
                .transition()
                .delay(function() {
                    const id = d3.select(this).attr("id");
                    const sizeNumber = parseInt(id.replace("size", ""));
                    const distance = Math.abs(sizeNumber - centralSize);
                    return distance * 150;
                })
                .duration(400)
                .style("opacity", 1);
            d3.selectAll("#bodice-svg svg #size0").attr("transform", `translate(0, 0)`)
            d3.selectAll("#bodice-svg svg #size16").attr("transform", `translate(0, 0)`)
        } else if (value == 2) {
            d3.selectAll("#bodice-svg svg g")
                .filter(function() {
                    const id = d3.select(this).attr("id");
                    return id !== "size8" && id !== "size0" && id !== "size16";
                })
                .transition()
                .delay(function() {
                    const id = d3.select(this).attr("id");
                    const sizeNumber = parseInt(id.replace("size", ""));
                    const distance = Math.abs(sizeNumber - centralSize);
                    const inverseDelay = (8 - distance) * 150;
                    
                    return inverseDelay;
                })
                .duration(400)
                .style("opacity", 0); 
            d3.selectAll("#bodice-svg svg #size8, #bodice-svg svg #size0, #bodice-svg svg #size16").style("opacity", 1);
            
            d3.selectAll("#bodice-svg svg #size0")
                .transition()
                .delay(8*150)
                .duration(800) 
                .attr("transform", `translate(${-containerWidth}, 0)`);
            
            d3.selectAll("#bodice-svg svg #size16")
                .transition()
                .delay(8*150)
                .duration(800) 
                .attr("transform", `translate(${containerWidth}, 0)`);
                
            d3.selectAll("#bodice-svg svg #size8")
                .transition()
                .delay(8*150)
                .duration(800)
                .attr("transform", `translate(0, 0)`);
        } else if (value == 3) {
            d3.selectAll("#bodice-svg svg #size0, #bodice-svg svg #size8, #bodice-svg svg #size16")
                .transition()
                .delay(8*150)
                .duration(800)
                .attr("transform", `translate(0, 0)`);
        }
    }

    $effect(() => {
        handleStepChange(value)
    })
</script>

<div class="outer-container" id="mass-production">
    <div class="sticky-container">
        <div class="visual-container" id="bodice-svg" bind:clientWidth={containerWidth} bind:clientHeight={containerHeight}>
            {#if value < 6}
                <div class="svg-wrapper" transition:fade={{ duration: 400 }}>
                    {@html bodice}
                </div>
            {/if}
            {#if value >= 6}
                <div class="body-type-grid" transition:fade={{ duration: 400 }} style="transform: scale({value >= 8 ? 5 : 1});">
                    {#each bodyTypes as type, i}
                        <div class="type">
                            <p>{type}</p>
                        </div>
                    {/each}
                </div>
            {/if}
            {#if value >= 8}
                <div class="svg-wrapper" transition:fade={{ duration: 400 }}>
                    <ProportionsSVG {value} {containerWidth} {containerHeight}/>
                </div>
            {/if}
        </div>
    </div>


    <div class="scrolly-outer">
        <Scrolly bind:value>
            {#each copy.massProductionScroll as stage, i}
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
    
    .sticky-container {
        position: sticky;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10%;
        top: 0;
        height: 100vh;
        width: 100%;
        z-index: 1;
    }
  
    .visual-container {
        width: 100%;
        height: 100%;
        display: flex;
        position: relative;
        justify-content: center;
        align-items: center;
        padding-bottom: 0;
    }

    .svg-wrapper {
        width: 100%;
        height: 100%;
    }

    .body-type-grid {
        position: absolute;
        width: 100%;
        aspect-ratio: 1 / 1;
        max-width: 800px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 1rem;
        transition: transform 0.5s ease-in;
    }

    .body-type-grid .type {
        width: calc(33.33% - 1rem);
        aspect-ratio: 1 / 1;
        border: 1px solid black;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .select-wrapper {
        position: absolute;
        top: 2rem;
        left: 2rem;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease-in-out;
        z-index: 1000;
    }

     .select-wrapper.visible {
        opacity: 1;
        pointer-events: auto;
    }
    
    svg {
      width: 100%;
      height: 100%;
    }

    .brand-group {
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
        pointer-events: none;
    }

    .brand-group.visible {
        opacity: 1;
        transition: opacity 0.3s ease-in-out;
    }

    .brand-group .main-path {
        fill: none;
        stroke: var(--ws-blue);
        stroke-width: 1;
        transition: all 0.3s ease-in-out;
        pointer-events: none;
    }

    .brand-group .hidden-path {
        fill: none;
        stroke: transparent;
        stroke-width: 12;
        cursor: pointer;
        pointer-events: auto;
    }

    .brand-group.smallest .main-path {
        stroke: var(--ws-purple);
        stroke-width: 4;
    }

    .brand-group.biggest .main-path {
        stroke: var(--ws-orange);
        stroke-width: 4;
    }

    .brand-group.highlight .main-path  {
        stroke: var(--ws-green) !important;
        stroke-width: 4 !important;
    }

    .brand-group .label {
        font-family: var(--mono);
        font-weight: 700;
        fill: var(--color-fg);
        opacity: 0;
        transition: all 0.3s ease-in-out;
    }

    .brand-group.smallest .label {
        opacity: 1;
        fill: var(--ws-purple);
    }

    .brand-group.biggest .label {
        opacity: 1;
        fill: var(--ws-orange);
    }

    .brand-group.highlight .label {
        opacity: 1 !important;
        fill: var(--ws-green) !important;
    }

    .median-group text {
       font-family: var(--mono);
       font-weight: 700; 
       text-transform: uppercase;
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
    
    .scrolly-outer {
        position: relative;
        z-index: 2;
        pointer-events: none;
    }
    
    .step {
        height: 100vh;
        display: flex;
        justify-content: left;
        align-items: center;
        padding-right: 2rem;
        padding-left: 2rem;
        font-family: var(--sans);
        font-size: var(--20px);
    }
    
    .step .text {
        max-width: 400px;
        width: 90%;
        padding: 20px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        margin: 0;
        pointer-events: auto;
    }

    @media (max-width: 768px) {
        .step .text {
            max-width: 300px;
            padding: 15px;
        }
        
        .image-container {
            height: 75vh; 
        }
    }
</style>
