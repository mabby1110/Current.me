<script lang="ts">
	import '$lib/main.css';
	import Navbar from '$lib/components/Navbar.svelte';

	import { started } from '$lib/writables';
	import Loader from '$lib/components/Loader.svelte';
	import { fade } from 'svelte/transition';
	import EyeballScene from '$lib/scenes/EyeballScene.svelte';
	import InfoBanner from '$lib/components/InfoBanner.svelte';
	import { page } from '$app/state';
	import WorkScene from '$lib/scenes/workScene.svelte';

	$: currentPage = page.url.pathname;
	$: console.log(currentPage);
</script>

<div class="bg">
	{#if currentPage == '/'}
		<EyeballScene />
	{:else if currentPage == '/work'}
		<!-- svelte-ignore missing-declaration -->
		<WorkScene />
	{/if}
</div>

<!-- <InfoBanner /> -->

{#if $started}
	<div class="page-container">
		<div class="space-jam" in:fade={{ duration: 500 }}></div>
		<nav in:fade={{ duration: 500 }}>
			<Navbar />
		</nav>
		<main>
			<slot />
		</main>
		<footer>
			<div class="contact-container">
				<p>CONTACTO 6691597209 BERNARDOA.MARQUEZG@GMAIL.COM</p>
			</div>
		</footer>
	</div>
{:else}
	<Loader />
{/if}

<style>
	.space-jam {
		height: 40vh;
		user-select: none;
		background-color: black;
	}
	.page-container {
		flex-grow: 1;
		scroll-behavior: smooth;
	}

	nav {
		position: sticky;
		top: 0;
		z-index: 998;
		background-color: black;
	}

	main {
		touch-action: pan-y; /* Permite solo el scroll vertical */
		height: 90vh;
		scroll-snap-align: end;
	}
	footer {
		background-color: black;
		height: 90vh;
		scroll-snap-align: end;
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
</style>
