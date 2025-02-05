<script lang="ts">
    import { selectedProject, projects } from "$lib/writables";
    
    export let title: string;

    function handleClick() {
        const project = projects.find(p => p.title === title);
        if (project) {
            selectedProject.set(project);
        }
    }
</script>

<div class="slider-link-card" on:click={handleClick}>
    <h3>{title}</h3>
</div>

<style>
    .slider-link-card {
        cursor: pointer;
        padding: 1rem;
		height: 100%;
		min-width: 200px;
		background-color: #000000e6;
		border-radius: 1rem;
		padding: 1rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
