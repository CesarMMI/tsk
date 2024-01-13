export type WriteTask = {
	id?: string;
	title: string;
	description?: string;
	done: boolean;
	deadline?: Date;
	tagId?: string;
};
