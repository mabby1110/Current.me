<script>
	import { fade, fly, slide } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { navState } from '$lib/writables';
	import XpCard from './XPCard.svelte';
	import HeroLinkCard from './HeroLinkCard.svelte';
	import { applyAction } from '$app/forms';
	import Mouse from './mouse.svelte';

	let windowsButton = false;

	// Estado de las aplicaciones de navegación
	let navApps = {
		home: { title: 'home', opened: false, img_url: '109.ico', minimized: false, nav_link: '/' },
		// about: { title: 'about', opened: false, img_url: '99.ico', minimized: false, nav_link: '/about' },
		// cv: { title:"cv", opened: false, link_url: '19.ico', minimized: false, nav_link: "/" },
		work: { title: 'work', opened: false, img_url: '112.ico', minimized: false, nav_link: '/work' },
		// Highlights: {
		// 	title: 'Highlights',
		// 	opened: false,
		// 	img_url: '1024.ico',
		// 	minimized: false,
		// 	link: '/highlights'
		// }
	};
	function handleNav(p) {
		console.log(p);
		window.location.href = `${p}`
	}
	// Funciones para abrir y cerrar la navegación
	function closeNav() {
		navState.set({ visible: false });
		windowsButton = false;
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

	// Función para alternar el menú de inicio
	function toggleStartMenu() {
		windowsButton = !windowsButton;
	}
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
	<Mouse/>
	<div class="desktop">
		{#each Object.entries(navApps).slice(0,1) as [k, v]}
			<button class="desktop-icon" on:click={() => handleNavAppsOpen(v.title)}>
				<img src={`/OriginalWin7Icons/${v.img_url}`} alt={v.img_url} />
			</button>
		{/each}
	</div>

	{#each Object.entries(navApps) as [k, v]}
		<div class="navlink" transition:fade={{ delay: 100, duration: 500 }}>
			<XpCard title={v.title} bind:opened={navApps[k].opened} bind:minimized={navApps[k].minimized} top="20vh" left="2vw">
				<HeroLinkCard title={v.title} link={v.nav_link}>
					<img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZThyamJueW1ncHY3ZnU4bjA4MDFrNGh0cnV1dW9mdHk0NDhwZnU4dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/NrqGp5pu4lTHy/giphy.gif" alt="cv-gif" class="hero-image" />
				</HeroLinkCard>
			</XpCard>
		</div>
	{/each}

	<!-- Menú de inicio de Windows -->
	{#if windowsButton}
		<div class="windows-start-menu" transition:fly={{ duration: 200 }}>
			<div class="app-list">
				{#each Object.entries(navApps) as [k, v]}
					<div class="app-list-item" on:click={() => handleNav(v["nav_link"])}>
						<img src={`/OriginalWin7Icons/${v.img_url}`} alt={`${v.title}_icon`} />
						<div class="app-name">{v.title}</div>
					</div>
				{/each}
				
				<!-- Botón para cerrar la navegación desde el menú de inicio -->
				<div class="app-list-item shutdown" on:click={closeNav}>
					<img src="/OriginalWin7Icons/28.ico" alt="shutdown_icon" />
					<div class="app-name">Close Navigation</div>
				</div>
			</div>
			<div class="options-list">
				<div class="user-profile">
					<img src="/OriginalWin7Icons/user.ico" alt="user_profile" />
					<span>User</span>
				</div>
				<div class="system-options">
					<div class="system-option">Documents</div>
					<div class="system-option">Pictures</div>
					<div class="system-option">Music</div>
					<div class="system-option">Control Panel</div>
					<div class="system-option">Devices</div>
				</div>
			</div>
		</div>
	{/if}
	
	<!-- Barra de inicio de Windows -->
	<div class="start-bar">
		<button class="win-button" class:active={windowsButton} on:click={toggleStartMenu}>
			<img src="/win7-start-icon.png" alt="windows start" />
		</button>
		<div class="opened-apps">
			{#each Object.entries(navApps) as [k, v]}
				{#if v.opened || v.minimized}
					<button class="desktop-icon" class:active={v.opened && !v.minimized} on:click={() => handleNavAppsOpen(k)}>
						<img src={`/OriginalWin7Icons/${v.img_url}`} alt={v.img_url} />
						<span>{v.title}</span>
					</button>
				{/if}
			{/each}
		</div>
		<div class="notification-area">
			<div class="time">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
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
		cursor: pointer;
	}
	.desktop-icon:hover {
		background: linear-gradient(to bottom right, #ffffff75 20%, #ffffff35 80%);
	}
	.desktop-icon.active {
		background: linear-gradient(to bottom right, #ffffff90 20%, #ffffff50 80%);
		box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.5);
	}
	.opened-apps {
		flex-grow: 1;
		display: flex;
		gap: 1rem;
		align-items: center;
		margin-left: 10px;
	}
	.opened-apps button {
		background: linear-gradient(to bottom right, #ffffff40 20%, #0080ff00 80%);
		flex-direction: row;
		height: 80%;
	}
	.opened-apps button span {
		margin-left: 5px;
		color: white;
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
		align-items: center;
		gap: 1rem;
		z-index: 100;
	}
	.win-button {
		display: flex;
		align-items: center;
		justify-content: center;
		background: transparent;
		border-width: 0;
		border-radius: 50%;
		width: 2.5rem;
		height: 2.5rem;
		margin: 0;
		cursor: pointer;
		transition: all 0.2s ease-in-out;
	}
	.win-button:hover {
		box-shadow: 0 0 10px rgba(77, 179, 255, 0.8);
	}
	.win-button.active {
		background: radial-gradient(circle, #73c5ff 0%, #0069c0 100%);
		box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);
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
		left: 0;
		height: 60vh;
		padding: 0.6rem;
		border-radius: 0 8px 0 0;
		display: grid;
		grid-template-columns: minmax(180px, 60%) auto;
		box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
		z-index: 150;
	}
	.app-list {
		background-color: rgb(255, 255, 255);
		border-radius: 8px;
		padding: 0.6rem;
		display: flex;
		flex-direction: column;
		overflow-y: auto;
	}
	.app-list-item {
		color: rgba(0, 0, 0, 0.697);
		max-height: 4rem;
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 0.6rem;
		cursor: pointer;
		border-radius: 4px;
	}
	.app-list-item:hover {
		background: linear-gradient(to bottom, #3798f935 0%, #3798f935 100%);
	}
	.app-list-item.shutdown {
		margin-top: auto;
		border-top: 1px solid #e0e0e0;
	}
	.app-list-item.shutdown:hover {
		background: linear-gradient(to bottom, #ff000020 0%, #ff000020 100%);
	}
	.app-list-item img {
		height: 32px;
		width: 32px;
	}
	.options-list {
		background-color: rgba(43, 87, 124, 0.8);
		padding: 0.6rem;
		color: white;
		display: flex;
		flex-direction: column;
	}
	.user-profile {
		display: flex;
		align-items: center;
		padding: 10px;
		gap: 10px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.2);
		margin-bottom: 10px;
	}
	.user-profile img {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		background-color: white;
		padding: 2px;
	}
	.system-options {
		display: flex;
		flex-direction: column;
	}
	.system-option {
		padding: 8px;
		cursor: pointer;
		border-radius: 4px;
	}
	.system-option:hover {
		background-color: rgba(255, 255, 255, 0.2);
	}
	.notification-area {
		display: flex;
		align-items: center;
		margin-left: auto;
		padding-right: 10px;
		color: white;
	}
	.time {
		font-size: 0.8rem;
		background-color: rgba(0, 0, 0, 0.2);
		padding: 4px 8px;
		border-radius: 4px;
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
		height: 8vh;
		max-height: 80px;
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
</style>