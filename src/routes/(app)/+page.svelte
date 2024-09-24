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

<div class="landing-container slide-1 {y>400?"hide":"show"}">
    <h2 class="left-positios" in:fade={{ duration: 1000, delay:3000 }}>
    ¿Que es
    </h2>
    <h1 class="" in:fade={{ duration: 1000, delay:1500  }}>
        {lista_cosas[currentIndex]}
    </h1>    
    <h2 class="right-position" in:fade={{ duration: 1000, delay:3000  }}>
        sin significado?
    </h2>
</div>
<div class="debug">
    pixel: {y} y algo
</div>
<div class="landing-container slide-2 {y>800?"hide":"show"}">
    <div>
        <p class="title-1">¿buscas singularidad?</p>
    </div>
    <div>
        <p>Cada idea nueva es una oportunidad para ayudar y crecer como sociedad</p>
        <br>
        <p>un producto o una marca no existe en la mente del consumidor a menos que este le otorgue un significado</p>
        <br>
        <p>descubre el potencial de tu marca y hagamosla realidad</p>
    </div>
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
    .landing-container {
        width: 100%;
        height: 100vh;
        position: sticky;
        top: 0px;
        display: grid;
        grid-template-rows: repeat(6, 1fr);
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        padding: 0 1rem;
    }
    .slide-1 h1{
        grid-area: 3 / 1 / 4 / 3;
        align-self: center;
        justify-self: center;
        font-weight: bold;
        font-size:10vw;
        z-index: 0;
    }
    .slide-1 h2:first-child{
        font-weight: 100;
        font-size:2rem;
        grid-area: 2 / 1 / span 1 / span 1;
        align-self: flex-end;
        justify-self: center;
        
    }
    .slide-1 h2:last-child{
        font-weight: 100;
        font-size:2rem;
        grid-area: 4 / 2 / span 1 / span 1;
        justify-self: center;
    }

    .slide-2 {
        color: black;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        grid-auto-flow: dense;
    }
    .slide-2 div:first-child {
        border: 2rem;
        border-style: solid;
        border-color: rgb(0, 0, 0);
        color: white;
        padding: 1.6rem;
    }
    .slide-2 div:last-child {
        background-color: white;
        width: 100%;
        word-wrap: break-word;
    }
    /* UTILES */
    
    .show {
        opacity: 1;
    }
    .hide {
        opacity: 0;
        transition: all 0.5s ease-out;
    }
</style>