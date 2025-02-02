<script lang="ts">
    import PdfViewer from "$lib/components/PdfViewer.svelte";

    const pdfUrlEs = 'src/lib/assets/CV BERNARDO MARQUEZ español.pdf';
    const pdfUrlEn = 'src/lib/assets/CV BERNARDO MARQUEZ english.pdf';
  </script>
  <div class="cv-container">
    <h3>Español</h3>
    <PdfViewer pdfUrl={pdfUrlEs} />
    <h3>English</h3>
    <PdfViewer pdfUrl={pdfUrlEn} />
  </div>

  <style>
    div.cv-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  
    h1 {
      margin-bottom: 1rem;
      align-self: flex-start;
    }
    h3 {
      margin-top: 2rem;
      margin-bottom: 0.5rem;
    }
  </style>