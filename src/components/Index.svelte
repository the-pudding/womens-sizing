<script>
	import { getContext } from "svelte";
	import Footer from "$components/Footer.svelte";
	import Intro from "./Intro.svelte";

	import History from "./History.svelte";
	import MeasurementDrawings from "./archived/MeasurementDrawings.svelte";
	import SizeChart from "./SizeChart.svelte";
	import Waistlines from "./Waistlines.svelte";
	import VanitySizes from "./VanitySizes.svelte";
	import Ransom from "$components/Ransom.svelte";



	// const copy = getContext("copy");
	// const data = getContext("data");
</script>

<svelte:boundary onerror={(e) => console.error(e)}>
	<!-- <Intro /> -->
	 <Ransom string="tween" />
	 <div class="grid-bg"></div>
	<!-- <Waistlines />
	<VanitySizes /> -->
	<!-- <History /> -->
	<!-- <SizeChart />	 -->
	<!-- <Footer recirc={true} /> -->
</svelte:boundary>

<style>
	.grid-bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-image: url("./assets/grid.png");
		background-size: 150px 150px;
		background-repeat: repeat;
		z-index: -1;
		opacity: 0.2;
	}	
</style>
