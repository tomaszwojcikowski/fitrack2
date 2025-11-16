import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { schema } from './schemas';
import User from './models/User';
import Exercise from './models/Exercise';
import ExerciseCategory from './models/ExerciseCategory';
import WorkoutLog from './models/WorkoutLog';
import LoggedSet from './models/LoggedSet';

const adapter = new SQLiteAdapter({
  schema,
  // For web, we use LokiJS adapter, but for now we'll use SQLite
  // This will be handled differently on web vs native
});

export const database = new Database({
  adapter,
  modelClasses: [
    User,
    Exercise,
    ExerciseCategory,
    WorkoutLog,
    LoggedSet,
  ],
});
