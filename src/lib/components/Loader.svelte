<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { loaded } from "$lib/writables";
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
    <p class="current">current</p>
    <p class="punto">.</p>
    <p class="me">me</p>
    <div class="autor">
        <p class="por">por</p>
        <p class="nombre">
            Bernardo A. Marquez / Desarralo de software
        </p>
    </div>
</div>

<style>
    .loader-container {
        width: 100%;
        height: 100vh;
        display: grid;
        grid-template-rows: 1fr 1fr 2fr;
        grid-template-columns: 1fr auto 1.2fr;
    }
    .current {
        grid-area: 1 / 1 / 3 / 2;
        font-size: 4rem;
        font-weight: bold;
        display: flex;
        justify-content: end;
        align-items: flex-end;
    }
    .punto {
        grid-area: 1 / 2 / 3 / 2;
        font-size: 16rem;
        font-weight: bold;
        display: flex;
        justify-content: end;
        align-items: flex-end;
        line-height: 13rem;
    }
    .me {
        grid-area: 1 / 3 / 3 / 4;
        font-size: 16rem;
        font-weight: bold;
        display: flex;
        align-items:flex-end;
        line-height: 13rem;
    }
    .autor {
        grid-area: 3 / 1 / 3 / 4;
        display: flex;
        justify-content: center;
        align-items: baseline;
        padding-top: 5rem;
    }
    .por {
        font-size: 1rem;
    }
    .nombre {
        font-size: 1.4rem;
    }
</style>