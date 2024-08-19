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
    <div class="title">
        <p class="current">current</p>
        <p class="punto" class:visible={$loaded}>.</p>
        <p class="me">me</p>
    </div>
    <div class="autor">
        <p class="por">por</p>
        <p class="nombre">
            Bernardo A. Marquez / Desarrollo de software
        </p>
    </div>
</div>

<style>
    .visible {
        opacity: 0;
    }
    .loader-container {
        width: 100%;
        height: 100vh;
        display: grid;
        grid-template-rows: 1fr 1fr;
    }
    .title {
        grid-row: 1 / 2;
        display: flex;
        justify-content: space-around;
        align-items: baseline;
        align-self: flex-end;
    }
    .current {
        font-size: 4vw;
        font-weight: bold;
        display: flex;
        justify-content: end;
        align-items: flex-end;
    }
    .punto {
        font-size: 16vw;
        font-weight: bold;
        display: flex;
        justify-content: end;
        align-items: flex-end;
    }
    .me {
        font-size: 32vw;
        font-weight: bold;
        display: flex;
        align-items:flex-end;
    }
    .autor {
        grid-row: 2 / 3;
        display: flex;
        justify-content: center;
        align-items: baseline;
        padding-top: 5em;
        gap: 1rem;
    }
    .por {
        min-width: 2rem;
        font-size: 1em;
    }
    .nombre {
        font-size: 1.4em;
        text-wrap: wrap;
    }
</style>