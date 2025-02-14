<!-- IconCarousel.svelte -->
<script>
	import { onMount } from 'svelte';

	export let icons = []; // Lista de iconos (pueden ser componentes o imágenes)
	export let interval = 3000; // Intervalo de tiempo entre transiciones en milisegundos

	let currentIndex = 0;

	onMount(() => {
		const timer = setInterval(() => {
			currentIndex = (currentIndex + 1) % icons.length;
		}, interval);

		return () => clearInterval(timer); // Limpiar el intervalo al desmontar el componente
	});
</script>

<div class="carousel">
	<div class="carousel-inner" style="transform: translateX(-{currentIndex * 100}%);">
		<slot />
	</div>
</div>

<style>
	.carousel {
		width: 100%;
		height: 100%;
        min-height: 20vh;
		position: relative;
		overflow: hidden;
	}

	.carousel-inner {
		display: flex;
		width: 100%;
		height: 100%;
        overflow:scroll;
		transition: transform 0.5s ease-in-out;
        gap: 1rem;
	}
</style>
