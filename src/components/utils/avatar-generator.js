// avatar-generator.js
// Utility for generating random avatars of different sizes based on numeric size

/**
 * Get a random integer between min and max (inclusive)
 */
 export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Avatar size types
 */
export const AVATAR_SIZE = {
  JUNIOR: 'junior',
  SMALL: 'small',   // For sizes 00 and below, 0, 2, 4, 6, 8
  MID: 'mid',       // For sizes 10, 12, 14, 16, 18
  LARGE: 'large'    // For sizes 20 and above
};

/**
 * Generate a random avatar with layers
 * @param {string} sizeType - Size type (SMALL, MID, or LARGE)
 */
export function generateRandomAvatar(sizeType, point, valueKey) {

  // --- REMOVED CACHE RESET ---
  // 1. Handle 'p50' - this is the most specific rule
  if (point.id === 'p50') {
    if (valueKey === 'value10_11') {
      return {
        layers: [
          { path: 'assets/avatars/tween-avatar-bg.png' }
        ]
      };
    } else if (valueKey === 'value14_15') {
      return {
        layers: [
          { path: 'assets/avatars/teen-avatar-bg.png' }
        ]
      };
    } else {
      // Default for p50 for any other valueKey
      return {
        layers: [
          { path: 'assets/avatars/teen-avatar-bg.png' }
        ]
      };
    }
  } 
  
  // --- REMOVED 'else if (point.id.startsWith('p'))' BLOCK ---
  
  // 2. Handle ALL OTHER avatars (non-"p50")
  // This 'else' catches everything else (p10, p90, and all non-p)
  // and gives them a unique random avatar.
  else {
    const baseVariant = getRandomInt(1, 4);
    const hairVariant = getRandomInt(1, 4);
    const bottomVariant = getRandomInt(1, 4);
    const topVariant = getRandomInt(1, 4);
    
    // Use different folder path based on avatar size
    let folderPath;
    switch (true) {
      case sizeType >= 90:
        folderPath = 'assets/avatars/24';
        break;
      case sizeType >= 70:
        folderPath = 'assets/avatars/12';
        break;
      case sizeType >= 30:
        folderPath = 'assets/avatars/2';
        break;
      default: // This handles anything less than 25
        folderPath = 'assets/avatars/junior';
        break;
    }
    
    // Create layers in order from bottom to top
    const layers = [
      { path: `${folderPath}-base-${baseVariant}.png` },
      { path: `${folderPath}-hair-${hairVariant}.png` },
      { path: `${folderPath}-bottom-${bottomVariant}.png` },
      { path: `${folderPath}-top-${topVariant}.png` }
    ];
    
    return { layers };
  }
}

/**
 * Helper function to check if a value is within a range
 */
function isNumericInRange(value, min, max) {
  const numValue = parseInt(value, 10);
  return !isNaN(numValue) && numValue >= min && numValue <= max;
}

/**
 * Determine the appropriate avatar size for a data point based on numeric sizes
 * @param {Object} point - The data point
 * @param {Array} allSizeData - All size data for lookup
 * @param {Function} findSizesFunction - Function to find matching sizes
 * @returns {string} - The avatar size type
 */
export function determineAvatarSize(point, allSizeData, findSizesFunction) {
  // Get sizes that match this point's value
  const matchingSizes = findSizesFunction(point.value);
  
  // If there are no matching numeric sizes, fall back to a default based on value size
  if (!matchingSizes.numericSizes || matchingSizes.numericSizes.length === 0) {
    // Fallback logic based on waist measurement
    if (point.value >= 40) {
      return AVATAR_SIZE.LARGE;
    } else if (point.value >= 30) {
      return AVATAR_SIZE.MID;
    } else {
      return AVATAR_SIZE.SMALL;
    }
  }
  
  // Check each numeric size and determine avatar size category
  for (const sizeStr of matchingSizes.numericSizes) {
    // Extract numeric part (handle cases like "00", "0P", "14W", etc.)
    const sizeNum = parseInt(sizeStr.replace(/[^\d.-]/g, ''), 10);
    
    if (!isNaN(sizeNum)) {
      // Size 20 and above = LARGE
      if (sizeNum >= 20) {
        return AVATAR_SIZE.LARGE;
      }
      // Size 10, 12, 14, 16, 18 = MID
      else if (sizeNum >= 10) {
        return AVATAR_SIZE.MID;
      }
      // Size 8 and below = SMALL
      else {
        return AVATAR_SIZE.SMALL;
      }
    }
  }
  
  // Default to small if we couldn't determine from numeric sizes
  return AVATAR_SIZE.SMALL;
}