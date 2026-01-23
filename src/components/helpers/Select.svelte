<script>
    import { createEventDispatcher } from 'svelte';
    let { options, label, value } = $props();

    const dispatch = createEventDispatcher();

    $effect(() => {
        if (value !== undefined) {
            dispatch('change', value);
        }
    });
</script>

<div class="select">
	{#if label}
		<label for={"brand"}>{label}</label>
	{/if}
	<select class="select" bind:value>
		{#each options as option}
			<option>{option}</option>
		{/each}
	</select>
</div>

<style>
	.select {
		font-family: var(--sans);
		width: 100%;
		max-width: 240px;
		font-size: var(--14px);
	}

	label {
		position: absolute;
		font-family: inherit;
		font-weight: inherit;
		font-size: 0em;
		margin-bottom: 0;
		height: 0;
		visibility: hidden;
	}

	select {
		width: 100%;
		height: 40px;
		font-family: inherit;
		font-size: 1em;
		cursor: pointer;
		background: var(--color-white);
		color: var(--color-gray-900);
		border-width:2px;
        border-color: var(--window-button-stroke);
        border-style:solid;
		padding: 0em 2.5em 0em 0.5em;
		appearance: none;
		line-height: 1.4;
		color: var(--fanfic-black);
		text-overflow: ellipsis;
		overflow: hidden;   
		white-space: nowrap; 
	}

	.select::after {
		display: block;
		content: "";
		position: absolute;
		bottom: 2.5em;
		right: 1.25em;
		width: 0.75em;
		height: 0.75em;
		z-index: 1;
		background: var(--color-fg);
		clip-path: polygon(0% 0%, 100% 100%, 0% 100%);
		transform-origin: center center;
		transform: rotate(-45deg);
		pointer-events: none;
	}

	select:hover {
		transform: scale(0.98);
	}

	select:focus {
		box-shadow: 0 0 4px 0 var(--color-focus);
	}

	.select:disabled {
		cursor: not-allowed;
		background-color: var(--color-gray-300);
	}
</style>