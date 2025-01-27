<script>
	import { fade } from "svelte/transition";

    export let title = 'Slider';
    let visible = false;
    function toggleMenu() {
        visible = !visible;
    }
</script>
<div class="slider-container">
    {#if visible}
        <div class="slider-content"
			in:fade={{ duration: 500 }}
			out:fade={{ duration: 500 }}>
            <slot/>
        </div>
    {/if}
    <button on:click={toggleMenu}><p>{title}</p></button>
</div>
<style>
    .slider-container {
        z-index: 2;
        height: 100%;
        width: 100%;
		overflow-x: auto;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        justify-content: flex-end;
    }
	.slider-content {
		display: flex;
		gap: 1rem;
	}
    button {
        align-self: center;
        background-color: transparent;
        color: rgb(255, 255, 255);
        border: none;
        border-radius: 5px;
        padding: 1rem;
        font-size: 1.6em;
        font-weight: 100;
        cursor: pointer;
        position: sticky;
        left: 0;
    }
</style>
