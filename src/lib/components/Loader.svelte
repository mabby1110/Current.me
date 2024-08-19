<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";
    import { loaded } from "$lib/writables";
    import { release } from "$lib/writables";
    import { fade } from 'svelte/transition';
    import loader from "$lib/assets/loader.svg"

    const dispatch = createEventDispatcher();
    let visible = true;

    function clicked() {
        if ($loaded) {
            visible = false;
            release.set(2)
            dispatch('message', {
                text: true
            });
        }
    }
    onMount(async ()=>{
        // Importa GSAP
        const gsapModule = await import('gsap');
        gsap = gsapModule.gsap

        // Importa ScrollTrigger
        const ScrollTriggerModule = await import('gsap/ScrollTrigger');
        ScrollTrigger = ScrollTriggerModule.ScrollTrigger;
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
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="loader-container"
    on:click={clicked}
    transition:fade={{ duration: 40 }}>
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