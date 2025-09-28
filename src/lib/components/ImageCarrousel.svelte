<script lang="ts">
	import { flip } from "svelte/animate";

	export let images: string[] = [];
	export let activeIndex = 0;
	export let transitionDuration = 300;

	const next = () => (activeIndex = (activeIndex + 1) % images.length);
	const prev = () => (activeIndex = (activeIndex - 1 + images.length) % images.length);
	const goTo = (i: number) => (activeIndex = i);

	const styleFor = (i: number) => {
		const d = i - activeIndex,
			a = Math.abs(d);
		return `
      transform: scale(${a ? (a === 1 ? 0.8 : 0.6) : 1.2}) translateX(${a ? (d > 0 ? a * 30 : -a * 30) + '%' : '0'});
      z-index: ${100 - a};
      opacity: ${Math.max(0, 1 - a * 0.3)};
    `;
	};

	const handleKeydown = (e: KeyboardEvent) => {
		if (e.key === 'ArrowLeft') prev();
		if (e.key === 'ArrowRight') next();
	};

	$: visible = [...Array(5)].map((_, i) => (activeIndex + i - 2 + images.length) % images.length);
</script>

<div class="carousel" on:keydown={handleKeydown} tabindex="0" style="--d:{transitionDuration}ms">
	{#each visible as i (i)}
		<div class="slide" style={styleFor(i)} animate:flip>
			<img src={images[i]} alt={`Slide ${i}`} on:click={() => goTo(i)}/>
		</div>
	{/each}

	{#if images.length > 1}
		<button class="btn prev" on:click={prev}>‹</button>
		<button class="btn next" on:click={next}>›</button>
		<div class="dots">
			{#each images as _, i}
				<button class:active={i === activeIndex} on:click={() => goTo(i)} />
			{/each}
		</div>
	{/if}
</div>

<style>
	.carousel {
		position: relative;
		width: 100%;
		height: 100%;
		padding: 1rem;
		overflow: hidden;
		outline: none;
	}
	.slide {
		position: absolute;
		left: 0;
		width: 100%;
		height: 80%;
		transition: all var(--d) ease;
	}
	img {
		width: 100%;
		height: 100%;
		object-fit: scale-down;
		border-radius: 8px;
		cursor: pointer;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
	}
	.btn {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		background: #fff8;
		border: none;
		border-radius: 50%;
		width: 40px;
		height: 40px;
		cursor: pointer;
		z-index: 999;
	}
	.prev {
		left: 10px;
	}
	.next {
		right: 10px;
	}
	.dots {
		position: absolute;
		bottom: 10px;
		left: 0;
		right: 0;
		display: flex;
		justify-content: center;
		gap: 6px;
		z-index: 0;
	}
	.dots button {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		border: none;
		background: #fff5;
	}
	.dots button.active {
		background: #fff;
		transform: scale(1.2);
	}
</style>
