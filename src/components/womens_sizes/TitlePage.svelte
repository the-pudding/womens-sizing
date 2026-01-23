<script>
    import Ransom from "$components/womens_sizes/Ransom.svelte";
    import Leet from "$components/womens_sizes/Leet.svelte";
    import copy from "$data/copy.json";
</script>


<div class="title-page-container">
    <div class="title-page-content">
        <h2>
            <p class="mono"><Leet string="fit 4 a" /></p>
            <div class="wrapper">
                <Ransom class="title-page-title" string={"teen"} />  
            </div>
        </h2>

        <p class="byline">{@html copy.byline}</p>
        <p class="withline">{@html copy.withline}</p>

        <div class="title-page-body">
            {#each copy.introBreak as graf, i}
                <p>{graf.value}</p>
            {/each}
        </div>
    </div>
</div>

<style>
    .wrapper {
        margin: 3rem auto;
    }

    .title-page-container {
        width: 100%;
        min-height: 100vh;
        /* background: linear-gradient(135deg, #FBFFE9 0%, #f8fdf0 100%); */
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 2rem 0;
    }
    
    .title-page-content {
        max-width: 720px;
        padding: 3rem;
        text-align: center;
        animation: slideUp 1s ease-out both;
    }
    
    .title-page-title {
        font-size: 2.5rem;
        font-weight: bold;
        color: #2d3748;
        margin-bottom: 1rem;
        line-height: 1.2;
    }
    
    .title-page-subtitle {
        font-size: 1.5rem;
        color: var(--color-fg);
        font-family: var(--mono);
        margin-bottom: 2rem;
        font-weight: 700;
        line-height: 1;
    }


    .byline, .withline {
      font-family: var(--mono);
      font-size: var(--14px);
      font-weight: 700;
      margin: 0;
      padding: 0;
      text-align: center;
    }

    .byline {
      margin-top: 5rem;
      font-size: var(--18px);
    }
    
    .title-page-body {
        font-size: var(--18px);
        line-height: 1.65;
        text-align: left;
        margin: 2rem 0;
        font-family: var(--sans);
    }
    
    .title-page-body p {
        margin-bottom: 1.5rem;
        font-size: var(--18px);
    }
    
    .title-page-art {
        margin-top: 2rem;
    }
    
    @keyframes slideUp {
        from { 
            opacity: 0;
            transform: translateY(30px);
        }
        to { 
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @media (max-width: 700px) {
        .title-page-content {
            padding: 1rem;
        }
        
        .title-page-body p {
            font-size: var(--16px);
        }
    }
</style>
