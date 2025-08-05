<script>
     import Scrolly from './helpers/Scrolly.svelte';
     import copy from "../data/copy.json";

    let value = $state(0);

    let containerHeight = $state(0);
    let containerWidth = $state(0);
    let margin = { top: 40, right: 10, bottom: 10, left: 10 };
    let width = $derived(containerWidth - margin.left - margin.right);
    let height = $derived(containerHeight - margin.top - margin.bottom);
    

</script>
<div>
    <h3>TK history section</h3>
</div>
<div class="scrolly-outer">
    <Scrolly bind:value>
        {#each copy.history as stage, i}
            <div class="step">
                <div class="text">
                    <p>{@html stage.text}</p>
                </div>
            </div>
        {/each}
    </Scrolly>
</div>
<style>
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
</style>