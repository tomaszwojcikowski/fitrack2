/**
 * E1RM (Estimated 1-Rep Max) Calculation Utilities
 * 
 * Uses the Epley formula: 1RM = weight × (1 + reps / 30)
 * This is one of the most commonly used formulas in strength training.
 */

/**
 * Calculate estimated 1RM using the Epley formula
 * @param {number} weight - The weight lifted
 * @param {number} reps - Number of reps performed
 * @returns {number} Estimated 1RM
 */
export function calculateE1RM(weight, reps) {
  if (!weight || !reps || reps <= 0) {
    return 0;
  }
  
  // For 1 rep, the weight IS the 1RM
  if (reps === 1) {
    return weight;
  }
  
  // Epley formula: 1RM = weight × (1 + reps / 30)
  return weight * (1 + reps / 30);
}

/**
 * Calculate total volume for a set
 * @param {number} weight - The weight lifted
 * @param {number} reps - Number of reps performed
 * @returns {number} Volume (weight × reps)
 */
export function calculateVolume(weight, reps) {
  return (weight || 0) * (reps || 0);
}

/**
 * Calculate total volume from multiple sets
 * @param {Array} sets - Array of set objects with weight and reps
 * @returns {number} Total volume
 */
export function calculateTotalVolume(sets) {
  return sets.reduce((total, set) => {
    return total + calculateVolume(set.weight, set.repsActual || set.reps);
  }, 0);
}

/**
 * Get the best E1RM from a collection of sets for an exercise
 * @param {Array} sets - Array of set objects with weight and reps
 * @returns {number} Best (highest) E1RM
 */
export function getBestE1RM(sets) {
  if (!sets || sets.length === 0) {
    return 0;
  }
  
  const e1rms = sets.map(set => 
    calculateE1RM(set.weight, set.repsActual || set.reps)
  );
  
  return Math.max(...e1rms);
}

/**
 * Calculate average RPE across sets
 * @param {Array} sets - Array of set objects with rpeActual
 * @returns {number} Average RPE
 */
export function calculateAverageRPE(sets) {
  const setsWithRPE = sets.filter(set => set.rpeActual != null);
  
  if (setsWithRPE.length === 0) {
    return 0;
  }
  
  const totalRPE = setsWithRPE.reduce((sum, set) => sum + set.rpeActual, 0);
  return totalRPE / setsWithRPE.length;
}

/**
 * Format weight for display
 * @param {number} weight - Weight in kg
 * @returns {string} Formatted weight string
 */
export function formatWeight(weight) {
  return `${Math.round(weight * 10) / 10} kg`;
}

/**
 * Format volume for display
 * @param {number} volume - Volume in kg
 * @returns {string} Formatted volume string
 */
export function formatVolume(volume) {
  return `${Math.round(volume).toLocaleString()} kg`;
}
