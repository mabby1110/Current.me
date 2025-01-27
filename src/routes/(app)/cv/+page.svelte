<script lang="ts">
    import PdfViewer from "$lib/components/PdfViewer.svelte";
  
    const Español = 'src/lib/assets/CV BERNARDO MARQUEZ español.pdf'; // Asegúrate de que la ruta al PDF sea correcta
    const English = 'src/lib/assets/CV BERNARDO MARQUEZ english.pdf'; // Asegúrate de que la ruta al PDF sea correcta
  </script>
  <div class="cv-container">
    <h1>Curriculum Vitae</h1>
    <b>Español</b>
    <PdfViewer pdfUrl={Español}/>
    <b>English</b>
    <PdfViewer pdfUrl={English} />
  </div>

  <style>
    h1 {
      z-index: 4444;
      margin-bottom: 2rem;
      position: sticky;
      top: 2rem;
    }
    b {
      display: block;
      margin: 1rem;
    }
  </style>