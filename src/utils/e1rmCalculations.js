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

/**
 * Update or create E1RM record for a user and exercise
 * Only updates if the new E1RM is higher than the existing one
 * 
 * @param {Database} database - WatermelonDB database instance
 * @param {string} userId - User ID
 * @param {string} exerciseId - Exercise ID
 * @param {number} weight - Weight lifted
 * @param {number} reps - Reps performed
 * @param {number} timestamp - When the lift occurred
 */
export async function updateE1RM(database, userId, exerciseId, weight, reps, timestamp = Date.now()) {
  // Don't update E1RM for warmup sets or very high rep sets (>15)
  if (reps > 15) {
    return { isNewPR: false };
  }
  
  const newE1RM = calculateE1RM(weight, reps);
  
  try {
    const e1rmsCollection = database.collections.get('user_e1rms');
    
    // Find existing E1RM for this user and exercise
    const existingE1RMs = await e1rmsCollection
      .query()
      .where('user_id', userId)
      .where('exercise_id', exerciseId)
      .fetch();
    
    // Sort by weight descending to get the highest
    const currentBest = existingE1RMs.length > 0
      ? existingE1RMs.reduce((max, record) => 
          record.weight > max.weight ? record : max
        )
      : null;
    
    // Only create new record if this is a new PR (personal record)
    if (!currentBest || newE1RM > currentBest.weight) {
      await database.write(async () => {
        await e1rmsCollection.create(record => {
          record.userId = userId;
          record.exerciseId = exerciseId;
          record.weight = Math.round(newE1RM * 10) / 10; // Round to 1 decimal
          record.date = timestamp;
        });
      });
      
      return {
        isNewPR: true,
        newE1RM: Math.round(newE1RM * 10) / 10,
        oldE1RM: currentBest ? currentBest.weight : 0,
      };
    }
    
    return {
      isNewPR: false,
      newE1RM: Math.round(newE1RM * 10) / 10,
      oldE1RM: currentBest.weight,
    };
  } catch (error) {
    console.error('Error updating E1RM:', error);
    throw error;
  }
}

/**
 * Get the current E1RM for a user and exercise
 * 
 * @param {Database} database - WatermelonDB database instance
 * @param {string} userId - User ID
 * @param {string} exerciseId - Exercise ID
 * @returns {number|null} Current E1RM or null if none exists
 */
export async function getCurrentE1RM(database, userId, exerciseId) {
  try {
    const e1rmsCollection = database.collections.get('user_e1rms');
    
    const e1rms = await e1rmsCollection
      .query()
      .where('user_id', userId)
      .where('exercise_id', exerciseId)
      .fetch();
    
    if (e1rms.length === 0) {
      return null;
    }
    
    // Return the highest E1RM
    const best = e1rms.reduce((max, record) => 
      record.weight > max.weight ? record : max
    );
    
    return best.weight;
  } catch (error) {
    console.error('Error getting current E1RM:', error);
    return null;
  }
}
