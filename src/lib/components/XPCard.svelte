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
			<p class="win7-title">{title}</p>
			<div class="win7-controls">
				<button
					class="win7-minimize window-icon"
					on:click={handleMin}
					on:touchend|preventDefault|stopPropagation={handleMin}
					aria-label="Minimize"
				>
				🗕
				</button>
				<button
					class="win7-maximize window-icon"
					on:click={handleMax}
					on:touchend|preventDefault|stopPropagation={handleMax}
					aria-label="Maximize"
				>
				🗖
				</button>
				<button
					class="win7-close window-icon"
					on:click={handleClose}
					on:touchend|preventDefault|stopPropagation={handleClose}
					aria-label="Close"
				>
					x
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
		padding: 0 0.5% 0.5%;
		border-radius: 6px;
		box-shadow: 0 6px 12px 6px rgba(0, 0, 0, 0.3);
		min-width: 320px;
		max-width: 90%;
		user-select: none;
		z-index: 1000;
		touch-action: none;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		overflow: hidden;
	}

	@media (max-width: 768px) {
		.win7-panel {
			min-width: 320px;
			max-width: 95%;
		}
	}

	.win7-title-bar {
		color: black;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-weight: normal;
		cursor: move;
		touch-action: none;
		height: 2rem;
		margin-bottom: 0.5%;
		box-sizing: border-box;
	}

	.win7-title {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-left: 1%;
		text-shadow: 
			rgb(255, 255, 255) -1px -1px 2px,
			rgb(255, 255, 255) 1px 1px 2px;
		padding: 0 2px;
	}

	.win7-controls {
		position: absolute;
		top: 0;
		right: 0.5vw;
		display: flex;
		border: solid 1px rgba(255, 255, 255, 0.1);
		border-radius: 0 0 6px 6px;
		overflow: hidden;
	}
	.win7-controls button {
		width: 100%;
		min-width: 2.2rem;
		background-color: transparent;
		border-width: 1px;
		border-style: none solid solid;
		border-color: rgba(0, 0, 0, 0.1);
		border-radius: 2px;
		color: white;
	}
	.window-icon {
		background: linear-gradient(to bottom right, #ffffff40 20%, #0080ff00 80%);
	}
	.window-icon:hover {
		background: linear-gradient(to bottom right, #ffffff75 20%, #ffffff35 80%);
	}
	.win7-close {
		background: linear-gradient(to bottom, #fba3a3 10%, #c80000 100%);
	}
	.win7-close:hover {
		background: linear-gradient(to bottom, #fba3a3 10%, #ff0000 100%);
	}
	
	.win7-content {
		width: 100%;
		height: 100%;
	}
</style>