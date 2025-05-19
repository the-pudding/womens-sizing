<script>
    import Scrolly from "./helpers/Scrolly.svelte";

</script>

<div>
    <Scrolly bind:value>
        {#each copy.scrolly1 as stage, i}
            <div class="step">
                <div class="text">
                    <p>{@html stage.text}</p>
                </div>
            </div>
        {/each}
    </Scrolly>
</div>

<style>

</style>