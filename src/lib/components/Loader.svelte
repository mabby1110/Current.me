<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { loaded } from "$lib/writables";
    import loader from "$lib/assets/loader.svg"
    const dispatch = createEventDispatcher();

    function clicked() {
        if ($loaded) {
            dispatch('message', {
                text: true
            });
        }
    }
</script>
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="loader-container" on:click={clicked}>
    <img src={loader} alt="">
</div>

<style>
    .visible {
        opacity: 0;
    }
    .loader-container {
        height: 100vh;
        width: 100%;
        padding-top: 10vh;
        display: grid;
        place-items: center;
    }
    .loader-container img{
        object-fit: cover;
        width: 100%;
    }
</style>