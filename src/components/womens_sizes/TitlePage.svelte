<script>
    import Ransom from "$components/womens_sizes/Ransom.svelte";
    import copy from "$data/copy.json";

    console.log(copy.titlePage)
</script>


<div class="title-page-container">
    <div class="title-page-content">
        <div class="wrapper">
            <Ransom class="title-page-title" string={"fit 4"} />  
        </div>
        <div class="wrapper">
            <Ransom class="title-page-title" string={"a teen"} />  
        </div>

        <div class="title-page-body">
            {#each copy.titlePage[0].text as graf, i}
                <p>{graf.value}</p>
            {/each}
        </div>
        
        <!-- placeholder for possible image -->
        <div class="title-page-art">

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
    
    .title-page-body {
        font-size: var(--18px);
        line-height: 1.6;
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
    
    @media (max-width: 768px) {
        .title-page-content {
            padding: 2rem;
        }
        
        .title-page-title {
            font-size: 1rem;
        }
        
        .title-page-subtitle {
            font-size: 1.2rem;
        }
        
        .title-page-body {
            font-size: 1rem;
        }
    }
</style>
