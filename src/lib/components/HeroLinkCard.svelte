<script>
	import { goto } from "$app/navigation";
	import { navState } from "$lib/writables";

	export let title = 'HeroLinkCard';
	export let link = '/';

	function handleClick() {
		navState.set({ visible: false});
		goto(link);
	}
</script>
<button class="card-container" on:click={handleClick}>
	<slot>{title}</slot>
</button>

<style>
    .card-container {
		border-radius: 1rem;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		width: 100%;
	}
</style>