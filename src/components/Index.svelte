<script>
	import { getContext } from "svelte";
	import Footer from "$components/Footer.svelte";
	import Beeswarm from "./BeeswarmJD.svelte";

	// import Scrolly component
	import Scrolly from "$components/helpers/Scrolly.svelte";

	// import copy from json that is piped in from google doc
	const copy = getContext("copy");

	// variable for scrollIndex that is bound to the Scrolly value
	let scrollIndex = $state();
</script>

<svelte:boundary onerror={(e) => console.error(e)}>
	<!-- Sticky container to house graphic -->
	<div class="sticky">
		<!-- Pass the scrollIndex to the beeswarm component for use in there -->
		<Beeswarm scrollIndex={scrollIndex}/>
	</div>
	<!-- scrolly container to house steps -->
	<Scrolly bind:value={scrollIndex}>
		<!-- for each paragraph in the steps object in the copy, add another step -->
		{#each copy.steps as step, i}
			<div class="step">
			<div class="step-inner">
				<p>{step.value}</p>
			</div>
			</div>
		{/each}
	</Scrolly>

	<!-- <Footer recirc={true} /> -->
</svelte:boundary>

<style>
	.sticky {
        width: 100%;
        height: 100svh;
		position: sticky;
		top: 0;
        left: 0;
        z-index: 1;
        overflow: hidden;
	}

	.step {
		height: 100vh;
        z-index: 1000;
        max-width: 550px;
        margin: 0 auto;
        opacity: 1;
        pointer-events: none;
        z-index: 1000;
	}

	.step-inner {
        padding: 2rem; 
        border-radius: 3px;
        position: relative;
		background: white;
		border: 1px solid black;
		z-index: 1000;
    }

	.step p {
        text-align: left;
        max-width: 600px;
        font-size: var(--18px);
        line-height: 1.65;
        background: none;
        z-index: 1000;
        margin: 0;
        pointer-events: auto;
    }
</style>
