<script lang="ts">
    import { onMount } from "svelte";
    import { release } from "$lib/writables";
    onMount(()=>{
        release.set(0)
    })

    let lista_cosas =  ['[PRODUCTO]'];
    
    let threshold = 0.9;
    let elements = [];
    let visibleElements = {};

    onMount(() => {
        function handleIntersection(entries) {
            entries.forEach(entry => {
                const id = entry.target.id;
                visibleElements[id] = entry.isIntersecting;
                visibleElements = visibleElements; // Trigger reactivity
                if (visibleElements[id]) {
                    console.log(id)             
                }
            });

        }
        const observer = new IntersectionObserver(handleIntersection, { threshold });

        elements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    });
</script>


<div bind:this={elements[0]} class="content" id="num-1">
    <h1 class="left-position title-2">¿Que es</h1>
    <h1 class="title-1">{lista_cosas[0]}</h1>    
    <h1 class="right-position title-2">sin significado?</h1>
</div>
<div bind:this={elements[1]} class="content" id="num-2">
    <p class="left-position text">El verdadero valor no reside en lo superficial, sino en el significado profundo que le otorgamos.</p>    
    <p class="right-position text">Sin significado, todo se vuelve vacío, carente de sentido.</p>
</div>
<div bind:this={elements[2]} class="content" id="num-3">
    <h1 class="left-position text">¿Que es</h1>
    <h1 class="right-position title-2">sin significado?</h1>    
</div>
<div bind:this={elements[3]} class="content" id="num-4">
    <h1 class="left-position text">¿Que es</h1>
    <h1 class="right-position title-2">sin significado?</h1>    
</div>
<div bind:this={elements[4]} class="content" id="num-5">
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