<script lang="ts">
	import '$lib/main.css';
	import Navbar from '$lib/components/Navbar.svelte';

	import { release, started } from '$lib/writables';
	import Loader from '$lib/components/Loader.svelte';
	import { fade } from 'svelte/transition';
	import EyeballScene from '$lib/scenes/EyeballScene.svelte';
	import InfoBanner from '$lib/components/InfoBanner.svelte';
	import { page } from '$app/state';
	import SphereVoidBackground from '$lib/scenes/SphereVoidBackground.svelte';
	import WorkScene from '$lib/scenes/workScene.svelte';

	$: currentPage = page.url.pathname;
	$: console.log(currentPage)

</script>

<div class="bg">
	{#if currentPage == "/"}
	<EyeballScene />
	{:else if currentPage == "/work"}
	<!-- svelte-ignore missing-declaration -->
	<WorkScene/>
	{/if}
</div>

<InfoBanner />

<div class="page-container">
	<nav in:fade={{ duration: 500 }}>
		<Navbar />
	</nav>
	<main>
		<slot />
	</main>
</div>

<style>
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
		width: 100vw;
		height: 100vh;
	}
</style>
