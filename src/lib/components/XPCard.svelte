<script lang="ts">
	export let title: string = 'Window Title';
	export let opened = true;
	export let minimized = true;
	export let top: string = '0vh';
	export let left: string = '0vw';

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
		initialTop = (parseFloat(top) * window.innerHeight) / 100;
		initialLeft = (parseFloat(left) * window.innerWidth) / 100;
	}

	function moveElement(clientX: number, clientY: number) {
		if (!isDragging) return;

		const deltaX = clientX - initialX;
		const deltaY = clientY - initialY;

		const newTop = initialTop + deltaY;
		const newLeft = initialLeft + deltaX;

		const newTopVh = (newTop / window.innerHeight) * 100;
		const newLeftVw = (newLeft / window.innerWidth) * 100;

		if (newTopVh >= 6 && newTopVh <= 80) {
			top = `${newTopVh}vh`;
		}
		if (newLeftVw >= -20 && newLeftVw <= 80) {
			left = `${newLeftVw}vw`;
		}
	}

	function stopDragging() {
		isDragging = false;
	}

	function handleMouseDown(event: MouseEvent) {
		const target = event.target as HTMLElement;
		// Check if click is on title bar but not on buttons
		if (target.closest('.win7-title-bar') && !target.closest('.win7-controls')) {
			event.preventDefault();
			startDragging(event.clientX, event.clientY);
		}
	}

	function handleMouseMove(event: MouseEvent) {
		moveElement(event.clientX, event.clientY);
	}

	function handleTouchStart(event: TouchEvent) {
		const target = event.target as HTMLElement;
		// Check if touch is on title bar but not on buttons
		if (target.closest('.win7-title-bar') && !target.closest('.win7-controls')) {
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

	function handleMin(event: Event) {
		event.stopPropagation(); // Prevent event bubbling
		minimized = !minimized;
	}

	let isMaximized = false;
	let previousStyles = {
		top: '10vh',
		left: '10vw'
	};

	function handleMax(event: Event) {
		event.stopPropagation(); // Prevent event bubbling
		if (!isMaximized) {
			previousStyles = {
				top,
				left
			};
			top = '10vh';
			left = '10vw';
			cardElement.style.width = '80vw';
			cardElement.style.height = '80vh';
			cardElement.style.maxWidth = '80vw';
		} else {
			top = previousStyles.top;
			left = previousStyles.left;
			cardElement.style.width = 'auto';
			cardElement.style.height = 'auto';
			cardElement.style.maxWidth = '90%';
			cardElement.style.minWidth = '240px';
		}

		isMaximized = !isMaximized;
		minimized = false;
	}

	function handleClose(event: Event) {
		event.stopPropagation(); // Prevent event bubbling
		opened = false;
	}

	import { onMount, onDestroy } from 'svelte';
	import { fade } from 'svelte/transition';

	onMount(() => {
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', stopDragging);
		window.addEventListener('touchmove', handleTouchMove, { passive: false });
		window.addEventListener('touchend', stopDragging);
		window.addEventListener('touchcancel', stopDragging);
	});

	onDestroy(() => {
		window.removeEventListener('mousemove', handleMouseMove);
		window.removeEventListener('mouseup', stopDragging);
		window.removeEventListener('touchmove', handleTouchMove);
		window.removeEventListener('touchend', stopDragging);
		window.removeEventListener('touchcancel', stopDragging);
	});
</script>

{#if opened && !minimized}
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="win7-panel"
		style="position: fixed; top:{top}; left:{left}"
		bind:this={cardElement}
		on:mousedown={handleMouseDown}
		on:touchstart={handleTouchStart}
		transition:fade={{ delay: 100, duration: 300 }}
	>
		<div class="win7-title-bar">
			<span class="win7-title">{title}</span>
			<div class="win7-controls">
				<button
					class="win7-minimize"
					on:click={handleMin}
					on:touchend|preventDefault|stopPropagation={handleMin}
					aria-label="Minimize"
				>
					<span class="win7-minimize-icon"></span>
				</button>
				<button
					class="win7-maximize"
					on:click={handleMax}
					on:touchend|preventDefault|stopPropagation={handleMax}
					aria-label="Maximize"
				>
					<span class="win7-maximize-icon"></span>
				</button>
				<button
					class="win7-close"
					on:click={handleClose}
					on:touchend|preventDefault|stopPropagation={handleClose}
					aria-label="Close"
				>
					<span class="win7-close-icon">×</span>
				</button>
			</div>
		</div>
		<div class="win7-content">
			<slot />
		</div>
	</div>
{/if}

<style>
	.win7-panel {
		border: 1px solid #ffffff60;
		background: linear-gradient(to bottom, #74b8fc40 0%, #74b8fc40 100%);
		backdrop-filter: blur(20px);
		padding: 0.5%;
		border-radius: 6px;
		box-shadow: 0 6px 12px 6px rgba(0, 0, 0, 0.3);
		min-width: 240px;
		max-width: 90%;
		user-select: none;
		z-index: 1000;
		touch-action: none;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		overflow: hidden;
	}

	@media (max-width: 768px) {
		.win7-panel {
			min-width: 200px;
			max-width: 95%;
		}
	}

	.win7-title-bar {
		color: #ffffff;
		padding: 8px 12px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 14px;
		font-weight: normal;
		cursor: move;
		touch-action: none;
		text-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
		height: 26px;
		box-sizing: border-box;
	}

	.win7-title {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: calc(100% - 90px);
	}

	.win7-controls {
		display: flex;
		gap: 2px;
	}

	.win7-controls button {
		background: transparent;
		border: none;
		color: #ffffff;
		width: 48px;
		height: 22px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		touch-action: manipulation;
		padding: 0;
		margin: 0;
		position: relative;
		border-radius: 3px;
	}

	.win7-controls button:hover {
		background: rgba(255, 255, 255, 0.2);
	}

	.win7-minimize-icon {
		width: 10px;
		height: 2px;
		background-color: white;
		position: absolute;
		bottom: 7px;
	}

	.win7-maximize-icon {
		width: 10px;
		height: 10px;
		border: 1px solid white;
		position: absolute;
	}

	.win7-close-icon {
		font-size: 22px;
		line-height: 14px;
		font-weight: bold;
	}

	.win7-close:hover {
		background: #e81123;
	}

	.win7-content {
		padding: 1rem;
		color: #333;
		background-color: #f9f9f9;
		border-top: 1px solid #ddd;
	}

	:global(.win7-content h1) {
		color: #1c5fb0;
		margin-bottom: 0.6rem;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		font-weight: normal;
	}

	:global(.win7-content h2),
	:global(.win7-content h3),
	:global(.win7-content h4) {
		color: #333;
		margin-bottom: 1rem;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		font-weight: normal;
	}

	:global(.win7-content ul) {
		margin-bottom: 2rem;
		padding-left: 1.5rem;
	}

	:global(.win7-content li) {
		margin-bottom: 0.5rem;
		color: #333;
	}
</style>