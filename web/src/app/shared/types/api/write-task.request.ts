import { Task } from '../models/task';

export interface WriteTaskRequest extends Omit<Partial<Task>, 'tag'> {
  tagId?: string;
}
