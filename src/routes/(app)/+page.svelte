<script lang="ts">
	import { onMount } from 'svelte';
	import Intro from '$lib/sections/Intro.svelte';
	import MyWork from '$lib/sections/MyWork.svelte';
	import MySkills from '$lib/sections/MySkills.svelte';
	import { infoStore } from '$lib/writables';
	import { sceneNumber } from '$lib/threeStores';

	// Función para normalizar el scroll
	function getNormalizedScroll(): number {
		const viewportHeight = window.innerHeight;
		const scrollPercentage = (window.scrollY / viewportHeight) * 100;
		return scrollPercentage;
	}

	function handleScroll() {
		const normalizedScroll = getNormalizedScroll();
		$infoStore.scrollY=normalizedScroll;
	}
	
	$: if($infoStore.scrollY <= 30) { // 50% del viewport height
		$infoStore.info = "scroll to continue"
		$sceneNumber = 0;
	} else if($infoStore.scrollY <= 50) {
		$infoStore.info = "touch or move the mouse around"
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

<div class="home">
	<Intro/>
	<MySkills/>
	<MyWork/>
</div>

<style>
.home {
	display: flex;
	flex-direction: column;
	align-items: center;
	max-width: 2048px;
}
</style>