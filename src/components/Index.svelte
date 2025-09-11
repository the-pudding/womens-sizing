<script>
	import { getContext } from "svelte";
	import Footer from "$components/Footer.svelte";
	import Intro from "./IntroJD.svelte";

	import History from "./History.svelte";
	import MeasurementDrawings from "./archived/MeasurementDrawings.svelte";
	import SizeChart from "./SizeChartJD.svelte";
	import Waistlines from "./Waistlines.svelte";
	import VanitySizes from "./VanitySizesJD.svelte";
	import Ransom from "$components/Ransom.svelte";
	import Proportions from "./ProportionsJD.svelte";
	import TitlePage from "./TitlePage.svelte";


</script>

<svelte:boundary onerror={(e) => console.error(e)}>
	 <div class="grid-bg"></div>
	<Intro startStage={0} endStage={6} introScroll={true}/>
	<TitlePage />
	<Intro startStage={7}/>
	<History />
	<Proportions />
	<VanitySizes />
	<SizeChart />
	<!-- <Footer recirc={true} /> -->
</svelte:boundary>

<style>
	.grid-bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-image: url("assets/grid.png");
		background-size: 150px 150px;
		background-repeat: repeat;
		z-index: -1;
		opacity: 0.2;
	}	

	    :global(.orange-span) {
        background: rgba(217, 111, 50, 0.75);
        padding: 0.25rem 0.5rem;
        font-weight: 700;
        font-family: var(--mono);
        box-decoration-break: clone;
    }

    :global(.blue-span) {
        background: rgba(154, 187, 217, 0.75);
        padding: 0.25rem 0.5rem;
        font-weight: 700;
        font-family: var(--mono);
        box-decoration-break: clone;
    }

    :global(.green-span) {
        background: rgba(194, 217, 50, 0.75);
        padding: 0.25rem 0.5rem;
        font-weight: 700;
        font-family: var(--mono);
        box-decoration-break: clone;
    }

    :global(.purple-span) {
        background: rgba(181, 123, 220, 0.75);
        padding: 0.25rem 0.5rem;
        font-weight: 700;
        font-family: var(--mono);
        box-decoration-break: clone;
    }

	:global(.orange-outline) {
        background: none;
		border: 3px solid rgba(217, 111, 50, 1);
        padding: 0.25rem 0.5rem;
        font-weight: 700;
        font-family: var(--mono);
        box-decoration-break: clone;
    }

	:global(span.bold) {
		font-weight: 700;
        font-family: var(--mono);
	}
</style>
