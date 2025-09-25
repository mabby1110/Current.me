<script lang="ts">
	import { fade } from 'svelte/transition';
	import { lightIntensity } from '$lib/threeStores';
	import loader from '$lib/assets/loader.svg';
	import { started } from '$lib/writables';
	import DevelopmentBanner from './DevelopmentBanner.svelte';

	let blurAmount = 16;

	function longpress(node) {
		const TIME_MS = 500;
		let intervalPtr;
		let elapsedTime = 0;

		function startPress() {
			intervalPtr = setInterval(() => {
				elapsedTime += 1;
				$lightIntensity += elapsedTime / 100;
				// Calcula el nuevo valor de blur según el progreso
				blurAmount = 16 * (1 - (elapsedTime*0.5) / TIME_MS);
				if (elapsedTime >= TIME_MS) {
					clearInterval(intervalPtr);
					$started = true;
					$lightIntensity = 0;
				}
			}, 1);
		}

		function stopPress() {
			clearInterval(intervalPtr);
			elapsedTime = 0;
			$lightIntensity = 8;
			blurAmount = 16; // Restablece el blur
		}

		function handleMouseDown(e) {
			startPress();
		}

		function handleMouseUp(e) {
			stopPress();
		}

		function handleTouchStart(e) {
			e.preventDefault();
			startPress();
		}

		function handleTouchEnd(e) {
			stopPress();
		}

		node.addEventListener('mousedown', handleMouseDown);
		node.addEventListener('mouseup', handleMouseUp);
		node.addEventListener('touchstart', handleTouchStart);
		node.addEventListener('touchend', handleTouchEnd);

		return {
			destroy: () => {
				node.removeEventListener('mousedown', handleMouseDown);
				node.removeEventListener('mouseup', handleMouseUp);
				node.removeEventListener('touchstart', handleTouchStart);
				node.removeEventListener('touchend', handleTouchEnd);
			}
		};
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	id="fading-component"
	class="loader-container"
	use:longpress
	on:contextmenu|preventDefault={() => console.log('?')}
	style="--blur-amount: {blurAmount}px"
>
</div>

<DevelopmentBanner showBanner={true} message="🚧 En Desarrollo" />

<style>
	.loader-container {
		height: 100vh;
		width: 100%;
		z-index: 100;
		display: grid;
		place-items: center;
		backdrop-filter: blur(var(--blur-amount, 16px));
		padding-bottom: 2vh;
		position: fixed;
		transition: backdrop-filter 0.1s ease-out;
	}

	@media (max-width: 768px) {
		.loader-container {
			height: 100vh;
			width: 100%;
			display: grid;
			place-items: center;
			backdrop-filter: blur(var(--blur-amount, 10px));
			padding-bottom: 1vh;
			transition: backdrop-filter 0.1s ease-out;
		}
	}
</style>
