<script lang="ts">
	import { fade, slide } from 'svelte/transition';
	import { infoStore } from '$lib/writables';
	let title = 'A handpicked collection of software pieces';
	let subtitle = 'welcome';
	let description =
		'This is my journey into the world of art, design, and immersive digital experiences';
	// let title = "touch or scroll around to move the light";
	// Reactive variables using normalized scroll values (0-100)
	$: h1Animate = $infoStore.scrollY >= 7; // Activar a 30% del viewport
	$: backgroundAnimate = $infoStore.scrollY >= 30; // Activar a 50% del viewport
</script>

<section
	class="hero {backgroundAnimate ? 'background-cover-out' : 'background-cover-in'}"
	in:fade={{ duration: 500 }}
>
	<p class="tension" in:fade={{ duration: 800, delay: 1000 }}>
		{title}
	</p>
	<h1 class={h1Animate ? 'fade-in' : 'fade-out'}>
		{subtitle}
	</h1>
	<p class="relese {backgroundAnimate ? 'fade-in' : 'fade-out'}">
		{description}
	</p>
</section>

<style>
	.hero {
		height: 100vh;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		text-align: center;
		color: white;
		border-style: solid;
		border-width: 10vw;
		border-color: black;
		background-color: black;
		transition: background-color 1s ease;
	}

	.tension {
		transition:
			opacity 0.5s,
			transform 0.5s;
		position: sticky;
		top: 15vh;
	}

	h1 {
		font-size: 10vw;
		transition:
			opacity 0.5s,
			transform 0.5s;
		position: sticky;
		top: 15vh;
	}
	.relese {
		font-weight: lighter;
		max-width: 600px;
		transition:
		opacity 0.5s,
		transform 0.5s;
		position: sticky;
		top: 35vh;
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
@media (max-width: 768px) {
	h1 {
		font-size: 10vw;
		transition:
			opacity 0.5s,
			transform 0.5s;
		position: sticky;
		top: 30vh;
	}
}
</style>
