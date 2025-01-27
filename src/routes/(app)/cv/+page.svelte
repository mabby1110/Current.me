<script lang="ts">
    import PdfViewer from "$lib/components/PdfViewer.svelte";
  
    const pdfUrl = 'src/lib/assets/CV BERNARDO MARQUEZ español.pdf'; // Asegúrate de que la ruta al PDF sea correcta
  </script>
  
  <main>
    <h1>Curriculum Vitae</h1>
    <PdfViewer {pdfUrl} />
  </main>

  <style>
  </style>