<script>
</script>

<div class="project-container">

	<div class="project-title">
		<div>
			<h3>Título TítuloTítulo Título</h3>
		</div>
	</div>
	<div class="project-info">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce malesuada est arcu. Nullam cursus
		pharetra lectus sit amet luctus. Morbi eu porttitor turpis. Vestibulum non tincidunt nunc. Nam
		eu nisl elit. Curabitur auctor vestibulum orci, eget fringilla elit imperdiet eu. Etiam suscipit
		mi vitae rhoncus dapibus. Morbi vel arcu at est feugiat auctor. Praesent sit amet consectetur
		augue, ut dapibus turpis.
	</div>
	<div class="project-img"></div>
</div>

<style>
	.project-container {
		width: 100%;
        max-width: 1024px;
		height: 100%;
		display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        grid-template-rows: 1fr 1fr 2fr;
        
	}
	.project-title {
        grid-row: 1 / 2;
		font-size: 2.4rem;
		word-break: break-all;
	}
	.project-title div {
		backdrop-filter: blur(20px);
	}
	.project-info {
        grid-row-start: 2;
		background-color: rgb(56, 42, 165);
	}
	.project-img {
		background-color: rgba(134, 42, 165, 0.633);
        grid-column: span 2;
        grid-row: span 3;
	}
</style>
