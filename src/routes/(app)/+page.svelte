<script lang="ts">
	import { onMount } from 'svelte';
	import Intro from '$lib/sections/Intro.svelte';
	import { infoStore } from '$lib/writables';
	import { lightIntensity, sceneNumber } from '$lib/threeStores';
	import { fade } from 'svelte/transition';
	import MyWork from '$lib/sections/MyWork.svelte';
	let navElement: HTMLElement;
	$: showHero = false;
	$: {
		console.log(showHero);
	}

	const checkNavPosition = () => {
		if (!navElement) return;

		const navRect = navElement.getBoundingClientRect();
		// Verificar si la parte superior del nav está en top: 0 o muy cerca
		showHero = navRect.top <= 16; // Usamos 1px de tolerancia

		console.log('Nav at top:', showHero, 'Position:', navRect.top);

		// Opcional: agregar clase CSS cuando está en top
		if (showHero) {
			navElement.classList.add('stuck-to-top');
		} else {
			navElement.classList.remove('stuck-to-top');
		}
	};
	// Función para normalizar el scroll
	function getNormalizedScroll(): number {
		const viewportHeight = window.innerHeight;
		const scrollPercentage = (window.scrollY / viewportHeight) * 100;
		return scrollPercentage;
	}

	function handleScroll() {
		const normalizedScroll = getNormalizedScroll();
		checkNavPosition();
		$infoStore.scrollY = normalizedScroll;
	}

	$: if (!showHero) {
		// 50% del viewport height
		$infoStore.info = 'Continua deslizando';
		$sceneNumber = 0;
	} else {
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
	<div class="section-wrapper">
		<Intro />
	</div>
	<div class="section-wrapper">
		<MyWork />
	</div>
</div>

<style>
	.page-container {
		display: flex;
		scroll-snap-type: x mandatory;
		scroll-behavior: smooth;
		width: 100vw;
		overflow-x: scroll;
		overflow-y: hidden;
	}
	.section-wrapper {
		min-width: 100vw;
		scroll-snap-align: center;
		scroll-snap-stop: normal;
	}
</style>
