<script>
    // Avatar.svelte - Ultra simple version
    const { 
      layers = [], // Array of layer objects with path
      width = 40,
      height = 100,
      x = 0,
      y = 0,
      filter = '',
      opacity = 1
    } = $props();
  </script>
  
  <g 
    class="layered-avatar"
    transform="translate({x}, {y})"
    style="opacity: {opacity};"
  >
  
    <!-- Render each layer of the avatar -->
    {#each layers as layer}
      <image
        href={layer.path}
        width={width}
        height={height}
        x={0}
        y={0}
        style="filter: {filter};"
      />
    {/each}
    
  </g>

  
  <style>
    .layered-avatar {
      cursor: pointer;
    }
  </style>