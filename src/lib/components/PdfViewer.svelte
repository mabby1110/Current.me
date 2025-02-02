<script lang="ts">
    export let pdfUrl: string;
  </script>
  
  <style>
    .pdf-container {
      height: 80vh;
      width: 90%;
      border: 1px solid #ccc;
    }
  </style>
  
  <div class="pdf-container">
    <embed src={pdfUrl} type="application/pdf" width="100%" height="100%" />
  </div>