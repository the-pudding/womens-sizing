<script>
    import copy from "$data/copy.json";
</script>


<div class="title-page-container">
    <div class="title-page-content">
        <h5>Methodology</h5>

        <div class="title-page-body">
            {#each copy.methods as graf, i}
                <p>{@html graf.value}</p>
            {/each}
        </div>

        <h5>Related pieces</h5>

        <div class="title-page-body">
            <ul>
                {#each copy.furtherReading as item, i}
                    <li><a href={item.url}>{item.name}</a>, {item.org}</li>
                {/each}
            </ul>
        </div>
    </div>
</div>

<style>
    .wrapper {
        margin: 0 auto;
    }

    .title-page-container {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
    }
    
    .title-page-content {
        max-width: 720px;
        padding: 0rem 3rem;
        text-align: center;
        animation: slideUp 1s ease-out both;
    }
    
    h5 {
        text-align: left;
        font-family: var(--mono);
        font-size: var(--24px);
        font-weight: 700;
        margin: 0;
        padding: 0;
    }
    
    .title-page-body {
        font-size: var(--14px);
        line-height: 1.65;
        text-align: left;
        margin: 0;
        font-family: var(--sans);
    }
    
    .title-page-body p {
        margin-bottom: 1.5rem;
        font-size: var(--14px);
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
