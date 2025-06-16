<script>
	import { getContext } from "svelte";
	import Footer from "$components/Footer.svelte";
	import Intro from "./Intro.svelte";
	import S1Scroll from "./S1Scroll.svelte";


	// const copy = getContext("copy");
	// const data = getContext("data");
</script>

<svelte:boundary onerror={(e) => console.error(e)}>
	<!-- <Intro /> -->
	<S1Scroll />
	<!-- <Footer recirc={true} /> -->
</svelte:boundary>
