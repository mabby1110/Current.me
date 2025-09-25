<script lang="ts">
	import '$lib/main.css';
	import Navbar from '$lib/components/Navbar.svelte';

	import { infoStore, started } from '$lib/writables';
	import Loader from '$lib/components/Loader.svelte';
	import { fade } from 'svelte/transition';
	import EyeballScene from '$lib/scenes/EyeballScene.svelte';
	import InfoBanner from '$lib/components/InfoBanner.svelte';
	import { page } from '$app/state';
	import WorkScene from '$lib/scenes/workScene.svelte';
	import Contact from '$lib/sections/Contact.svelte';
	import { onMount } from 'svelte';

	$: currentPage = page.url.pathname;
	$: console.log(currentPage);

	$: backgroundAnimate = ($infoStore.scrollY >= 38 && $started);
	$: console.log(backgroundAnimate);
	let footer: HTMLElement;
	let isFooterSnapped = false;

	onMount(() => {
		// Definimos el observador
		const observer = new IntersectionObserver(
			(entries) => {
				// La propiedad 'isIntersecting' es true cuando el elemento entra en la vista
				isFooterSnapped = entries[0].isIntersecting;
			},
			{
				// El 'root' es el contenedor del scroll. Aquí es el `body` por defecto
				// La propiedad 'threshold' define el porcentaje del elemento que debe estar visible
				// 1.0 significa que el 100% del elemento debe ser visible para que se active
				threshold: 0.8
			}
		);

		// Si el elemento del footer existe, lo observamos
		if (footer) {
			observer.observe(footer);
		}

		// Limpiamos el observador cuando el componente se destruye
		return () => {
			if (observer) {
				observer.disconnect();
			}
		};
	});
</script>

<div class="bg">
	{#if currentPage == '/'}
		<EyeballScene />
	{:else if currentPage == '/work'}
		<!-- svelte-ignore missing-declaration -->
		<WorkScene />
	{/if}
</div>

<InfoBanner />

<div class="page-container">
	{#if !$started}
		<Loader />
	{/if}
	<div class="space-jam  {$started ? 'background-cover-in':'background-cover-out'}"></div>
	<nav class="{$started ? 'background-cover-in':'background-cover-out'}">
		<Navbar />
	</nav>
	{#if $started}
		<main>
			<slot />
		</main>
		<footer bind:this={footer} class={isFooterSnapped ? 'hide' : ''}>
			<Contact />
		</footer>
	{/if}
</div>

<style>
	.space-jam {
		height: 40vh;
		user-select: none;
		scroll-snap-align: center;
		scroll-snap-stop: normal;
	}
	.page-container {
		flex-grow: 1;
	}
	.background-cover-in {
		background-color: black;
	}

	.background-cover-out {
		background-color: transparent;
	}
	nav {
		position: sticky;
		top: 0;
		height: fit-content;
		z-index: 88;
		background-color: black;

	}

	main {
		touch-action: pan-y; /* Permite solo el scroll vertical */
		flex-grow: 1;
		scroll-snap-align: center;
		scroll-snap-stop: normal;
	}
	footer {
		flex-grow: 1;
		scroll-snap-align: end;
		scroll-snap-stop: normal;
		height: 100vh;
		background-color: black;
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
