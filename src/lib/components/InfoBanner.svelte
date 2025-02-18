<script>
	import { infoStore } from '$lib/writables';
	export let top = 0;
</script>

<div class="info-container">
    <p style="top: {top}vh;">{$infoStore.info} y:{$infoStore.scrollY.toPrecision(3)}</p>
</div>

<style>
    .info-container {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
        height: 100vh;
        pointer-events: none;
        display: flex;
        align-items: center;
    }
	p {
        writing-mode: sideways-lr;
	}

    @media (max-width: 768px) {
        
	p {
        writing-mode: sideways-lr;
        font-size: 3vw;
	}
    }
</style>
