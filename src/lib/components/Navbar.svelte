<script>
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { navState } from '$lib/writables';
	import XpCard from './XPCard.svelte';
	import HeroLinkCard from './HeroLinkCard.svelte';

	// Estado de las aplicaciones de navegación
	$: navApps = {
		home: { opened: false, imgURL: '109.ico', minimized: false },
		about: { opened: false, imgURL: '99.ico', minimized: false },
		cv: { opened: false, imgURL: '19.ico', minimized: false },
		work: { opened: false, imgURL: '112.ico', minimized: false },
		Highlights: { opened: false, imgURL: '1024.ico', minimized: false }
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
<div class:hidden={!$navState.visible} class="screenCover" in:fade={{ duration: 500 }} out:fade={{ duration: 500 }}>
	<button class="close-nav" on:click={closeNav}>close</button>
	<div class="navlink" transition:fade={{ delay: 100, duration: 500 }}>
		<!-- Tarjetas de aplicaciones -->
		<XpCard title="CV" bind:opened={navApps.cv.opened} bind:minimized={navApps.cv.minimized} top="10vh" left="10vw">
			<iframe src="https://drive.google.com/file/d/111sMnlGyCAxB_1uA059P_NYDM28nSUJ9/preview" id="pdf" allow="autoplay" height="100%" width="100%"></iframe>
		</XpCard>
		<XpCard title="Home" bind:opened={navApps.home.opened} bind:minimized={navApps.home.minimized} top="20vh" left="15vw">
			<HeroLinkCard title="Home" link="/">
				<img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZThyamJueW1ncHY3ZnU4bjA4MDFrNGh0cnV1dW9mdHk0NDhwZnU4dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/NrqGp5pu4lTHy/giphy.gif" alt="cv-gif" class="hero-image" />
			</HeroLinkCard>
		</XpCard>
		<XpCard title="My work" bind:opened={navApps.work.opened} bind:minimized={navApps.work.minimized} top="35vh" left="10vw">
			<HeroLinkCard title="My work" link="work">
				<img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzVmenEwbnc3Z293Mnc1MXE5NzR5Y2Y4N3RpOTk4eTJ1ZWV2eGZnZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/YAy9NNu16pYYg/giphy.gif" alt="cv-gif" class="hero-image" />
			</HeroLinkCard>
		</XpCard>
		<XpCard title="About & Skills" bind:opened={navApps.about.opened} bind:minimized={navApps.about.minimized} top="40vh" left="20vw">
			<HeroLinkCard title="About & Skills" link="skills">
				<img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnVoOXNkazA1cjBxN3VyZHkzZzNwYWRkdDIxNGgzaG42bW0zaDBucCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TTZnnuZ65qD1C/giphy.gif" alt="cv-gif" class="hero-image" />
			</HeroLinkCard>
		</XpCard>
	</div>

	<!-- Iconos de aplicaciones -->
	<div class="desktop">
		{#each Object.entries(navApps) as [name, info]}
			<button class="desktop-icon" on:click={() => handleNavAppsOpen(name)}>
				<img src={`/OriginalWin7Icons/${info.imgURL}`} alt={info.imgURL}>
				<p>{name}</p>
			</button>
		{/each}
	</div>

	<!-- Barra de inicio -->
	<div class="start-bar">
		<img src="/win7-start-icon.png" alt="" />
		<div class="opened-apps">
			{#each Object.entries(navApps) as [name, info]}
				{#if info.opened || info.minimized}
					<button class="desktop-icon" on:click={() => handleNavAppsOpen(name)}>
						<img src={`/OriginalWin7Icons/${info.imgURL}`} alt={info.imgURL}>
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
	.start-bar img, .desktop img {
		object-fit: scale-down;
		max-width: 60px;
		height: 100%;
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
		transition: opacity 0.6s ease, visibility 0.3s ease;
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
