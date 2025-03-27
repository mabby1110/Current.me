<script lang="ts">
	import { fade } from 'svelte/transition';
	import { infoStore } from '$lib/writables';
	import { lightIntensity } from '$lib/threeStores';
	import { started } from '$lib/writables';
	let title = 'This is a handpicked collection of software pieces';
	let subtitle = 'welcome';
	let description =
		'This is my journey into the world of art, design, and immersive digital experiences';
	// let title = "touch or scroll around to move the light";
	// Reactive variables using normalized scroll values (0-100)
	$: h1Animate = $infoStore.scrollY >= 7; // Activar a 30% del viewport
	$: backgroundAnimate = $infoStore.scrollY >= 38; // Activar a 50% del viewport

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

<section
	class="hero {backgroundAnimate ? 'background-cover-out' : 'background-cover-in'}"
	in:fade={{ duration: 500 }}
>
	<p class="tension" in:fade={{ duration: 800, delay: 1000 }}>
		{title}
	</p>
	<h1
		class={h1Animate ? 'fade-in' : 'fade-out'}
		use:longpress
		on:contextmenu|preventDefault={() => console.log('?')}
	>
		{subtitle}
	</h1>
	<p class="relese {backgroundAnimate ? 'fade-in' : 'fade-out'}">
		{description}
	</p>
</section>

<style>
	.hero {
		height: 92vh;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		text-align: center;
		color: white;
		border-style: solid;
		border-width: 0 5vw 5vh;
		border-color: black;
		background-color: black;
		transition: background-color 1s ease;
	}

	.tension {
		transition:
			opacity 0.5s,
			transform 0.5s;
		position: sticky;
		top: 10vh;
	}

	h1 {
		font-size: 10vw;
		transition:
			opacity 0.5s,
			transform 0.5s;
		position: sticky;
		top: 45vh;
	}
	.relese {
		font-weight: lighter;
		max-width: 600px;
		transition:
			opacity 0.5s,
			transform 0.5s;
	}

	.fade-in {
		opacity: 1;
		transform: translateY(0);
	}

	.fade-out {
		opacity: 0;
		transform: translateY(-20px);
	}

	.background-cover-in {
		background-color: black;
	}

	.background-cover-out {
		background-color: transparent;
	}
</style>
