<script>
	import Icon from '$lib/components/Icon.svelte';
	import IconCarrousel from '$lib/components/IconCarrousel.svelte';

	let backendFrameworks = [
		{ name: 'Flask', img_link: '/flask-icon.png' },
		{ name: 'Node', img_link: '/node-icon.png' },
	];
	let database = [
		{ name: 'MySQL', img_link: '/MySql-icon.png' },
		{ name: 'Microsoft SQL Server', img_link: '/SQLServer-icon.png' },
		{ name: 'Pocketbase', img_link: '/Pocketbase-icon.png' }
	];
	let frontend = [
		{ name: 'Svelte', img_link: '/svelte-icon.png' },
		{ name: 'react', img_link: '/react-icon.png' },
		{ name: 'vue', img_link: '/vue-icon.png' },
	]
	let skillList = [
		{ name: 'Backend', items: backendFrameworks },
		{ name: 'Frontend', items: frontend },
		{ name: 'Database', items: database },
	];
</script>

<section class="hero">
	<p class="title">My knowledge has shaped my ability to create software</p>
	{#each skillList as skill}
		<div class="category">
			<b>{skill.name}</b>
			<IconCarrousel>
				{#each skill.items as icon}
					<Icon size="8vh">
						<img src={icon.img_link} alt="{icon.name}-icon" />
						<p class="skill-name">{icon.name}</p>
					</Icon>
				{/each}
			</IconCarrousel>
		</div>
	{/each}
</section>

<style>
	.hero {
		min-height: 100vh;
		height: fit-content;
		width: 100%;
		display: flex;
		flex-direction: column;
		color: white;
		border-style: solid;
		border-width: 10vw;
		border-color: black;
		transition: background-color 1s ease;
		text-align: center;
	}
	.title {
		margin: 5vh 0;
	}
	.skill-name {
		margin-top: 1rem;
	}
	b {
		margin-bottom: 2rem;
	}
	.category {
		display: grid;
		grid-template-columns: 20% 80%;
		grid-auto-rows: auto;
		justify-items: start;
	}

	@media (max-width: 768px) {
		.category {
			grid-template-columns: 100%;
		}
	}

	img {
		width: 100%;
		aspect-ratio: 1/1;
		background-color: white;
		border-radius: 16px;
	}
</style>
