<script>
	import { infoStore, navState } from '$lib/writables';
    let nav_instruction = "esc para cerrar"
</script>

<div class="info-container">
    <p class="instruction">{$navState.visible?nav_instruction:$infoStore.info}</p>
    <!-- <p class="scroll-y">y:{$infoStore.scrollY.toPrecision(3)}</p> -->
</div>

<style>
    .info-container {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        z-index: 999;
        height: 4rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    @media (max-width: 768px) {
        
	p {
        font-size: 3vw;
	}
    }
</style>
