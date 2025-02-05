<script lang="ts">
	import HeroLinkCard from '$lib/components/HeroLinkCard.svelte';
	import Slider from '$lib/components/Slider.svelte';
	import SliderLinkCard from '$lib/components/SliderLinkCard.svelte';
	import XpCard from '$lib/components/XPCard.svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	// Variable reactiva para almacenar la posición de desplazamiento
	let scrollY = 0;

	// Función para actualizar scrollY cuando el usuario hace scroll
	function handleScroll() {
		scrollY = window.scrollY;
	}

	// Escuchar el evento de scroll cuando el componente se monta
	onMount(() => {
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<div class="hero-section" transition:fade={{ delay: 100, duration: 500 }}>
	<XpCard title="About & Skills" top="10vh" left="10vw">
		<HeroLinkCard title="About & Skills" link="skills">
			<img
				src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnVoOXNkazA1cjBxN3VyZHkzZzNwYWRkdDIxNGgzaG42bW0zaDBucCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TTZnnuZ65qD1C/giphy.gif"
				alt="cv-gif"
				class="hero-image"
			/>
		</HeroLinkCard>
	</XpCard>
	<XpCard title="Curriculum Vitae" top="20vh" left="20vw">
		<HeroLinkCard title="Curriculum Vitae" link="cv">
			<img
				src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExd244bXVmYWR6OHFreGVqMXZ5NGo4ajVnaGUwaTdyZnY3cW5nOGN4aSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/0aCuhFPonpBwjy0olC/giphy.gif"
				alt="cv-gif"
				class="hero-image"
			/>
		</HeroLinkCard>
	</XpCard>
</div>
<div class="work">
	<Slider title="My Work">
		<SliderLinkCard/>
		<SliderLinkCard/>
		<SliderLinkCard/>
	</Slider>
</div>

<style>
	.hero-section {
		gap: 1rem;
		padding: 1rem;
		height: 100vh;
		position: relative; /* Añadir position relative */
		z-index: 1; /* z-index bajo */
		pointer-events: none; /* Permite que los clicks pasen a través */
	}

	/* Asegurar que los XpCard dentro de hero-section puedan recibir eventos */
	.hero-section :global(.xp-panel) {
		pointer-events: auto;
	}

	.hero-image {
		width: 100%;
		object-fit: cover;
	}

	.work {
		width: 100%;
		background-color: rgb(255, 255, 255);
		height: 100vh;
		display: flex;
		flex-direction: column-reverse;
		position: relative; /* Añadir position relative */
		z-index: 100; /* z-index alto para estar sobre todo */
	}
</style>