<script lang="ts">
    import { loaded, release, started } from "$lib/writables";
    import { fade } from 'svelte/transition';
    import loader from "$lib/assets/loader.svg"

    let visible = true;

    function clicked() {
        if ($loaded) {
            visible = false;
            started.set(true)
            release.set(3)
        }
    }
</script>
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="loader-container"
    on:click={clicked}
    out:fade={{ duration: 500 }}>
    <img src={loader} alt="">
</div>

<style>
    .loader-container {
        height: 100vh;
        width: 100%;
        display: grid;
        place-items: center;
    }
    .loader-container img{
        object-fit: cover;
        width: 100%;
    }
</style>