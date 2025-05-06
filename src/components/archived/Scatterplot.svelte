<script>
    import { writable, derived } from 'svelte/store';
    import waistlines from "$data/waistlines.json";
    import sizes from "$data/ASTMsizes.json"
    import { forceSimulation, forceX, forceY, forceCollide } from "d3";
    import * as d3 from "d3";
    // import { getAlphaSizeLabel } from "./helpers/Filters.js"

    // Get dropdown options
    const ASTMYears = [...new Set(sizes.map(d => d.year))];
    const sizeRanges = [...new Set(sizes.map(d => d.sizeRange))];

    // Dropdown selections
    const selectedASTMYear = writable(ASTMYears[0]);
    const selectedSizeRange = writable(sizeRanges[0]);

    // Derived: filtered size labels
    const filteredSizes = derived(
    [selectedASTMYear, selectedSizeRange],
    ([$year, $range]) =>
        sizes
        .filter(d => d.year === $year && d.sizeRange === $range)
        .map(d => ({ waist: +d.waist, alphaSize: d.alphaSize }))
    );

    const sizeLabels = sizes.map(d => ({
        waist: +d.waist,
        alphaSize: d.alphaSize
        }));

        //for flat line scatterplot
        function getAlphaSizeLabel(waistValue, sizeLabels) {
  if (!sizeLabels.length) return '';

  // Find max waist in available ASTM sizes
  const maxWaist = Math.max(...sizeLabels.map(d => d.waist));

  if (waistValue > maxWaist) {
    return "no available size";
  }

  // Otherwise find closest alpha size
  let closest = sizeLabels[0];
  let minDiff = Math.abs(waistValue - closest.waist);

  for (const size of sizeLabels) {
    const diff = Math.abs(waistValue - size.waist);
    if (diff < minDiff) {
      closest = size;
      minDiff = diff;
    }
  }

  return closest.alphaSize;
}

    let svg;
    const width = 600;
    const height = 120;
  
    const yearRanges = [...new Set(waistlines.map(d => d.yearRange))];
    const races = [...new Set(waistlines.map(d => d.race))];
    const ages = [...new Set(waistlines.map(d => d.age))];


  
    // Writable stores for dropdowns
    const selectedYear = writable(yearRanges[0]);
    const selectedRace = writable(races[0]);
    const selectedAge = writable(ages[0]);
  
    // Derived store: get matching row
    const filteredRow = derived(
      [selectedYear, selectedRace, selectedAge],
      ([$year, $race, $age]) => waistlines.find(
        d => d.yearRange === $year && d.race === $race && d.age === $age
      )
    );
  
    // Derived store: build 100-point flatline
    const chartData = derived(filteredRow, row => {
      if (!row) return [];
  
      const percentiles = {
        5: +row.percent5,
        10: +row.percent10,
        15: +row.percent15,
        25: +row.percent25,
        50: +row.percent50,
        75: +row.percent75,
        85: +row.percent85,
        90: +row.percent90,
        95: +row.percent95
      };
  
      const known = Object.entries(percentiles).map(([p, x]) => ({
        index: Math.round((+p / 100) * 99),
        x,
        color: "red"
      }));
  
      known.sort((a, b) => a.index - b.index);
      const total = 100;
      const points = new Array(total);
  
      for (const { index, x } of known) {
        points[index] = { x, y: 1, color: "red" };
      }
  
      for (let i = 0; i < known.length - 1; i++) {
        const a = known[i];
        const b = known[i + 1];
        const steps = b.index - a.index;
  
        for (let j = 1; j < steps; j++) {
          const t = j / steps;
          const x = a.x + t * (b.x - a.x);
          const idx = a.index + j;
          points[idx] = { x, y: 1, color: "blue" };
        }
      }
  
      for (let i = 0; i < known[0].index; i++) {
        const { index: i0, x: x0 } = known[0];
        const { index: i1, x: x1 } = known[1];
        const step = (x1 - x0) / (i1 - i0);
        points[i] = { x: x0 - step * (i0 - i), y: 1, color: "blue" };
      }
  
      for (let i = known.at(-1).index + 1; i < total; i++) {
        const { index: i1, x: x1 } = known.at(-2);
        const { index: i2, x: x2 } = known.at(-1);
        const step = (x2 - x1) / (i2 - i1);
        points[i] = { x: x2 + step * (i - i2), y: 1, color: "blue" };
      }
  
      return points;
    });
  
    // Redraw when chartData changes

