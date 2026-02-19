<script>
    import Ransom from "$components/womens_sizes/Ransom.svelte";
    import Leet from "$components/womens_sizes/Leet.svelte";
</script>

<div class="title-page-container">
    <div class="title-page-content">
        <h2>
            <p class="mono">
                <Leet string="fit 4 a" />
            </p>
            <div class="wrapper">
                <Ransom class="title-page-title" string={"teen"} />  
            </div>
        </h2>
        

        <div class="title-page-body">
            <img src="assets/avatars/tween-avatar.png" alt="tween girl" class="tween"/>
            <p>Few life experiences feel as universal, across generations, as the pains and frustrations of trying to find clothes that fit. </p>
            <p><span class=bold>Sizes vary wildly from store to store.</span> There are no regulations or universal sizing standards. Instead each brand is incentivized to make up their own. </p>
            <p>Thanks to <span class=bold>vanity sizing</span>, the body measurements for clothing sizes are constantly changing, with manufacturers artificially deflating size labels in efforts to boost sales. <span class=bold>And it’s only gotten worse.</span> </p>

            <p><span class=bold>Women's clothing sizes fit more <br>15-year-old girls than grown adults.</span> It's all part of a decades-long struggle for the average woman to find clothes that actually fit her body.</p>
        </div>
    </div>
</div>

<style>
    .wrapper {
        margin: .5rem auto;
    }

    .title-page-container {
        width: 100%;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 2rem 1rem;
    }
    
    .tween {
        height: 275px;
        margin: 0 auto 2rem; 
        display: block; 
    }
    
    .title-page-content {
        max-width: 900px;
        width: 100%;
        padding: 3rem 1rem;
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
    
    .title-page-body {
        font-size: var(--22px);
        line-height: 1.65;
        margin: 2rem auto;
        font-family: var(--sans);
        max-width: 350px;
        text-align: left;
  
    }
    
    .title-page-body p {
        margin-bottom: 1.5rem;
        font-size: var(--18px);
        opacity: 0;
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

    /* ========================================
       INSTAGRAM CAROUSEL (1080 x 1350)
       ======================================== */
    @media (width: 1080px) and (height: 1350px) {
        .title-page-container {
            min-height: 1350px;
            padding: 80px 100px;
            align-items: flex-start;
        }

        .title-page-content {
            max-width: 880px;
            padding: 0;
            margin-top: 40px;
        }

        .wrapper {
            margin: 2rem auto 3rem;
            transform: scale(1.2);
            transform-origin: center;
        }

        .mono {
            font-size: 3rem;
        }

        .tween {
            height: 420px;
            margin: 5rem auto;
        }

        .title-page-body {
            font-size: 1.8rem;
            max-width: 650px;
            line-height: 1.6;
            margin: 0 auto;
        }

        .title-page-body p {
            font-size: 1.8rem;
            margin-bottom: 2.5rem;
        }

        /* .title-page-body p:first-of-type {
            font-size: 1.8rem;
            font-weight: 600;
            margin-bottom: 3rem;
        } */
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