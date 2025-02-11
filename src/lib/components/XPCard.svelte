<script lang="ts">
	export let title: string = 'Window Title';
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
		if (target.closest('.xp-title-bar') && !target.closest('.xp-controls')) {
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
		if (target.closest('.xp-title-bar') && !target.closest('.xp-controls')) {
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

	let minimized = false;
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

	let closed = false;
	function handleClose(event: Event) {
		event.stopPropagation(); // Prevent event bubbling
		closed = true;
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

{#if !closed}
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="xp-panel"
		style="position: fixed; top:{top}; left:{left}"
		bind:this={cardElement}
		on:mousedown={handleMouseDown}
		on:touchstart={handleTouchStart}
		transition:fade={{ delay: 100, duration: 500 }}
	>
		<div class="xp-title-bar">
			<span class="xp-title">{title}</span>
			<div class="xp-controls">
				<button
					class="xp-minimize"
					on:click={handleMin}
					on:touchend|preventDefault|stopPropagation={handleMin}>-</button
				>
				<button
					class="xp-maximize"
					on:click={handleMax}
					on:touchend|preventDefault|stopPropagation={handleMax}>□</button
				>
				<button
					class="xp-close"
					on:click={handleClose}
					on:touchend|preventDefault|stopPropagation={handleClose}>×</button
				>
			</div>
		</div>
		{#if !minimized}
			<div class="xp-content">
				<slot />
			</div>
		{/if}
	</div>
{/if}

<style>
	.xp-panel {
		background-color: rgb(0, 0, 0);
		border: 1px solid rgb(70, 73, 75);
		border-radius: 4px;
		box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
		min-width: 240px;
		max-width: 90%;
		user-select: none;
		z-index: -1;
		touch-action: none;
	}

	@media (max-width: 768px) {
		.xp-panel {
			min-width: 200px;
			max-width: 95%;
		}
	}
	.xp-title-bar,
	.xp-controls button {
		pointer-events: auto; /* Habilita eventos de puntero en el título y los botones */
	}
	.xp-title-bar {
		background: rgb(70, 73, 75);
		color: #ffffff;
		padding: 8px;
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
		gap: 8px;
	}

	.xp-controls button {
		background-color: rgba(21, 21, 22, 0.786);
		border: 1px solid rgb(70, 73, 75);
		color: #ffffff;
		width: 32px; /* Increased for better touch targets */
		height: 32px; /* Increased for better touch targets */
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 16px; /* Slightly larger font for better visibility */
		cursor: pointer;
		touch-action: manipulation; /* Improved touch handling */
		padding: 0;
		margin: 0;
	}

	.xp-controls button:hover {
		background-color: #500efe;
	}

	.xp-content {
		padding: 1rem;
		color: #ffffff;
	}

	:global(.xp-content h1) {
		color: #500efe;
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
