<script>
	import { infoStore, navState } from '$lib/writables';
    let nav_instruction = "drag, minimize or close any window. click to navigate"
</script>

<div class="info-container">
    <p class="instruction">{$navState.visible?nav_instruction:$infoStore.info}</p>
    <p class="scroll-y">y:{$infoStore.scrollY.toPrecision(3)}</p>
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
        flex-direction: column;
        justify-content: space-between;
        padding: 6vh 0;
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
