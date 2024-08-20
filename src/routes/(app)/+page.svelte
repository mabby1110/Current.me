<script lang="ts">
    import { onMount } from "svelte";
    import { release, started } from "$lib/writables";
    import { fade } from "svelte/transition";

    let lista_cosas = ['[PRODUCTO]'];

    onMount(() => {
        release.set(3);
    });
</script>
<div class="content">
    <h1 class="left-position text-landing l" in:fade={{ duration: 1000, delay:1000 }}>
    ¿Que es
    </h1>
    <h1 class="title-1" in:fade={{ duration: 1000, delay:2000  }}>
        {lista_cosas[0]}
    </h1>    
    <h1 class="right-position text-landing r" in:fade={{ duration: 1000, delay:3000  }}>
        sin significado?
    </h1>
</div>
<div class="content">
    <p class="left-position text">El verdadero valor no reside en lo superficial, sino en el significado profundo que le otorgamos.</p>    
    <p class="right-position text">Sin significado, todo se vuelve vacío, carente de sentido.</p>
</div>

<style>
    .content {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-rows: repeat(5, 1fr);
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        padding: 0 1rem;
    }
    .title-1 {
        position: fixed;
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
        grid-area: 4 / 2 / span 1 / span 1;
    }
    .left-position {
        grid-area: 2 / 1 / span 1 / span 1;
    }
</style>