<script>
    import inView from "$actions/inView.js";
    import { fade } from 'svelte/transition';

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

    // Gets an image path from the letter and its random number
    const randomizedImagePaths = letters.map((letter) => {
        // If the letter is a space, add an isSpace flag
        if (letter === " ") {
            return { letter, isSpace: true };
        }

        // The letter is not a space, get the image path
        const upper = letter.toUpperCase();
        const isSpecial = specialCharNames.hasOwnProperty(letter);
        const randomNum = isSpecial ? getRandomIndex(3) : getRandomIndex(20);
        const padded = getFormattedNum(randomNum);
        
        // If the letter is a special character, use its mapped name
        if (isSpecial) {
            return {
                letter,
                src: `./assets/letters/png_letters/specialChars/${specialCharNames[letter]}-${padded}.png`
            };
        // Otherwise use the letter itself
        } else {
            return {
                letter,
                src: `./assets/letters/png_letters/${upper}/${upper}-${padded}.png`
            };
        }
    });

    // $effect(() => {
    //     console.log({inViewTrigger})
    // })
</script>

<p class="ransom" class:animate-in={inViewTrigger}
    use:inView
    onenter={inViewFly}
    onexit={exitViewFly}>
    {#each randomizedImagePaths as { letter, src, isSpace }, i (letter + i)}
        <span 
            class="ransom-letter" 
            style="width: {100/randomizedImagePaths.length}%;
            transform: rotate({rotations[getRandomIndex(rotations.length - 1)]}deg);
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
    }

    span.ransom-letter {
        opacity: 0;
        display: inline-block;
        transition: opacity 200ms ease-in-out;
        animation-name: fade-in;
        animation-duration: 100ms;
        animation-timing-function: ease-in-out;
        animation-play-state: paused;
        animation-fill-mode: forwards;
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