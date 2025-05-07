<script>
	import { getContext } from "svelte";
	import Footer from "$components/Footer.svelte";
	import WaistlineBeeswarm from "./WaistlineBeeswarm.svelte";
	import SimplifiedWaistlineBeeswarm from "./SimplifiedWaistlineBeeswarm.svelte";
	import FilteredWaistlineChart from "./FilteredWaistlineChart.svelte";




	// const copy = getContext("copy");
	// const data = getContext("data");
</script>

<svelte:boundary onerror={(e) => console.error(e)}>
	<FilteredWaistlineChart />	
	<!-- <SimplifiedWaistlineBeeswarm /> -->
	<!-- <WaistlineBeeswarm /> -->
	<!-- <Footer recirc={true} /> -->
</svelte:boundary>
