<script>
    import { fade } from "svelte/transition";
</script>

<div class="slider-container">
    <div class="slider-content"
        in:fade={{ duration: 500 }}
        out:fade={{ duration: 500 }}>
        <div class="items-wrapper">
            <slot/>
        </div>
    </div>
</div>

<style>
    .slider-container {
        height: 20vh;
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
</style>