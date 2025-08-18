<script>
	import { getContext } from "svelte";
	import Footer from "$components/Footer.svelte";
	import Intro from "./IntroJD.svelte";

	import History from "./History.svelte";
	import MeasurementDrawings from "./archived/MeasurementDrawings.svelte";
	import SizeChart from "./SizeChartJD.svelte";
	import Waistlines from "./Waistlines.svelte";
	import VanitySizes from "./VanitySizesJD.svelte";
	import Ransom from "$components/Ransom.svelte";
	import Proportions from "./Proportions.svelte";
	import TitlePage from "./TitlePage.svelte";


</script>

<svelte:boundary onerror={(e) => console.error(e)}>
	 <div class="grid-bg"></div>
	<Intro />
	<!-- <TitlePage /> -->
	<!-- <Intro startStage={7} introScroll={false} /> -->
	<!-- <VanitySizes /> -->
	<!-- <Waistlines />
	<Proportions />
	<History />
	<SizeChart />	 -->
	<SizeChart />
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
