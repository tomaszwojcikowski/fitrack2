import { Model } from '@nozbe/watermelondb';
import { field, date, relation } from '@nozbe/watermelondb/decorators';

export default class LoggedSet extends Model {
  static table = 'logged_sets';

  static associations = {
    workout_logs: { type: 'belongs_to', key: 'workout_log_id' },
    exercises: { type: 'belongs_to', key: 'exercise_id' },
  };

  @field('workout_log_id') workoutLogId;
  @field('exercise_id') exerciseId;
  @field('set_number') setNumber;
  @field('reps_actual') repsActual;
  @field('weight') weight;
  @field('rpe_actual') rpeActual;
  @field('rir_actual') rirActual;
  @field('is_warmup') isWarmup;
  @date('created_at') createdAt;
  @date('updated_at') updatedAt;
  
  @relation('workout_logs', 'workout_log_id') workoutLog;
  @relation('exercises', 'exercise_id') exercise;
}
