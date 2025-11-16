import { PixelRatio, Platform } from 'react-native';

/**
 * Image Optimization Utilities for High-DPI Displays
 * 
 * These utilities implement the PixelRatio optimization strategy
 * required for Phase 4 to ensure pixel-perfect rendering on
 * high-density displays like the OnePlus 12 (510 PPI).
 */

/**
 * Get the device's pixel ratio
 * OnePlus 12 typically has a 3x or 4x pixel ratio
 * 
 * @returns {number} The device pixel ratio
 */
export const getPixelRatio = () => {
  return PixelRatio.get();
};

/**
 * Get the font scale factor
 * Used to adjust UI for accessibility settings
 * 
 * @returns {number} The font scale factor
 */
export const getFontScale = () => {
  return PixelRatio.getFontScale();
};

/**
 * Calculate the actual pixel size needed for a given layout size
 * This ensures images are rendered at the correct resolution
 * 
 * Example: For a 200dp image on a 3x device, returns 600px
 * 
 * @param {number} layoutSize - The layout size in density-independent pixels (dp)
 * @returns {number} The physical pixel size needed
 */
export const getPixelSizeForLayoutSize = (layoutSize) => {
  return PixelRatio.getPixelSizeForLayoutSize(layoutSize);
};

/**
 * Round to the nearest pixel-aligned value
 * Prevents blurry edges by aligning to physical pixels
 * 
 * @param {number} layoutSize - The layout size to round
 * @returns {number} The pixel-aligned size
 */
export const roundToNearestPixel = (layoutSize) => {
  return PixelRatio.roundToNearestPixel(layoutSize);
};

/**
 * Get the appropriate image URI based on device pixel density
 * Selects the optimal image resolution for the device
 * 
 * @param {string} baseUrl - The base URL without size suffix
 * @param {number} layoutSize - The desired layout size in dp
 * @returns {string} The optimized image URI
 * 
 * @example
 * getOptimizedImageUri('https://api.example.com/avatar', 100)
 * // Returns: 'https://api.example.com/avatar?size=300' on 3x device
 */
export const getOptimizedImageUri = (baseUrl, layoutSize) => {
  const pixelSize = getPixelSizeForLayoutSize(layoutSize);
  return `${baseUrl}?size=${pixelSize}`;
};

/**
 * Get the appropriate local image source based on pixel ratio
 * Selects between @1x, @2x, @3x image variants
 * 
 * @param {string} imageName - The base image name without scale suffix
 * @param {string} extension - The image file extension
 * @returns {object} React Native image source object
 * 
 * @example
 * getScaledLocalImage('avatar', 'png')
 * // Returns appropriate @2x or @3x variant
 */
export const getScaledLocalImage = (imageName, extension = 'png') => {
  const ratio = getPixelRatio();
  let scale = 1;
  
  if (ratio >= 3) {
    scale = 3;
  } else if (ratio >= 2) {
    scale = 2;
  }
  
  const scaleSuffix = scale > 1 ? `@${scale}x` : '';
  
  // For local images, React Native handles this automatically
  // but we provide the logic for manual selection if needed
  return {
    uri: `${imageName}${scaleSuffix}.${extension}`,
    scale: ratio,
  };
};

/**
 * Calculate dimensions for responsive images
 * Maintains aspect ratio while optimizing for device
 * 
 * @param {number} originalWidth - Original image width
 * @param {number} originalHeight - Original image height
 * @param {number} maxLayoutWidth - Maximum layout width in dp
 * @returns {object} Optimized dimensions { width, height, pixelWidth, pixelHeight }
 */
export const calculateResponsiveDimensions = (
  originalWidth,
  originalHeight,
  maxLayoutWidth
) => {
  const aspectRatio = originalWidth / originalHeight;
  const layoutWidth = maxLayoutWidth;
  const layoutHeight = layoutWidth / aspectRatio;
  
  return {
    width: roundToNearestPixel(layoutWidth),
    height: roundToNearestPixel(layoutHeight),
    pixelWidth: getPixelSizeForLayoutSize(layoutWidth),
    pixelHeight: getPixelSizeForLayoutSize(layoutHeight),
  };
};

/**
 * Get device info for debugging and optimization
 * Useful for logging and analytics
 * 
 * @returns {object} Device display information
 */
export const getDeviceDisplayInfo = () => {
  return {
    pixelRatio: getPixelRatio(),
    fontScale: getFontScale(),
    platform: Platform.OS,
    platformVersion: Platform.Version,
  };
};

/**
 * Determine if the device is high-DPI (3x or higher)
 * OnePlus 12 and similar flagship devices
 * 
 * @returns {boolean} True if high-DPI device
 */
export const isHighDPIDevice = () => {
  return getPixelRatio() >= 3;
};

/**
 * Get recommended image quality based on device
 * Higher quality for high-DPI devices
 * 
 * @returns {number} Quality value (0-100)
 */
export const getRecommendedImageQuality = () => {
  const ratio = getPixelRatio();
  
  if (ratio >= 3) {
    return 90; // High quality for high-DPI
  } else if (ratio >= 2) {
    return 80; // Medium-high for @2x
  }
  
  return 70; // Standard quality for @1x
};

/**
 * Create a style object with pixel-perfect dimensions
 * 
 * @param {object} style - The base style object
 * @returns {object} Style object with rounded pixel values
 */
export const createPixelPerfectStyle = (style) => {
  const pixelPerfect = {};
  
  Object.keys(style).forEach((key) => {
    const value = style[key];
    
    // Round numeric values that represent layout dimensions
    if (typeof value === 'number' && 
        (key.includes('width') || 
         key.includes('height') || 
         key.includes('margin') || 
         key.includes('padding') ||
         key.includes('borderRadius'))) {
      pixelPerfect[key] = roundToNearestPixel(value);
    } else {
      pixelPerfect[key] = value;
    }
  });
  
  return pixelPerfect;
};

export default {
  getPixelRatio,
  getFontScale,
  getPixelSizeForLayoutSize,
  roundToNearestPixel,
  getOptimizedImageUri,
  getScaledLocalImage,
  calculateResponsiveDimensions,
  getDeviceDisplayInfo,
  isHighDPIDevice,
  getRecommendedImageQuality,
  createPixelPerfectStyle,
};
