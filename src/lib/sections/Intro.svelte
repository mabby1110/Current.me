<script>
    import { fade, fly, scale } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';
    
    let title = 'A handpicked collection of software pieces';
    let subtitle = 'that blends art with functional code';
    let description = 'This is my road into digital experiences';
</script>

<section class="hero">
    <h3 in:fly={{ y: -50, duration: 1000, easing: cubicOut }}>{title}</h3>
    <h1 in:scale={{ start: 0.5, duration: 1200, easing: cubicOut }}>{subtitle}</h1>
    <p in:fade={{ duration: 1500 }}>{description}</p>
</section>

<style>
    .hero {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        text-align: center;
        background: linear-gradient(135deg, #1e1e2f51, #000000);
        color: white;
        font-family: 'Poppins', sans-serif;
    }
    
    h3 {
        font-size: 1.5rem;
        font-weight: 300;
    }
    
    h1 {
        font-size: 3rem;
        font-weight: 700;
        margin: 10px 0;
    }
    
    p {
        font-size: 1.2rem;
        font-weight: 400;
        max-width: 600px;
    }
</style>