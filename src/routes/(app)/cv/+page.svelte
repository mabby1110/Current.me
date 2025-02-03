<script lang="ts">
	import PdfViewer from '$lib/components/PdfViewer.svelte';

	const pdfUrlEs = 'src/lib/assets/CV BERNARDO MARQUEZ español.pdf';
	const pdfUrlEn = 'src/lib/assets/CV BERNARDO MARQUEZ english.pdf';
</script>

<div class="xp-panel general-info">
	<div class="xp-title-bar">
		<span class="xp-title">Curriculum en Español</span>
		<div class="xp-controls">
			<button class="xp-minimize">-</button>
			<button class="xp-maximize">□</button>
			<button class="xp-close">×</button>
		</div>
	</div>
	<div class="personal-details">
		<!-- svelte-ignore a11y-missing-attribute -->
		<iframe
			src="https://drive.google.com/file/d/111sMnlGyCAxB_1uA059P_NYDM28nSUJ9/preview"
			id="pdf"
			allow="autoplay"
		></iframe>
	</div>
</div>

<style>
	#pdf {
		width: 100%;
    max-height: 80vh;
    aspect-ratio: 1 / 1.414;
	}

	* {
		box-sizing: border-box;
		margin: 0;
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}

	.xp-panel {
		align-self: center;
		background-color: var(--secondary-color);
		border: 1px solid var(--tertiary-color);
		border-radius: 4px;
		box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
		width: 80%;
	}

	.xp-title-bar {
		background: var(--tertiary-color);
		color: var(--text-body);
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
		background-color: var(--primary-color);
		border: 1px solid var(--tertiary-color);
		color: var(--text-body);
		width: 20px;
		height: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 12px;
		cursor: pointer;
	}

	.xp-controls button:hover {
		background-color: var(--accent-color);
	}

	.personal-details {
		background-color: var(--secondary-color);
	}
</style>
