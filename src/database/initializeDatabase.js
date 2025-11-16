import { database } from './index';
import { seedExercises, categories, sampleProgram, exerciseSubstitutions } from './seedData';

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
        const exerciseRecords = {};
        for (const exercise of seedExercises) {
          const exerciseRecord = await database.collections
            .get('exercises')
            .create((record) => {
              record.name = exercise.name;
              record.description = exercise.description;
              record.videoUrl = exercise.videoUrl;
              record.isCustom = exercise.isCustom;
              record.userId = null;
            });
          exerciseRecords[exercise.name] = exerciseRecord;
        }

        console.log('Seeding sample program...');
        // Create program template
        const programRecord = await database.collections
          .get('program_templates')
          .create((record) => {
            record.name = sampleProgram.name;
            record.description = sampleProgram.description;
          });

        // Create phases
        for (const phase of sampleProgram.phases) {
          const phaseRecord = await database.collections
            .get('phase_templates')
            .create((record) => {
              record.programTemplateId = programRecord.id;
              record.name = phase.name;
              record.order = phase.order;
            });

          // Create workouts
          for (const workout of phase.workouts) {
            const workoutRecord = await database.collections
              .get('workout_templates')
              .create((record) => {
                record.phaseTemplateId = phaseRecord.id;
                record.name = workout.name;
                record.dayOfWeek = workout.dayOfWeek;
              });

            // Create template exercises
            for (const exercise of workout.exercises) {
              const exerciseRecord = exerciseRecords[exercise.exerciseName];
              if (exerciseRecord) {
                await database.collections
                  .get('template_exercises')
                  .create((record) => {
                    record.workoutTemplateId = workoutRecord.id;
                    record.exerciseId = exerciseRecord.id;
                    record.order = exercise.order;
                    record.sets = exercise.sets;
                    record.repsPrescribed = exercise.repsPrescribed;
                    record.restPrescribedSeconds = exercise.restPrescribedSeconds;
                    record.tempo = exercise.tempo || null;
                    record.rpeTarget = exercise.rpeTarget;
                  });
              }
            }
          }
        }

        console.log('Seeding exercise substitutions...');
        // Create exercise substitutions
        for (const sub of exerciseSubstitutions) {
          const exercise1 = exerciseRecords[sub.exercise1];
          const exercise2 = exerciseRecords[sub.exercise2];
          
          if (exercise1 && exercise2) {
            // Create bidirectional substitution relationships
            await database.collections
              .get('exercise_substitutions')
              .create((record) => {
                record.exerciseId = exercise1.id;
                record.substituteExerciseId = exercise2.id;
              });
            
            await database.collections
              .get('exercise_substitutions')
              .create((record) => {
                record.exerciseId = exercise2.id;
                record.substituteExerciseId = exercise1.id;
              });
          }
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
