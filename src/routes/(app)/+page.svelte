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
	<p>
		drag any window to view the content or scroll to view other sections
	</p>
	<XpCard title="About & Skills" top="25vh" left="10vw">
		<HeroLinkCard title="About & Skills" link="skills">
			<img
				src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnVoOXNkazA1cjBxN3VyZHkzZzNwYWRkdDIxNGgzaG42bW0zaDBucCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TTZnnuZ65qD1C/giphy.gif"
				alt="cv-gif"
				class="hero-image"
			/>
		</HeroLinkCard>
	</XpCard>
	<XpCard title="Curriculum Vitae" top="30vh" left="14vw">
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
	<div class="project-description">
		<h1 class="section-title">My Work</h1>
		{#if $selectedProject}
			<div class="project-info ">
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
			<img src={$selectedProject.image} alt={$selectedProject.title} />
		{/if}
	</div>
	<Slider>
		<SliderLinkCard title="HoneyHost"/>
		<SliderLinkCard title="POS-CRM"/>
		<SliderLinkCard title="C de Comercio"/>
		<SliderLinkCard title="Artado"/>
	</Slider>
</div>

<style>
	.section-title {
		margin-bottom: 5%;
	}
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
		width: fit-content;
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
	.hero-image {
        width: 100%;
	}
	/* Asegurar que los XpCard dentro de hero-section puedan recibir eventos */
	.hero-section :global(.xp-panel) {
		pointer-events: auto;
	}
	.work {
		width: 100%;
		backdrop-filter: blur(10px);
		height: 95vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		position: relative; /* Añadir position relative */
		z-index: 100; /* z-index alto para estar sobre todo */
	}
</style>
