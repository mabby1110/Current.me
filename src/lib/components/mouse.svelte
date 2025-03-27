<script lang="ts">
	import { onMount } from "svelte";
	import { readable } from "svelte/store";

	let mouseX = 0;
	let mouseY = 0;

	// Crear un store para optimizar las actualizaciones
	const mousePosition = readable({ x: 0, y: 0 }, set => {
		const handleMouseMove = (event: MouseEvent | TouchEvent) => {
			let x = 0, y = 0;
			
			if (event instanceof MouseEvent) {
				x = event.clientX;
				y = event.clientY;
			} else if (event instanceof TouchEvent) {
				const touch = event.touches[0];
				x = touch.clientX;
				y = touch.clientY;
			}

			// Usar requestAnimationFrame para optimizar rendimiento
			requestAnimationFrame(() => {
				set({ x, y });
			});
		};

		// Añadir listeners para mouse y touch
		window.addEventListener('mousemove', handleMouseMove, { passive: true });
		window.addEventListener('touchmove', handleMouseMove, { passive: true });

		// Limpiar listeners
		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('touchmove', handleMouseMove);
		};
	});

	// Suscribirse al store para actualizar las coordenadas
	const unsubscribe = mousePosition.subscribe(pos => {
		mouseX = pos.x;
		mouseY = pos.y;
	});
</script>

<style>
	.mouse-follower {
		position: fixed;
		pointer-events: none;
		will-change: transform; /* Sugerencia de optimización para el navegador */
		width: 32px;
		height: 32px;
		background-image: url('/windows7_arrow.ico');
		background-size: contain;
		background-repeat: no-repeat;
		z-index: 9999;
		transform-origin: top left;
		left: 0;
		top: 0;
		/* Mejora de renderizado para dispositivos móviles */
		-webkit-transform: translateZ(0);
		transform: translateZ(0);
	}
</style>

<div 
	class="mouse-follower" 
	style="transform: translate({mouseX}px, {mouseY}px);"
></div>