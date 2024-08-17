<script lang="ts">
    import { onMount } from "svelte";
    import { release } from "$lib/writables";
    onMount(()=>{
        release.set(0)
    })

    let lista_cosas =  ['[PRODUCTO]']
</script>

<div class="content-1">
    <h1 class="que_es">¿Que es</h1>
    <h1 class="cosa">{lista_cosas[0]}</h1>
    <h1 class="sin_significado">sin significado?</h1>
</div>
<div class="content-1">
    <h1 class="que_es">¿Que es</h1>
    <h1 class="cosa">{lista_cosas[0]}</h1>
    <h1 class="sin_significado">sin significado?</h1>
</div>
<div class="content-1">
    <h1 class="que_es">¿Que es</h1>
    <h1 class="cosa">{lista_cosas[0]}</h1>
    <h1 class="sin_significado">sin significado?</h1>
</div>
<div class="content-1">
    <h1 class="que_es">¿Que es</h1>
    <h1 class="cosa">{lista_cosas[0]}</h1>
    <h1 class="sin_significado">sin significado?</h1>
</div>
<div class="content-1">
    <h1 class="que_es">¿Que es</h1>
    <h1 class="cosa">{lista_cosas[0]}</h1>
    <h1 class="sin_significado">sin significado?</h1>
</div>

<style>
    .content-1 {
        position: relative;
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-rows: repeat(6, 1fr);
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    }
    .que_es {
        grid-area: 2 / 1 / span 1 / span 1;
        align-self: flex-end;
        justify-self: center;
        font-weight: 100;
        font-size:3rem;
    }
    .cosa {
        position: fixed;
        align-self: center;
        justify-self: center;
        font-weight: bold;
        font-size:4rem;
        z-index: 0;
    }
    .sin_significado {
        grid-area: 5 / 2 / span 1 / span 1;
        justify-self: center;
        font-weight: 100;
        font-size:3rem;
    }
    /* .cosa::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 30vh;
        height: 30vh;
        background-color: var(--accent-color);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        z-index: -1;
    }
    */
</style>