<script lang="ts">
	import Slider from '$lib/components/Slider.svelte';
	import SliderLinkCard from '$lib/components/SliderLinkCard.svelte';
	import { onMount } from 'svelte';
	import { scrollY } from '$lib/writables';
	import Intro from '$lib/sections/Intro.svelte';
	import InfoBanner from '$lib/components/InfoBanner.svelte';
	import MyWork from '$lib/sections/MyWork.svelte';
	function handleScroll() {
		scrollY.set(window.scrollY);
	}

	onMount(() => {
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>
<div class="home">
	<Intro/>
	<MyWork/>
	<Intro/>
</div>
<InfoBanner>{$scrollY}</InfoBanner>
<style>
.home {
	display: flex;
	flex-direction: column;
	align-items: center;
	max-width: 2048px;
	padding: 0 5vw;
}
</style>
