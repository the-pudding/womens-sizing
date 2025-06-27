<script>
	import { getContext } from "svelte";
	import Footer from "$components/Footer.svelte";
	import Intro from "./Intro.svelte";
	import Section2 from "./Section2.svelte";
	import History from "./History.svelte";
	import MeasurementDrawings from "./archived/MeasurementDrawings.svelte";


	// const copy = getContext("copy");
	// const data = getContext("data");
</script>

<svelte:boundary onerror={(e) => console.error(e)}>
	<Intro />
	<Section2 />
	<!-- <History /> -->
	<!-- <Footer recirc={true} /> -->
</svelte:boundary>
