import { writable } from 'svelte/store';

// 1. Create the store
export const isMobile = writable(false);

// 2. Initialize the listener
export function initMobileWatcher(breakpoint = 700) {
    if (typeof window === 'undefined') return;

    const checkSize = () => {
        isMobile.set(window.innerWidth < breakpoint);
    };

    // Run once to set the initial state
    checkSize();

    // Listen for window resizes
    window.addEventListener('resize', checkSize);

    // Return a cleanup function in case you want to destroy it later
    return () => window.removeEventListener('resize', checkSize);
}