<script lang="ts">
	import '$lib/main.css';
	import Navbar from '$lib/components/Navbar.svelte';

	import { scrollY, started } from '$lib/writables';
	import Loader from '$lib/components/Loader.svelte';
	import { fade } from 'svelte/transition';
	import DevelopmentBanner from '$lib/components/DevelopmentBanner.svelte';
	import EyeballScene from '$lib/scenes/EyeballScene.svelte';
	// import InstuctionBanner from '$lib/components/InstuctionBanner.svelte';
	function handleScroll(event) {
        const element = event.target;
        console.log(element)
        $scrollY = element.scrollTop;
    }
</script>

<div class="bg">
	<!-- <Background release={$release} started={$started} /> -->
	<EyeballScene />
</div>

{#if $started}
		<span></span>
		<nav transition:fade={{ duration: 500 }}>
			<Navbar />
		</nav>
	<main>
		<slot />
		<DevelopmentBanner
			showBanner={true}
			message="🚧 Esta página está en desarrollo. Algunas funciones podrían estar incompletas."
		/>
	</main>
{:else}
	<!-- <InstuctionBanner>Move or touch around, keep pressing to enter</InstuctionBanner> -->
	<Loader />
{/if}
<style>
	span {
		height: 20vh;
	}
	nav {
		position: sticky;
		top: 0;
		z-index: 999;
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
