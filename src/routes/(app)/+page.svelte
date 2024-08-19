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
            y: 30,
            color: "#ccc",
            duration: 1,
            scrollTrigger: {
                trigger: "#num-1",
                start: "top center",
                end: "bottom center",
                toggleActions: "play none none reverse"
            }
        });

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

        // Animación para elementos con clase .color-change
        gsap.utils.toArray(".color-change").forEach((element) => {
            gsap.from(element, {
                color: "#ccc",
                fontWeight: "normal",
                duration: 0.8,
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Animación para elementos con clase .style-change
        gsap.utils.toArray(".style-change").forEach((element) => {
            gsap.from(element, {
                fontStyle: "normal",
                letterSpacing: "0em",
                y: 10,
                duration: 0.8,
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        })
    });
</script>


<div class="content" id="num-1">
    <h1 class="left-position text fade-in">¿Que es</h1>
    <h1 class="title-1">{lista_cosas[0]}</h1>    
    <h1 class="right-position text fade-in">sin significado?</h1>
</div>
<div class="content" id="num-2">
    <p class="left-position text fade-in">El verdadero valor no reside en lo superficial, sino en el significado profundo que le otorgamos.</p>    
    <p class="right-position text fade-in">Sin significado, todo se vuelve vacío, carente de sentido.</p>
</div>
<div class="content" id="num-3">
    <h1 class="left-position text fade-in">¿Que es</h1>
    <h1 class="right-position text fade-in">sin significado?</h1>    
</div>
<div class="content" id="num-4">
    <h1 class="left-position text fade-in">¿Que es</h1>
    <h1 class="right-position text fade-in">sin significado?</h1>    
</div>
<div class="content" id="num-5">
    <h1 class="left-position text fade-in">¿Que es</h1>
    <h1 class="right-position text fade-in">sin significado?</h1>    
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
    /* Nuevas clases para animaciones */
    .color-change {
        transition: color 0.8s ease, font-weight 0.8s ease;
    }

    .style-change {
        transition: font-style 0.8s ease, letter-spacing 0.8s ease;
    }
</style>