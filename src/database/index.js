import { Database } from '@nozbe/watermelondb';
import LokiJSAdapter from '@nozbe/watermelondb/adapters/lokijs';
import { Platform } from 'react-native';
import { schema } from './schemas';
import User from './models/User';
import Exercise from './models/Exercise';
import ExerciseCategory from './models/ExerciseCategory';
import WorkoutLog from './models/WorkoutLog';
import LoggedSet from './models/LoggedSet';

// Use LokiJS for web, SQLite for native (but for Expo web, we use LokiJS)
const adapter = new LokiJSAdapter({
  schema,
  useWebWorker: false,
  useIncrementalIndexedDB: true,
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
