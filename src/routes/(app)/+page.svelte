<script lang="ts">
	import { onMount } from 'svelte';
	import Intro from '$lib/sections/Intro.svelte';
	import MyWork from '$lib/sections/MyWork.svelte';
	import MySkills from '$lib/sections/MySkills.svelte';
	import { infoStore } from '$lib/writables';

	function handleScroll() {
		infoStore.set({scrollY: window.scrollY, info: 'home'});
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
	<MySkills/>
	<MyWork/>
</div>
<style>
.home {
	display: flex;
	flex-direction: column;
	align-items: center;
	max-width: 2048px;
}
</style>