filteredSizes.subscribe(sizeLabels => {
  chartData.subscribe(points => {
    if (!svg || !points.length || !sizeLabels.length) return;

    const radius = 4;
    const spacing = 1;
    const jitterAmount = 3; // horizontal jitter for beeswarm feel

    const xScale = d3.scaleLinear().domain([25, 55]).range([40, width - 20]);
    const yScale = d3.scaleLinear().domain([0, 5]).range([height - 20, 20]);
    const baselineY = yScale(1); // y=1 in pixel space

    const svgEl = d3.select(svg);
    svgEl.selectAll("*").remove();

    // === X-Axis Setup with alphaSize / no available size ===
    const tickValues = xScale.ticks(10);
    const maxWaist = Math.max(...sizeLabels.map(d => d.waist));
    const xMax = xScale.domain()[1];
    const validTicks = tickValues.filter(t => t <= maxWaist);
    const midpoint = (maxWaist + xMax) / 2;
    const customTicks = [...validTicks, midpoint];

    svgEl.append("g")
      .attr("transform", `translate(0, ${baselineY + 10})`)
      .call(
        d3.axisBottom(xScale)
          .tickValues(customTicks)
          .tickFormat(t =>
            t === midpoint ? "no available size" : getAlphaSizeLabel(t, sizeLabels)
          )
      );

    // === Baseline Line ===
    svgEl.append("line")
      .attr("x1", xScale(25))
      .attr("x2", xScale(55))
      .attr("y1", baselineY)
      .attr("y2", baselineY)
      .attr("stroke", "#aaa")
      .attr("stroke-dasharray", "3 3");

    // === Positioning: Collision Avoidance with Jitter ===
    const placedPoints = [];

    points.forEach(point => {
      point.fx = xScale(point.x);

      if (point.color === "red") {
        point.fy = baselineY;
        placedPoints.push(point);
        return;
      }

      // Try to place at baseline, stack upward if overlapping
      let y = baselineY;
      let hasCollision = true;

      while (hasCollision) {
        hasCollision = false;

        for (const other of placedPoints) {
          const dx = point.fx - other.fx;
          const dy = y - other.fy;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < radius * 2 + spacing) {
            hasCollision = true;
            break;
          }
        }

        if (hasCollision) {
          y -= radius * 2 + spacing;
        }
      }

      point.fy = y;

      // ✅ Apply horizontal jitter for beeswarm look
      point.fx += (Math.random() - 0.5) * jitterAmount;

      placedPoints.push(point);
    });

    // === Draw Points ===
    svgEl.selectAll("circle")
      .data(points)
      .enter()
      .append("circle")
      .attr("cx", d => d.fx)
      .attr("cy", d => d.fy)
      .attr("r", radius)
      .attr("fill", d => d.color);
  });
});






  </script>
  
  <!-- Filters -->
  <div class="controls" style="margin-bottom: 1rem;">
    <label>
      Year Range:
      <select on:change={(e) => selectedYear.set(e.target.value)}>
        {#each yearRanges as y}
          <option>{y}</option>
        {/each}
      </select>
    </label>
  
    <label>
      Race:
      <select on:change={(e) => selectedRace.set(e.target.value)}>
        {#each races as r}
          <option>{r}</option>
        {/each}
      </select>
    </label>
  
    <label>
      Age:
      <select on:change={(e) => selectedAge.set(e.target.value)}>
        {#each ages as a}
          <option>{a}</option>
        {/each}
      </select>
    </label>
    <label>
        ASTM Year:
        <select on:change={(e) => selectedASTMYear.set(e.target.value)}>
          {#each ASTMYears as y}
            <option>{y}</option>
          {/each}
        </select>
      </label>
      
      <label>
        Size Range:
        <select on:change={(e) => selectedSizeRange.set(e.target.value)}>
          {#each sizeRanges as r}
            <option>{r}</option>
          {/each}
        </select>
      </label>
  </div>

  
  <svg bind:this={svg} width={width} height={height}></svg>
  