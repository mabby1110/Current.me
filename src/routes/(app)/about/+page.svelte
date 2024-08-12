<script lang="ts">
    import { onMount } from "svelte";
    import { release } from "$lib/writables";
    onMount(()=>{
        release.set(2)
    })
</script>
about