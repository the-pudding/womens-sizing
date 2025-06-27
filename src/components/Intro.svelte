<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
    import generatedPercentiles from '../data/generatedPercentiles.json';
    import ASTMsizes from "../data/ASTMsizes.json";
    import copy from "../data/copy.json";
    
    import { generateRandomAvatar } from './utils/avatar-generator.js';
    import Scrolly from './helpers/Scrolly.svelte';
  
    let containerHeight = $state(0);
    let containerWidth = $state(0);
    let margin = { top: 40, right: 10, bottom: 10, left: 10 };
    let width = $derived(containerWidth - margin.left - margin.right);
    let height = $derived(containerHeight - margin.top - margin.bottom);
    
    let value = $state(0);
    let svg;
    let filteredData = null;
    let ASTMfilter = null;
    let currentSizeRanges = [];
    
    let yearRange = $state("2015-2018");
    let race = $state("all");
    let age = $state("11");
    let ASTMyear = $state("2015");
    let ASTMrange = $state("junior");
    let sizeBands = $state("");
    let avatarStyle = $state("color")
    let avatarDisplay = $state("all");
    let highlightedPercentile = $state(50);
    let sizeType = $state("alpha");
    let bandColor = $state("");
    let highlightBand = $state("");
    let highlightBandColor = $state("");
    let sizeBandRendered = false;
    let avatarsRendered = false;
    let isUpdating = false;
    
    // =============================================================================
    // DATA PROCESSING FUNCTIONS
    // =============================================================================
    
    /** * Filters percentile data based on date/age/race */
    function filterPercentileData(criteria) {
      return generatedPercentiles.find(item => 
        item.yearRange === criteria.yearRange &&
        item.race === criteria.race &&
        item.age === criteria.age
      ) || null;
    }

    /** * Filters and finds corresponding ASTM size for each waistline measurement */
    function filterAndProcessASTMData(criteria) {
      const filter = ASTMsizes.find(item => 
        item.year === criteria.year &&
        item.sizeRange === criteria.sizeRange
      ) || null;
      
      if (!filter) return { filter: null, currentSizeRanges: [] };
      
      const filteredData = ASTMsizes.filter(item => 
        item.year === criteria.year &&
        item.sizeRange === criteria.sizeRange
      );
      
      const sizeRanges = processSizeData(filteredData, criteria);
      
      return { filter, currentSizeRanges: sizeRanges };
    }

    /** Process size data to determine alpha vs. numeric size ranges  */
    function processSizeData(filteredASTM, criteria) {
        if (!filteredASTM || filteredASTM.length === 0) return [];
        
        // Handle empty sizeBands 
        if (!criteria.sizeBands || criteria.sizeBands.trim() === '') return [];
        
        const sizesToInclude = criteria.sizeBands.split(',').map(s => s.trim()).filter(s => s);
        const isNumeric = criteria.sizeType === 'numeric';
        
        // Process highlight band sizes (if provided)
        const highlightSizesToInclude = criteria.highlightBand && criteria.highlightBand.trim() !== '' 
            ? criteria.highlightBand.split(',').map(s => s.trim()).filter(s => s)
            : [];
        
        const sizeGroups = {};
        filteredASTM.forEach(item => {
            const size = isNumeric ? item.size : item.alphaSize;
            if (!size) return;
            
            if (!sizeGroups[size]) {
                sizeGroups[size] = [];
            }
            sizeGroups[size].push(parseFloat(item.waist));
        });
        
        const sizeData = {};
        Object.keys(sizeGroups).forEach(size => {
            if (sizeGroups[size].length === 0) return;
            sizeData[size] = {
                min: Math.min(...sizeGroups[size]),
                max: Math.max(...sizeGroups[size]),
                size: size
            };
        });
        
        const sortedSizes = isNumeric 
            ? sortNumericSizes(Object.keys(sizeData)).map(size => sizeData[size]).filter(Boolean)
            : ["XXS", "XS", "S", "M", "L", "XL", "XXL"].filter(size => sizeData[size]).map(size => sizeData[size]);
        
        if (sortedSizes.length === 0) return [];
        
        const ranges = sortedSizes.map((currentSize, i) => {
            let rangeMin, rangeMax;
            
            if (i === 0) {
                rangeMin = currentSize.min - 1;
            } else {
                rangeMin = (currentSize.min + sortedSizes[i-1].max) / 2;
            }
            
            if (i === sortedSizes.length - 1) {
                rangeMax = currentSize.max + 1;
            } else {
                rangeMax = (currentSize.max + sortedSizes[i+1].min) / 2;
            }
            
            return {
                size: currentSize.size,
                min: rangeMin,
                max: rangeMax,
                index: i
            };
        });
        
        // Filter ranges for regular bands (this is your main set of ranges)
        const filteredRanges = ranges.filter(range => sizesToInclude.includes(range.size));
        
        // Apply regular band colors to all ranges
        applySizeColors(filteredRanges, criteria.bandColor);
        
        // For ranges that should also have highlights, add highlight properties
        filteredRanges.forEach(range => {
            if (highlightSizesToInclude.includes(range.size)) {
                // Add highlight properties to this existing range
                addHighlightProperties(range, criteria.highlightBandColor, highlightSizesToInclude);
            } else {
                // Clear highlight properties if this range shouldn't be highlighted
                range.hasHighlight = false;
                delete range.highlightColor;
                delete range.highlightOpacity;
            }
        });
        
        return filteredRanges;
    }

    function addHighlightProperties(range, highlightColor, highlightSizes) {
        if (!highlightColor) return;
        
        // Find the index of this range within the highlight sizes for gradient calculation
        const highlightIndex = highlightSizes.indexOf(range.size);
        const centerIndex = Math.floor(highlightSizes.length / 2);
        const maxDistance = Math.max(centerIndex, highlightSizes.length - 1 - centerIndex);
        
        const distance = Math.abs(highlightIndex - centerIndex);
        const opacity = 1 - (distance / maxDistance) * 0.7;
        
        // Define color mapping for gradient options
        const gradientColorMap = {
            "green": "#C2D932",
            "purple": "#B57BDC", 
            "orange": "#D96F32",
            "blue": "#9ABBD9"
        };
        
        if (highlightColor === "gradient" || gradientColorMap[highlightColor]) {
            // Use gradient effect with appropriate color
            range.highlightColor = highlightColor === "gradient" ? "#C2D932" : gradientColorMap[highlightColor];
            range.highlightOpacity = opacity;
        } else {
            // Default behavior for other colors
            range.highlightColor = highlightColor;
            range.highlightOpacity = 0.3;
        }
        
        range.hasHighlight = true;
    }

    function sortNumericSizes(sizes) {
      return sizes
        .map(size => ({
          size,
          numValue: parseInt(size.replace(/\D/g, ''), 10)
        }))
        .filter(item => !isNaN(item.numValue))
        .sort((a, b) => a.numValue - b.numValue)
        .map(item => item.size);
    }

    /** Apply color gradient to size ranges */
    function applySizeColors(ranges, baseColor) {
        if (!ranges || ranges.length === 0) return;
        
        const centerIndex = Math.floor(ranges.length / 2);
        const maxDistance = Math.max(centerIndex, ranges.length - 1 - centerIndex);
        
        // Define color mapping for gradient options
        const gradientColorMap = {
            "green": "#C2D932",
            "purple": "#B57BDC", 
            "orange": "#D96F32",
            "blue": "#9ABBD9"
        };
        
        ranges.forEach((range, index) => {
            const distance = Math.abs(index - centerIndex);
            const opacity = 1 - (distance / maxDistance) * 0.9;
            
            if (baseColor === "gradient" || gradientColorMap[baseColor]) {
                // Use gradient effect with appropriate color
                range.color = baseColor === "gradient" ? "#C2D932" : gradientColorMap[baseColor];
                range.opacity = opacity;
            } else if (baseColor) {
                // Default behavior for other colors
                range.color = baseColor;
                range.opacity = 0.1;
            }
        });
    }
    
    // =============================================================================
    // DATA GENERATION FUNCTIONS
    // =============================================================================

    /** Create data points from percentile data */
    function createDataPoints(data) {
      if (!data) return [];
      
      const points = [];
      for (let percentile = 1; percentile <= 100; percentile++) {
        const value = parseFloat(data[`percent${percentile}`]);
        if (!isNaN(value)) {
          points.push({
            id: `p${percentile}`,
            value: value,
            percentile: percentile,
            avatar: generateRandomAvatar('small')
          });
        }
      }
      return points;
    }
    
    function positionAvatars(points, xScale, innerWidth, innerHeight) {
        const baseSize = Math.min(innerWidth, innerHeight);
        const avatarHeight = Math.max(90, baseSize * 0.18);
        const avatarWidth = avatarHeight * 0.6;
        
        const aspectRatio = innerWidth / innerHeight;
        const isMobile = innerWidth < 600;
        
        // Calculate spread factor with limits
        let spreadFactor;
        if (isMobile) {
            // On mobile, use aspect ratio to determine spread
            // Portrait (tall screens) get less vertical spread
            spreadFactor = Math.min(2.0, Math.max(1.1, 2.0 - aspectRatio));
        } else {
            // Desktop gets minimal spread
            spreadFactor = 1.4;
        }
        
        // Limit vertical distribution zone - don't use full height
        const verticalZone = Math.min(innerHeight * 0.7, avatarHeight * 8); // Max 70% of height or 8 avatar heights
        const centerY = innerHeight * 0.5;
        const minY = centerY - verticalZone / 2;
        const maxY = centerY + verticalZone / 2;
        
        const simulation = d3.forceSimulation(points)
            .force('x', d3.forceX(d => xScale(d.value)).strength(1.0)) // locked on x-axis
            
            // Regular y-force for all avatars - stronger to keep them more centered
            .force('y', d3.forceY(centerY).strength(0.15))
            
            // Special force for highlighted percentile
            .force('yHighlight', d3.forceY(d => {
                if (d.percentile === highlightedPercentile) {
                    return centerY; 
                }
                return d.y; 
            }).strength(d => d.percentile === highlightedPercentile ? 0.4 : 0))
            
            .force('collide', d3.forceCollide(d => {
                const baseRadius = avatarHeight / 6; 
                const spreadRadius = baseRadius * Math.min(spreadFactor, 1.8); // Cap the spread
                return d.percentile === highlightedPercentile ? spreadRadius * 1.2 : spreadRadius;
            }).strength(0.12)); // Slightly stronger collision
        
        // Run simulation
        for (let i = 0; i < 300; ++i) {
            simulation.tick();
        }
        
        // Ensure positions exist and constrain to reasonable zone
        points.forEach(point => {
            if (!point.x) point.x = xScale(point.value);
            if (!point.y) point.y = centerY;
            
            // FORCE x position to be exactly at data value
            point.x = xScale(point.value);
            
            // Constrain to vertical zone first
            point.y = Math.max(minY, Math.min(maxY, point.y));
            
            // For highlighted percentile, bias toward center
            if (point.percentile === highlightedPercentile) {
                const currentDistance = Math.abs(point.y - centerY);
                const maxDistance = avatarHeight * 0.6; // Tighter constraint
                
                if (currentDistance > maxDistance) {
                    point.y = centerY + (point.y > centerY ? maxDistance : -maxDistance);
                }
            }
            
            // Final bounds checking - but this should rarely trigger now
            point.y = Math.max(avatarHeight/2, Math.min(innerHeight - avatarHeight/2, point.y));
        });
        
        return { avatarWidth, avatarHeight };
    }
    
    // =============================================================================
    // CHART RENDERING FUNCTIONS
    // =============================================================================
    
    /** Renders size bands in the chart */
    function renderSizeBands(selection, xScale, innerHeight) {
        const shouldShowBands = sizeBands && sizeBands.trim() !== "" && currentSizeRanges && currentSizeRanges.length > 0;
        
        if (!shouldShowBands) {
            selection.selectAll('.size-band').remove();
            selection.selectAll('.size-band-highlight').remove();
            selection.selectAll('.size-band-text').remove();
            sizeBandRendered = false;
            return;
        }
        
        // REGULAR BANDS
        const rects = selection.selectAll('.size-band')
            .data(currentSizeRanges, d => d.size); // Use size as key for consistent binding
        
        rects.exit().remove();
        
        // ENTER: Add new elements
        const newRects = rects.enter()
            .append('rect')
            .attr('class', d => `size-band size-${d.size}`)
            .attr('y', 0)
            .attr('opacity', 0); // Start invisible for smooth entrance
        
        // UPDATE: Merge enter and update selections, then animate
        newRects.merge(rects)
            .transition()
            .duration(sizeBandRendered ? 750 : 0) // No animation on first render
            .attr('x', d => xScale(d.min))
            .attr('width', d => xScale(d.max) - xScale(d.min))
            .attr('height', innerHeight)
            .attr('fill', d => d.color)
            .attr('opacity', d => d.opacity);
        
        // HIGHLIGHT BANDS (rendered as outlines only if highlightBand exists)
        // Only show highlight outlines if highlightBand is not empty
        const shouldShowHighlights = highlightBand && highlightBand.trim() !== "";
        
        if (!shouldShowHighlights) {
            // If no highlights should be shown, remove all highlight elements
            selection.selectAll('.size-band-highlight').remove();
        } else {
            // Show highlights for ranges that have them
            const highlightRanges = currentSizeRanges.filter(d => d.hasHighlight);
            
            const highlightRects = selection.selectAll('.size-band-highlight')
                .data(highlightRanges, d => d.size);
            
            // EXIT: Remove old highlight elements
            highlightRects.exit().remove();
            
            // ENTER: Add new highlight elements (as outlines only)
            const newHighlightRects = highlightRects.enter()
                .append('rect')
                .attr('class', d => `size-band-highlight size-${d.size}-highlight`)
                .attr('y', 0)
                .attr('opacity', 0); // Start invisible
            
            // UPDATE: Merge enter and update selections, then animate
            newHighlightRects.merge(highlightRects)
                .transition()
                .duration(sizeBandRendered ? 750 : 0)
                .attr('x', d => xScale(d.min))
                .attr('width', d => xScale(d.max) - xScale(d.min))
                .attr('height', innerHeight)
                .attr('fill', 'none') // No fill - outline only
                .attr('stroke', d => d.highlightColor)
                .attr('stroke-width', 3)
                .attr('opacity', d => d.highlightOpacity);
        }
        
        // TEXT LABELS
        const texts = selection.selectAll('.size-band-text')
            .data(currentSizeRanges, d => d.size);
        
        texts.exit().remove();
        
        const newTexts = texts.enter()
            .append('text')
            .attr('class', d => `size-band-text size-${d.size}`)
            .attr('text-anchor', 'middle')
            .attr('font-size', '16px')
            .attr('font-weight', 'bold')
            .attr('fill', 'rgba(0,0,0,0.3)')
            .attr('opacity', 0); // Start invisible
        
     
        newTexts.merge(texts)
            .text(d => d.size)
            .transition()
            .duration(sizeBandRendered ? 750 : 0) // No animation on first render
            .attr('x', d => xScale(d.min) + (xScale(d.max) - xScale(d.min)) / 2)
            .attr('y', innerHeight - 10)
            .attr('opacity', 1);
        
        sizeBandRendered = true;
    }

    /** Renders axes for the chart */
    function renderAxes(selection, xScale, innerHeight) {
        selection.append('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0, ${innerHeight})`)
            .call(d3.axisBottom(xScale).tickSize(15).ticks(30).tickFormat(''));
        
        const xAxisLabels = selection.append('g')
            .attr('class', 'x-axis-labels')
            .attr('transform', `translate(0, ${innerHeight})`)
            .call(d3.axisBottom(xScale).tickSize(30).ticks(10));
        
        xAxisLabels.selectAll('text')
            .style('font-size', '12px')
            .attr('dy', '1.2em');
        }

    /** Renders metadata above the chart */
    function renderMetadata(selection, innerWidth) {
        if (!filteredData || !ASTMfilter) return;
        
        const metadataText = `Age: ${filteredData.age}, Size Range: ${ASTMfilter.sizeRange}`;
        
        selection.append('text')
            .attr('class', 'metadata')
            .attr('x', innerWidth)
            .attr('y', -1)
            .attr('text-anchor', 'end')
            .style('font-size', '14px')
            .text(metadataText);
    }

    function renderAvatars(selection, points, avatarWidth, avatarHeight) {
        if (!points || points.length === 0) {
            selection.selectAll('.avatar-group').remove();
            avatarsRendered = false;
            return;
        }
        
        // Sort points for proper z-order (higher y values in front)
        const sortedPoints = [...points].sort((a, b) => a.y - b.y);
        
        // Helper function to determine target opacity
        const getTargetOpacity = (point) => {
            // Highlighted percentile always gets full opacity
            if (point.percentile === highlightedPercentile) {
                return 1;
            }
            
            // For non-highlighted points
            if (avatarDisplay === "percentile-only") {
                return 0; // Hide all except highlighted percentile
            } else if (avatarDisplay === "all") {
                return 1; // Show all avatars
            }
            
            return 1; // Default full opacity
        };
        
        // Helper function to get filter style - takes point parameter
        const getImageFilter = (point) => {
            // Highlighted percentile always gets color (no filter)
            if (point.percentile === highlightedPercentile) {
                return "none";
            }
            
            // For non-highlighted points, check avatarStyle
            if (avatarStyle === "greyscale") {
                return "grayscale(100%)";
            }
            
            return "none"; // Default no filter (color)
        };
        
        // Update existing images if style changed
        if (avatarsRendered) {
            selection.selectAll('.avatar-group').each(function() {
                const group = d3.select(this);
                const dataId = group.attr('data-id');
                
                // Find the corresponding point to get correct filter and opacity
                const point = sortedPoints.find(p => (p.id || `${p.x},${p.y}`) === dataId);
                if (point) {
                    // Update filter for all images in this group
                    group.selectAll('image')
                        .style('filter', getImageFilter(point));
                        
                    // Update opacity based on new avatarDisplay setting
                    group.transition()
                        .duration(300)
                        .attr('opacity', getTargetOpacity(point));
                }
            });
        }
        
        if (!avatarsRendered) {
            // First render - create all avatars in sorted order
            sortedPoints.forEach(point => {
            const avatarGroup = selection.append('g')
                .attr('class', 'avatar-group')
                .attr('data-id', point.id || `${point.x},${point.y}`)
                .attr('transform', `translate(${point.x - avatarWidth/2}, ${point.y - avatarHeight/2})`)
                .attr('opacity', getTargetOpacity(point));
            
            point.avatar.layers.forEach(layer => {
                avatarGroup.append('image')
                .attr('href', layer.path)
                .attr('width', avatarWidth)
                .attr('height', avatarHeight)
                .attr('x', 0)
                .attr('y', 0)
                .style('filter', getImageFilter(point));
            });
            });
            avatarsRendered = true;
        } else {
            // Animate positions with reordering halfway through
            sortedPoints.forEach(point => {
            const pointId = point.id || `${point.x},${point.y}`;
            const existingGroup = selection.select(`.avatar-group[data-id="${pointId}"]`);
            const targetOpacity = getTargetOpacity(point);
            
            if (!existingGroup.empty()) {
                // First half: fade to 0.8 opacity (or target opacity if it's 0) and move partway
                const midOpacity = targetOpacity === 0 ? 0 : 1;
                
                existingGroup
                .transition()
                .duration(500) // First half of animation
                .ease(d3.easeLinear)
                .attr('opacity', midOpacity)
                .on('end', function() {
                    // Halfway point: raise element (reorder DOM)
                    const element = d3.select(this);
                    element.raise();
                    
                    // Second half: complete movement and set final opacity
                    element
                    .transition()
                    .duration(500) // Second half of animation
                    .ease(d3.easeLinear)
                    .attr('transform', `translate(${point.x - avatarWidth/2}, ${point.y - avatarHeight/2})`)
                    .attr('opacity', targetOpacity);
                });
            } else {
                // Create new avatar
                const avatarGroup = selection.append('g')
                .attr('class', 'avatar-group')
                .attr('data-id', pointId)
                .attr('transform', `translate(${point.x - avatarWidth/2}, ${point.y - avatarHeight/2})`)
                .attr('opacity', 0);
                
                point.avatar.layers.forEach(layer => {
                avatarGroup.append('image')
                    .attr('href', layer.path)
                    .attr('width', avatarWidth)
                    .attr('height', avatarHeight)
                    .attr('x', 0)
                    .attr('y', 0)
                    .style('filter', getImageFilter(point));
                });
                
                // Fade in new avatar to target opacity
                avatarGroup.transition()
                .duration(1000)
                .ease(d3.easeLinear)
                .attr('opacity', targetOpacity);
            }
            });
            
            // Remove avatars that are no longer in the data
            const currentIds = new Set(sortedPoints.map(p => p.id || `${p.x},${p.y}`));
            selection.selectAll('.avatar-group').each(function() {
            const id = d3.select(this).attr('data-id');
            if (!currentIds.has(id)) {
                d3.select(this).remove();
            }
            });
        }
    }
        
    // =============================================================================
    // MAIN COMPONENT LOGIC
    // =============================================================================
    
    // Update settings when scroll position changes
    $effect(() => {
        const stage = copy?.scrolly1?.[value];
        if (!stage) return;
        
        if (stage.yearRange) yearRange = stage.yearRange;
        if (stage.race) race = stage.race;
        if (stage.age) age = stage.age;
        if (stage.year) ASTMyear = stage.year;
        if (stage.sizeRange) ASTMrange = stage.sizeRange;
        if (stage.sizeBands) sizeBands = stage.sizeBands;
        if (stage.avatarStyle) avatarStyle = stage.avatarStyle;
        if (stage.avatarDisplay) avatarDisplay = stage.avatarDisplay;
        
        if (stage.highlightedPercentile !== undefined) {
            highlightedPercentile = parseInt(stage.highlightedPercentile);
        }
        
        if (stage.sizeType) sizeType = stage.sizeType;
        if (stage.bandColor) bandColor = stage.bandColor;
        if (stage.highlightBand !== undefined) highlightBand = stage.highlightBand;
        if (stage.highlightBandColor !== undefined) highlightBandColor = stage.highlightBandColor;
        
        updateData();
    });


    $effect(() => {      
        if (containerWidth > 0 && containerHeight > 0 && filteredData && !isUpdating) {
            renderChart();
        }
    });

    // Process data based on current settings
    function updateData() {
        filteredData = filterPercentileData({ yearRange, race, age });
        
        const astmResults = filterAndProcessASTMData({
            year: ASTMyear, 
            sizeRange: ASTMrange,
            sizeType: sizeType,
            sizeBands: sizeBands,
            bandColor: bandColor,
            highlightBand: highlightBand,
            highlightBandColor: highlightBandColor
        });
        
        ASTMfilter = astmResults.filter;
        currentSizeRanges = astmResults.currentSizeRanges;
        
        if (containerWidth > 0 && containerHeight > 0) {
            renderChart();
        }
    }
  
    // Initial data load
    onMount(() => {
        updateData();
    });
    
    // Render the chart with current data
    function renderChart() {
        if (!filteredData || !ASTMfilter || width <= 0 || height <= 0) return;
        
        // Create data points with avatars
        const points = createDataPoints(filteredData);
        
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;
        
        const xScale = d3.scaleLinear()
        .domain([20, 55])
        .range([0, innerWidth]);
        
        // Position avatars
        const { avatarWidth, avatarHeight } = positionAvatars(points, xScale, innerWidth, innerHeight);
        
        // Set up SVG
        const svgSelection = d3.select(svg);
        let mainGroup = svgSelection.select('.main-chart-group');
        
        if (mainGroup.empty()) {
            svgSelection.selectAll('*').remove();
            mainGroup = svgSelection.append('g')
                .attr('class', 'main-chart-group')
                .attr('transform', `translate(${margin.left}, ${margin.top})`);
            
            mainGroup.append('g').attr('class', 'size-bands');
            mainGroup.append('g').attr('class', 'axes');
            mainGroup.append('g').attr('class', 'avatars');
            mainGroup.append('g').attr('class', 'metadata');
        }
        
        svgSelection
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom);
        
        // Clear and redraw chart elements
        const sizeBandsGroup = svgSelection.select('.size-bands');
        const axesGroup = svgSelection.select('.axes');
        const avatarsGroup = svgSelection.select('.avatars');
        const metadataGroup = svgSelection.select('.metadata');
        
        axesGroup.selectAll('*').remove();
        metadataGroup.selectAll('*').remove();

        renderSizeBands(sizeBandsGroup, xScale, innerHeight);
        renderAxes(axesGroup, xScale, innerHeight);
        renderMetadata(metadataGroup, innerWidth);
        
        renderAvatars(avatarsGroup, points, avatarWidth, avatarHeight);
    }
