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
		let intervalPtr: number | undefined;
		let elapsedTime = 0;

		function startPress(e) {
			e.preventDefault()
			elapsedTime = 0;
			intervalPtr = setInterval(() => {
				elapsedTime += 1;
				$lightIntensity += (elapsedTime / 100) * 20;
				console.log(elapsedTime + ' ms');
			}, 1);
		}

		function stopPress(e) {
			e.preventDefault()
			elapsedTime = 0;
			$lightIntensity = 200;
			clearInterval(intervalPtr);
		}

		node.addEventListener('pointerdown', startPress);
		window.addEventListener('pointerup', stopPress);

		return {
			destroy: () => {
				node.removeEventListener('pointerdown', startPress);
				window.removeEventListener('pointerup', stopPress);
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
		<h2 transition:fade={{ delay: 400 }}>Desarrollo de software</h2>
		<p transition:slide={{ delay: 800, axis: 'x' }}>por Bernardo Márquez</p>
	</div>
	<div
		class="title {pre ? 'fade-out' : 'fade-in'}"
		use:longpress
		on:contextmenu|preventDefault={() => console.log('?')}
	>
		<h1>
			{#key heroMessage[currentIndex]}
				<span
					class="liquid-glass-card-by-mabby"
					in:slide={{ duration: 500, axis: 'x' }}
					out:fade={{ duration: 500 }}
				>
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
	}
	.subtitle {
		display: flex;
		flex-direction: column;
		overflow: hidden;
		word-break: normal;
		white-space: pre;
	}
</style>
