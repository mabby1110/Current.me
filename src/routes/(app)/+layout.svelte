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

{#if $started}
<nav>
    <Navbar/>
</nav>
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
        bottom: 0;
        display: block;
        width: 100%;
        z-index: 999;
    }
    .visible {
        opacity: 0;
    }
</style>