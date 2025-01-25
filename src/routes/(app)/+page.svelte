<script lang="ts">
	import LinkCard from '$lib/components/link_card.svelte';
</script>

<div class="home-container">
	<div class="hero-section">
		<LinkCard>card-container</LinkCard>
		<LinkCard>card-container</LinkCard>
		<LinkCard>card-container</LinkCard>
		<LinkCard>card-container</LinkCard>
	</div>

	<div class="slider-container">
		<LinkCard>proyecto x</LinkCard>
		<LinkCard>proyecto x</LinkCard>
		<LinkCard>proyecto x</LinkCard>
		<LinkCard>proyecto x</LinkCard>
		<LinkCard>proyecto x</LinkCard>
		<LinkCard>proyecto x</LinkCard>
		<LinkCard>proyecto x</LinkCard>
	</div>
</div>

<style>
	.debug {
		padding: 1rem;
		background-color: black;
		top: 10vh;
		left: 0;
		z-index: 999;
		position: fixed;
	}

	.home-container {
		height: 100vh;
		padding: 2%;
        padding-bottom: 10vh;
		display: flex;
        flex-direction: column;
        justify-content: space-between;
		gap: 1rem;
	}

	.hero-section {
        height: 100%;
		overflow: scroll;
		display: grid;
		grid-template-columns: repeat(2, minmax(240px, 1fr));
		grid-template-rows: repeat(auto-fill, 1fr);
		column-gap: 10vw;
		align-items: center;
		justify-items: center;
	}

	.slider-container {
		display: flex;
		gap: 1rem;
		overflow-x: auto;
	}

	/* Media query para vista de celular */
	@media (max-width: 560px) {
		.hero-section {
            grid-template-columns: repeat(1, 1fr);
			row-gap: 50vh;
            padding-top: 20vh;
		}
	}
</style>