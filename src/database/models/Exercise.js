import { Model } from '@nozbe/watermelondb';
import { field, date, relation } from '@nozbe/watermelondb/decorators';

export default class Exercise extends Model {
  static table = 'exercises';

  static associations = {
    users: { type: 'belongs_to', key: 'user_id' },
  };

  @field('name') name;
  @field('description') description;
  @field('video_url') videoUrl;
  @field('is_custom') isCustom;
  @field('user_id') userId;
  @date('created_at') createdAt;
  @date('updated_at') updatedAt;
  
  @relation('users', 'user_id') user;
}
