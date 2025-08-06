<script>
	import "$styles/app.css";
	import Header from "$components/Header.svelte";

	let { children } = $props();
</script>

<svelte:head>
  <link rel="stylesheet" href="https://use.typekit.net/yjh5xgk.css">
</svelte:head>

<Header />
<main id="content">
	{@render children?.()}
</main>
