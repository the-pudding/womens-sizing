// screen.svelte.js
import { onMount } from 'svelte';

export function useScreenSize() {
    // 1. Initialize state with a fallback for SSR/Initial Load
    let size = $state({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0
    });

    // 2. Setup the listener
    onMount(() => {
        const update = () => {
            size.width = window.innerWidth;
            size.height = window.innerHeight;
        };

        window.addEventListener('resize', update);
        
        // 3. Cleanup automatically
        return () => window.removeEventListener('resize', update);
    });

    // 4. Return the reactive object
    return {
        get width() { return size.width; },
        get height() { return size.height; },
        // You can add helper derived values here too
        get isMobile() { return size.width < 700; }
    };
}