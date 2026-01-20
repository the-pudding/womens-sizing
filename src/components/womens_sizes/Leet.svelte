<script>
    // Takes a string (word) and a maxWidth (in pixels) to size the letters
    const { string } = $props();

    // Splits the string into individual letters
    const letters = string.split("");

    function checkChar(letter) {
        letter = letter.toLowerCase();
        return ['a', 'e', 'i', 'o', 'u'].includes(letter);
    }
</script>


{#each letters as letter, i}
    {@const isVowel = checkChar(letter)}
    <span 
        class="leet-letter"
        style="text-transform: {isVowel & i % 2 === 0 ? 'lowercase' : 'uppercase'};"
    >
        {letter}</span>
{/each}

<style>
    span {
        font-family: var(--mono);
        font-weight: 700;
        font-size: var(--32px);
    }
</style>