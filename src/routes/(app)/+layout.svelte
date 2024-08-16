<script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";
    import Background from "$lib/components/SphereVoidBackground.svelte";
    import { release } from "$lib/writables";
</script>

<div class="bg">
    <Background release={$release}/>
</div>
<nav>
    <Navbar/>
</nav>
<main>
    <slot/>
</main>

<style>
    main, .bg {
        height: 95vh;
        width: 100%;
    }
    .bg {
        position: fixed;
        top: 5vh;
        bottom: 0;
        left: 0;
        z-index: 999;
        width: 100%;
        background-color: rgb(0, 0, 0);
    }
    nav {
        background-color: black;
        height: 5vh;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>