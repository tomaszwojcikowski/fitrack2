import { Model } from '@nozbe/watermelondb';
import { field, date, relation, children } from '@nozbe/watermelondb/decorators';

export default class WorkoutTemplate extends Model {
  static table = 'workout_templates';

  static associations = {
    phase_templates: { type: 'belongs_to', key: 'phase_template_id' },
    template_exercises: { type: 'has_many', foreignKey: 'workout_template_id' },
    workout_logs: { type: 'has_many', foreignKey: 'workout_template_id' },
  };

  @field('phase_template_id') phaseTemplateId;
  @field('name') name;
  @field('day_of_week') dayOfWeek;
  @date('created_at') createdAt;
  @date('updated_at') updatedAt;
  
  @relation('phase_templates', 'phase_template_id') phaseTemplate;
  @children('template_exercises') templateExercises;
  @children('workout_logs') workoutLogs;
}
