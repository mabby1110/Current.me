<script>
    let visible = true;
    function toggleMenu() {
        visible = !visible;
    }
</script>
<div class="slider-container">
    <h2 on:click={toggleMenu}>Proyectos</h2>
    {#if visible}
        <div class="slider-content">
            <slot/>
        </div>
    {/if}
</div>
<style>
    .slider-container {
        height: 100%;
        width: 100%;
		overflow-x: auto;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
	.slider-content {
		display: flex;
		gap: 1rem;
	}
    h2 {
        user-select: none;
        align-self: center;
        width: min-content;
        position: sticky;
        left: 0;
        cursor: pointer;
    }
</style>
