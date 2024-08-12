<script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";
</script>

<nav>
    <Navbar/>
</nav>
<main>
    <slot/>
</main>

<style>
    main {
        background-color: black;
        height: 95vh;
        width: 100%;
        display: flex;
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