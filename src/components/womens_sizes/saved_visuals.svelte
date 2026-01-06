{#if (isNaN(currentId) || currentId == 0) && introScroll}
<div transition:fade={{duration: 500}} class="intro-title">
    <p class="mono"><Leet string="meet your typical" /></p>
    <Ransom string="tween" />
    <!-- <p class="title-text">{@html copy.introText}</p> -->
</div>
{/if}
{#if (currentId >= 3 && currentId < 7) || (currentId >= 8)}
<div transition:fade={{duration: 500}} class="size-key">
<p>{sizeLabel}</p>
<p>Size Range: {filteredASTM && filteredASTM.length > 0 ? filteredASTM[0].sizeRange : ''}</p>
</div>
{/if}
<div id="beeswarm" 
class="chart-container" 
bind:clientHeight={containerHeight} 
bind:clientWidth={containerWidth}
style="opacity: {currentId == 7 || currentId == 11 ||currentId == 14 || currentId == "exit" || (currentId == "to-enter" && !introScroll) ? 0 : 1}">
<svg width={width} height={height}>
{#if currentSizeRanges}
  {@const minWaist = d3.min(currentSizeRanges, d => d.min)}
  {@const maxWaist = d3.max(currentSizeRanges, d => d.max)}
  <g class="size-backgrounds">
    {#each currentSizeRanges as sizeRange, i}
      {@const x = xScale(sizeRange.min)}
      {@const rectWidth = xScale(sizeRange.max) - x}
      <g class="size-band-group" 
        id="band-{sizeRange.alphaSize}" 
        class:omit={(omittedSizeFilters.includes(sizeRange.size) || currentId < 2 || currentId == "to-enter" )}
        style="transition-delay: {setDelay(i, scrollDir)}s">
        <rect x={x} y={$animatedBand.y} width={rectWidth} height={$animatedBand.height} fill="#9ABBD9"/>
        <text x={x + rectWidth / 2} y={currentId <= 2 || isNaN(currentId) ? $animatedBand.height*1.5 : height - margin.top - margin.bottom - 20} text-anchor="middle">{currentId <= 8 || (currentId == "to-enter" && introScroll) || (currentId == "exit" && introScroll) || (currentId == "to-enter" && !introScroll) ? sizeRange.alphaSize : sizeRange.size}</text>
      </g>
    {/each}
  </g>
  <g class="highlight-band" class:visible={currentId == 2 || currentId == 6 || (currentId == "exit" && introScroll) || (currentId == "to-enter" && !introScroll) || currentId >= 7}>
    <rect x={$animatedHighlight.x} y={$animatedHighlight.y} width={$animatedHighlight.width} height={$animatedHighlight.height}/>
  </g>
{/if}

<g class="axis x-axis" 
    transform="translate(0, {height - margin.top - margin.bottom})"
    opacity={currentId >= 3 ? 1 : 0}></g>

{#if positionedAvatars() && avatarImages}
  <g class="avatars">
    {#each positionedAvatars() as point, i}
      <g class="avatar-group" 
        id={point.id}
        transform={`translate(${point.x}, ${point.y}) scale(${(point.type == 'percentile' && currentId <= 2 && introScroll) || (point.type == 'percentile' && currentId == "to-enter" && introScroll) ? 2 : 1})`}
        opacity={(point.type == 'percentile' && currentId <= 2 && introScroll) || (point.type == 'percentile' && currentId == "to-enter" && introScroll) || currentId > 2 || currentId == "exit" || (currentId == "to-enter" && !introScroll) ? 1 : 0}
        style="transition: {currentId == "to-enter" ? "none" : "all 0.5s ease-in-out" };"
      >
        {#if avatarImages}
          {@const avatar = avatarImages.find(a => a.id === point.id)}
            {#each avatar.avatar.layers as layer}
              <image
                  x={0}
                  y={0}
                  width={avatarWidth}
                  height={avatarHeight}
                  href={layer.path}
                  xlink:href={layer.path}
                  class="avatar"
                  class:grayscale={point.type !== 'percentile'}
                />
            {/each}
        {/if}
      </g>
    {/each}
  </g>
{/if}
</svg>
</div>