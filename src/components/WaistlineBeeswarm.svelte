<!-- 
  WaistlineBeeswarm.svelte - Main container component for the waistline visualization
-->

<script>
    import { onMount } from 'svelte';
    import WaistlineChart from './WaistlineChart.svelte';
    
    // Import waistlines data directly
    import waistlinesData from '../data/waistlines.json';
    
    // Use the data directly - no filtering for now
    let chartData = $state(null);
    let ready = $state(false);
    
    // Process data when component mounts
    onMount(() => {
      // If data is a single object, use it as is
      chartData = Array.isArray(waistlinesData) ? waistlinesData[0] : waistlinesData;
      ready = true;
    });
  </script>
  
  <main>
    <h1>Waistline Distribution Visualization</h1>
    
    <div class="chart-container">
      {#if ready && chartData}
        <WaistlineChart
          stats={chartData}
          width={800}
          height={300}
          title="Waistline Distribution by Percentile"
          xAxisLabel="Waistline (cm)"
        />
      {:else}
        <p>Loading waistline data...</p>
      {/if}
    </div>
    
    <div class="info-panel">
      <h3>About This Visualization</h3>
      <p>
        This chart displays waistline measurement distribution based on
        percentile data. Each blue dot represents an individual data point, with the
        distribution matching the percentile statistics from the dataset.
      </p>
      <p>
        The red dots indicate key percentiles (5th, 10th, 25th, 50th, 75th, 90th, 95th).
      </p>
    </div>
  </main>
  
  <style>
    main {
      padding: 1rem;
      max-width: 900px;
      margin: 0 auto;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    
    h1 {
      color: #333;
      text-align: center;
      margin-bottom: 2rem;
    }
    
    .chart-container {
      margin: 2rem 0;
      border: 1px solid #eee;
      border-radius: 8px;
      padding: 1rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    
    .info-panel {
      background-color: #f9f9f9;
      padding: 1rem;
      border-radius: 8px;
      margin-top: 2rem;
    }
  </style>