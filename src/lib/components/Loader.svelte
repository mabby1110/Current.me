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
        width: 100%;
        height: 100vh;
        padding-top: 10vh;
        display: grid;
        place-items: center;
    }
    .loader-container img{
        object-fit: cover;
        width: 100%;
    }
</style>