<script>
	import { getContext } from "svelte";
	import Footer from "$components/Footer.svelte";
	import Intro from "./Intro.svelte";

	import History from "./History.svelte";
	import MeasurementDrawings from "./archived/MeasurementDrawings.svelte";
	import SizeChart from "./SizeChart.svelte";
	import Waistlines from "./Waistlines.svelte";
	import VanitySizes from "./VanitySizes.svelte";
	import Proportions from "./Proportions.svelte";
	import TitlePage from "./TitlePage.svelte";


</script>

<svelte:boundary onerror={(e) => console.error(e)}>
	<Intro startStage={0} endStage={6} />
	<TitlePage />
	<Intro startStage={7} />

	<VanitySizes />
	<!-- <Waistlines /> -->
	<Proportions />
	<History />
	<SizeChart />	
	<!-- <Footer recirc={true} /> -->
</svelte:boundary>
