<!-- TitlePage.svelte -->
<script>
    import Ransom from "$components/Ransom.svelte";
    import Leet from "$components/Leet.svelte";
    import copy from "../data/copy.json";
   
    const titlePageData = copy.titlePage?.[0];
    
</script>

<div class="title-page-container">
    <div class="title-page-content">
        <!-- <h1 class="title-page-title">
            {titlePageData?.title || "Default Title"}
        </h1> -->
        <Ransom string="sized" />
        <Ransom string=" out " />
        {#if titlePageData?.subtitle}
            <h2 class="title-page-subtitle">
                <Leet string={titlePageData.subtitle} />
            </h2>
        {/if}
        <div class="title-page-body">
            {#if titlePageData?.paragraphs}
                {#each Object.values(titlePageData.paragraphs) as paragraph}
                    <p>{@html paragraph}</p>
                {/each}
            {/if}
        </div>
        
        <!-- placeholder for possible image -->
        <div class="title-page-art">

        </div>
    </div>
</div>

<style>
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
        max-width: 800px;
        padding: 3rem;
        text-align: center;
        animation: slideUp 1s ease-out both;
    }
    
    .title-page-title {
        font-size: 3.5rem;
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
        font-size: 1.1rem;
        line-height: 1.6;
        text-align: left;
        margin-bottom: 2rem;
        font-family: var(--sans);
    }
    
    .title-page-body p {
        margin-bottom: 1.5rem;
        font-size: var(--20px);
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
            font-size: 2.5rem;
        }
        
        .title-page-subtitle {
            font-size: 1.2rem;
        }
        
        .title-page-body {
            font-size: 1rem;
        }
    }
</style>