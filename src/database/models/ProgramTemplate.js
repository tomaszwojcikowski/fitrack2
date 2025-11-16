import { Model } from '@nozbe/watermelondb';
import { field, date, children } from '@nozbe/watermelondb/decorators';

export default class ProgramTemplate extends Model {
  static table = 'program_templates';

  static associations = {
    phase_templates: { type: 'has_many', foreignKey: 'program_template_id' },
  };

  @field('name') name;
  @field('description') description;
  @date('created_at') createdAt;
  @date('updated_at') updatedAt;
  
  @children('phase_templates') phaseTemplates;
}
