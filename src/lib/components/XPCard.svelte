<script lang="ts">
    export let title: string = "Window Title";
    export let link: string = "/";
    export let top: string = "0vh";
    export let left: string = "0vw";
    
    let isDragging = false;
    let initialX: number;
    let initialY: number;
    let initialTop: number;
    let initialLeft: number;
    let cardElement: HTMLElement;

    function startDragging(clientX: number, clientY: number) {
        isDragging = true;
        initialX = clientX;
        initialY = clientY;
        initialTop = parseFloat(top) * window.innerHeight / 100;
        initialLeft = parseFloat(left) * window.innerWidth / 100;
    }

    function moveElement(clientX: number, clientY: number) {
        if (!isDragging) return;
        
        const deltaX = clientX - initialX;
        const deltaY = clientY - initialY;
        
        const newTop = initialTop + deltaY;
        const newLeft = initialLeft + deltaX;
        
        const newTopVh = (newTop / window.innerHeight) * 100;
        const newLeftVw = (newLeft / window.innerWidth) * 100;
        
        // Límites ajustados para mejor experiencia en móvil
        if (newTopVh >= 0 && newTopVh <= 80) {
            top = `${newTopVh}vh`;
        }
        if (newLeftVw >= -20 && newLeftVw <= 80) {
            left = `${newLeftVw}vw`;
        }
    }

    function stopDragging() {
        isDragging = false;
    }

    // Eventos de mouse
    function handleMouseDown(event: MouseEvent) {
        if ((event.target as HTMLElement).closest('.xp-title-bar')) {
            event.preventDefault();
            startDragging(event.clientX, event.clientY);
        }
    }

    function handleMouseMove(event: MouseEvent) {
        moveElement(event.clientX, event.clientY);
    }

    // Eventos táctiles
    function handleTouchStart(event: TouchEvent) {
        if ((event.target as HTMLElement).closest('.xp-title-bar')) {
            event.preventDefault();
            const touch = event.touches[0];
            startDragging(touch.clientX, touch.clientY);
        }
    }

    function handleTouchMove(event: TouchEvent) {
        if (isDragging) {
            event.preventDefault();
            const touch = event.touches[0];
            moveElement(touch.clientX, touch.clientY);
        }
    }

    import { onMount, onDestroy } from 'svelte';
    
    onMount(() => {
        // Mouse events
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', stopDragging);
        
        // Touch events
        window.addEventListener('touchmove', handleTouchMove, { passive: false });
        window.addEventListener('touchend', stopDragging);
        window.addEventListener('touchcancel', stopDragging);
    });
    
    onDestroy(() => {
        // Mouse events
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', stopDragging);
        
        // Touch events
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', stopDragging);
        window.removeEventListener('touchcancel', stopDragging);
    });
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div 
    class="xp-panel" 
    style="position: fixed; top:{top}; left:{left}"
    bind:this={cardElement}
    on:mousedown={handleMouseDown}
    on:touchstart={handleTouchStart}
>
    <div class="xp-title-bar">
        <span class="xp-title">{title}</span>
        <div class="xp-controls">
            <button class="xp-minimize">-</button>
            <button class="xp-maximize">□</button>
            <button class="xp-close">×</button>
        </div>
    </div>
    <div class="xp-content">
        <slot />
    </div>
</div>

<style>
    .xp-panel {
        background-color: rgb(0, 0, 0);
        border: 1px solid rgb(70, 73, 75);
        border-radius: 4px;
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
        min-width: 240px;
        max-width: 90%; /* Ajustado para móvil */
        aspect-ratio: 4/3;
        user-select: none;
        z-index: -1;
        touch-action: none; /* Previene el scroll mientras se arrastra en móvil */
    }

    @media (max-width: 768px) {
        .xp-panel {
            min-width: 200px; /* Menor tamaño mínimo para móvil */
            max-width: 95%; /* Mayor ancho máximo para móvil */
        }
    }

    .xp-title-bar {
        background: rgb(70, 73, 75);
        color: #ffffff;
        padding: 8px; /* Padding aumentado para mejor área táctil */
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        font-weight: bold;
        cursor: move;
        touch-action: none;
    }

    .xp-controls {
        display: flex;
        gap: 8px; /* Mayor espaciado para botones en móvil */
    }

    .xp-controls button {
        background-color: rgba(21, 21, 22, 0.786);
        border: 1px solid rgb(70, 73, 75);
        color: #ffffff;
        width: 24px; /* Botones más grandes para móvil */
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        cursor: pointer;
        touch-action: none;
    }

    .xp-controls button:hover {
        background-color: #500EFE;
    }

    .xp-content {
        padding: 1rem;
        color: #ffffff;
    }

    :global(.xp-content h1) {
        color: #500EFE;
        margin-bottom: 0.6rem;
    }

    :global(.xp-content h2),
    :global(.xp-content h3),
    :global(.xp-content h4) {
        color: #ffffff;
        margin-bottom: 1rem;
    }

    :global(.xp-content ul) {
        margin-bottom: 2rem;
        padding-left: 1.5rem;
    }

    :global(.xp-content li) {
        margin-bottom: 0.5rem;
        color: #ffffff;
    }
</style>