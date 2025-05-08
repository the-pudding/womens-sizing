<script>
	import { getContext } from "svelte";
	import Footer from "$components/Footer.svelte";
	import FilteredWaistlineChart from "./FilteredWaistlineChart.svelte";
	import PngChart from "./PNGChart.svelte";




	// const copy = getContext("copy");
	// const data = getContext("data");
</script>

<svelte:boundary onerror={(e) => console.error(e)}>
	<PngChart />
	<!-- <FilteredWaistlineChart />	 -->

	<!-- <Footer recirc={true} /> -->
</svelte:boundary>
