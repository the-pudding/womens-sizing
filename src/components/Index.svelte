<script>
	import { getContext } from "svelte";
	import Footer from "$components/Footer.svelte";
	import FilteredWaistlineChart from "./FilteredWaistlineChart.svelte";
	import PngChart from "./PNGChart.svelte";
	import AvatarChart from "./AvatarChart.svelte";
	import Debugging from "./Debugging.svelte";


	// const copy = getContext("copy");
	// const data = getContext("data");
</script>

<svelte:boundary onerror={(e) => console.error(e)}>
	<PngChart />
	<!-- <Debugging /> -->
	<AvatarChart />
	<!-- <FilteredWaistlineChart />	 -->

	<!-- <Footer recirc={true} /> -->
</svelte:boundary>
