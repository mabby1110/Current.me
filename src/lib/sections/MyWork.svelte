<script>
	import { fade, fly, scale } from 'svelte/transition';
	import { selectedProject } from '$lib/writables';
	import Slider from '$lib/components/Slider.svelte';
	import SliderLinkCard from '$lib/components/SliderLinkCard.svelte';
	import { cubicOut } from 'svelte/easing';
	import MyWorkProjectCard from '$lib/components/MyWorkProjectCard.svelte';

	let isVisible = false;
</script>

<section class="hero">
	<MyWorkProjectCard/>
</section>

<style>
	.hero {
		display: flex;
		flex-direction: column;
		align-items: center;
        height: 95vh;
		color: white;
		background-color: rgba(0, 0, 255, 0.26);
		font-family: 'Poppins', sans-serif;
		padding: 5vw;
		max-width: 2048px;
	}
</style>
