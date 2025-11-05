<!-- Intro.svelte -->
<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
    import generatedPercentiles from '../data/generatedPercentiles.json';
    import ASTMsizes from "../data/ASTMsizes.json";
    import copy from "../data/copy.json";
    import { annotate } from 'rough-notation';
    import { fade } from 'svelte/transition';
    
    import { generateRandomAvatar } from './utils/avatar-generator.js';
    import Scrolly from './helpers/Scrolly.svelte';
    import Ransom from "$components/Ransom.svelte";
    import Leet from "$components/Leet.svelte";
  
    let containerHeight = $state(0);
    let containerWidth = $state(0);
    let margin = { top: 40, right: 10, bottom: 10, left: 10 };
    let width = $derived(containerWidth - margin.left - margin.right);
    let height = $derived(containerHeight - margin.top - margin.bottom);
    
    let { startStage = 0, endStage = null, introScroll = true } = $props()
    let filteredStages = $derived(copy.intro ? copy.intro.slice(
        startStage, 
        endStage !== null ? endStage + 1 : undefined
    ) : []);

    let value = $state(0);
    let svg;
    let isUpdating = false;
    
    // Current stage for conditional styling
    let currentStage = $derived(filteredStages?.[value]);
    let currentId = $derived(currentStage?.id);
    let activeAnnotations = [];
    
    //cdc waistline data
    let filteredData = null;
    let yearRange = $state();
    let race = $state();
    
    //ASTM standard sizing
    let ASTMfilter = null;
    let currentSizeRanges = [];
    let age = $state();
    let ASTMyear = $state();
    let ASTMrange = $state();

    //filters chart background size bands, which/when size ranges are highlighted
    let sizeBandRendered = false;
    let sizeBands = $state();
    let sizeType = $state();
    let bandColor = $state();
    //added layer to highlight specific size or range
    let highlightBand = $state();
    let highlightBandColor = $state();

    //designates how/when/which avatars are rendered
    let avatarsRendered = false;
    let avatarStyle = $state();
    let avatarDisplay = $state();
    //median avatar highlighted in color
    let highlightedPercentile = $state();
    
    // Track if initial settings have been loaded
    let initialSettingsLoaded = $state(false);

    // =============================================================================
    // DATA PROCESSING FUNCTIONS
    // =============================================================================

    //rough notation styling
    function processTextAnnotations(element) {
        if (!element) return;
        
        // highlight annotations
        const highlightElements = element.querySelectorAll('[data-highlight]');
        highlightElements.forEach(el => {
            const color = el.getAttribute('data-highlight') || '#C2D932';
            const annotation = annotate(el, {
                type: 'highlight',
                color: color,
                strokeWidth: 1,
                padding: 10,
                animationDuration: 800
            });
            activeAnnotations.push(annotation);
            annotation.show();
        });
        
        // circle annotations
        const circleElements = element.querySelectorAll('[data-circle]');
        circleElements.forEach(el => {
            const color = el.getAttribute('data-circle') || '#D96F32';
            const annotation = annotate(el, {
                type: 'circle',
                color: color,
                strokeWidth: 1,
                padding: 5,
                animationDuration: 1000
            });
            activeAnnotations.push(annotation);
            annotation.show();
        });
        
        // underline annotations
        const underlineElements = element.querySelectorAll('[data-underline]');
        underlineElements.forEach(el => {
            const color = el.getAttribute('data-underline') || '#B57BDC';
            const annotation = annotate(el, {
                type: 'underline',
                color: color,
                strokeWidth: 1,
                padding: 2,
                animationDuration: 600,
                multiline: true,
            });
            activeAnnotations.push(annotation);
            annotation.show();
        });
        
        // Process box annotations
        const boxElements = element.querySelectorAll('[data-box]');
        boxElements.forEach(el => {
            const color = el.getAttribute('data-box') || '#9ABBD9';
            const annotation = annotate(el, {
                type: 'box',
                color: color,
                strokeWidth: 1,
                padding: 1.5,
                animationDuration: 800,
                opacity: .2,
            });
            activeAnnotations.push(annotation);
            annotation.show();
        });
    }
    
    //filters cdc data for year/race/age
    function filterPercentileData(criteria) {
      return generatedPercentiles.find(item => 
        item.yearRange === criteria.yearRange &&
        item.race === criteria.race &&
        item.age === criteria.age
      ) || null;
    }

    //finds corresponding ASTM size for each waistline measurement
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
    
    //determines alpha vs. numeric size ranges for tooltips & background size bands
    function processSizeData(filteredASTM, criteria) {
        if (!filteredASTM || filteredASTM.length === 0) return [];
        if (!criteria.sizeBands || criteria.sizeBands.trim() === '') return [];
        
        const sizesToInclude = criteria.sizeBands.split(',').map(s => s.trim()).filter(s => s);
        const isNumeric = criteria.sizeType === 'numeric';
        
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
        
        //main size band ranges
        const filteredRanges = ranges.filter(range => sizesToInclude.includes(range.size));
        
        applySizeColors(filteredRanges, criteria.bandColor);
        
        filteredRanges.forEach(range => {
            if (highlightSizesToInclude.includes(range.size)) {
                addHighlightProperties(range, criteria.highlightBandColor, highlightSizesToInclude);
            } else {
                range.hasHighlight = false;
                delete range.highlightColor;
                delete range.highlightOpacity;
            }
        });
        
        return filteredRanges;
    }

    // controls background size bands
    function addHighlightProperties(range, highlightColor, highlightSizes) {
        if (!highlightColor) return;
        
        const highlightIndex = highlightSizes.indexOf(range.size);
        const centerIndex = Math.floor(highlightSizes.length / 2);
        const maxDistance = Math.max(centerIndex, highlightSizes.length - 1 - centerIndex);
        
        const distance = Math.abs(highlightIndex - centerIndex);
        const opacity = 1 - (distance / maxDistance) * 0.7;
        
        const gradientColorMap = {
            "green": "#C2D932",
            "purple": "#B57BDC", 
            "orange": "#D96F32",
            "blue": "#9ABBD9"
        };
        
        if (highlightColor === "gradient" || gradientColorMap[highlightColor]) {
            range.highlightColor = highlightColor === "gradient" ? "#C2D932" : gradientColorMap[highlightColor];
            range.highlightOpacity = opacity;
        } else {
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

    //applies color gradient to size bands
    function applySizeColors(ranges, baseColor) {
        if (!ranges || ranges.length === 0) return;
        
        const centerIndex = Math.floor(ranges.length / 2);
        const maxDistance = Math.max(centerIndex, ranges.length - 1 - centerIndex);
        
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
                range.color = baseColor === "gradient" ? "#C2D932" : gradientColorMap[baseColor];
                range.opacity = opacity;
            } else if (baseColor) {
                range.color = baseColor;
                range.opacity = 0.1;
            }
        });
    }
    
    // =============================================================================
    // DATA GENERATION FUNCTIONS
    // =============================================================================

    //generates random avatar for each percentile
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
    
    //generates beeswarm positioning and spacing
    function positionAvatars(points, xScale, innerWidth, innerHeight) {
        const baseSize = Math.min(innerWidth, innerHeight);
        const avatarHeight = Math.max(90, baseSize * 0.18);
        const avatarWidth = avatarHeight * 0.6;
        
        const aspectRatio = innerWidth / innerHeight;
        const isMobile = innerWidth < 600;
        
        let spreadFactor;
        if (isMobile) {
            // On mobile, use aspect ratio to determine spread
            // Portrait (tall screens) get less vertical spread
            spreadFactor = Math.min(2.0, Math.max(1.1, 2.0 - aspectRatio));
        } else {
            // Desktop gets minimal spread
            spreadFactor = 1.4;
        }
        
        const verticalZone = Math.min(innerHeight * 0.7, avatarHeight * 8);
        const centerY = innerHeight * 0.5;
        const minY = centerY - verticalZone / 2;
        const maxY = centerY + verticalZone / 2;
        
        const simulation = d3.forceSimulation(points)
            .force('x', d3.forceX(d => xScale(d.value)).strength(1.0))
            // Regular y-force for all avatars - stronger to keep them more centered
            .force('y', d3.forceY(centerY).strength(0.15))
            // Special force for median avatar
            .force('yHighlight', d3.forceY(d => {
                if (d.percentile === highlightedPercentile) {
                    return centerY; 
                }
                return d.y; 
            }).strength(d => d.percentile === highlightedPercentile ? 0.4 : 0))
            .force('collide', d3.forceCollide(d => {
                const baseRadius = avatarHeight / 6; 
                const spreadRadius = baseRadius * Math.min(spreadFactor, 1.8);
                return d.percentile === highlightedPercentile ? spreadRadius * 1.2 : spreadRadius;
            }).strength(0.12));
        
        for (let i = 0; i < 300; ++i) {
            simulation.tick();
        }
        
        //manages avatar positioning/constraints
        points.forEach(point => {
            if (!point.x) point.x = xScale(point.value);
            if (!point.y) point.y = centerY;
            
            point.x = xScale(point.value);
            point.y = Math.max(minY, Math.min(maxY, point.y));
            
            // median avatar has bias toward center
            if (point.percentile === highlightedPercentile) {
                const currentDistance = Math.abs(point.y - centerY);
                const maxDistance = avatarHeight * 0.6;
                
                if (currentDistance > maxDistance) {
                    point.y = centerY + (point.y > centerY ? maxDistance : -maxDistance);
                }
            }
            
            point.y = Math.max(avatarHeight/2, Math.min(innerHeight - avatarHeight/2, point.y));
        });
        
        return { avatarWidth, avatarHeight };
    }
    
    // =============================================================================
    // CHART RENDERING FUNCTIONS - FULLY DATA-DRIVEN
    // =============================================================================
    
    //renders chart background size band
    function renderSizeBands(selection, xScale, innerHeight, avatarHeight) {
        const shouldShowBands = sizeBands && sizeBands.trim() !== "" && currentSizeRanges && currentSizeRanges.length > 0 && value > 0;
        
        if (!shouldShowBands) {
            selection.selectAll('.size-band').remove();
            selection.selectAll('.size-band-highlight').remove();
            selection.selectAll('.size-band-text').remove();
            sizeBandRendered = false;
            return;
        }
        
        let bandHeight = innerHeight;
        let bandY = 0;
        
        // unique styling for stage 2
        if (currentStage?.bandHeight === "avatar-centered") {
            const centerY = innerHeight * 0.5;
            bandHeight = avatarHeight * 2;
            bandY = centerY - bandHeight / 2;
        } else if (currentStage?.bandHeight === "full") {
            bandHeight = innerHeight;
            bandY = 0;
        }
        
        // Determine colors based on stage bandStyle property 
        const getMainColor = (d) => {
            if (currentStage?.bandStyle === "greyscale") {
                return "#999999";
            }
            return d.color;
        };
        
        const getHighlightColor = (d) => {
            if (currentStage?.bandStyle === "greyscale") {
                return "#666666";
            }
            return d.highlightColor;
        };
        
        const rects = selection.selectAll('.size-band')
            .data(currentSizeRanges, d => d.size);
        
        rects.exit().remove();
        
        const newRects = rects.enter()
            .append('rect')
            .attr('class', d => `size-band size-${d.size}`)
            .attr('opacity', 0);
        
        // Bottom-up animation (default)
        newRects
            .attr('y', innerHeight)
            .attr('height', 0);
            
        newRects.merge(rects)
            .transition()
            .duration(sizeBandRendered ? 750 : 0)
            .attr('x', d => xScale(d.min))
            .attr('width', d => xScale(d.max) - xScale(d.min))
            .attr('y', bandY)
            .attr('height', bandHeight)
            .attr('fill', getMainColor)
            .attr('opacity', d => d.opacity-0.1);
        
        // For existing bands, update colors immediately for greyscale
        if (currentStage?.bandStyle === "greyscale") {
            selection.selectAll('.size-band')
                .attr('fill', "#999999");
        }
        
        // HIGHLIGHT BANDS (rendered as outlines only if highlightBand exists)
        const shouldShowHighlights = highlightBand && highlightBand.trim() !== "";
        
        if (!shouldShowHighlights) {
            selection.selectAll('.size-band-highlight').remove();
        } else {
            const highlightRanges = currentSizeRanges.filter(d => d.hasHighlight);
            
            const highlightRects = selection.selectAll('.size-band-highlight')
                .data(highlightRanges, d => d.size);
            
            highlightRects.exit().remove();
            
            const newHighlightRects = highlightRects.enter()
                .append('rect')
                .attr('class', d => `size-band-highlight size-${d.size}-highlight`)
                .attr('opacity', 0);
            
            newHighlightRects
                .attr('y', innerHeight)
                .attr('height', 0);
                
            newHighlightRects.merge(highlightRects)
                .transition()
                .duration(sizeBandRendered ? 750 : 0)
                .attr('x', d => xScale(d.min))
                .attr('width', d => xScale(d.max) - xScale(d.min))
                .attr('y', bandY)
                .attr('height', bandHeight)
                .attr('fill', 'none')
                .attr('stroke', getHighlightColor)
                .attr('stroke-width', 3)
                .attr('opacity', d => d.highlightOpacity);
            
            // For existing highlight bands, update colors immediately for greyscale
            if (currentStage?.bandStyle === "greyscale") {
                selection.selectAll('.size-band-highlight')
                    .attr('stroke', "#666666");
            }
        }
        
        // SIZE LABELS
        const texts = selection.selectAll('.size-band-text')
            .data(currentSizeRanges, d => d.size);
        
        texts.exit().remove();
        
        const newTexts = texts.enter()
            .append('text')
            .attr('class', d => `size-band-text size-${d.size}`)
            .attr('text-anchor', 'middle')
            .attr('opacity', 0);
        
        // Position text based on data-driven bandHeight
        const getTextY = () => {
            if (currentStage?.bandHeight === "avatar-centered") {
                return bandY + bandHeight - 10;
            }
            return innerHeight - 10;
        };
        
        newTexts.merge(texts)
            .text(d => d.size)
            .transition()
            .duration(sizeBandRendered ? 750 : 0)
            .attr('x', d => xScale(d.min) + (xScale(d.max) - xScale(d.min)) / 2)
            .attr('y', getTextY())
            .attr('opacity', 1);
        
        sizeBandRendered = true;
    }

    function renderAxes(selection, xScale, innerHeight) {
        // Hide axes for stages 0 and 1, show for all others
        const shouldShowAxis = currentId !== "0" && currentId !== "1";
        
        // Create axes if they don't exist
        if (selection.select('.x-axis').empty()) {
            selection.append('g')
                .attr('class', 'x-axis')
                .attr('transform', `translate(0, ${innerHeight})`)
                .call(d3.axisBottom(xScale).tickSize(15).ticks(30).tickFormat(''));
            
            const xAxisLabels = selection.append('g')
                .attr('class', 'x-axis-labels')
                .attr('transform', `translate(0, ${innerHeight})`)
                .call(d3.axisBottom(xScale).tickSize(30).ticks(10));
        }
        
        // Show or hide axes based on stage
        selection.select('.x-axis').style('visibility', shouldShowAxis ? 'visible' : 'hidden');
        selection.select('.x-axis-labels').style('visibility', shouldShowAxis ? 'visible' : 'hidden');
    }

    function renderAvatars(selection, points, avatarWidth, avatarHeight) {
        if (!points || points.length === 0) {
            selection.selectAll('.avatar-group').remove();
            avatarsRendered = false;
            return;
        }
        
        // Sort points for proper z-order (higher y values in front)
        const sortedPoints = [...points].sort((a, b) => {
            const aIsHighlighted = a.percentile === highlightedPercentile;
            const bIsHighlighted = b.percentile === highlightedPercentile;

            if (aIsHighlighted && !bIsHighlighted) {
                return 1; // Put 'a' after 'b'
            }
            if (!aIsHighlighted && bIsHighlighted) {
                return -1; // Put 'a' before 'b'
            }
            // If neither or both are highlighted, fall back to y-sorting
            return a.y - b.y;
        });
  
        const getTargetOpacity = (point) => {
            // If avatarDisplay is "percentile-only", only show the highlighted percentile
            if (currentStage?.avatarDisplay === "percentile-only") {
                return point.percentile === highlightedPercentile ? 1 : 0;
            } else if (currentStage?.avatarDisplay === "all") {
                return 1;
            }
            
            return 0; // default to hidden if no avatarDisplay setting
        };
        
        const getImageFilter = (point) => {
            // Always show highlighted percentile in color
            if (point.percentile === highlightedPercentile) {
                return "none";
            }
            
            // Apply style based on current stage settings
            if (currentStage?.avatarStyle === "greyscale") {
                return "grayscale(100%)";
            } else if (currentStage?.avatarStyle === "color") {
                return "none";
            }
            
            return "none"; // default to color
        };
        
        if (avatarsRendered) {
            selection.selectAll('.avatar-group').each(function() {
                const group = d3.select(this);
                const dataId = group.attr('data-id');
                
                const point = sortedPoints.find(p => (p.id || `${p.x},${p.y}`) === dataId);
                if (point) {
                    group.selectAll('image')
                        .style('filter', getImageFilter(point));
                        

                    group.transition()
                        .duration(300)
                        .attr('opacity', getTargetOpacity(point));
                }
            });
        }
        
        if (!avatarsRendered) {
            sortedPoints.forEach(point => {
                 // First render - create all avatars in sorted order
                const avatarGroup = selection.append('g')
                    .attr('class', 'avatar-group')
                    .attr('data-id', point.id || `${point.x},${point.y}`)
                    .attr('transform', d => {
                        const isHighlightedAndInitial = point.percentile === highlightedPercentile && introScroll && (value === 0 || value === undefined);
                        if (isHighlightedAndInitial) {
                            const scaleFactor = 2;
                            const scaledX = point.x - (avatarWidth * scaleFactor / 2);
                            const scaledY = point.y - (avatarHeight * scaleFactor / 2);
                            return `translate(${scaledX}, ${scaledY}) scale(${scaleFactor})`
                        } else {
                            return `translate(${point.x - avatarWidth/2}, ${point.y - avatarHeight/2}) scale(1)`
                        }
                    })
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
                    const midOpacity = targetOpacity === 0 ? 0 : 1;
                    
                    existingGroup
                    .transition()
                    .duration(500)
                    .ease(d3.easeLinear)
                    .attr('opacity', midOpacity)
                    .on('end', function() {
                        const element = d3.select(this);
                        element.raise();
                        
                        element
                        .transition()
                        .duration(500)
                        .ease(d3.easeLinear)
                        .attr('transform', d => {
                            const isHighlightedAndInitial = point.percentile === highlightedPercentile && introScroll && (value === 0 || value === undefined);
                            if (isHighlightedAndInitial) {
                                const scaleFactor = 2;
                                const scaledX = point.x - (avatarWidth * scaleFactor / 2);
                                const scaledY = point.y - (avatarHeight * scaleFactor / 2);
                                return `translate(${scaledX}, ${scaledY}) scale(${scaleFactor})`
                            } else {
                                return `translate(${point.x - avatarWidth/2}, ${point.y - avatarHeight/2}) scale(1)`
                            }
                        })
                        .attr('opacity', targetOpacity);
                    });
                } else {
                      // Create new avatar
                    const avatarGroup = selection.append('g')
                    .attr('class', 'avatar-group')
                    .attr('data-id', pointId)
                    .attr('transform', d => {
                        const isHighlightedAndInitial = point.percentile === highlightedPercentile && introScroll && (value === 0 || value === undefined);
                        if (isHighlightedAndInitial) {
                            const scaleFactor = 2;
                            const scaledX = point.x - (avatarWidth * scaleFactor / 2);
                            const scaledY = point.y - (avatarHeight * scaleFactor / 2);
                            return `translate(${scaledX}, ${scaledY}) scale(${scaleFactor})`
                        } else {
                            return `translate(${point.x - avatarWidth/2}, ${point.y - avatarHeight/2}) scale(1)`
                        }
                    })
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
    // MAIN COMPONENT LOGIC - FULLY DATA-DRIVEN
    // =============================================================================
    
    // Update settings when scroll position changes
    $effect(() => {
        const stage = filteredStages?.[value];
        if (!stage) return;
        
        if (stage.yearRange !== undefined) yearRange = stage.yearRange;
        if (stage.race !== undefined) race = stage.race;
        if (stage.age !== undefined) age = stage.age;
        if (stage.year !== undefined) ASTMyear = stage.year;
        if (stage.sizeRange !== undefined) ASTMrange = stage.sizeRange;
        if (stage.sizeBands !== undefined) sizeBands = stage.sizeBands;
        if (stage.avatarStyle !== undefined) avatarStyle = stage.avatarStyle;
        if (stage.avatarDisplay !== undefined) avatarDisplay = stage.avatarDisplay;
        if (stage.highlightedPercentile !== undefined) {
            highlightedPercentile = parseInt(stage.highlightedPercentile);
        }
        if (stage.sizeType !== undefined) sizeType = stage.sizeType;
        if (stage.bandColor !== undefined) bandColor = stage.bandColor;
        if (stage.highlightBand !== undefined) highlightBand = stage.highlightBand;
        if (stage.highlightBandColor !== undefined) highlightBandColor = stage.highlightBandColor;
        
        updateData();

        setTimeout(() => {
            const textElements = document.querySelectorAll('.step .text');
            textElements.forEach(processTextAnnotations);
        }, 100);
    });

    $effect(() => {      
        if (containerWidth > 0 && containerHeight > 0 && filteredData && !isUpdating && initialSettingsLoaded) {
            renderChart();
        }
    });

    function updateData() {
        if (!initialSettingsLoaded) return;
        
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
  
    onMount(() => {
        // Initialize with settings from the first stage (id=0)
        const initialStage = filteredStages?.[0];
        if (initialStage) {
            if (initialStage.yearRange !== undefined) yearRange = initialStage.yearRange;
            if (initialStage.race !== undefined) race = initialStage.race;
            if (initialStage.age !== undefined) age = initialStage.age;
            if (initialStage.year !== undefined) ASTMyear = initialStage.year;
            if (initialStage.sizeRange !== undefined) ASTMrange = initialStage.sizeRange;
            if (initialStage.sizeBands !== undefined) sizeBands = initialStage.sizeBands;
            if (initialStage.avatarStyle !== undefined) avatarStyle = initialStage.avatarStyle;
            if (initialStage.avatarDisplay !== undefined) avatarDisplay = initialStage.avatarDisplay;
            if (initialStage.highlightedPercentile !== undefined) {
                highlightedPercentile = parseInt(initialStage.highlightedPercentile);
            }
            if (initialStage.sizeType !== undefined) sizeType = initialStage.sizeType;
            if (initialStage.bandColor !== undefined) bandColor = initialStage.bandColor;
            if (initialStage.highlightBand !== undefined) highlightBand = initialStage.highlightBand;
            if (initialStage.highlightBandColor !== undefined) highlightBandColor = initialStage.highlightBandColor;
            
            // Mark initial settings as loaded
            initialSettingsLoaded = true;
        }
        updateData();
    });
    
    function renderChart() {
        if (!filteredData || !ASTMfilter || width <= 0 || height <= 0) return;
        
        const points = createDataPoints(filteredData);
        
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;
        
        const xScale = d3.scaleLinear()
        .domain([20, 55])
        .range([0, innerWidth]);
        
        const { avatarWidth, avatarHeight } = positionAvatars(points, xScale, innerWidth, innerHeight);
        
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
        
        const sizeBandsGroup = svgSelection.select('.size-bands');
        const axesGroup = svgSelection.select('.axes');
        const avatarsGroup = svgSelection.select('.avatars');

        renderSizeBands(sizeBandsGroup, xScale, innerHeight, avatarHeight);
        renderAxes(axesGroup, xScale, innerHeight);
        
        renderAvatars(avatarsGroup, points, avatarWidth, avatarHeight);
    }

    $effect(() => {
        // console.log({value})
    })
</script>
  
<div class="outer-container">
    <div class="sticky-container">
        <div class="visual-container">
            {#if introScroll && (value == undefined || value == 0)}
                <div transition:fade={{duration: 500}} class="intro-title">
                    <p class="mono"><Leet string="meet your typical" /></p>
                    <Ransom string="tween" />
                    <p class="title-text">{@html copy.introText}</p>
                </div>
            {/if}
            <div class="chart-container" bind:clientHeight={containerHeight} bind:clientWidth={containerWidth}>
                <svg bind:this={svg}></svg>
            </div>
        </div>
        {#if (introScroll && value !== undefined && value >= 1) || (!introScroll && value !== undefined)}
            <div transition:fade={{duration: 500}} class="age-container">
                <p>Ages
                {#key filteredStages[value].age}
                    {filteredStages[value].age}
                {/key}
                </p>
            </div>
        {/if}
    </div>
    
    <div class="scrolly-outer">
        <Scrolly bind:value>
            {#each filteredStages as stage, i}
                <div class="step" 
                     class:centered={stage.stepPosition === "center"} 
                     class:centered-vertical={stage.stepPosition === "center-vertical"} 
                     class:right-aligned={!stage.stepPosition || stage.stepPosition === "right"}
                     class:left-aligned={!stage.stepPosition || stage.stepPosition === "left"}>
                    {#if stage.text}
                        <div class="text">
                            <p>{@html stage.text}</p>
                        </div>
                    {/if}
                </div>
            {/each}
        </Scrolly>
    </div>
</div>
  
<style>
    .outer-container {
        position: relative;
        width: 100%;
    }
    
    .sticky-container {
        position: sticky;
        top: 0;
        height: 100vh;
        width: 100%;
        z-index: 1;
        padding: 2rem;
    }

    .age-container {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        font-family: var(--mono);
        font-weight: 700;
        font-size: var(--16px);
        text-transform: uppercase;
        gap: 0.5rem;
    }

    .age-num {
        width: 120px;
    }

    .intro-title {
        position: absolute;
        top: 0;
        right: 0;
        width: 60%;
        padding: 0 10% 0 0;
        height: 100svh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .mono {
        font-family: var(--mono);
        font-weight: 700;
        font-size: var(--24px);
    }

    .title-text {
        font-family: var(--sans);
        font-size: var(--20px);
        max-width: 500px;
    }
  
    .visual-container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .chart-container {
        width: 100%;
        height: 100%;
        margin: 0 auto;
        padding: 5px;
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

    :global(.x-axis-labels .tick text) {
        font-family: var(--mono);
        font-size: var(--14px);
        font-weight: 700;

    }
    
    .scrolly-outer {
        position: relative;
        z-index: 2;
    }
    
    .step {
        height: 100vh;
        display: flex;
        align-items: center;
        padding: 0 2rem;
        font-family: var(--sans);
        font-size: var(--20px);
    }
    
    .step.right-aligned {
        justify-content: flex-end;
        padding-right: 10rem;
    }
    .step.left-aligned {
        justify-content: flex-start;
        padding-left: 2rem;
    }
    
    .step.centered {
        justify-content: center;
        align-items: center;
    }
    
    .step.centered-vertical {
        justify-content: center;
        align-items: center;
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

    :global(.size-band-text) {
        fill: var(--color-fg);
        font-family: var(--mono);
        font-size: 16px;
        font-weight: 700;
    }

    :global(.bold) {
        font-family: var(--mono);
        font-weight: 700;
        text-transform: uppercase;
    }
</style>