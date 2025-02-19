<script lang="ts">
	import { projects } from '$lib/writables';
	import { fade } from 'svelte/transition';
	$: selectedProject = projects[0];
	let description = false;
	function toggleInfo() {
		description = !description;
	}
	let backendFrameworks = [
		{ name: 'Flask', img_link: '/flask-icon.png' },
		{ name: 'Node', img_link: '/node-icon.png' }
	];
	let database = [
		{ name: 'MySQL', img_link: '/MySql-icon.png' },
		{ name: 'Microsoft SQL Server', img_link: '/SQLServer-icon.png' },
		{ name: 'Pocketbase', img_link: '/Pocketbase-icon.png' }
	];
	let frontend = [
		{ name: 'Svelte', img_link: '/svelte-icon.png' },
		{ name: 'react', img_link: '/react-icon.png' },
		{ name: 'vue', img_link: '/vue-icon.png' }
	];
	let skillList = [
		{ name: 'Backend', items: backendFrameworks },
		{ name: 'Frontend', items: frontend },
		{ name: 'Database', items: database }
	];
	function changeCard(i) {
		selectedProject = projects[i];
		console.log(selectedProject);
	}
</script>

<section class="hero" id="work-section">
	<div class="project-slider">
		{#each projects as project}
			<div class="project-container">
				<div class="title">
					<h1>{project.title}</h1>
				</div>

				<div class="info">
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<p>{project.description}</p>
					<img src={project.image} alt="{project.title}-icon" />
					<div class="actions">
						<button on:click={(window.location.href = selectedProject.link)}>github</button>
					</div>
				</div>
			</div>
		{/each}
	</div>
</section>

<style>
	.project-slider {
		display: flex;
		height: 100%;
		width: 100%;
		overflow-x: auto;
		overflow-y: hidden;

		backdrop-filter: blur(20px);
		/* Para Firefox */
		scrollbar-width: thin;
		scrollbar-color: rgba(120, 120, 120, 0.5) transparent;

		/* Para IE y Edge */
		-ms-overflow-style: scrollbar;
	}

	/* Para Chrome, Safari, y Opera */
	.project-slider::-webkit-scrollbar {
		height: 8px; /* Altura de la scrollbar horizontal */
	}

	.project-slider::-webkit-scrollbar-track {
		background: transparent; /* Fondo transparente */
		border-radius: 4px;
	}

	.project-slider::-webkit-scrollbar-thumb {
		background-color: rgba(120, 120, 120, 0.5); /* Color semitransparente */
		border-radius: 4px;
		border: 2px solid transparent; /* Crea un efecto de padding */
		background-clip: padding-box;
	}

	/* Estado hover para hacer la scrollbar más visible al pasar el cursor */
	.project-slider::-webkit-scrollbar-thumb:hover {
		background-color: rgba(120, 120, 120, 0.8);
		background-clip: padding-box;
	}
	.hero {
		height: 95vh;
		width: 100%;
		border-style: solid;
		border-width: 5vh 5vw;
		border-color: black;
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		color: white;
		transition: background-color 1s ease;
		position: relative;
		overflow-x: scroll;
	}
	.project-container {
		padding: 2rem;
		height: 100%;
		min-width: 90vw;
		display: grid;
		grid-template-rows: 1fr 4fr;
		place-items: center;
	}
	.title h1 {
		font-size: 5vw;
	}
	.info {
		display: flex;
		flex-direction: column;
	}
	.info p {
		align-self: center;
		max-width: 768px;
	}
	.info img {
		border-radius: 16px;
		width: 100%;
		max-height: 400px;
		margin-top: 3rem;
	}
	.actions {
		display: flex;
		justify-content: flex-end;
	}
	.actions button {
		color: black;
		width: fit-content;
		height: fit-content;
	}
</style>
