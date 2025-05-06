<!-- 
  WaistlineBeeswarm.svelte - Main container component for the waistline visualization
-->

<script>
    import { onMount } from 'svelte';
    import WaistlineChart from './WaistlineChart.svelte';
    import { filterDataByDemographics, getUniqueValues } from './utils/dataUtils.js';
    
    // Import waistlines data directly
    import waistlinesData from '$data/waistlines.json';
    
    // State for filters
    let selectedYear = "2015-2018";
    let selectedRace = "all";
    let selectedAge = "10";
    
    // Available filter options (will be populated from data)
    let yearOptions = [];
    let raceOptions = [];
    let ageOptions = [];
    
    // State for chart customization
    let chartWidth = 800;
    let chartHeight = 400;
    let dotRadius = 6;
    let overlapFactor = 0.1;
    
    // Chart colors
    const chartColors = {
      dots: '#4682b4',
      percentileLines: '#999',
      medianLine: '#e41a1c',
      axes: '#333'
    };
    
    // Process data when component mounts
    onMount(() => {
      // If data is a single object, wrap it in an array
      const dataArray = Array.isArray(waistlinesData) ? waistlinesData : [waistlinesData];
      
      // Extract filter options
      yearOptions = getUniqueValues(dataArray, 'yearRange');
      raceOptions = getUniqueValues(dataArray, 'race');
      ageOptions = getUniqueValues(dataArray, 'age');
      
      // Set default selections to the first available option
      if (yearOptions.length > 0) selectedYear = yearOptions[0];
      if (raceOptions.length > 0) selectedRace = raceOptions[0];
      if (ageOptions.length > 0) selectedAge = ageOptions[0];
    });
    
    // Filter data based on selections
    let filteredData = $derived(waistlinesData ? 
      filterDataByDemographics(
        Array.isArray(waistlinesData) ? waistlinesData : [waistlinesData], 
        { yearRange: selectedYear, race: selectedRace, age: selectedAge }
      ) : null);
    
    // Function to handle customize chart appearance
    function updateChartSettings() {
      // This function can be expanded to save settings or apply more complex changes
      console.log('Chart settings updated');
    }
  </script>
  
  <main>
    <h1>Waistline Distribution Visualization</h1>
    
    <div class="filters">
      <div class="filter-group">
        <label for="year-select">Year Range:</label>
        <select id="year-select" bind:value={selectedYear}>
          {#each yearOptions as year}
            <option value={year}>{year}</option>
          {/each}
        </select>
      </div>
      
      <div class="filter-group">
        <label for="race-select">Race/Ethnicity:</label>
        <select id="race-select" bind:value={selectedRace}>
          {#each raceOptions as race}
            <option value={race}>{race === 'all' ? 'All Races' : race}</option>
          {/each}
        </select>
      </div>
      
      <div class="filter-group">
        <label for="age-select">Age Group:</label>
        <select id="age-select" bind:value={selectedAge}>
          {#each ageOptions as age}
            <option value={age}>{age} years</option>
          {/each}
        </select>
      </div>
    </div>
    
    <div class="chart-container">
      {#if filteredData}
        <WaistlineChart
          stats={filteredData}
          width={chartWidth}
          height={chartHeight}
          radius={dotRadius}
          colors={chartColors}
          overlapFactor={overlapFactor}
          title="Waistline Distribution by Percentile"
          xAxisLabel="Waistline (cm)"
          xRange={[20, 50]}
        />
      {:else}
        <p>No data available for the selected filters.</p>
      {/if}
    </div>
    
    <div class="chart-controls">
      <h3>Chart Customization</h3>
      <div class="control-group">
        <label for="chart-width">Width:</label>
        <input type="range" id="chart-width" bind:value={chartWidth} min="400" max="1200" step="50">
        <span>{chartWidth}px</span>
      </div>
      
      <div class="control-group">
        <label for="chart-height">Height:</label>
        <input type="range" id="chart-height" bind:value={chartHeight} min="200" max="800" step="50">
        <span>{chartHeight}px</span>
      </div>
      
      <div class="control-group">
        <label for="dot-radius">Dot Size:</label>
        <input type="range" id="dot-radius" bind:value={dotRadius} min="2" max="12" step="1">
        <span>{dotRadius}px</span>
      </div>
      
      <div class="control-group">
        <label for="overlap-factor">Overlap:</label>
        <input type="range" id="overlap-factor" bind:value={overlapFactor} min="0" max="0.5" step="0.05">
        <span>{Math.round(overlapFactor * 100)}%</span>
      </div>
      
      <button on:click={updateChartSettings}>Apply Settings</button>
    </div>
    
    <div class="info-panel">
      <h3>About This Visualization</h3>
      <p>
        This beeswarm chart displays waistline measurement distribution based on
        percentile data. Each dot represents an individual data point, with the
        distribution matching the percentile statistics from the dataset.
      </p>
      <p>
        Vertical lines indicate key percentiles (5th, 10th, 25th, 50th, 75th, 90th, 95th),
        with the median (50th percentile) highlighted in red.
      </p>
    </div>
  </main>
  
  <style>
    main {
      padding: 1rem;
      max-width: 1200px;
      margin: 0 auto;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    
    h1 {
      color: #333;
      text-align: center;
      margin-bottom: 2rem;
    }
    
    .filters {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-bottom: 1.5rem;
      padding: 1rem;
      background-color: #f9f9f9;
      border-radius: 8px;
    }
    
    .filter-group {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .filter-group label {
      font-weight: bold;
      min-width: 120px;
    }
    
    .filter-group select {
      padding: 0.5rem;
      border-radius: 4px;
      border: 1px solid #ddd;
    }
    
    .chart-container {
      margin: 2rem 0;
      border: 1px solid #eee;
      border-radius: 8px;
      padding: 1rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    
    .chart-controls {
      margin: 2rem 0;
      padding: 1rem;
      background-color: #f9f9f9;
      border-radius: 8px;
    }
    
    .control-group {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
      gap: 1rem;
    }
    
    .control-group label {
      min-width: 100px;
      font-weight: bold;
    }
    
    .control-group input[type="range"] {
      flex: 1;
    }
    
    .control-group span {
      min-width: 60px;
      text-align: right;
    }
    
    button {
      background-color: #4682b4;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
    }
    
    button:hover {
      background-color: #36648b;
    }
    
    .info-panel {
      background-color: #f9f9f9;
      padding: 1rem;
      border-radius: 8px;
      margin-top: 2rem;
    }
    
    @media (max-width: 768px) {
      .filters {
        flex-direction: column;
      }
      
      .filter-group {
        width: 100%;
      }
    }
  </style>