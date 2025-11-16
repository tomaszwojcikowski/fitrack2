import { Model } from '@nozbe/watermelondb';
import { field, date } from '@nozbe/watermelondb/decorators';

export default class User extends Model {
  static table = 'users';

  @field('name') name;
  @field('email') email;
  @date('created_at') createdAt;
  @date('updated_at') updatedAt;
}
