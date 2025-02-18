<script lang="ts">
	import '$lib/main.css';
	import Navbar from '$lib/components/Navbar.svelte';

	import { started } from '$lib/writables';
	import Loader from '$lib/components/Loader.svelte';
	import { fade } from 'svelte/transition';
	import DevelopmentBanner from '$lib/components/DevelopmentBanner.svelte';
	import EyeballScene from '$lib/scenes/EyeballScene.svelte';
	import InfoBanner from '$lib/components/InfoBanner.svelte';
</script>

<div class="bg">
	<!-- <Background release={$release} started={$started} /> -->
	<EyeballScene />
</div>

<InfoBanner />

{#if $started}
	<div class="space-jam" in:fade={{ duration: 500 }}></div>
	<div class="page-container">
		<nav in:fade={{ duration: 500 }}>
			<Navbar />
		</nav>
		<main>
			<slot />
		</main>
	</div>
{:else}
	<!-- <InstuctionBanner>Move or touch around, keep pressing to enter</InstuctionBanner> -->
	<Loader />
{/if}

<style>

	.space-jam {
		height: 40vh;
		user-select: none;
		background-color: black;
	}
	nav {
		position: sticky;
		top: 0;
		z-index: 998;
		background-color: black;
	}
	/* Habilitar interactividad solo para elementos específicos */
	main * {
		pointer-events: auto;
		width: 100%;
	}
	.bg {
		min-width: 240px;
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		z-index: -1;
	}
	.page-container {
		position: relative;
	}
</style>
