import { Model } from '@nozbe/watermelondb';
import { field, date } from '@nozbe/watermelondb/decorators';

export default class ExerciseCategory extends Model {
  static table = 'exercise_categories';

  @field('name') name;
  @field('description') description;
  @date('created_at') createdAt;
  @date('updated_at') updatedAt;
}
