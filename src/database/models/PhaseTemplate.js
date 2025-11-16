import { Model } from '@nozbe/watermelondb';
import { field, date, relation, children } from '@nozbe/watermelondb/decorators';

export default class PhaseTemplate extends Model {
  static table = 'phase_templates';

  static associations = {
    program_templates: { type: 'belongs_to', key: 'program_template_id' },
    workout_templates: { type: 'has_many', foreignKey: 'phase_template_id' },
  };

  @field('program_template_id') programTemplateId;
  @field('name') name;
  @field('order') order;
  @date('created_at') createdAt;
  @date('updated_at') updatedAt;
  
  @relation('program_templates', 'program_template_id') programTemplate;
  @children('workout_templates') workoutTemplates;
}
