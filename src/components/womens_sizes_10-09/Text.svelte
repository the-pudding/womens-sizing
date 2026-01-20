<script>
    import { onMount } from 'svelte';
    let { copy } = $props();

    function convertToHTML(text) {
        let finalText = [];
        let inList = false;
        if (text != undefined) {
            let textArray = text.split(/\n/); // Split by single newlines
            textArray.forEach(function (line) {
                // Convert Markdown links [text](url) to HTML <a> tags
                line = line.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');

                // Convert Markdown bold **bold** to HTML <strong> tags
                line = line.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

                // Convert Markdown italics *italic* to HTML <em> tags
                line = line.replace(/\*([^*]+)\*/g, '<em>$1</em>');

                // Detect and process bullet-point lists
                if (/^\s*[-*]\s+/.test(line)) {
                    // Start a new list if not already in one
                    if (!inList) {
                        finalText.push('<ul>');
                        inList = true;
                    }
                    // Convert to <li>
                    line = line.replace(/^\s*[-*]\s+(.*)/, '<li>$1</li>');
                    finalText.push(line);
                    return;
                } else if (inList) {
                    // Close the list if we exit a list block
                    finalText.push('</ul>');
                    inList = false;
                }

                // Convert Markdown quote blocks > quote to HTML <blockquote> tags
                if (/^>\s+/.test(line)) {
                    line = line.replace(/^>\s+(.*)/, '<blockquote>$1</blockquote>');
                }

                // Process custom component notation
                if (line.indexOf("Component|") !== -1) {
                    let compName = line.split("|")[1];
                    line = `<svelte:component this=${compName}></svelte:component>`;
                }

                // Process image notation
                if (line.indexOf("IMAGE|") !== -1) {
                    let imageArr = line.replace("IMAGE|", "").replace(/(\r\n|\n|\r)/gm, "").split("|");
                    const imageObj = {
                        "url": imageArr[0],
                        "hed": imageArr[1],
                        "source": imageArr[2],
                        "alt": imageArr[3]
                    }

                    let hedHTML = imageObj.hed ? '<h3>' + imageObj.hed + '</h3>' : '';
                    let sourceHTML = imageObj.source ? '<div class="credits">Source: ' + imageObj.source + '</div>' : '';

                    line = '<div class="imageContainer">' +
                        hedHTML +
                        '<img class="desktopImage" alt="' + imageObj.alt + '" src="assets/app/' +
                        imageObj.url +
                        '.svg"/><img class="mobileImage" alt="' + imageObj.alt + '" src="assets/app/' +
                        imageObj.url +
                        '_mobile.svg"/>' +
                        sourceHTML +
                        '</div>';
                }

                // Process chart placeholders
                if (line.indexOf(">>") !== -1) {
                    line = "<div class='chartPlaceholder'>" + line + "</div>";
                }

                // Add only lines with valid content
                if (/[A-Za-z0-9]/.test(line)) {
                    finalText.push(line);
                }
            });

            // Close any open <ul> tag at the end
            if (inList) {
                finalText.push('</ul>');
            }

            return wrapInPTags(finalText);
        }
    }


    function wrapInPTags(arr) {
        return arr
        .map(item => {
            // Skip wrapping valid block-level elements
            if (/<\/?(ul|li|blockquote|div|svelte:component)(\s|>|$)/.test(item)) {
                return item;
            }
            // Wrap standalone content in <p> tags if not empty
            if (item.trim() !== '') {
                return `<p>${item}</p>`;
            }
            return ''; // Return an empty string for empty lines
        })
        .filter(item => item.trim() !== '') // Remove empty strings
        .join(''); // Join all elements into a single string without any separator
    }


</script>

{@html convertToHTML(copy)}


<style>


</style>
