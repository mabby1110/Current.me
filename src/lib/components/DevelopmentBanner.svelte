<script lang="ts">
    export let showBanner = true;
    export let message = "🚧 This page is under development. Some features might be incomplete.";
  </script>
  
  {#if showBanner}
    <div class="development-banner" role="alert">
      <div class="banner-content">
        <span>{message}</span>
        <button 
          class="close-button" 
          on:click={() => showBanner = false}
          aria-label="Cerrar banner"
        >
          ×
        </button>
      </div>
    </div>
  {/if}
  
  <style>
    .development-banner {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: #fff3cd;
      border-bottom: 1px solid #ffeeba;
      color: #856404;
      z-index: 1000;
      padding: 0.75rem;
      font-size: 0.875rem;
      text-align: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
  
    .banner-content {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
    }
  
    .close-button {
      background: none;
      border: none;
      color: inherit;
      cursor: pointer;
      padding: 0 0.5rem;
      font-size: 1.25rem;
      line-height: 1;
      opacity: 0.7;
      transition: opacity 0.2s;
    }
  
    .close-button:hover {
      opacity: 1;
    }
  
    /* Ajusta el contenido principal para que no se oculte detrás del banner */
    :global(body) {
      padding-top: 3rem;
    }
  </style>