<script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";
    import Background from "$lib/components/SphereVoidBackground.svelte";
    import { release, started } from "$lib/writables";
    import { fade } from "svelte/transition";
    import Loader from "$lib/components/Loader.svelte";
</script>

<div class="bg">
    <Background release={$release}/>
</div>

<nav>
<Navbar/>
</nav>
<main>
{#if $started}
    <slot/>
{:else}
    <Loader/>
{/if}
</main>
<style>
    main, .bg {
        height: 95vh;
        width: 100%;
        min-width: 240px;
    }
    .bg {
        position: fixed;
        top: 5vh;
        bottom: 0;
        left: 0;
        z-index: -999;
        background-color: rgb(0, 0, 0);
    }
    nav {
        position: fixed;
        background-color: black;
        min-width: 240px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;
    }
    .visible {
        opacity: 0;
    }
</style>