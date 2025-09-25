<script lang="ts">
	import { onMount } from 'svelte';
	import Intro from '$lib/sections/Intro.svelte';
	import { infoStore } from '$lib/writables';
	import { lightIntensity, sceneNumber } from '$lib/threeStores';
	import { fade } from 'svelte/transition';

	// Función para normalizar el scroll
	function getNormalizedScroll(): number {
		const viewportHeight = window.innerHeight;
		const scrollPercentage = (window.scrollY / viewportHeight) * 100;
		return scrollPercentage;
	}

	function handleScroll() {
		const normalizedScroll = getNormalizedScroll();
		$infoStore.scrollY = normalizedScroll;
	}

	$: if ($infoStore.scrollY <= 38) {
		// 50% del viewport height
		$infoStore.info = 'Continua deslizando';
		$sceneNumber = 0;
	} else if ($infoStore.scrollY <= 50) {
		$infoStore.info = 'Explora la escena. Desliza para navegar.';
		$lightIntensity = 100;
		$sceneNumber = 1;
	}

	onMount(() => {
		// Inicializar el valor del scroll al montar
		handleScroll();

		window.addEventListener('scroll', handleScroll);
		// También escuchar cambios de tamaño de ventana
		window.addEventListener('resize', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleScroll);
		};
	});
</script>

<div class="page-container">
	<Intro />
</div>
<style>
	.page-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
