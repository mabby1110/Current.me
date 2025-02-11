<script>
	import { goto } from "$app/navigation";

	export let title = 'HeroLinkCard';
    const anchors = Array(100).fill(0).map((_, index) => index)
	
    let link;
    let anchor;
    let anchorId = 'work-section';

	function handleAnchorClick (event) {
        link = event.currentTarget
        anchor = document.getElementById(anchorId)
		event.preventDefault()
		window.scrollTo({
			top: anchor.offsetTop,
			behavior: 'smooth'
		})
	}
</script>
<a href="#anchor-{anchor}" on:click={handleAnchorClick}>
	<slot>{title}</slot>
</a>

<style>
    .card-container {
		background-color: #f0f0f030;
		border-radius: 1rem;
		padding: 1rem;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}
</style>