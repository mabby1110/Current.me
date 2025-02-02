<script>
	import { goto } from "$app/navigation";

	export let title = 'HeroLinkCard';
	export let link = '/';
</script>
<button class="card-container" on:click={goto(link)}>{title}</button>

<style>
    .card-container {
		max-width: 280px;
		min-height: 200px;
        width: 100%;
		height: 100%;
		background-color: #f0f0f030;
		border-radius: 1rem;
		padding: 1rem;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}
</style>