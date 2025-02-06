<script lang="ts">
	import '$lib/main.css';
	import Navbar from '$lib/components/Navbar.svelte';

	import { started } from '$lib/writables';
	import Loader from '$lib/components/Loader.svelte';
	import { fade } from 'svelte/transition';
	import DevelopmentBanner from '$lib/components/DevelopmentBanner.svelte';
	import EyeballScene from '$lib/components/scenes/EyeballScene.svelte';
</script>

<div class="bg">
	<!-- <Background release={$release} started={$started} /> -->
	<EyeballScene />
</div>

{#if $started}
	<nav transition:fade={{ duration: 500 }}>
		<Navbar />
	</nav>
	<main transition:fade={{ duration: 1000, delay: 1000 }}>
		<slot />
		<DevelopmentBanner
			showBanner={true}
			message="🚧 Esta página está en desarrollo. Algunas funciones podrían estar incompletas."
		/>
	</main>
{:else}
	<Loader />
{/if}

<style>
	nav {
		padding-top: 1rem;
		position: sticky;
		top: 0;
		z-index: 999;
		width: 100%;
		backdrop-filter: blur(10px);
	}
	main {
		width: 100%;
		position: relative;
		z-index: 1;
	}

	/* Habilitar interactividad solo para elementos específicos */
	main * {
		pointer-events: auto;
	}
	.bg {
		width: 100%;
		min-width: 240px;
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		z-index: -1;
		background-color: rgb(0, 0, 0);
	}
</style>
