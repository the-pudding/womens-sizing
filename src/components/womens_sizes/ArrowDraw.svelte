<script>
    import { selectAll, interpolateString, easeLinear } from "d3";
    import { onMount } from "svelte";
    let visible = $state(false);

    function drawInPaths(pathType) {
        const paths = selectAll(pathType);
        const lineNodes = paths._groups[0];

        const lineLengths = [...lineNodes].map((el) => el.getTotalLength());

        paths
            .attr("stroke-dasharray", (d, i) => lineLengths[i])
            .attr("stroke-dashoffset", (d, i) => lineLengths[i])
            .transition()
            .delay((d, i) => 500 + (i * 400))
            .duration(400)
            .ease(easeLinear)
            .attr("stroke-dashoffset", 0);

        visible = true;
    }

    onMount(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            // Skip the animation entirely
            visible = true;
        } else {
            // Run your existing animation logic
            drawInPaths(".arrow-draw #stroke path");
        }
    });
</script>

<div class="arrow-draw">
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 200 200">
     <defs>
        <clipPath id="clip">
            <path d="M166.9,133.8c1.4-5.9-1.1-10-5-12.9-3.5-2.6-7.5-4.8-11.6-6.4-8.3-3.2-16.9-5.3-26.4-6.1l-1.5,6.2c-1.3,5.8-2.1,11.7-3.9,17.2-3.4,9.7-10.6,15.8-20.4,18.7-10.1,2.9-19.5-1.1-24.1-10.7-7.5-15.9-2.5-29.8,9.9-37.9,3.7-2.4,7.9-4,12.1-5.5,3.4-1.3,7.1-1.8,11.4-2.9-.5-2.1-.6-4.3-1.6-5.9-2.4-3.7-4.7-7.8-8-10.5-18.7-15-39.8-20.7-63.4-13.9-5.3,1.5-10.4,3.6-14.3,8-.7.8-2.9.8-4.1.3-1.9-.8-2.6-3.1-1.7-4.6,1.7-2.7,3.7-5.6,6.2-7.5,10.4-8,22.6-11.2,35.4-10.7,13.1.5,25.5,4.1,37.1,10.3,12.2,6.6,21.3,15.8,25.9,29.1.6,1.7,1.4,3.4,2.4,5.9,15.7,3.4,32.3,5.6,47.5,15.2.4-3.8.6-6.6.9-9.3.3-2.4,1.9-3.9,4.2-4.6,2.2-.6,5.2,1.1,6.1,3.6.8,2.4,1.6,4.9,1.9,7.5,1.3,11,2.4,22.1,3.6,33.1.1,1.1.2,2.2,0,3.3-.4,4.2-3.3,7.1-7.4,6.4-12.1-1.8-24.1-4-36-6.1-1.1-.2-2.4-.4-3.1-1.2-1.1-1.3-2.3-2.9-2.4-4.6-.1-1,1.4-2.8,2.6-3.1,2.8-.9,5.7-1.5,8.6-1.5s8.1.7,12.2.9c2.1,0,4.2,0,6.5,0ZM110.1,108.1c-9-.7-15.4.9-20.6,4.8-7.1,5.3-8.9,13.8-4.9,21.7,2.1,4.1,5.6,5.8,10.1,4.7,6.2-1.4,10.5-5.3,12.9-11.1,2.6-6.2,3.4-12.7,2.6-20.2Z"/>
        </clipPath>
     </defs>
    <g id="stroke" class:visible>
        <path clip-path="url(#clip)" d="M10.6,73.9c16.9-15.8,52.6-32.4,85.8-8.3s17.6,64.8,11.7,74.1-32.4,11.4-32.4-13.9,38.8-30.5,62.9-22.2,35.4,16.2,42.2,37.6"/>
        <path clip-path="url(#clip)" d="M175.2,91.6l3.2,28.4,2.4,21.2-49.7-4.1"/>
    </g>
    </svg>
</div>

<style>
    .arrow-draw {
        width: 4rem;
        height: 4rem;
        transform: rotate(25deg);
        animation: bounce 2s infinite;
    }

    @media (prefers-reduced-motion: reduce) {
        .arrow-draw {
            animation: none;
        }
    }

    #stroke {
        opacity: 0;
    }

    #stroke.visible {
        opacity: 1;
    }

    #stroke path {
        stroke: var(--color-fg);
        stroke-width: 12;
        fill: none;
    }

    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% {
        transform: translateY(0) rotate(25deg);
      }
      40% {
        transform: translateY(-10px) rotate(25deg);
      }
      60% {
        transform: translateY(-5px) rotate(25deg);
      }
    }
</style>