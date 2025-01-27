<script lang="ts">
	import HeroLinkCard from '$lib/components/HeroLinkCard.svelte';
	import Slider from '$lib/components/Slider.svelte';
	import SliderLinkCard from '$lib/components/SliderLinkCard.svelte';
</script>

<div class="hero-section">
	<HeroLinkCard title="Habilidades" link="skills"/>
	<!-- <HeroLinkCard title="Galeria"/> -->
	<HeroLinkCard title="CV" link="cv"/>
	<!-- <HeroLinkCard title="Merch"/> -->
</div>

<style>
	.hero-section {
		height: 100%;
		overflow: scroll;
		display: grid;
		grid-template-columns: repeat(2, minmax(240px, 1fr));
		column-gap: 10vw;
		row-gap: 1rem;
		align-items: center;
		justify-items: center;
	}

	/* Media query para vista de celular */
	@media (max-width: 560px) {
		.hero-section {
			grid-template-columns: repeat(1, 1fr);
		}
	}
</style>
