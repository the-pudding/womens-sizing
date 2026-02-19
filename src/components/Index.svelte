<script>
	import Header from "$components/Header.svelte";
	import Footer from "$components/Footer.svelte";
	import Intro from "$components/womens_sizes/IntroJD.svelte";
	import SizeChart from "$components/womens_sizes/SizeChartJD.svelte";
	import VanitySizes from "$components/womens_sizes/VanitySizesJD.svelte";
	import MassProduction from "$components/womens_sizes/MassProductionJD.svelte";
	import TitlePage from "$components/womens_sizes/TitlePage.svelte";
	import Sewing from "$components/womens_sizes/Sewing.svelte";
	import Outro from "$components/womens_sizes/Outro.svelte";
	import Methods from "$components/womens_sizes/Methods.svelte";
	import SocialPosts from "./womens_sizes/SocialTitle.svelte";
	import BeeswarmSocial from "./womens_sizes/BeeswarmSocial.svelte";
	import SizeChartSocial from "./womens_sizes/SizeChartSocial.svelte";
	import SocialSizeChartTransition from "./womens_sizes/SocialSizeChartTransition.svelte";
	import SocialVanity from "./womens_sizes/SocialVanity.svelte";
	import SocialTitle from "./womens_sizes/SocialTitle.svelte";
	import SocialProportions from "./womens_sizes/SocialProportions.svelte";


</script>

<svelte:boundary onerror={(e) => console.error(e)}>
	<div class="grid-bg"></div>
	<!-- <Header /> -->
	<!-- <SocialTitle /> -->
	<!-- <BeeswarmSocial startStage={0}/> -->
	<!-- <BeeswarmSocial   autoPlay={true}
	stageDuration={4000}
	startStage={3}
	endStage={13}/> -->
	<!-- <SocialSizeChartTransition /> -->
	<!-- <SocialVanity /> -->
	<!-- <SocialProportions /> -->
	<!-- <SizeChartSocial /> -->
	<!-- <Intro startStage={0} endStage={7} introScroll={true}/> -->
	<!-- <TitlePage /> -->
	<Intro startStage={8}/>
	<!-- <SizeChart /> -->
	<!-- <VanitySizes /> -->
	<!-- <Sewing />  -->
	<!-- <MassProduction /> -->
	<Outro />
	<!-- <Methods /> -->
	<Footer recirc={true} />
</svelte:boundary>

<style>

</style>
