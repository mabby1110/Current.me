<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { release } from "$lib/writables";
    import { fade } from "svelte/transition";

    let lista_cosas = ['[PRODUCTO]', '[IDEA]', '[MARCA]', '[EMPRESA]', '[SERVICIO]'];
    let currentIndex = 0;
    let intervalId;
    let y;

    function rotateItems() {
        currentIndex = (currentIndex + 1) % lista_cosas.length;
    }

    onMount(() => {
        intervalId = setInterval(rotateItems, 1000);
        release.set(0);
    });

    onDestroy(() => {
        clearInterval(intervalId);
    });
</script>

<svelte:window bind:scrollY={y} />

<div class="debug">
    pixel: {y} y algo
</div>

<div class="hero-section">
    <div class="card-container">card-container</div>
    <div class="card-container">card-container</div>
    <div class="card-container">card-container</div>
    <div class="card-container">card-container</div>
</div>

<!-- <p class="left-position text">El verdadero valor no reside en lo superficial, sino en el significado profundo que le otorgamos.</p>     -->
<!-- <p class="right-position text">Sin significado, todo se vuelve vacío, carente de sentido.</p> -->
<style>
    .debug{
        padding: 1rem;
        background-color: black;
        top:10vh;
        left:0;
        z-index: 999;
        position: fixed;
    }

    .hero-section {
        padding: 1rem;
        height: 100vh;
        overflow: scroll;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        grid-template-rows: repeat(auto-fill, 1fr);
        row-gap:1rem;
        column-gap: 40%;
        align-items: center;
        justify-items: center;
    }

    .card-container {
        width: 100%;
        aspect-ratio: 1/1;
        background-color: #f0f0f0;
        border-radius: 1rem;
        padding: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>