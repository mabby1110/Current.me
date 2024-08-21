<script>
    import kitten from '$lib/assets/kitten.png'
    let hereKitty = false;

    const handleMouseenter = () => (hereKitty = true);
    const handleMouseleave = () => (hereKitty = false);
    let menuVisible = false;

    function toggleMenu() {
        menuVisible = !menuVisible;
        hereKitty = menuVisible
    }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<header 
    style="height: {menuVisible ? '20vh' : '5vh'};">
    {#if !menuVisible}
        <div class="menu" 
        on:click={toggleMenu}
        on:mouseenter={handleMouseenter} on:mouseleave={handleMouseleave}>Menú</div>
    {:else}
        <div class="screenCover"
            on:click={toggleMenu}>
        </div>
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <nav on:click={toggleMenu}>
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
    .screenCover {
        z-index: 2;
        position: fixed;
        width: 100vw;
        height: 100vh;
    }
    .menu {
        padding: 1rem;
        border-radius: 5px;
    }
    .menu:hover {
        color: black;
        font-weight: bolder;
        background-color: rgb(255, 255, 255);
    }

    img {
        z-index: 2;
        position: fixed;
        right: -5%;
        bottom: 10%;
        transform: translate(110%, 0) rotate(-10deg);
		transition: transform 0.4s;
        pointer-events: none;
	}
    
	.curious {
        transform: translate(5%, 0) rotate(-65deg);
	}


    header {
        z-index: 1;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: height 0.3s ease;
    }

    nav {
        z-index: 3;
        width: 100%;
        height: 100%;
        background-color: #ffff00;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
    }

    nav a {
        z-index: 5;
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