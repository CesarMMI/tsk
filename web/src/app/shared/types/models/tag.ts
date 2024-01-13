import { Task } from './task';

export type Tag = {
	id: string;
	name: string;
	color: string;
	createdAt: Date;
	updatedAt: Date;
	tasks?: Task[];
};