</script>
  
<div class="outer-container">
    <div class="sticky-container">
        <div class="visual-container">
            <div class="chart-container" bind:clientHeight={containerHeight} bind:clientWidth={containerWidth}>
                <svg bind:this={svg}></svg>
            </div>
        </div>
    </div>
    
    <div class="scrolly-outer">
        <Scrolly bind:value>
            {#each copy.scrolly1 as stage, i}
                <div class="step">
                    <div class="text">
                        <p>{@html stage.text}</p>
                    </div>
                </div>
            {/each}
        </Scrolly>
    </div>
</div>
  
<style>
    .outer-container {
        position: relative;
        width: 100%;
        /* color: #FBFFE9; */
    }
    
    .sticky-container {
        position: sticky;
        top: 0;
        height: 100vh;
        width: 100%;
        z-index: 1;

    }
  
    .visual-container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        
    }
    
    .chart-container {
        width: calc(100% - 4rem);
        height: 100vh;
        margin: 0 auto;
        padding: 5px;
        /* background-color: #FBFFE9; */
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }
  
    svg {
        display: block;
        width: 100%;
        height: 100%;
    }
    
    .scrolly-outer {
        position: relative;
        z-index: 2;
    }
    
    .step {
        height: 100vh;
        display: flex;
        justify-content: flex-end; 
        align-items: center;
        padding-right: 2rem;
    }
    
    .step .text {
        max-width: 500px;
        width: 90%;
        padding: 20px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        margin: 0;
    }
    
    :global(.avatar-group) {
        transition: transform 0.75s ease, opacity 0.5s ease;
    }
    
    :global(.size-band) {
        transition: opacity 0.5s ease, fill 0.5s ease;
    }

    :global(.size-band-highlight) {
        transition: opacity 0.5s ease, stroke 0.5s ease;
    }

</style>