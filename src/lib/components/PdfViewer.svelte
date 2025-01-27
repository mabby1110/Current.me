<script lang="ts">
  export let pdfUrl: string; // URL del archivo PDF
  export let width: string = "80%"; // Ancho del iframe (puedes personalizarlo)
  export let height: string = "100%"; // Alto del iframe (puedes personalizarlo)
</script>

<style>
  .pdf-container {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 60vh;
    overflow: hidden;
  }
</style>

<div class="pdf-container">
  <!-- svelte-ignore a11y-missing-attribute -->
  <iframe
    src={pdfUrl}
    width={width}
    height={height}
    frameborder="0"
    allow="autoplay"
  >
    Tu navegador no soporta la visualización de PDFs. Puedes descargarlo <a href={pdfUrl}>aquí</a>.
  </iframe>
</div>