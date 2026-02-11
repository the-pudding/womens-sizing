import { writable } from 'svelte/store';

// Create a standard store
export const reducedMotion = writable(false);

export function initMotionWatcher() {
    if (typeof window === 'undefined') return;

    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Update the store value
    reducedMotion.set(query.matches);

    const handler = (e) => reducedMotion.set(e.matches);
    query.addEventListener('change', handler);
}