import { Task } from './task';

export type Tag = {
	id: string;
	title: string;
	createdAt: string;
	updatedAt: string;
	tasks?: Task[];
};
