<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { release } from "$lib/writables";
    import { fade } from "svelte/transition";

    let lista_cosas = ['[PRODUCTO]', '[IDEA]', '[MARCA]', '[EMPRESA]', '[SERVICIO]'];
    let currentIndex = 0;
    let intervalId;

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
<div class="content">
    <h1 class="left-position text-landing l" in:fade={{ duration: 1000, delay:3000 }}>
    ¿Que es
    </h1>
    <h1 class="title-1" in:fade={{ duration: 1000, delay:2000  }}>
        {lista_cosas[currentIndex]}
    </h1>    
    <h1 class="right-position text-landing r" in:fade={{ duration: 1000, delay:3000  }}>
        sin significado?
    </h1>
</div>
<div class="content-2">
    <p>Aplicado a lo que nos concierne, un producto o una marca es un significante que no existe en la mente del consumidor a menos que este le otorgue un significado</p>
    <p>un sentido que le atribuya singularidad al producto y a su relación con el consumidor.</p>
    <!-- <p class="left-position text">El verdadero valor no reside en lo superficial, sino en el significado profundo que le otorgamos.</p>     -->
    <!-- <p class="right-position text">Sin significado, todo se vuelve vacío, carente de sentido.</p> -->
</div>

<style>
    .content-2{
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        grid-row: 1rem auto auto 1rem;
    }
    .content-2 p {
        background-color: yellow;
        color: black;
    }
    .content {
        width: 100%;
        height: 100vh;
        display: grid;
        grid-template-rows: repeat(6, 1fr);
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        padding: 0 1rem;
    }
    .title-1 {
        grid-area: 3 / 1 / 5 / 3;
        align-self: center;
        justify-self: center;
        font-weight: bold;
        font-size:10vw;
        z-index: 0;
    }
    .text, .text-landing {
        font-weight: 100;
        font-size:2rem;
    }
    .text-landing {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .r {
        text-align: right;
    }
    .right-position {
        grid-area: 5 / 2 / span 1 / span 1;
    }
    .left-position {
        grid-area: 2 / 1 / span 1 / span 1;
    }
</style>