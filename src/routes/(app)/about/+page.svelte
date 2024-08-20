<script lang="ts">
    import { onMount } from "svelte";
    import { release } from "$lib/writables";
    onMount(()=>{
        release.set(2)
    })
</script>

<div class="aboutContainer">
    <div class="datos Generales">
        Datos Generales
    </div>

    <div class="datos Experiencia">
        Datos Experiencia
    </div>
    <div class="contacto">
        contacto
    </div>
</div>

<style>
    .aboutContainer {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    }
    .Generales {
        height: 50vh;
    }
</style>