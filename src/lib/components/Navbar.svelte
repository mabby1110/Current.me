<script>
	import kitten from '$lib/assets/kitten.png';
	import { fade } from 'svelte/transition';
	import Slider from './Slider.svelte';
	import SliderLinkCard from './SliderLinkCard.svelte';
	let hereKitty = false;

	const handleMouseenter = () => (hereKitty = true);
	const handleMouseleave = () => (hereKitty = false);
	let menuVisible = false;

	function toggleMenu() {
		menuVisible = !menuVisible;
		hereKitty = menuVisible;
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<header style="height: {menuVisible ? '20vh' : '5vh'};">
	{#if !menuVisible}
		<div
			class="menu"
			on:click={toggleMenu}
			on:mouseenter={handleMouseenter}
			on:mouseleave={handleMouseleave}
		>
			<h1>MABBY</h1>
		</div>
	{:else}
		<div class="screenCover" in:fade={{ duration: 500 }} out:fade={{ duration: 500 }}>
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<nav>
				<a
					on:mouseenter={handleMouseenter}
					on:mouseleave={handleMouseleave}
					on:click={toggleMenu}
					href="/">Home</a
				>
				<a
					on:mouseenter={handleMouseenter}
					on:mouseleave={handleMouseleave}
					on:click={toggleMenu}
					href="/about">About</a
				>
			</nav>
			<Slider title="cambiar fondo">
				<SliderLinkCard />
				<SliderLinkCard />
				<SliderLinkCard />
				<SliderLinkCard />
			</Slider>
		</div>
	{/if}
	<img class:curious={hereKitty} alt="Kitten wants to know what's going on" src={kitten} />
</header>

<style>
	* {
		-webkit-tap-highlight-color: transparent;
	}
	.screenCover {
		position: fixed;
		top: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgb(0, 0, 0);
		display: flex;
		flex-direction: column;
		justify-items: center;
		cursor: default;
	}
	.menu {
		box-sizing: border-box;
		border-radius: 5px;
	}
	.menu:hover {
		color: black;
		font-weight: bolder;
		background-color: rgb(255, 255, 255);
	}

	img {
		z-index: 2;
		position: fixed;
		right: -5%;
		bottom: 10%;
		transform: translate(110%, 0) rotate(-10deg);
		transition: transform 0.4s;
		pointer-events: none;
	}

	.curious {
		transform: translate(40%, 0) rotate(-65deg);
	}

	header {
		z-index: 1;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}

	nav {
		flex-grow: 1;
		z-index: 3;
		width: 100%;
		height: 100%;
		background-color: #000000;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	nav a {
		z-index: 5;
		color: rgb(255, 255, 255);
		padding: 1rem;
		border-radius: 5px;
		text-decoration: none;
		font-size: 1.6em;
		font-weight: 100;
	}
	nav a:hover {
		color: rgb(255, 255, 255);
		background-color: rgb(0, 0, 0);
		text-decoration: none;
		font-size: 1.6em;
		font-weight: bolder;
	}
</style>
