<script>
	let {
		title = "Title TK",
		description = "Description TK",
		url = "https://pudding.cool",
		keywords = "",
		preloadFont = []
	} = $props();

	const cleanUrl = url.endsWith('/') ? url.slice(0, -1) : url;
    const ogImage = `${cleanUrl}/assets/og2.jpg`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="author" content="The Pudding" />
	<meta name="news_keywords" content={keywords} />

	<meta property="og:title" content={title} />
	<meta property="og:site_name" content="The Pudding" />
	<meta property="og:url" content="https://pudding.cool/2026/02/womens-sizing/" />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="article" />
	<meta property="og:locale" content="en_US" />

	<meta property="og:image" content="https://pudding.cool/2026/02/womens-sizing/assets/og2.jpg" />
    <meta property="og:image:secure_url" content="https://pudding.cool/2026/02/womens-sizing/assets/og2.jpg" />
	<meta property="og:image:type" content="image/jpeg" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="https://pudding.cool" />
	<meta name="twitter:creator" content="@puddingviz" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image:src" content={ogImage} />

	<meta name="robots" content="max-image-preview:large" />

	<link rel="canonical" href="https://pudding.cool/2026/02/womens-sizing/" />

	{#each preloadFont as href}
		<link rel="preload" {href} as="font" type="font/woff2" crossorigin />
	{/each}
</svelte:head>