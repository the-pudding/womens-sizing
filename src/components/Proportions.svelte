<script>
    import { onMount } from 'svelte';
    import copy from "../data/copy.json";
    import Scrolly from './helpers/Scrolly.svelte';
    import Ransom from "$components/Ransom.svelte";
    import Leet from "$components/Leet.svelte";

    let containerHeight = $state(0);
    let containerWidth = $state(0);
    let value = $state(0);
    
    let baseImage = $state('assets/proportions-base.png');
    let overlayImage = $state(null);
    let showOverlay = $state(false);


    $effect(() => {
        if (copy.proportions && copy.proportions[value]) {
            const currentStage = copy.proportions[value];
            
            // Set base dress form image 
            if (currentStage.baseImage) {
                baseImage = currentStage.baseImage;
            }
            
            // Set overlay image and visibility
            if (currentStage.overlayImage && currentStage.overlayImage !== 'null' && currentStage.overlayImage !== null) {
                overlayImage = currentStage.overlayImage;
                showOverlay = true;
            } else {
                showOverlay = false;
                overlayImage = null;
            }
        }
    });

    onMount(() => {
        return () => {

        };
    });
</script>
<!-- Transition to show caveats with fit and introduce mismatched proportions -->
<div class="outer-container">
    <div class="text-block">
        {#each copy.ASTMtransition as block}
            <div>
                {#if block.subhed}
                    <h3>
                        <Leet string="Mass produced clothes" />
                        <Ransom string="do not fit" />
                        <Leet string="every body" />
                    </h3>
                {/if}
                <p>{@html block.text}</p>
            </div>
        {/each}
    </div>
    <div class="sticky-container">
        <div class="visual-container">
            <div class="image-container" bind:clientHeight={containerHeight} bind:clientWidth={containerWidth}>
                <img 
                    src={baseImage} 
                    alt="Base dress form"
                    class="base-image"
                />
                
                <!-- Overlay image - conditionally visible -->
                {#if showOverlay && overlayImage}
                    <img 
                        src={overlayImage} 
                        alt="Size overlay"
                        class="overlay-image"
                    />
                {/if}
            </div>
        </div>
    </div>


    <div class="scrolly-outer">
        <Scrolly bind:value>
            {#each copy.proportions as stage, i}
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
    }
    
    .spot-image {
        margin: 20vh 40vh 10vh 40vh;
        height: 30vh;
        background-color: aliceblue;
        text-align: center;
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
        align-items: flex-end; /* Align to bottom to keep 20% space at top */
        padding-bottom: 0; /* Images touch bottom of screen */
    }
    
    .image-container {
        position: relative;
        width: 100%;
        height: 80vh; 
        max-width: 800px; 
        display: flex;
        justify-content: center;
        align-items: flex-end;
    }
    .text-block h3 {
        max-width: 800px;
        margin: 0 auto;
        text-align: center;
    }
    .text-block p {
        width: min(100%, 550px);
        margin: 0 auto;
        margin-bottom: 60px;
        margin-top: 60px;
    }
    .base-image,
    .overlay-image {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        max-width: 100%;
        max-height: 100%;
        width: auto;
        height: auto;
        object-fit: contain;
    }
    
    .base-image {
        z-index: 1;
    }
    
    .overlay-image {
        z-index: 2;
        transition: opacity 0.3s ease-in-out;
    }
    
    .scrolly-outer {
        position: relative;
        z-index: 2;
    }
    
    .step {
        height: 100vh;
        display: flex;
        justify-content: flex-start; 
        align-items: center;
        padding-left: 4rem;
    }
    
    .step .text {
        max-width: 400px;
        width: 90%;
        padding: 20px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        margin: 0;
    }

    @media (max-width: 768px) {
        .step .text {
            max-width: 300px;
            padding: 15px;
        }
        
        .image-container {
            height: 75vh; 
        }
    }
</style>