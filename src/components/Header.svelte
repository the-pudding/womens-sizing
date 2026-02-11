<script>
	// shadow, plain, line, bubble
	import wordmark from "$svg/wordmark-shadow.svg";
</script>

<header>
	<div class="wordmark">
		<a href="https://pudding.cool" aria-label="The Pudding" target="_self"
			>{@html wordmark}</a
		>
	</div>
</header>

<style>
	header {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		z-index: 1000;
	}
	.wordmark {
		max-width: 12em;
		margin: 0 auto;
		padding: 32px 0;
		transform: rotate(-4deg);
	}

	.wordmark a {
		border: none;
		display: block;
		color: var(--color-fg);
	}

	.wordmark a:hover {
		background-color: transparent;
	}
</style>
