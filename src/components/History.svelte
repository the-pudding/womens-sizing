<script>
    import copy from "../data/copy.json";
    import Ransom from "$components/Ransom.svelte";
    import Leet from "$components/Leet.svelte";

    console.log(copy.jdHistory)
</script>

<section class="history">
    <div>
        <p class="mono"><Leet string={copy.jdHistory[0].subtitle} /></p>
        <Ransom string={copy.jdHistory[0].title} />
    </div>
    {#each copy.jdHistory[0].textA as graf, i}
        <p>{graf.value}</p>
    {/each}
    <div class="img-wrapper">
        <img src="assets/tk" />
        <img src="assets/tk" />
        <img src="assets/tk" />
    </div>
    {#each copy.jdHistory[0].textB as graf, i}
        <p>{graf.value}</p>
    {/each}
</section>

<style>
 
</style>