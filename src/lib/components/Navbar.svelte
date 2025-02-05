<script>
	import kitten from '$lib/assets/kitten.png';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { navState } from '$lib/writables';

	const handleMouseenter = () => ($navState.kitty = true);
	const handleMouseleave = () => ($navState.kitty = false);

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
<header>
	<div class="menu" on:click={openNav}>
		<h1>CURRENT.ME</h1>
	</div>
</header>

{#if $navState.visible}
	<div class="screenCover" in:fade={{ duration: 500 }} out:fade={{ duration: 500 }}>
		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
		<button class="close-nav" on:click={closeNav}>x</button>
		<nav>
			<a
				on:mouseenter={handleMouseenter}
				on:mouseleave={handleMouseleave}
				on:click={closeNav}
				href="/">Home</a
			>
			<a
				on:mouseenter={handleMouseenter}
				on:mouseleave={handleMouseleave}
				on:click={closeNav}
				href="/skills">Skills</a
			>
			<a
				on:mouseenter={handleMouseenter}
				on:mouseleave={handleMouseleave}
				on:click={closeNav}
				href="/cv">Curriculum Vitae</a
			>
		</nav>
	</div>
	<div class="kitty-cage">
		<img class:curious={$navState.kitty} alt="Kitten wants to know what's going on" src={kitten} />
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
		background-color: transparent;
	}
	.screenCover {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgb(0, 0, 0);
		display: flex;
		flex-direction: column;
		justify-items: center;
		cursor: default;
		overflow-x: hidden;
	}
	.menu {
		box-sizing: border-box;
		border-radius: 5px;
		padding: 1rem;
	}
	.menu:hover {
		color: black;
		font-weight: bolder;
		background-color: rgb(255, 255, 255);
	}

	img {
		z-index: 3;
		position: absolute;
		right: -5%;
		bottom: 10%;
		transform: translate(110%, 0) rotate(-10deg);
		transition: transform 0.4s;
		pointer-events: none;
	}

	.curious {
		transform: translate(40%, 0) rotate(-65deg);
	}
	.kitty-cage {
		position: relative;
		overflow: hidden;
	}
	header {
		max-height: 5vh;
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
