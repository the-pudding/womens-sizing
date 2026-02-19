<script>
    import { select, selectAll } from "d3";
    let { value } = $props();
    import { fade } from 'svelte/transition';
    import bodice from "$svg/graded-sizes-full-bodice.svg";
   import { reducedMotion, initMotionWatcher } from "$utils/reduceMotion.js";


    function handleStepChange(value) {
        const centralSize = 8;
        const baseSelector = "#bodice-svg svg g";
        
        // Check the reducedMotion store value
        const isMotionReduced = $reducedMotion;

        if (value == "to-enter" || value == 0) {
            selectAll("#bodice-svg svg g").style("opacity", 0); 
            selectAll("#bodice-svg svg #size8").style("opacity", 1);
        } else if (value == 1) {
            const selection = selectAll(baseSelector)
                .filter(function() { 
                    const id = select(this).attr("id");
                    return id && id.startsWith("size") && id !== `size${centralSize}`;
                });

            if (isMotionReduced) {
                // SNAP: No transition, no delay
                selection.style("opacity", 1);
            } else {
                // ANIMATE: Delay and Transition
                selection.transition()
                    .delay(function() {
                        const id = select(this).attr("id");
                        const sizeNumber = parseInt(id.replace("size", ""));
                        return Math.abs(sizeNumber - centralSize) * 150;
                    })
                    .duration(400)
                    .style("opacity", 1);
            }
        } else if (value == 2) {
            const selection = selectAll(baseSelector)
                .filter(function() { 
                    const id = select(this).attr("id");
                    return id && id.startsWith("mock");
                });

            if (isMotionReduced) {
                // SNAP
                selection.style("opacity", 1);
            } else {
                // ANIMATE
                selection.transition()
                    .delay(function() {
                        const id = select(this).attr("id");
                        const sizeNumber = parseInt(id.replace("mock", ""));
                        return Math.abs(sizeNumber - centralSize) * 150;
                    })
                    .duration(400)
                    .style("opacity", 1);
            }
        }
    }

    $effect(() => {
        handleStepChange(value)
    })
</script>

{#if value < 3}
    <div id="bodice-svg" transition:fade={{ duration: $reducedMotion ? 0 : 400 }}>
        {@html bodice}
    </div>
{/if}

<style>
    #bodice-svg{
        width: 100%;
        height: 100%;
        position: relative;
    }

    #bodice-svg img {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 1;
    }

    p {
        position: absolute;
        bottom: 1rem;
        left: 50%;
        transform: translateX(-50%);
    }
</style>