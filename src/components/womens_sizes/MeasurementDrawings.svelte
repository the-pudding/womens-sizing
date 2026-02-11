<script>
    import sizeCharts from "$data/sizeCharts.json"
    import * as d3 from "d3";
    
    // binds the container w and h
    let w = $state();
	  let h = $state();
    
    // filters the data so we're looking at what we want
    const onlyRegularLargeDresses = sizeCharts.filter(
      d => d.alphaSize == "L" 
        && d.sizeRange == "Regular"
        && d.garmentType == "Dresses"
    );
    
    
    // draws the paths
    function createPath(dress, centerX, offsetY) {
  
      // turn into numbers
      const bustMin = parseFloat(dress.bustMin);
      const bustMax = parseFloat(dress.bustMax);
      const waistMin = parseFloat(dress.waistMin);
      const waistMax = parseFloat(dress.waistMax);
      const hipMin = parseFloat(dress.hipMin);
      const hipMax = parseFloat(dress.hipMax);
  
      // svg scale
      const horizontalScale = d3.scaleLinear()
        .domain([30, 50])
        .range([0, w]);
      
      const halfBust = horizontalScale(bustMin) / 2;
      const halfWaist = horizontalScale(waistMin) / 2;
      const halfHip = horizontalScale(hipMin) / 2;
        
      // y offsets, for now bust, waist and top are evenly spaced
      const yBust = offsetY + 0;
      const yWaist = offsetY + h/4;
      const yHip = offsetY + h/2;

      // finds the left and right sides
      const bustLeft = centerX - halfBust;
      const bustRight = centerX + halfBust;
      const waistLeft = centerX - halfWaist;
      const waistRight = centerX + halfWaist;
      const hipLeft = centerX - halfHip;
      const hipRight = centerX + halfHip;
        
      // returns a line path
      return `
        M ${bustLeft} ${yBust}
        C ${bustLeft} ${yBust}, ${waistLeft} ${yWaist}, ${hipLeft} ${yHip}
        L ${hipRight} ${yHip}
        C ${waistRight} ${yWaist}, ${bustRight} ${yBust}, ${bustRight} ${yBust}
        Z
      `;

    }

    function handleMouseOver(dress) {
        console.log(dress)
    }

    $effect(() => {
        console.log("Dimensions:", w, h); 
    })

    //TO-DO
    // Consider vertical scale
    // Consider combining bottoms + tops to have one full measurement like dresses
    // Right now using MIN measurements size that is consistent across data
  </script>
  
  <section id="drawings" bind:clientWidth={w} bind:clientHeight={h}>
    {#if w && h}
      <svg>
        {#each onlyRegularLargeDresses as dress, i}
          <g
            on:mouseover={() => handleMouseOver(dress)}
          >
            <path 
              d={createPath(dress, w / 2, 0)} 
              fill="none" 
              stroke="black" 
              stroke-width="2" />
          </g>
        {/each}
      </svg>
    {/if}
  </section>
  
  <style>
    #drawings {
      width: 100%;
      height: 100svh;
    }
  
    svg {
      width: 100%;
      height: 100%;
    }
  </style>
  