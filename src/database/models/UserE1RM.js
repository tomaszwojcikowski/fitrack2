import { Model } from '@nozbe/watermelondb';
import { field, date, relation } from '@nozbe/watermelondb/decorators';

export default class UserE1RM extends Model {
  static table = 'user_e1rms';

  static associations = {
    users: { type: 'belongs_to', key: 'user_id' },
    exercises: { type: 'belongs_to', key: 'exercise_id' },
  };

  @field('user_id') userId;
  @field('exercise_id') exerciseId;
  @field('weight') weight;
  @date('date') date;
  @date('created_at') createdAt;
  @date('updated_at') updatedAt;
  
  @relation('users', 'user_id') user;
  @relation('exercises', 'exercise_id') exercise;
}
