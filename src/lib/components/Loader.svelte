<script lang="ts">
	import { fade } from 'svelte/transition';
	import loader from '$lib/assets/loader.svg';
	import { lightControl, loaded, release, started } from '$lib/writables';
	import InfoBanner from './InfoBanner.svelte';

	let visible = true;
	$: opacity = 1;
	let count = 5; // Ajusta este valor según tus necesidades
	let intervalId: number | undefined;

    $:console.log($lightControl, opacity)
	// Función para interpolar entre dos colores
	function interpolateColor(value, startColor, endColor) {
		const startR = (startColor >> 16) & 0xff;
		const startG = (startColor >> 8) & 0xff;
		const startB = startColor & 0xff;

		const endR = (endColor >> 16) & 0xff;
		const endG = (endColor >> 8) & 0xff;
		const endB = endColor & 0xff;

		const r = Math.round(startR + value * (endR - startR));
		const g = Math.round(startG + value * (endG - startG));
		const b = Math.round(startB + value * (endB - startB));

		return (r << 16) + (g << 8) + b;
	}

	function startFade() {
		intervalId = setInterval(() => {
			if (count > 0) {
				count -= 1;
				opacity -= 0.21; // Disminuye la transparencia en 0.2 cada vez que se hace clic
			}
			if (count === 0) {
				clearInterval(intervalId);
				// Elimina el componente cuando el contador llega a 0
				setTimeout(() => {
					document.getElementById('fading-component')?.remove();
				}, 300); // Espera 100ms para eliminar el componente (puedes ajustar este tiempo)

				if ($loaded) {
					visible = false;
					started.set(true);
					release.set(0);
				}
			}

			// Actualiza el color de lightControl según el valor de count
			const value = 1 - count / 5; // Normaliza el valor de count entre 0 y 1
			const startColor = 0xfff000; // Color inicial (amarillo)
			const endColor = 0x00ffff; // Color final (cian)
			const newColor = interpolateColor(value, startColor, endColor);

			lightControl.update((state) => ({
				...state,
				color: newColor
			}));
		}, 300); // Ajusta este intervalo según tus necesidades
	}

	function stopFade() {
		if (intervalId) {
			clearInterval(intervalId);
			count = 5; // Ajusta este valor según tus necesidades
			opacity = 1;
		}
	}
</script>
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	id="fading-component"
	class="loader-container"
	on:touchstart={startFade}
	on:touchend={stopFade}
	on:touchcancel={stopFade}
	on:mousedown={startFade}
	on:mouseup={stopFade}
	on:mouseleave={stopFade}
	on:contextmenu|preventDefault={() => console.log('?')}
>
	<img src={loader} alt="Loader" />
</div>

<style>
	.loader-container {
		height: 100vh;
		width: 100%;
		display: grid;
		place-items: center;
		backdrop-filter: blur(10px);
	}

	.loader-container img {
		object-fit: cover;
		width: 100%;
	}
</style>
