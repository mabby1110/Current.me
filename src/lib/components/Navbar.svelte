<script>
	import kitten from '$lib/assets/kitten.png';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { navState } from '$lib/writables';
	import XpCard from './XPCard.svelte';
	import HeroLinkCard from './HeroLinkCard.svelte';
	import HeroAnchorCard from './HeroAnchorCard.svelte';

	function closeNav() {
		navState.set({ visible: false, kitty: false });
	}

	function openNav() {
		navState.set({ visible: true, kitty: true });
	}

	onMount(() => {
		const handleKeydown = () => {
			// @ts-ignore
			if (event.key === 'Escape') {
				navState.set({ visible: false, kitty: false });
			}
		};
		window.addEventListener('keydown', handleKeydown);
		return () => window.removeEventListener('keydown', handleKeydown);
	});
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<header on:click={openNav}>
	<h1>CURRENT.ME</h1>
</header>

{#if $navState.visible}
	<div class="screenCover" in:fade={{ duration: 500 }} out:fade={{ duration: 500 }}>
		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
		<button class="close-nav" on:click={closeNav}>x</button>
		<!-- <InstuctionBanner
			>You can click, drag, minimize, or close any window. Scrolling is only possible outside the windows.</InstuctionBanner
		> -->
		<div class="navlink" transition:fade={{ delay: 100, duration: 500 }}>
			<XpCard title="CV" top="20vh" left="30vw">
				<!-- svelte-ignore a11y-missing-attribute -->
				<iframe
					src="https://drive.google.com/file/d/111sMnlGyCAxB_1uA059P_NYDM28nSUJ9/preview"
					id="pdf"
					allow="autoplay"
				></iframe>
			</XpCard>
			<XpCard title="About & Skills" top="30vh" left="20vw">
				<HeroLinkCard title="About & Skills" link="skills">
					<img
						src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnVoOXNkazA1cjBxN3VyZHkzZzNwYWRkdDIxNGgzaG42bW0zaDBucCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TTZnnuZ65qD1C/giphy.gif"
						alt="cv-gif"
						class="hero-image"
					/>
				</HeroLinkCard>
			</XpCard>
			<XpCard title="My work" top="40vh" left="10vw">
				<HeroAnchorCard title="Work">
					<img
						src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzVmenEwbnc3Z293Mnc1MXE5NzR5Y2Y4N3RpOTk4eTJ1ZWV2eGZnZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/YAy9NNu16pYYg/giphy.gif"
						alt="cv-gif"
						class="hero-image"
					/>
				</HeroAnchorCard>
			</XpCard>
		</div>
	</div>
{/if}

<style>
	* {
		-webkit-tap-highlight-color: transparent;
	}
	.close-nav {
		position: absolute;
		top: 5%;
		right: 8%;
		color: rgb(255, 255, 255);
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
	}
	header {
		max-height: 5vh;
		z-index: 1;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		box-sizing: border-box;
	}
</style>
