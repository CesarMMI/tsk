import { Tag } from './tag';

export type Task = {
  id: string;
  title: string;
  description?: string;
  done: boolean;
  doneAt?: Date;
  deadline?: Date;
  createdAt: Date;
  updatedAt: Date;
  tag?: Tag;
};
