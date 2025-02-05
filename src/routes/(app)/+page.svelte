<script lang="ts">
	import HeroLinkCard from '$lib/components/HeroLinkCard.svelte';
	import Slider from '$lib/components/Slider.svelte';
	import SliderLinkCard from '$lib/components/SliderLinkCard.svelte';
	import XpCard from '$lib/components/XPCard.svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { selectedProject } from '$lib/writables'

	let scrollY = 0;

	function handleScroll() {
		scrollY = window.scrollY;
	}

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
		<SliderLinkCard title="HoneyHost" link="https://github.com/mabby1110/HoneyHost" />
		<SliderLinkCard title="POS-CRM" link="https://github.com/mabby1110/POS-CRM" />
		<SliderLinkCard title="C de Comercio" link="https://github.com/mabby1110/cd-desktop" />
		<SliderLinkCard title="Artado" link="https://github.com/mabby1110/Artado" />
	</Slider>
	<div class="project-description">
		{#if $selectedProject}
			<img src={$selectedProject.image} alt={$selectedProject.title} />
			<div class="project-info">
				<h2>{$selectedProject.title}</h2>
				<p>{$selectedProject.description}</p>
				<a
					href={$selectedProject.link}
					target="_blank"
					rel="noopener noreferrer"
					class="github-link"
				>
					Ver en GitHub
				</a>
			</div>
		{/if}
	</div>
</div>

<style>
	.project-description {
		padding: 2rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.project-info {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.project-description img {
		width: 100%;
		max-height: 400px;
		object-fit: cover;
		border-radius: 8px;
	}

	.github-link {
		display: inline-block;
		padding: 0.5rem 1rem;
		background-color: #500efe;
		color: white;
		text-decoration: none;
		border-radius: 4px;
		transition: background-color 0.3s ease;
	}

	.github-link:hover {
		background-color: #4000cb;
	}
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
	.work {
		width: 100%;
		backdrop-filter: blur(5px);
		height: 100vh;
		display: flex;
		flex-direction: column-reverse;
		position: relative; /* Añadir position relative */
		z-index: 100; /* z-index alto para estar sobre todo */
	}
</style>
