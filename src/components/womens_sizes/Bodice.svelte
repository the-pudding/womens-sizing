<script>
    import * as d3 from 'd3';
    let { value } = $props();
    import copy from "$data/copy.json";
    import { fade } from 'svelte/transition';
    import bodice from "$svg/graded-sizes-full-bodice.svg";


    function handleStepChange(value) {
        const centralSize = 8;
        const baseSelector = "#bodice-svg svg g";

        if (value == "to-enter" || value == 0) {
            d3.selectAll("#bodice-svg svg g").style("opacity", 0); 
            d3.selectAll("#bodice-svg svg #size8").style("opacity", 1);
        } else if (value == 1) {
            d3.selectAll(baseSelector)
                .filter(function() { 
                    const id = d3.select(this).attr("id");
                    return id && id.startsWith("size") && id !== `size${centralSize}`;
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
        } else if (value == 2) {
            d3.selectAll(baseSelector)
                .filter(function() { 
                    const id = d3.select(this).attr("id");
                    return id && id.startsWith("mock");
                })
                .transition()
                .delay(function() {
                    const id = d3.select(this).attr("id");
                    const sizeNumber = parseInt(id.replace("mock", ""));
                    const distance = Math.abs(sizeNumber - centralSize);
                    return distance * 150; // Apply the same distance-based delay
                })
                .duration(400)
                .style("opacity", 1);
            }
        }

    $effect(() => {
        handleStepChange(value)
    })
</script>

{#if value < 3}
    <div id="bodice-svg" transition:fade={{ duration: 400 }}>
        {@html bodice}
        <p>Size 8</p>
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