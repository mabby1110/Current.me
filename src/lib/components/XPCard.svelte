<script lang="ts">
    export let title: string = "Window Title";
    export let link: string = "/";
    export let top: string = "10vh";
</script>

<div class="xp-panel" style="
        position: sticky; top:{top}">
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
        max-width: 50%;
    }

    .xp-title-bar {
        background: rgb(70, 73, 75);
        color: #ffffff;
        padding: 4px 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        font-weight: bold;
    }

    .xp-controls {
        display: flex;
        gap: 4px;
    }

    .xp-controls button {
        background-color: rgba(21, 21, 22, 0.786);
        border: 1px solid rgb(70, 73, 75);
        color: #ffffff;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        cursor: pointer;
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