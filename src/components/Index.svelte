<script>
	import { getContext } from "svelte";
	import Footer from "$components/Footer.svelte";
	import WaistlineBeeswarm from "./WaistlineBeeswarm.svelte";




	// const copy = getContext("copy");
	// const data = getContext("data");
</script>

<svelte:boundary onerror={(e) => console.error(e)}>
	<WaistlineBeeswarm />
	<!-- <Footer recirc={true} /> -->
</svelte:boundary>
