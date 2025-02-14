<script>
	import { projects, infoStore } from '$lib/writables';
	import { fade } from 'svelte/transition';

	// Control para animación de salida
	let section_1 = false;
	let section_2 = false;

	$: if ($infoStore.scrollY > 1500 && !section_1) {
		section_1 = true;
	} else if ($infoStore.scrollY > 1900 && !section_2){
		section_2 = true;
	}
</script>
{#each projects as project}
	<section class="hero">
		<h1 class="sticky" in:fade={{ duration: 800, delay: 200 }}>
			{project.title}
		</h1>
		<div class="description sticky">
			<p>{project.description}</p>
			<img src="{project.image}" alt="{project.title} image" />
		</div>
	</section>
{/each}

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
		border-width: 10vw;
		border-color: black;
		transition: background-color 1s ease;
	}
	h1 {
		font-size: 2.4rem;
		backdrop-filter: blur(20px);
		height: min-content;
		width: 25vw;
		padding: 1rem 2rem;
	}
	.description {
		backdrop-filter: blur(20px);
		background-color: rgba(255, 0, 0, 0.113);
		max-width: 500px;
		height: min-content;
		min-height: 240px;
		border-radius: 16px;
		padding: 1rem 2rem;
	}
	.description img {
		margin-top: 2rem;
		width: 100%;
		height: auto;
	}
	.sticky {
		position: sticky;
		top: 20%;
	}
</style>
