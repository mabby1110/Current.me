<script>
    import kitten from '$lib/assets/kitten.png'
    let hereKitty = false;

    const handleMouseenter = () => (hereKitty = true);
    const handleMouseleave = () => (hereKitty = false);
    let menuVisible = false;

    function toggleMenu() {
        menuVisible = !menuVisible;
    }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<header 
    on:click={toggleMenu} style="height: {menuVisible ? '20vh' : '5vh'};"
    on:mouseenter={handleMouseenter} on:mouseleave={handleMouseleave}>
    {#if !menuVisible}
        <div on:mouseenter={handleMouseenter} on:mouseleave={handleMouseleave}>Menú</div>
    {:else}
        <nav>
            <a on:mouseenter={handleMouseenter} on:mouseleave={handleMouseleave} href="/">Inicio</a>
            <a on:mouseenter={handleMouseenter} on:mouseleave={handleMouseleave} href="/work">Trabajo</a>
            <a on:mouseenter={handleMouseenter} on:mouseleave={handleMouseleave} href="/about">Sobre mi</a>
        </nav>
    {/if}
        <img
            class:curious={hereKitty}
            alt="Kitten wants to know what's going on"
            src="{kitten}"
        />
</header>
<style>
    img {
        position: absolute;
        right: 0;
        top:-110;
        transform: translate(110%, 0) rotate(-10deg);
		transition: transform 0.4s;
	}
    
	.curious {
        transform: translate(5%, 0) rotate(-65deg);
	}


    header {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: height 0.3s ease;
    }

    nav {
        width: 100%;
        height: 100%;
        background-color: #ffff00;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
    }

    nav a {
        color: black;
        padding: 1rem;
        border-radius: 5px;
        text-decoration: none;
        font-size: 1.6em;
        font-weight: 100;
    }
    nav a:hover {
        color: rgb(255, 255, 255);
        background-color: rgb(0, 0, 0);
        text-decoration: none;
        font-size: 1.6em;
        font-weight: bolder;
    }

    .hidden {
        display: none;
    }
</style>