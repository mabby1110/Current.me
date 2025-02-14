<script>
	import Icon from '$lib/components/Icon.svelte';
	import IconCarrousel from '$lib/components/IconCarrousel.svelte';
	let skillList = [
		{ name: 'backend', description: 'backend' },
		{ name: 'frameworks', description: 'frameworks' },
		{ name: 'api-design', description: 'API designs' },
		{ name: 'devops', description: 'DevOps' },
		{ name: 'version-control', description: 'version control' },
		{ name: 'Testing', description: 'Testing' },
		{ name: 'soft-skills', description: 'Soft Skills' },
	]
	let icons = [
		{name: 'figma', img_link: 'https://cdn-icons-png.flaticon.com/512/2990/2990505.png'},
		{name: 'figma', img_link: 'https://cdn-icons-png.flaticon.com/512/2990/2990505.png'},
		{name: 'figma', img_link: 'https://cdn-icons-png.flaticon.com/512/2990/2990505.png'},
		{name: 'figma', img_link: 'https://cdn-icons-png.flaticon.com/512/2990/2990505.png'},
		{name: 'figma', img_link: 'https://cdn-icons-png.flaticon.com/512/2990/2990505.png'},
		{name: 'figma', img_link: 'https://cdn-icons-png.flaticon.com/512/2990/2990505.png'},
		{name: 'figma', img_link: 'https://cdn-icons-png.flaticon.com/512/2990/2990505.png'},
		{name: 'figma', img_link: 'https://cdn-icons-png.flaticon.com/512/2990/2990505.png'},
		{name: 'figma', img_link: 'https://cdn-icons-png.flaticon.com/512/2990/2990505.png'},
		{name: 'figma', img_link: 'https://cdn-icons-png.flaticon.com/512/2990/2990505.png'},
		{name: 'figma', img_link: 'https://cdn-icons-png.flaticon.com/512/2990/2990505.png'},
		{name: 'figma', img_link: 'https://cdn-icons-png.flaticon.com/512/2990/2990505.png'},
		{name: 'figma', img_link: 'https://cdn-icons-png.flaticon.com/512/2990/2990505.png'},
		{name: 'figma', img_link: 'https://cdn-icons-png.flaticon.com/512/2990/2990505.png'},
		{name: 'figma', img_link: 'https://cdn-icons-png.flaticon.com/512/2990/2990505.png'},
		{name: 'figma', img_link: 'https://cdn-icons-png.flaticon.com/512/2990/2990505.png'},
		{name: 'figma', img_link: 'https://cdn-icons-png.flaticon.com/512/2990/2990505.png'},
		{name: 'figma', img_link: 'https://cdn-icons-png.flaticon.com/512/2990/2990505.png'},
		{name: 'figma', img_link: 'https://cdn-icons-png.flaticon.com/512/2990/2990505.png'},
		{name: 'figma', img_link: 'https://cdn-icons-png.flaticon.com/512/2990/2990505.png'},
	]
</script>

<section class="hero">
	<p class="title">My knowledge has shaped my ability to create software</p>
	{#each skillList as skill}
	<div class="category">
		<b>{skill.name}</b>
		<IconCarrousel>
			{#each icons as icon}
				<Icon size="8vh">
					<img src="{icon.img_link}" alt="{icon.name}-icon" />
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
	}
</style>
