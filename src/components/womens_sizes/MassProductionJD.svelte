<script>
    import { onMount } from 'svelte';
    import copy from "$data/copy.json";
    import Scrolly from '../helpers/Scrolly.svelte';
    import * as d3 from 'd3';
    import { fade } from 'svelte/transition';
    import Bodice from "$components/womens_sizes/Bodice.svelte";
    import ProportionsSVG from "$components/womens_sizes/ProportionsSVG.svelte";
    import ProportionsGrid from "$components/womens_sizes/ProportionsGridJD.svelte";
    import BodyTypesGrid from "$components/womens_sizes/BodyTypesGrid.svelte";

    let value = $state(0);
    let containerWidth = $state(0);
    let containerHeight = $state(0);
    let parentWidth = $state(0);
    let parentHeight = $state(0);
</script>

<div class="outer-container" id="mass-production">
    <div class="sticky-container">
        <div class="visual-container">
            <!-- <div class="el-wrapper">
                <Bodice {value} />
            </div> -->
            <div 
                class="el-wrapper proportion-grid visible" 
                bind:clientWidth={containerWidth} 
                bind:clientHeight={containerHeight}
                style="transform: scale({value >= 4 ? 0.2 : 1}) 
                        translateX({value >= 4 ? '-1000px' : 0});
                        opacity: {value >= 4 ? 0 : 1};"
            >
                <ProportionsSVG {value} {containerWidth} {containerHeight}/>
            </div>
            <div class="grid-wrapper"
                bind:clientWidth={parentWidth} 
                bind:clientHeight={parentHeight}>
                <ProportionsGrid {value} {parentWidth} {parentHeight}/>
            </div>
            <div class="el-wrapper">
                <BodyTypesGrid {value} />
            </div>
        </div>
    </div>


    <div class="scrolly-outer">
        <Scrolly bind:value>
            {#each copy.massProductionScroll as stage, i}
                <div class="step" id="step-{i}">
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

    .el-wrapper {
        width: 100%;
        aspect-ratio: 1 / 1;
        max-width: 800px;
        position: absolute;
    }

    .proportion-grid {
        transition: all 0.3s ease-in;
        transform-origin: center center;
        max-width: 1000px;
    }

    .grid-wrapper {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
    }

    .svg-wrapper {
        width: 100%;
        height: 100%;
    }

    :global(.svg-wrapper svg) {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 2;
    }

    .svg-wrapper img {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 1;
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
        border: 1px solid var(--ws-blue);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease-in;
        opacity: 0.5;
    }

    .body-type-grid .highlight {
        width: calc(33.33% - 1rem);
        aspect-ratio: 1 / 1;
        border: 4px solid var(--ws-purple);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease-in;
        opacity: 1;
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
        font-size: var(--16px);
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
        font-size: var(--16px);
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

    #step-10 {
        opacity: 0;
        pointer-events: none;
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
