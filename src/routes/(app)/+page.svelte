<script lang="ts">
	import HeroLinkCard from '$lib/components/HeroLinkCard.svelte';
	import Slider from '$lib/components/Slider.svelte';
	import SliderLinkCard from '$lib/components/SliderLinkCard.svelte';
</script>

<div class="home-container">
    <div class="title-section"><h1>MABBY</h1></div>
	<div class="hero-section">
		<HeroLinkCard>card-container</HeroLinkCard>
		<HeroLinkCard>card-container</HeroLinkCard>
		<HeroLinkCard>card-container</HeroLinkCard>
		<HeroLinkCard>card-container</HeroLinkCard>
		<HeroLinkCard>card-container</HeroLinkCard>
		<HeroLinkCard>card-container</HeroLinkCard>
		<HeroLinkCard>card-container</HeroLinkCard>
		<HeroLinkCard>card-container</HeroLinkCard>
		<HeroLinkCard>card-container</HeroLinkCard>
		<HeroLinkCard>card-container</HeroLinkCard>
		<HeroLinkCard>card-container</HeroLinkCard>
		<HeroLinkCard>card-container</HeroLinkCard>
	</div>

	<Slider>
        <SliderLinkCard>Proyecto x</SliderLinkCard>
        <SliderLinkCard>Proyecto x</SliderLinkCard>
        <SliderLinkCard>Proyecto x</SliderLinkCard>
        <SliderLinkCard>Proyecto x</SliderLinkCard>
        <SliderLinkCard>Proyecto x</SliderLinkCard>
        <SliderLinkCard>Proyecto x</SliderLinkCard>
        <SliderLinkCard>Proyecto x</SliderLinkCard>
        <SliderLinkCard>Proyecto x</SliderLinkCard>
        <SliderLinkCard>Proyecto x</SliderLinkCard>
        <SliderLinkCard>Proyecto x</SliderLinkCard>
    </Slider>
</div>

<style>
    .title-section {
        font-weight: bold;
        text-align: center;
    }

	.home-container {
		height: 100vh;
		padding: 2%;
        padding-bottom: 10vh;
		display: grid;
        grid-template-rows: 1fr 7fr auto;
		gap: 1rem;
	}

	.hero-section {
        height: 100%;
		overflow: scroll;
		display: grid;
		grid-template-columns: repeat(2, minmax(240px, 1fr));
		grid-template-rows: repeat(auto-fill, 1fr);
		column-gap: 10vw;
        row-gap: 1rem;
		align-items: center;
		justify-items: center;
	}

	/* Media query para vista de celular */
	@media (max-width: 560px) {
		.hero-section {
            grid-template-columns: repeat(1, 1fr);
			row-gap: 50vh;
            padding-top: 10vh;
            padding-bottom: 30vh;
		}
	}
</style>