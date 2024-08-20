<script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";
    import Background from "$lib/components/SphereVoidBackground.svelte";
    import { release, started } from "$lib/writables";
    import { fade } from "svelte/transition";
    import Loader from "$lib/components/Loader.svelte";
</script>

<nav>
    <Navbar/>
</nav>

<div class="bg">
    <Background release={$release}/>
</div>

{#if $started}
<main>
    <slot/>
</main>
{:else}
    <Loader/>
{/if}
<style>
    main, .bg {
        width: 100%;
        min-width: 240px;
    }
    .bg {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: -999;
        background-color: rgb(0, 0, 0);
    }
    nav {
        position: fixed;
        display: block;
        width: 100%;
    }
    .visible {
        opacity: 0;
    }
</style>