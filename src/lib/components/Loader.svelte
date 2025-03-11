<script lang="ts">
	import { fade } from 'svelte/transition';
	import { lightIntensity } from '$lib/threeStores';
	import loader from '$lib/assets/loader.svg';
	import { started } from '$lib/writables';
	import DevelopmentBanner from './DevelopmentBanner.svelte';

	function longpress(node) {
		const TIME_MS = 500;
		let intervalPtr;
		let elapsedTime = 0;

		function startPress() {
			intervalPtr = setInterval(() => {
				elapsedTime += 1;
				$lightIntensity += elapsedTime / 100;
				console.log(elapsedTime + ' ms');
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
		}

		function handleMouseDown(e) {
			startPress();
		}

		function handleMouseUp(e) {
			stopPress();
		}

		function handleTouchStart(e) {
			e.preventDefault(); // Prevents ghost clicks
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
>
	<img src={loader} alt="Loader" />
</div>

<DevelopmentBanner
showBanner={true}
message="🚧 Esta página está en desarrollo. Algunas funciones podrían estar incompletas."
/>
<style>
	.loader-container {
		height: 100vh;
		width: 100%;
		display: grid;
		place-items: center;
		backdrop-filter: blur(10px);
		padding-bottom: 2vh;
	}

	.loader-container img {
		object-fit: cover;
		width: 100%;
	}
@media (max-width: 768px) {
	.loader-container {
		height: 100vh;
		width: 100%;
		display: grid;
		place-items: center;
		backdrop-filter: blur(10px);
		padding-bottom: 1vh;
	}
}
</style>
