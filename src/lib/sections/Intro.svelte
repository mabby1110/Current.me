<script>
	import { fade, fly, scale } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { scrollY } from '$lib/writables';
	import { onMount } from 'svelte';

	let title = 'A handpicked collection of software pieces';
	let subtitle = 'that blends art with functional code';
	let description = 'This is my road into digital experiences';

	// Control de animación inicial
	let mounted = false;

	// Control para animación de salida
	let shouldExitAnimate = false;

	onMount(() => {
		mounted = true;
	});

	// Solo detectamos cuando pasamos los 200px por primera vez
	$: if ($scrollY > 200 && !shouldExitAnimate) {
		shouldExitAnimate = true;
	} else {
		shouldExitAnimate = false;
	}
</script>

<section class="hero">
	{#if mounted}
		<h3 in:fly={{ y: -50, duration: 1000, easing: cubicOut }}>
			{title}
		</h3>
		<h1 in:scale={{ start: 0.5, duration: 1200, easing: cubicOut }}>
			{subtitle}
		</h1>
		<p in:fade={{ duration: 1500 }}>{description}</p>
	{/if}
</section>

<style>
	.hero {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100vh;
		text-align: center;
		color: white;
		font-family: 'Poppins', sans-serif;
		padding: 20vh 0;
	}

	h3 {
		font-size: 1.5rem;
		font-weight: 300;
		transition:
			opacity 0.5s,
			transform 0.5s;
	}

	h1 {
		font-size: 3rem;
		font-weight: 700;
		margin: 10px 0;
		transition:
			opacity 0.5s,
			transform 0.5s;
	}

	p {
		font-size: 1.2rem;
		font-weight: 400;
		max-width: 600px;
		transition: opacity 0.5s;
	}

	.fade-out {
		opacity: 0;
		transform: translateY(-20px);
	}
</style>
