<script lang="ts">
	import '$lib/main.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Background from '$lib/components/SphereVoidBackground.svelte';
	import { release, started } from '$lib/writables';
	import Loader from '$lib/components/Loader.svelte';
	import { fade } from 'svelte/transition';
</script>

<div class="bg">
	<Background release={$release} started={$started} />
</div>

{#if $started}
	<main transition:fade={{ duration: 1000, delay: 1000 }}>
		<nav transition:fade={{ duration: 500 }}>
			<Navbar />
		</nav>
		<slot />
	</main>
{:else}
	<Loader />
{/if}

<style>
	main {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
	main,
	.bg {
		width: 100%;
		min-width: 240px;
		padding: 0 1rem;
	}
	.bg {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		z-index: -999;
		background-color: rgb(0, 0, 0);
	}
	nav {
		width: 100%;
		z-index: 999;
	}
</style>