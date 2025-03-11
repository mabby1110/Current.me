<script lang="ts">
	import { infoStore, projects } from '$lib/writables';
	import { onMount } from 'svelte';
	import { fade, slide } from 'svelte/transition';
	let current = 'POS-CRM';

	onMount(() => {
		$infoStore.info = 'click on title to switch cards';
	});
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<section class="page-container" id="work-section">
	{#each projects as p}
		<div
			style="background-color: {p.color}"
			class="{p.title} project-container {current == p.title ? 'groww' : ''}"
			on:click={() => (current = p.title)}
			transition:slide={{ duration: 300 }}
		>
			<h1 class={current == p.title ? 'expanded-title' : ''}>{p.title}</h1>
			{#if current == p.title}
				<div
					class="project-details"
					in:slide={{ duration: 400, delay: 150 }}
					out:slide={{ duration: 300 }}
				>
				<img src={p.image} alt="{p.title}-icon" transition:fade={{ duration: 300, delay:200 }}/>
					<p transition:fade={{ duration: 500 }}>{p.description}</p>
					<button on:click|preventDefault={() => (window.location.href = p.link)}>github</button>
				</div>
			{/if}
		</div>
	{/each}
</section>

<style>
	.page-container {
		height: 92vh;
		display: flex;
		flex-direction: column-reverse;
	}
	.project-container {
		height: fit-content;
		transition: all 0.3s ease-in-out;
		overflow: scroll;
		pointer-events: auto;
	}
	.project-container.groww {
		flex-grow: 1;
	}
	.project-container h1 {
		line-break: anywhere;
		padding: 1rem;
		cursor: pointer;
		transition:
			font-size 0.4s ease,
			padding 0.4s ease;
	}
	.expanded-title {
		font-size: 8em;
		padding: 1.5rem 1rem !important;
		background-color: transparent;
	}
	@media (max-width: 600px) {
		.expanded-title {
			font-size: 3em;
			padding: 1.5rem 1rem !important;
		}
	}
	.project-details {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
		grid-row: 240px;
		padding: 1rem;
		gap: 1rem;
	}
	.content {
		width: 100%;
		max-width: 600px;
	}
	img {
		grid-column-end: span 2;
		width: 100%;
		max-height: 350px;
		object-fit: scale-down;
	}
	@media (max-width: 600px) {
		img {
			grid-column-end: span 1;
			width: 100%;
			max-height: 350px;
			object-fit: scale-down;
		}
	}
	button {
		padding: 0.5rem 1rem;
		background-color: #007bff;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		height: 2rem;
		width: fit-content;
	}
	button:hover {
		background-color: #0056b3;
	}
</style>
