<script>
	import { getContext } from "svelte";
	import Footer from "$components/Footer.svelte";
	import MeasurementDrawings from "$components/MeasurementDrawings.svelte";
	import WaistChart from "./WaistChart.svelte";
	import AstmSizeChart from "./ASTMSizeChart.svelte";
	import SizeWaistComparisons from "./SizeWaistComparisons.svelte";



	// const copy = getContext("copy");
	// const data = getContext("data");
</script>

<svelte:boundary onerror={(e) => console.error(e)}>
	<AstmSizeChart />
	<SizeWaistComparisons />
	<WaistChart />

	<MeasurementDrawings />
	<!-- <Footer recirc={true} /> -->
</svelte:boundary>
