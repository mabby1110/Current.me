<script lang="ts">
    export let pdfUrl: string;
  </script>
  
  <style>
    .pdf-container {
      width: 100%;
      height: 500px;
      border: 1px solid #ccc;
    }
  </style>
  
  <div class="pdf-container">
    <embed src={pdfUrl} type="application/pdf" width="100%" height="100%" />
  </div>