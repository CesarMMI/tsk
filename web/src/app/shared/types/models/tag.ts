import { Task } from './task';

export interface Tag {
  id: string;
  name: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
  tasks?: Task[];
}
