<script lang="ts">
	import { projects } from '$lib/writables';
	import { fade } from 'svelte/transition';
	$: selectedProject = projects[0];
	let description = false
	function toggleInfo(){
		description = !description
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
	<div class="section-nav">
			<p class="section-description">
				My knowledge has shaped my ability to create software, this is some of my work:
			</p>
			<div class="section-nav-buttons">
				{#each projects as project, i}
					<button on:click={() => changeCard(i)}>{project.title}</button>
				{/each}
			</div>
		</div>
	<div class="project-container">
		<div class="title">
			<h1>{selectedProject.title}</h1>
		</div>

		<div class="info">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<p>{selectedProject.description}</p>
			<img src={selectedProject.image} alt="{selectedProject.title}-icon"/>
			<div class="actions">
				<button on:click={window.location.href = selectedProject.link}>github</button>
			</div>
		</div>
	</div>
</section>

<style>
	.section-nav {
		position: absolute;
		top: -2.5vh;
		z-index: 1;
		text-align: left;
		display: flex;
		gap: 1rem;
		width: 100%;
		
		flex-wrap: wrap;
	}
	.section-nav-buttons {
		overflow: scroll;
		display: flex;
		gap: 1rem;
	}
	.section-nav-buttons button {
		min-width: fit-content;
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
	}
	.project-container {
		padding: 2rem;
		height: 100%;
		width: 100%;
		display: grid;
		grid-template-rows: 1fr 4fr;
		place-items: center;
		backdrop-filter: blur(20px);
	}
	.title h1{
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
