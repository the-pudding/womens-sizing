<script>
    import inView from "$actions/inView.js";

    let inViewTrigger = $state(false);

    function inViewFly() { 
        inViewTrigger = true; 
    }

    function exitViewFly() { 
        inViewTrigger = false;
    }

    // Takes a string (word) and a maxWidth (in pixels) to size the letters
    const { string } = $props();

    // Splits the string into individual letters
    const letters = string.split("");

    const rotations = [-2, -1, 0, 1, 2];

    // Special characters mapping to their names
    const specialCharNames = {
        "&": "and",
        "*": "asterisk",
        "@": "at",
        ":": "colon",
        ",": "comma",
        "-": "dash",
        "$": "dollar",
        "...": "ellipsis",
        "=": "equal",
        "!": "exclamation",
        "#": "hashtag",
        "(": "parenthesisL",
        ")": "parenthesisR",
        "%": "percent",
        ".": "period",
        "+": "plus",
        "?": "question",
        "“": "quotationL",
        "”": "quotationR",
        ";": "semicolon"
    };

    // Gets a random index for the letter images based on the image count
    const getRandomIndex = (max) => {
        return Math.floor(Math.random() * max) + 1;
    };

    // Formats the number to be three digits with leading zeros to match filename
    const getFormattedNum = (num) => {
        return String(num).padStart(3, "0");
    };

    const getSeededRandom = (seed, max) => {
        // Basic hash function
        let hash = 0;
        for (let i = 0; i < seed.length; i++) {
            hash = (hash << 5) - hash + seed.charCodeAt(i);
            hash |= 0; // Convert to 32bit integer
        }
        // Use the hash to pick a number between 1 and max
        return (Math.abs(hash) % max) + 1;
    };

    // Gets an image path from the letter and its random number
    const randomizedImagePaths = letters.map((letter, i) => {
        if (letter === " ") return { letter, isSpace: true };

        const upper = letter.toUpperCase();
        const isSpecial = specialCharNames.hasOwnProperty(letter);
        
        // Use the string + index as a seed so it's the same on Server and Client
        const seed = `${string}-${letter}-${i}`;
        
        const randomNum = isSpecial ? getSeededRandom(seed, 3) : getSeededRandom(seed, 20);
        const padded = getFormattedNum(randomNum);
        
        // Pick rotation deterministically too
        const rotationIndex = getSeededRandom(seed + "rot", rotations.length) - 1;
        const rotation = rotations[rotationIndex];

        if (isSpecial) {
            return {
                letter,
                rotation,
                src: `./assets/letters/png_letters/specialChars/${specialCharNames[letter]}-${padded}.png`
            };
        } else {
            return {
                letter,
                rotation,
                src: `./assets/letters/png_letters/${upper}/${upper}-${padded}.png`
            };
        }
    });
</script>

<p class="ransom" class:animate-in={inViewTrigger}
    style="max-width: {string.length * 100}px;"
    use:inView
    onenter={inViewFly}
    onexit={exitViewFly}
    role="img" 
    aria-label={string}>
    {#each randomizedImagePaths as { letter, src, isSpace, rotation }, i (letter + i)}
        <span 
            class="ransom-letter" 
            style="width: {100/randomizedImagePaths.length}%;
            transform: rotate({rotation}deg);
            animation-delay: {i * 200}ms;">
            
            {#if !isSpace}
                <img src={src} alt={letter} />
            {/if}
        </span>
    {/each}
</p>

<style>
    p {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 100%;
        margin: 1rem auto ;
    }

    span.ransom-letter {
        opacity: 0;
        aspect-ratio: 1 / 1;
        display: inline-block;
        transition: opacity var(--ms-250) ease-in-out;
        animation-name: fade-in;
        animation-duration: var(--ms-100);
        animation-timing-function: ease-in-out;
        animation-play-state: paused;
        animation-fill-mode: forwards;
    }

    @media (prefers-reduced-motion: reduce) {
        span.ransom-letter {
            opacity: 1 !important;
            animation: none !important;
            transition: none !important;
        }
    }

    p.animate-in span.ransom-letter {
        animation-play-state: running;
    }

    @keyframes fade-in {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    img {
        width: 100%;
        height: 100%;
        aspect-ratio: 1 / 1;
        filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.06)) 
          drop-shadow(0 2px 2px rgba(0, 0, 0, 0.06)) 
          drop-shadow(0 4px 4px rgba(0, 0, 0, 0.06));
    }

    /* span.ransom-letter:nth-of-type(1) {
        animation: rock 1s infinite linear;
        transform-origin: center center;
    } 

    @keyframes rock {
        0% { transform: rotate(0deg); }
        25% { transform: rotate(2deg); }
        50% { transform: rotate(0deg); }
        75% { transform: rotate(-2deg); }
        100% { transform: rotate(0deg); }
    } */
</style>