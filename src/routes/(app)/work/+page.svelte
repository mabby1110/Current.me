<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { release } from "$lib/writables";
    onMount(()=>{
        release.set(1)
    })
</script>
proyectos