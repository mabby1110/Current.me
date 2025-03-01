<script>
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { navState } from '$lib/writables';
	import XpCard from './XPCard.svelte';
	import HeroLinkCard from './HeroLinkCard.svelte';

	$: navApps = {
		home: { opened: false, imgURL: '', minimized: false },
		about: { opened: false, imgURL: '', minimized: false },
		cv: { opened: false, imgURL: '', minimized: false },
		work: { opened: false, imgURL: '', minimized: false },
		Highlights: { opened: false, imgURL: '', minimized: false }
	};
	function closeNav() {
		navState.set({ visible: false });
	}

	function openNav() {
		navState.set({ visible: true });
	}
	function handleNavAppsOpen(name, info) {
		console.log('navApps: ', name, info);
		navApps[name].opened = true;
		navApps[name].minimized = false;
	}

	onMount(() => {
		const handleKeydown = () => {
			// @ts-ignore
			if (event.key === 'Escape') {
				navState.set({ visible: false });
			}
		};
		window.addEventListener('keydown', handleKeydown);
		return () => window.removeEventListener('keydown', handleKeydown);
	});
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="navbar" on:click={openNav}>
	<h1 in:fade={{ duration: 800, delay: 600 }}>CURRENT.ME</h1>
</div>

<div
	class:hidden={!$navState.visible}
	class="screenCover"
	in:fade={{ duration: 500 }}
	out:fade={{ duration: 500 }}
>
	<button class="close-nav" on:click={closeNav}>close</button>

	<div class="navlink" transition:fade={{ delay: 100, duration: 500 }}>
		<XpCard
			title="CV"
			bind:opened={navApps.cv.opened}
			bind:minimized={navApps.cv.minimized}
			top="10vh"
			left="10vw"
		>
			<iframe
				src="https://drive.google.com/file/d/111sMnlGyCAxB_1uA059P_NYDM28nSUJ9/preview"
				id="pdf"
				allow="autoplay"
			></iframe>
		</XpCard>
		<XpCard
			title="Home"
			bind:opened={navApps.home.opened}
			bind:minimized={navApps.home.minimized}
			top="20vh"
			left="15vw"
		>
			<HeroLinkCard title="Home" link="/">
				<img
					src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZThyamJueW1ncHY3ZnU4bjA4MDFrNGh0cnV1dW9mdHk0NDhwZnU4dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/NrqGp5pu4lTHy/giphy.gif"
					alt="cv-gif"
					class="hero-image"
				/>
			</HeroLinkCard>
		</XpCard>
		<XpCard
			title="My work"
			bind:opened={navApps.work.opened}
			bind:minimized={navApps.work.minimized}
			top="35vh"
			left="10vw"
		>
			<HeroLinkCard title="My work" link="work">
				<img
					src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzVmenEwbnc3Z293Mnc1MXE5NzR5Y2Y4N3RpOTk4eTJ1ZWV2eGZnZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/YAy9NNu16pYYg/giphy.gif"
					alt="cv-gif"
					class="hero-image"
				/>
			</HeroLinkCard>
		</XpCard>
		<XpCard
			title="About & Skills"
			bind:opened={navApps.about.opened}
			bind:minimized={navApps.about.minimized}
			top="40vh"
			left="20vw"
		>
			<HeroLinkCard title="About & Skills" link="skills">
				<img
					src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnVoOXNkazA1cjBxN3VyZHkzZzNwYWRkdDIxNGgzaG42bW0zaDBucCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TTZnnuZ65qD1C/giphy.gif"
					alt="cv-gif"
					class="hero-image"
				/>
			</HeroLinkCard>
		</XpCard>
	</div>
	<div class="apps">
		{#each Object.entries(navApps) as [name, info]}
			<button on:click={handleNavAppsOpen(name, info)}>{name}={info.opened}</button>
		{/each}
	</div>
	<div class="start-bar">
		<img src="/win7-start-icon.png" alt="" />
		{#each Object.entries(navApps) as [name, info]}
			{#if info.opened || info.minimiezed}
				<button on:click={handleNavAppsOpen(name, info)}>{name}={info.opened}</button>
			{/if}
		{/each}
	</div>
</div>

<style>
	* {
		-webkit-tap-highlight-color: transparent;
	}
	.apps {
		width: 100%;
		height: 100%;
		padding: 2rem;
		display: grid;
		grid-template-rows: repeat(auto-fit, 60px);
		grid-auto-columns: 60px;
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
		height: 6%;
		padding: 2px 2vw;
		background: linear-gradient(to bottom, #74b8fc40 0%, #74b8fc40 100%);
		backdrop-filter: blur(20px);
		border-style: solid;
		border-width: 1px 0 0;
		border-color: rgba(255, 255, 255, 0.4);
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);

		display: flex;
	}
	.start-bar img {
		object-fit: scale-down;
		height: 100%;
		width: auto;
	}
	.screenCover {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-items: center;
		cursor: default;
		overflow-x: hidden;
		background-image: url('/win7.jpg');
		opacity: 1;
		visibility: visible;
		transition:
			opacity 0.6s ease,
			visibility 0.3s ease;
	}
	.navbar {
		height: 5vh;
		z-index: 1;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		box-sizing: border-box;
	}
	img {
		width: 100%;
		height: auto;
	}
	.hidden {
		opacity: 0;
		visibility: hidden;
		pointer-events: none;
	}
	h1 {
		margin: 0;
		padding: 0;
	}
</style>
