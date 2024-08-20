<script>
    import kitten from '$lib/assets/kitten.png'
    let hereKitty = false;

    const handleMouseenter = () => (hereKitty = true);
    const handleMouseleave = () => (hereKitty = false);
    let menuVisible = false;

    function toggleMenu() {
        menuVisible = !menuVisible;
        hereKitty = !hereKitty;
    }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<header 
    on:click={toggleMenu} style="height: {menuVisible ? '20vh' : '5vh'};">
    {#if !menuVisible}
        <div on:mouseenter={handleMouseenter} on:mouseleave={handleMouseleave}>Menú</div>
    {:else}
        <nav on:mouseenter={handleMouseenter} on:mouseleave={handleMouseleave}>
            <a href="/">Inicio</a>
            <a href="/work">Trabajo</a>
            <a href="/about">Sobre mi</a>
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
        top:-80%;
        transform: translate(110%, 0) rotate(-10deg);
		transition: transform 0.4s;
	}
    
	.curious {
        transform: translate(40%, 0) rotate(-90deg);
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
        text-decoration: none;
        font-size: 1.6em;
        font-weight: 100;
    }
    nav a:hover {
        color: black;
        text-decoration: none;
        font-size: 1.6em;
        font-weight: bolder;
    }

    .hidden {
        display: none;
    }
</style>