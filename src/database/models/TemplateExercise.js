import { Model } from '@nozbe/watermelondb';
import { field, date, relation } from '@nozbe/watermelondb/decorators';

export default class TemplateExercise extends Model {
  static table = 'template_exercises';

  static associations = {
    workout_templates: { type: 'belongs_to', key: 'workout_template_id' },
    exercises: { type: 'belongs_to', key: 'exercise_id' },
  };

  @field('workout_template_id') workoutTemplateId;
  @field('exercise_id') exerciseId;
  @field('order') order;
  @field('sets') sets;
  @field('reps_prescribed') repsPrescribed;
  @field('rest_prescribed_seconds') restPrescribedSeconds;
  @field('tempo') tempo;
  @field('rpe_target') rpeTarget;
  @date('created_at') createdAt;
  @date('updated_at') updatedAt;
  
  @relation('workout_templates', 'workout_template_id') workoutTemplate;
  @relation('exercises', 'exercise_id') exercise;
}
