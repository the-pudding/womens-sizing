<script>
	import { getContext } from "svelte";
	import Footer from "$components/Footer.svelte";
	import Intro from "$components/womens_sizes/IntroJD.svelte";

	import History from "$components/womens_sizes/History.svelte";
	import MeasurementDrawings from "$components/womens_sizes/MeasurementDrawings.svelte";
	import SizeChart from "$components/womens_sizes/SizeChartJD.svelte";
	// import Waistlines from "./Waistlines.svelte";
	import VanitySizes from "$components/womens_sizes/VanitySizesJD.svelte";
	import Ransom from "$components/womens_sizes/Ransom.svelte";
	import Proportions from "$components/womens_sizes/ProportionsJD.svelte";
	import TitlePage from "$components/womens_sizes/TitlePage.svelte";


</script>

<svelte:boundary onerror={(e) => console.error(e)}>
	<div class="grid-bg"></div>
	<Intro startStage={0} endStage={8} introScroll={true}/>
	<!-- <TitlePage />
	<Intro startStage={8}/>
	<History />
	<Proportions />
	<VanitySizes />
	<SizeChart /> -->
	<!-- <Footer recirc={true} /> -->
</svelte:boundary>

<style>

</style>
