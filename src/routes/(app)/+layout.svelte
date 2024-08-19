<script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";
    import Background from "$lib/components/SphereVoidBackground.svelte";
    import { release, loaded } from "$lib/writables";
	import { onMount } from "svelte";
    import Loader from "$lib/components/Loader.svelte";

    let started =  false;
    let gsap;
    let ScrollTrigger;

    function start() {
        started = true
    }

    onMount(async ()=>{
        // Importa GSAP
        const gsapModule = await import('gsap');
        gsap = gsapModule.gsap

        // Importa ScrollTrigger
        const ScrollTriggerModule = await import('gsap/ScrollTrigger');
        ScrollTrigger = ScrollTriggerModule.ScrollTrigger;

        // Animación para elementos con clase .fade-in
        gsap.utils.toArray(".fade-in").forEach((element) => {
            gsap.from(element, {
                opacity: 0,
                y: 20,
                duration: 0.8,
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });
        gsap.utils.toArray(".fade-out").forEach((element) => {
            gsap.from(element, {
                opacity: 100,
                y: 20,
                duration: 0.8,
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });
    })
</script>

<div class="bg">
    <Background release={$release}/>
</div>

{#if !started}
<main>
    <Loader on:message={start}/>
</main>
{:else}
<nav>
    <Navbar/>
</nav>
<main>
    <slot/>
</main>
{/if}
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
        height: 5vh;
        min-width: 240px;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;
    }
    .visible {
        opacity: 0;
    }
</style>