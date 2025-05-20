<script>
	import { getContext } from "svelte";
	import Footer from "$components/Footer.svelte";
	import Beeswarm from "./Beeswarm.svelte";
	import Section1 from "./Section1.svelte";
	import S1Scroll from "./S1Scroll.svelte";


	// const copy = getContext("copy");
	// const data = getContext("data");
</script>

<svelte:boundary onerror={(e) => console.error(e)}>
	<!-- <Beeswarm /> -->
	<S1Scroll />
	<!-- <Section1 /> -->
	<!-- <Footer recirc={true} /> -->
</svelte:boundary>
