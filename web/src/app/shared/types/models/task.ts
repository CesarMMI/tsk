import { Tag } from './tag';

export type Task = {
	id: string;
	title: string;
	description?: string;
	done: boolean;
	doneAt?: string;
	deadline?: string;
	createdAt: string;
	updatedAt: string;
	tag?: Tag;
};
