<!-- IphoneIcon.svelte -->
<script>
	export let size = '24px'; // Tamaño por defecto del icono
</script>

<div
	class="icon"
	style="
      width: {size};"
>
	<slot />
</div>

<style>
	.icon {
		border-radius: 10px;
        aspect-ratio: 1/1;
        height: fit-content;
	}

	.icon::before {
		content: '';
		width: 60%;
		height: 60%;
		background-color: white;
		border-radius: 5px;
	}
</style>
