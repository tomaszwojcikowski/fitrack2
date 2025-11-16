import { appSchema, tableSchema } from '@nozbe/watermelondb';

export const schema = appSchema({
  version: 1,
  tables: [
    // User table
    tableSchema({
      name: 'users',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'email', type: 'string' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
    
    // Exercise Categories
    tableSchema({
      name: 'exercise_categories',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'description', type: 'string', isOptional: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
    
    // Exercises
    tableSchema({
      name: 'exercises',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'description', type: 'string', isOptional: true },
        { name: 'video_url', type: 'string', isOptional: true },
        { name: 'is_custom', type: 'boolean' },
        { name: 'user_id', type: 'string', isOptional: true, isIndexed: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
    
    // Category Links (many-to-many join table)
    tableSchema({
      name: 'category_links',
      columns: [
        { name: 'exercise_id', type: 'string', isIndexed: true },
        { name: 'category_id', type: 'string', isIndexed: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
    
    // Exercise Substitutions (many-to-many)
    tableSchema({
      name: 'exercise_substitutions',
      columns: [
        { name: 'exercise_id', type: 'string', isIndexed: true },
        { name: 'substitute_exercise_id', type: 'string', isIndexed: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
    
    // Exercise Progressions
    tableSchema({
      name: 'exercise_progressions',
      columns: [
        { name: 'exercise_id', type: 'string', isIndexed: true },
        { name: 'next_progression_id', type: 'string', isIndexed: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
    
    // User E1RMs
    tableSchema({
      name: 'user_e1rms',
      columns: [
        { name: 'user_id', type: 'string', isIndexed: true },
        { name: 'exercise_id', type: 'string', isIndexed: true },
        { name: 'weight', type: 'number' },
        { name: 'date', type: 'number' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
    
    // Program Templates
    tableSchema({
      name: 'program_templates',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'description', type: 'string', isOptional: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
    
    // Phase Templates
    tableSchema({
      name: 'phase_templates',
      columns: [
        { name: 'program_template_id', type: 'string', isIndexed: true },
        { name: 'name', type: 'string' },
        { name: 'order', type: 'number' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
    
    // Workout Templates
    tableSchema({
      name: 'workout_templates',
      columns: [
        { name: 'phase_template_id', type: 'string', isIndexed: true },
        { name: 'name', type: 'string' },
        { name: 'day_of_week', type: 'number', isOptional: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
    
    // Template Exercises
    tableSchema({
      name: 'template_exercises',
      columns: [
        { name: 'workout_template_id', type: 'string', isIndexed: true },
        { name: 'exercise_id', type: 'string', isIndexed: true },
        { name: 'order', type: 'number' },
        { name: 'sets', type: 'string' },
        { name: 'reps_prescribed', type: 'string', isOptional: true },
        { name: 'rest_prescribed_seconds', type: 'number', isOptional: true },
        { name: 'tempo', type: 'string', isOptional: true },
        { name: 'rpe_target', type: 'number', isOptional: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
    
    // Workout Logs
    tableSchema({
      name: 'workout_logs',
      columns: [
        { name: 'user_id', type: 'string', isIndexed: true },
        { name: 'workout_template_id', type: 'string', isIndexed: true, isOptional: true },
        { name: 'started_at', type: 'number' },
        { name: 'completed_at', type: 'number', isOptional: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
    
    // Logged Sets
    tableSchema({
      name: 'logged_sets',
      columns: [
        { name: 'workout_log_id', type: 'string', isIndexed: true },
        { name: 'exercise_id', type: 'string', isIndexed: true },
        { name: 'set_number', type: 'number' },
        { name: 'reps_actual', type: 'number' },
        { name: 'weight', type: 'number' },
        { name: 'rpe_actual', type: 'number', isOptional: true },
        { name: 'rir_actual', type: 'number', isOptional: true },
        { name: 'is_warmup', type: 'boolean' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
  ],
});
