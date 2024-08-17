<script lang="ts">
    import { onMount } from "svelte";
    import { release } from "$lib/writables";

    let lista_cosas =  ['[PRODUCTO]'];
    let gsap;
    let ScrollTrigger;

    onMount(async () => {
        release.set(0)
        // Importa GSAP
        const gsapModule = await import('gsap');
        gsap = gsapModule.gsap;

        // Importa ScrollTrigger
        const ScrollTriggerModule = await import('gsap/ScrollTrigger');
        ScrollTrigger = ScrollTriggerModule.ScrollTrigger;

        // Registra el plugin
        gsap.registerPlugin(ScrollTrigger);

         // Animación para el título principal
         gsap.from(".title-1", {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: "#num-1",
                start: "top center",
                end: "bottom center",
                toggleActions: "play none none reverse"
            }
        });

        // Animación para los elementos con clase .left-position
        gsap.utils.toArray(".left-position").forEach((element: Element) => {
            gsap.from(element, {
                opacity: 0,
                x: -50,
                duration: 0.8,
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Animación para los elementos con clase .right-position
        gsap.utils.toArray(".right-position").forEach((element: Element) => {
            gsap.from(element, {
                opacity: 0,
                x: 50,
                duration: 0.8,
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });
    });
</script>


<div class="content" id="num-1">
    <h1 class="left-position title-2">¿Que es</h1>
    <h1 class="title-1">{lista_cosas[0]}</h1>    
    <h1 class="right-position title-2">sin significado?</h1>
</div>
<div class="content" id="num-2">
    <p class="left-position text">El verdadero valor no reside en lo superficial, sino en el significado profundo que le otorgamos.</p>    
    <p class="right-position text">Sin significado, todo se vuelve vacío, carente de sentido.</p>
</div>
<div class="content" id="num-3">
    <h1 class="left-position text">¿Que es</h1>
    <h1 class="right-position title-2">sin significado?</h1>    
</div>
<div class="content" id="num-4">
    <h1 class="left-position text">¿Que es</h1>
    <h1 class="right-position title-2">sin significado?</h1>    
</div>
<div class="content" id="num-5">
    <h1 class="left-position text">¿Que es</h1>
    <h1 class="right-position title-2">sin significado?</h1>    
</div>

<style>
    .content {
        position: relative;
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-rows: repeat(6, 1fr);
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    }
    .title-1 {
        position: fixed;
        align-self: center;
        justify-self: center;
        font-weight: bold;
        font-size:4rem;
        z-index: 0;
    }
    .title-2 {
        font-weight: 100;
        font-size:2rem;
    }
    .text {
        font-weight: 100;
        font-size:2rem;
    }
    .right-position {
        grid-area: 5 / 2 / span 1 / span 1;
        justify-self: center;
    }
    .left-position {
        grid-area: 2 / 1 / span 1 / span 1;
        align-self: flex-end;
        justify-self: center;
    }
</style>