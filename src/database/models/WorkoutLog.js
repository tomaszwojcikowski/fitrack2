import { Model } from '@nozbe/watermelondb';
import { field, date, relation, children } from '@nozbe/watermelondb/decorators';

export default class WorkoutLog extends Model {
  static table = 'workout_logs';

  static associations = {
    users: { type: 'belongs_to', key: 'user_id' },
    workout_templates: { type: 'belongs_to', key: 'workout_template_id' },
    logged_sets: { type: 'has_many', foreignKey: 'workout_log_id' },
  };

  @field('user_id') userId;
  @field('workout_template_id') workoutTemplateId;
  @field('started_at') startedAt;
  @field('completed_at') completedAt;
  @date('created_at') createdAt;
  @date('updated_at') updatedAt;
  
  @relation('users', 'user_id') user;
  @relation('workout_templates', 'workout_template_id') workoutTemplate;
  @children('logged_sets') loggedSets;
}
