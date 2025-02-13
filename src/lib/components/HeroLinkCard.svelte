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
		background-color: #f0f0f030;
		border-radius: 1rem;
		padding: 1rem;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}
</style>