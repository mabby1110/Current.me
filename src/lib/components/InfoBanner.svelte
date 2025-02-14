<script>
    import { infoStore } from "$lib/writables";
</script>
<p>{$infoStore.scrollY}: {$infoStore.info}</p>

<style>
    p {
        position:absolute;
        left: 5vw;
    }
</style>