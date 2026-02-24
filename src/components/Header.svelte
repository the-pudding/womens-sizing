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
	<a class="tip"href="https://buy.stripe.com/dRmfZgdmG40M8M48Mn4Vy08" aria-label="Support this project" target="_blank">
		<span>Tip</span>
		<img src="/assets/dollar.png" alt="dollar sign"/>
	</a>
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

	:global(a .tip) {
		text-decoration: none !important;
		border: none;
	}

	.tip {
		position: absolute;
		left: 58%;
		transform: translateX(-50%) rotate(4deg);
		top: 4.25rem;
		background: var(--color-bg);
		border: 3px solid var(--color-fg);
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		text-decoration: none;
		width: 56px;
		padding: 0.25rem;
		font-family: var(--mono);
		font-weight: 700;
		font-size: var(--12px);
		border-radius: 4px;
		transition: all var(--ms-250);
	}

	.tip span {
		text-decoration: none;
	}

	.tip:hover {
		background-color: var(--ws-green);
		transform: translateX(-50%) translateY(-4px) rotate(4deg);
	}

	.tip img {
		width: 20px;
		height: 20px;
	}
</style>
