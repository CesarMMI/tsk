import { Task } from '../../../shared/types/models/task';

export interface TaskViewDetailData {
  task: Partial<Task>;
  tagId?: string;
}
