<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { fade, slide } from 'svelte/transition';
	import { infoStore } from '$lib/writables';
	import { lightIntensity } from '$lib/threeStores';
	import { started } from '$lib/writables';

	$: pre = $infoStore.scrollY <= 7;
	$: backgroundAnimate = $infoStore.scrollY >= 38;
	let heroMessage = ['Web', 'IA', 'SaaS', 'e-commerce', 'POS'];
	let currentIndex = 0;
	let intervalId;

	onMount(() => {
		intervalId = setInterval(() => {
			currentIndex = (currentIndex + 1) % heroMessage.length;
		}, 2000);
	});

	onDestroy(() => {
		clearInterval(intervalId);
	});

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
				}
			}, 1);
		}

		function stopPress() {
			clearInterval(intervalPtr);
			elapsedTime = 0;
			$lightIntensity = 100;
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
<section
	class="hero {backgroundAnimate ? 'background-cover-out' : 'background-cover-in'}"
	in:fade={{ duration: 500 }}
>
	<div class="subtitle">
		<h2 transition:fade>Desarrollo de software</h2>
		{#if !pre}
			<p transition:slide={{ axis: 'x' }}>por Bernardo Márquez</p>
		{/if}
	</div>
	<div
		class="title liquid-glass-card-by-mabby {pre ? 'fade-out' : 'fade-in'}"
		use:longpress
		on:contextmenu|preventDefault={() => console.log('?')}
	>
		<h1>
			{#key heroMessage[currentIndex]}
				<span in:slide={{ duration: 500 }} out:slide={{ duration: 500 }}>
					{heroMessage[currentIndex]}
				</span>
			{/key}
		</h1>
	</div>
</section>

<style>
	.hero {
		height: 100vh;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		color: white;
		border-style: solid;
		border-width: 0 1rem 4rem;
		border-color: black;
		background-color: black;
		transition: background-color 1s ease;
	}
	.title {
		flex-grow: 1;
		font-size: 5vw;
		transition:
			opacity 0.5s,
			transform 0.5s;
		display: flex;
		align-items: center;
		user-select: none;
	}
	h1 span {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -20vh);
		white-space: pre;
	}
	h2 {
		user-select: none;
		font-weight: lighter;
	}
	.fade-in {
		opacity: 1;
		transform: translateY(0);
	}

	.fade-out {
		opacity: 0;
		transform: translateY(200px);
	}

	.background-cover-in {
		background-color: black;
	}

	.background-cover-out {
		background-color: transparent;
		padding-top: 5rem;
	}
	.subtitle {
		display: flex;
		flex-direction: column;
		overflow: hidden;
		word-break: normal;
		white-space: pre;
		gap: 1rem;
	}
</style>
