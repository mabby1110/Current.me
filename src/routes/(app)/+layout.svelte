<script lang="ts">
	import '$lib/main.css';
	import Navbar from '$lib/components/Navbar.svelte';

	import { started } from '$lib/writables';
	import Loader from '$lib/components/Loader.svelte';
	import { slide } from 'svelte/transition';
	import DevelopmentBanner from '$lib/components/DevelopmentBanner.svelte';
	import EyeballScene from '$lib/scenes/EyeballScene.svelte';

</script>

<div class="bg">
	<!-- <Background release={$release} started={$started} /> -->
	<EyeballScene />
</div>

{#if $started}
<span transition:slide={{ duration: 500 }}></span>
<div class="page-container">
	<nav transition:slide={{ duration: 500 }}>
		<Navbar />
	</nav>
	<main>
		<slot />
		<DevelopmentBanner
			showBanner={true}
			message="🚧 Esta página está en desarrollo. Algunas funciones podrían estar incompletas."
		/>
	</main>
</div>
{:else}
	<!-- <InstuctionBanner>Move or touch around, keep pressing to enter</InstuctionBanner> -->
	<Loader />
{/if}
<style>
	span {
		height: 40vh;
		backdrop-filter: blur(20px);
		background-color: black;
	}
	nav {
		position: sticky;
		top: -1px;
		z-index: 999;
		background-color: black;
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
	}
	.page-container {
		backdrop-filter: blur(10px);
	}
</style>
