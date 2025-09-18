<script>
    import copy from "../data/copy.json";
    import Ransom from "$components/Ransom.svelte";
    import Leet from "$components/Leet.svelte"; 

</script>

<section class="history-container">
    <div class="history-content">
        <div class="hed-wrapper">
            <p class="mono history-subtitle"><Leet string="Sizing issues have"/></p>
            <Ransom class="history-title" string="always" />
            <p class="mono history-subtitle"><Leet string="been a problem"/></p> 
        </div>
        <div class="img-wrapper">
            <img src="/assets/history-waist-measurement.jpg" />
            <p class="image-caption">Researchers in 1941 gathered the body measurements of nearly 15,000 women — all of whom were white — to help adopt a new, universal sizing system for garments. Source: U.S. Library of Congress</p>
        </div>
        <div class="history-body">
            {#each copy.history[0].textA as graf, i}
            <p>{@html graf.value}</p>
        {/each}
        <div class="img-wrapper-float">
            <!-- <img src="/assets/history-shoulder-markings.jpg" /> -->
            <img src="assets/history-shoulder-slope.jpg" />
            <p class="image-caption" style="font-size: 0.8rem">The study gathered as many as 58 individual body measurements from each participant. Source: U.S. Library of Congress</p>
        </div>
        {#each copy.history[0].textB as graf, i}
            <p>{@html graf.value}</p>
        {/each}
        </div>
    </div>

</section>

<style>
  .history-container {
        width: 100%;
        min-height: 100vh;
        /* background: linear-gradient(135deg, #FBFFE9 0%, #f8fdf0 100%); */
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 2rem 0;
        /* margin-top: 40vh; */
    }
    
    .hed-wrapper {
        margin: 0 0 4rem 0;
    }
    
    .history-content {
        max-width: 720px;
        padding: 3rem;
        text-align: center;
        animation: slideUp 1s ease-out both;
    }
    
    .history-title {
        font-size: 3.5rem;
        font-weight: bold;
        color: #2d3748;
        margin-bottom: 1rem;
        line-height: 1.2;
    }
    
    .history-subtitle {
        font-size: 1.5rem;
        color: var(--color-fg);
        font-family: var(--mono);
        margin-bottom: 2rem;
        font-weight: 700;
        line-height: 1;
    }
    
    .history-body {
        font-size: 1.1rem;
        line-height: 1.6;
        text-align: left;
        margin-bottom: 2rem;
        font-family: var(--sans);
    }
    
    .history-body p {
        margin-bottom: 1.5rem;
        font-size: var(--18px);
    }
    .img-wrapper {
        width: 100%;
        margin: 2rem 0;
        text-align: center;
    }
    
    .img-wrapper img {
        max-width: 100%;
        height: auto;
        display: block;
        margin: 0 auto;
    }
    
    .img-wrapper-float {
        float: left;
        margin: 0 2rem 0rem 0;
        max-width: 300px;
        text-align: center;
    }
    
    .image-caption {
        font-size: var(--12px);
        font-family: var(--mono);
        font-weight: 700;
        margin-top: 0.5rem;
        text-align: left;
        line-height: 1.2;
    }
</style>