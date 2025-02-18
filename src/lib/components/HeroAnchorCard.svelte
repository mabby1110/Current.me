<script>
	import { goto } from "$app/navigation";
	import { navState } from "$lib/writables";

	export let title = 'HeroLinkCard';
    const anchors = Array(100).fill(0).map((_, index) => index)
	
    let link;
    let anchor;
    let anchorId = 'work-section';

	function handleAnchorClick (event) {
        link = event.currentTarget
		navState.set({ visible: false});
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