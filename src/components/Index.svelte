<script>
	import { getContext } from "svelte";
	import Footer from "$components/Footer.svelte";
	import Intro from "./Intro.svelte";

	import History from "./History.svelte";
	import MeasurementDrawings from "./archived/MeasurementDrawings.svelte";
	import SizeChart from "./SizeChart.svelte";
	import Waistlines from "./Waistlines.svelte";
	import VanitySizes from "./VanitySizes.svelte";



	// const copy = getContext("copy");
	// const data = getContext("data");
</script>

<svelte:boundary onerror={(e) => console.error(e)}>
	<!-- <Intro /> -->
	<Waistlines />
	<VanitySizes />
	<!-- <History /> -->
	<!-- <SizeChart />	 -->
	<!-- <Footer recirc={true} /> -->
</svelte:boundary>
