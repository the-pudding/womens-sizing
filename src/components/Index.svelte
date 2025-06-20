<script>
	import { getContext } from "svelte";
	import Footer from "$components/Footer.svelte";
	import Intro from "./Intro.svelte";
	import Section2 from "./Section2.svelte";



	// const copy = getContext("copy");
	// const data = getContext("data");
</script>

<svelte:boundary onerror={(e) => console.error(e)}>
	<Intro />
	<div style="height: 75vh; width: 100%; background-color: #FBFFE9; align-content: center; text-align: center">
		<h1>This will be a title page... </h1>
	</div>
	<Section2 />
	<!-- <Footer recirc={true} /> -->
</svelte:boundary>
