<script>
    import { fade } from "svelte/transition";

    export let title = 'Slider';
    let visible = true;
    
    function toggleMenu() {
        visible = !visible;
    }
</script>

<div class="slider-container">
    {#if visible}
        <div class="slider-content"
            in:fade={{ duration: 500 }}
            out:fade={{ duration: 500 }}>
            <div class="items-wrapper">
                <slot/>
            </div>
        </div>
    {/if}
    <button on:click={toggleMenu}><p>{title}</p></button>
</div>

<style>
    .slider-container {
        height: 30vh;
        width: 100%;
        overflow-x: hidden;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        justify-content: flex-end;
        padding: 0 2rem;
    }

    .slider-content {
        display: flex;
        gap: 1rem;
        height: 100%;
        overflow-x: auto;
        -ms-overflow-style: none;  /* Ocultar scrollbar en IE y Edge */
        scrollbar-width: none;  /* Ocultar scrollbar en Firefox */
    }

    /* Ocultar scrollbar en Chrome, Safari y Opera */
    .slider-content::-webkit-scrollbar {
        display: none;
    }

    .items-wrapper {
        display: flex;
        gap: 1rem;
        height: 100%;
        margin: 0 auto;  /* Centrar items cuando hay pocos */
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