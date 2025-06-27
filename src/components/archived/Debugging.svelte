<script>
    import { onMount } from 'svelte';
    
    // Fixed avatar paths - no utility function
    const avatarLayers = [
      '/assets/avatars/2-base-1.png',
      '/assets/avatars/2-hair-1.png',
      '/assets/avatars/2-bottom-1.png',
      '/assets/avatars/2-top-1.png'
    ];
    
    let mounted = $state(false);
    
    onMount(() => {
      mounted = true;
      console.log("Component mounted");
      
      // Test with direct DOM manipulation
      setTimeout(() => {
        const container = document.getElementById('direct-container');
        if (container) {
          const div = document.createElement('div');
          div.className = 'direct-avatar';
          div.style.position = 'relative';
          div.style.width = '40px';
          div.style.height = '100px';
          
          avatarLayers.forEach(path => {
            const img = document.createElement('img');
            img.src = path;
            img.alt = 'Avatar layer';
            img.className = 'direct-layer';
            img.style.position = 'absolute';
            img.style.top = '0';
            img.style.left = '0';
            img.style.width = '100%';
            img.style.height = '100%';
            div.appendChild(img);
          });
          
          container.appendChild(div);
          console.log("Direct DOM manipulation completed");
        }
      }, 100);
    });
  </script>
  
  <div class="minimal-test">
    <h2>Minimal Avatar Test</h2>
    
    <div class="test-section">
      <h3>1. Direct URL Test</h3>
      <div class="image-test">
        <img src="/assets/avatars/2-base-1.png" alt="Base layer test" class="test-image">
        <div class="result">
          {#if mounted}
            <span class="check">✓</span>
          {:else}
            <span class="loading">Loading...</span>
          {/if}
        </div>
      </div>
    </div>
    
    <div class="test-section">
      <h3>2. Svelte HTML Avatar</h3>
      <div class="html-avatar">
        {#if mounted}
          {#each avatarLayers as layer}
            <img src={layer} alt="Avatar layer" class="layer-image">
          {/each}
        {/if}
      </div>
    </div>
    
    <div class="test-section">
      <h3>3. Direct DOM Manipulation</h3>
      <div id="direct-container" class="direct-container"></div>
    </div>
    
    <div class="test-section">
      <h3>4. Raw Image Elements</h3>
      <div class="raw-images">
        {#each avatarLayers as layer, i}
          <div class="raw-image-test">
            <div class="label">Layer {i+1}:</div>
            <div class="path"><code>{layer}</code></div>
            <div class="preview">
              <img src={layer} width="20" height="20" alt={`Layer ${i+1}`}>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
  
  <style>
    .minimal-test {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
      background-color: white;
      font-family: system-ui, sans-serif;
    }
    
    h2, h3 {
      margin-top: 0;
    }
    
    .test-section {
      margin-bottom: 30px;
      padding: 15px;
      border: 1px solid #eee;
      border-radius: 4px;
      background-color: #f9f9f9;
    }
    
    .image-test {
      display: flex;
      align-items: center;
      gap: 20px;
    }
    
    .test-image {
      width: 40px;
      height: 100px;
      border: 1px dashed #ccc;
      background-color: #fff;
    }
    
    .result {
      font-weight: bold;
    }
    
    .check {
      color: green;
    }
    
    .loading {
      color: #666;
    }
    
    .html-avatar {
      position: relative;
      width: 40px;
      height: 100px;
      border: 1px dashed #ccc;
      background-color: #fff;
    }
    
    .layer-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    
    .direct-container {
      min-height: 100px;
      border: 1px dashed #ccc;
      background-color: #fff;
      padding: 10px;
    }
    
    .raw-images {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    
    .raw-image-test {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .label {
      width: 60px;
      font-weight: bold;
    }
    
    .path {
      flex: 1;
    }
    
    code {
      font-family: monospace;
      background-color: #eee;
      padding: 2px 4px;
      border-radius: 3px;
      font-size: 12px;
    }
    
    .preview {
      width: 30px;
      height: 30px;
      background-color: #fff;
      border: 1px solid #ddd;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 3px;
    }
    
    .preview img {
      max-width: 100%;
      max-height: 100%;
    }
    
    /* Styles for direct DOM manipulation */
    :global(.direct-layer) {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    
    :global(.direct-avatar) {
      position: relative;
      width: 40px;
      height: 100px;
      background-color: transparent;
    }
  </style>