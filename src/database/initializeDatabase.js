import { database } from './index';
import { seedExercises, categories } from './seedData';

let isInitialized = false;

export async function initializeDatabase() {
  if (isInitialized) {
    return;
  }

  try {
    console.log('Initializing database...');

    // Check if categories already exist
    const existingCategories = await database.collections
      .get('exercise_categories')
      .query()
      .fetch();

    if (existingCategories.length === 0) {
      console.log('Seeding categories...');
      await database.write(async () => {
        const categoryRecords = {};
        
        for (const category of categories) {
          const categoryRecord = await database.collections
            .get('exercise_categories')
            .create((record) => {
              record.name = category.name;
              record.description = category.description;
            });
          categoryRecords[category.name] = categoryRecord;
        }

        console.log('Seeding exercises...');
        for (const exercise of seedExercises) {
          await database.collections
            .get('exercises')
            .create((record) => {
              record.name = exercise.name;
              record.description = exercise.description;
              record.videoUrl = exercise.videoUrl;
              record.isCustom = exercise.isCustom;
              record.userId = null;
            });
        }
      });

      console.log('Database seeded successfully');
    } else {
      console.log('Database already contains data');
    }

    isInitialized = true;
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}
