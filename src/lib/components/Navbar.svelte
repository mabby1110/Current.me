<script>
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { infoStore, navState } from '$lib/writables';
	import XpCard from './XPCard.svelte';
	import HeroLinkCard from './HeroLinkCard.svelte';

	function closeNav() {
		navState.set({ visible: false});
	}

	function openNav() {
		navState.set({ visible: true});
	}

	onMount(() => {
		const handleKeydown = () => {
			// @ts-ignore
			if (event.key === 'Escape') {
				navState.set({ visible: false});
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
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<button class="close-nav" on:click={closeNav}>close</button>
	<!-- <InstuctionBanner
			>You can click, drag, minimize, or close any window. Scrolling is only possible outside the windows.</InstuctionBanner
		> -->
	<div class="navlink" transition:fade={{ delay: 100, duration: 500 }}>
		<XpCard title="CV" top="10vh" left="10vw">
			<iframe
				src="https://drive.google.com/file/d/111sMnlGyCAxB_1uA059P_NYDM28nSUJ9/preview"
				id="pdf"
				allow="autoplay"
			></iframe>
		</XpCard>
		<XpCard title="Home" top="20vh" left="15vw">
			<HeroLinkCard title="Home" link="/">
				<img
					src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZThyamJueW1ncHY3ZnU4bjA4MDFrNGh0cnV1dW9mdHk0NDhwZnU4dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/NrqGp5pu4lTHy/giphy.gif"
					alt="cv-gif"
					class="hero-image"
				/>
			</HeroLinkCard>
		</XpCard>
		<XpCard title="My work" top="35vh" left="10vw">
			<HeroLinkCard title="My work" link="work">
				<img
					src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzVmenEwbnc3Z293Mnc1MXE5NzR5Y2Y4N3RpOTk4eTJ1ZWV2eGZnZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/YAy9NNu16pYYg/giphy.gif"
					alt="cv-gif"
					class="hero-image"
				/>
			</HeroLinkCard>
		</XpCard>
		<XpCard title="About & Skills" top="40vh" left="20vw">
			<HeroLinkCard title="About & Skills" link="skills">
				<img
					src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnVoOXNkazA1cjBxN3VyZHkzZzNwYWRkdDIxNGgzaG42bW0zaDBucCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TTZnnuZ65qD1C/giphy.gif"
					alt="cv-gif"
					class="hero-image"
				/>
			</HeroLinkCard>
		</XpCard>
	</div>
</div>

<style>
	* {
		-webkit-tap-highlight-color: transparent;
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
		background-color: rgba(0, 0, 0, 0.2);
		backdrop-filter: blur(20px);
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
