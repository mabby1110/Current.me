<script lang="ts">
    import { onMount } from "svelte";
    import { release } from "$lib/writables";
    onMount(()=>{
        release.set(0)
    })
</script>

<div class="content-1">
    <h1 class="que_es">¿Que es</h1>
    <h1 class="cosa">[Producto]</h1>
    <h1 class="sin_significado">sin significado?</h1>
</div>
<div class="content-2">
    2
</div>
<div class="content-2">
    2
</div>
<div class="content-2">
    2
</div>
<div class="content-2">
    2
</div>
<div class="content-2">
    2
</div>
<div class="content-2">
    2
</div>

<style>
    .content-1 {
        position: relative;
        width: 100%;
        height: 100%;
        padding: 2rem;
        display: grid;
        grid-template-rows: repeat(3, 1fr);
    }
    .que_es {
        grid-row: 1 / 2;
        align-self: flex-end;
        font-weight: 100;
    }
    .cosa {
        grid-row: 2 / 3;
        align-self: center;
        justify-self: center;
        position: relative;
        z-index: 0;
    }
    .cosa::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 30vh; /* Diameter of the circle */
        height: 30vh; /* Diameter of the circle */
        background-color: var(--accent-color); /* Color of the circle */
        border-radius: 50%; /* Makes the shape a circle */
        transform: translate(-50%, -50%); /* Centers the circle */
        z-index: -1; /* Places the circle behind the div */
    }
    .sin_significado {
        grid-row: 3 / 4;
        justify-self: end;
        font-weight: bold;
    }
</style>