// avatar-generator.js
// Simplified utility for generating randomized layered avatars

/**
 * Generate a random integer between min and max (inclusive)
 */
 export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  /**
   * Generate a random avatar with layered components
   * @returns {Object} Avatar with layers array
   */
  export function generateRandomAvatar() {
    // Random variants (1-4)
    const baseVariant = getRandomInt(1, 4);
    const hairVariant = getRandomInt(1, 4);
    const bottomVariant = getRandomInt(1, 4);
    const topVariant = getRandomInt(1, 4);
    
    // Create layers in order from bottom to top
    const layers = [
      { path: `/assets/avatars/2-base-${baseVariant}.png` },
      { path: `/assets/avatars/2-hair-${hairVariant}.png` },
      { path: `/assets/avatars/2-bottom-${bottomVariant}.png` },
      { path: `/assets/avatars/2-top-${topVariant}.png` }
    ];
    
    return { layers };
  }