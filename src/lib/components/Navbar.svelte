<script>
	import { fade, fly, slide } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { navState } from '$lib/writables';
	import XpCard from './XPCard.svelte';
	import HeroLinkCard from './HeroLinkCard.svelte';
	import { applyAction } from '$app/forms';

	let windowsButton = true;

	// Estado de las aplicaciones de navegación
	let navApps = {
		home: { title: 'home', opened: false, img_url: '109.ico', minimized: false, nav_link: '/' },
		about: { title: 'about', opened: false, img_url: '99.ico', minimized: false, nav_link: '/about' },
		// cv: { title:"cv", opened: false, link_url: '19.ico', minimized: false, nav_link: "/" },
		work: { title: 'work', opened: false, img_url: '112.ico', minimized: false, nav_link: '/work' },
		Highlights: {
			title: 'Highlights',
			opened: false,
			img_url: '1024.ico',
			minimized: false,
			link: '/highlights'
		}
	};

	// Funciones para abrir y cerrar la navegación
	function closeNav() {
		navState.set({ visible: false });
	}

	function openNav() {
		navState.set({ visible: true });
	}

	// Manejar la apertura de aplicaciones de navegación
	function handleNavAppsOpen(name) {
		navApps[name].opened = true;
		navApps[name].minimized = false;
	}

	// Cerrar la navegación al presionar la tecla Escape
	onMount(() => {
		const handleKeydown = (event) => {
			if (event.key === 'Escape') {
				closeNav();
			}
		};
		window.addEventListener('keydown', handleKeydown);
		return () => window.removeEventListener('keydown', handleKeydown);
	});
</script>

<!-- Barra de navegación -->
<div class="navbar" on:click={openNav}>
	<h1 in:fade={{ duration: 800, delay: 600 }}>CURRENT.ME</h1>
</div>

<!-- Pantalla de navegación -->
<div
	class:hidden={!$navState.visible}
	class="screenCover"
	in:fade={{ duration: 500 }}
	out:fade={{ duration: 500 }}
>
	<button class="close-nav" on:click={closeNav}>close</button>
	{#each Object.entries(navApps) as [k, v]}
		
		<div class="navlink" transition:fade={{ delay: 100, duration: 500 }}>
			<!-- <XpCard title="CV" bind:opened={navApps.cv.opened} bind:minimized={navApps.cv.minimized} top="10vh" left="0vw">
				<iframe src="https://docs.google.com/document/d/1fgmda0oWl42nsz4cBR3z0VBMphA0ou5Me1VgSmXok-k/preview" id="pdf" allow="autoplay" height="100%" width="100%"></iframe>
			</XpCard> -->
			<XpCard title={v.title} bind:opened={navApps[k].opened} bind:minimized={navApps[k].minimized} top="20vh" left="2vw">
				<HeroLinkCard title={v.title} link={v.nav_link}>
					<img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZThyamJueW1ncHY3ZnU4bjA4MDFrNGh0cnV1dW9mdHk0NDhwZnU4dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/NrqGp5pu4lTHy/giphy.gif" alt="cv-gif" class="hero-image" />
				</HeroLinkCard>
			</XpCard>
		</div>
	{/each}

	<!-- Iconos de aplicaciones -->
	<div class="desktop">
		{#each Object.entries(navApps) as [k, v]}
			<button class="desktop-icon" on:click={() => handleNavAppsOpen(v.title)}>
				<img src={`/OriginalWin7Icons/${v.img_url}`} alt={v.img_url} />
			</button>
		{/each}
	</div>

	<!-- Barra de inicio -->
	{#if windowsButton}
		<div class="windows-start-menu" transition:fly={{ duration: 200 }}>
			<div class="app-list">
				<div class="app-list-item">
					<img src="" alt="" />
					<div class="app-name"></div>
					<div class="is-folder"></div>
				</div>
			</div>
			<div class="options-list">options</div>
		</div>
	{/if}
	<div class="start-bar">
		<img src="/win7-start-icon.png" alt="" on:click={() => (windowsButton = !windowsButton)} />
		<div class="opened-apps">
			{#each Object.entries(navApps) as [k, v]}
				{#if v.opened || v.minimized}
					<button class="desktop-icon" on:click={() => handleNavAppsOpen(v.title)}>
						<img src={`/OriginalWin7Icons/${v.img_url}`} alt={v.img_url} />
					</button>
				{/if}
			{/each}
		</div>
	</div>
</div>

<style>
	.desktop-icon {
		background: transparent;
		border-width: 0;
		border-radius: 4px;
		padding: 0.2rem 0.6rem;
		color: var(--color-title);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-items: center;
		gap: 2px;
	}
	.desktop-icon:hover {
		background: linear-gradient(to bottom right, #ffffff75 20%, #ffffff35 80%);
	}
	.opened-apps {
		flex-grow: 1;
		display: flex;
		gap: 1rem;
	}
	.opened-apps button {
		background: linear-gradient(to bottom right, #ffffff40 20%, #0080ff00 80%);
	}
	.desktop {
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		padding: 2rem;
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		gap: 2.6rem;
	}
	.close-nav {
		position: absolute;
		top: 5%;
		right: 8%;
		background-color: rgb(255, 0, 0);
		color: white;
		padding: 5px;
		z-index: 4;
	}
	.start-bar {
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 3rem;
		padding: 0 2vw;
		background: linear-gradient(to bottom right, #00000060 30%, rgba(116, 184, 252, 0.25) 100%);
		backdrop-filter: blur(20px);
		border-style: solid;
		border-width: 1px 0 0;
		border-color: rgba(255, 255, 255, 0.1);
		display: flex;
		gap: 1rem;
	}
	.start-bar img,
	.desktop img {
		object-fit: scale-down;
		max-width: 60px;
		height: 100%;
	}
	.windows-start-menu {
		background: linear-gradient(to bottom, #0f3d6bf6 0%, #56595dd8 100%);
		position: absolute;
		bottom: 3rem;
		width: 40vw;
		height: 60vh;
		padding: 0.6rem;
		border-radius: 0 8px 0 0;

		display: grid;
		grid-template-columns: 4fr 2fr;
	}
	.app-list {
		background-color: rgb(255, 255, 255);
		border-radius: 8px;
		padding: 0.6rem;
	}
	.options-list {
		background-color: transparent;
		padding: 0.6rem;
	}
	.screenCover {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-items: center;
		cursor: default;
		overflow-x: hidden;
		background-image: url('/frutiger.png');
		background-size: cover;
		opacity: 1;
		visibility: visible;
		transition:
			opacity 0.6s ease,
			visibility 0.3s ease;
	}
	.navbar {
		z-index: 1;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		box-sizing: border-box;
	}
	.hidden {
		opacity: 0;
		visibility: hidden;
		pointer-events: none;
	}
	h1 {
		margin: 2rem 0 1rem;
	}
</style>
