import { Inject, Injectable } from '@nestjs/common';
import { ServerError } from 'src/shared/classes/server-error.class';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from '../../database/entities/task.entity';
import { Tag } from 'src/database/entities/tag.entity';
import { TagService } from '../tag/tag.service';

@Injectable()
export class TaskService {
	constructor(
		@Inject('TASK_REPOSITORY')
		private taskRepository: Repository<Task>,
		private tagService: TagService
	) {}

	private async _getTags(tagsIds: string[]) {
		if (!tagsIds) return;

		const tags: Tag[] = [];
		if (tagsIds)
			for (const tagId of tagsIds) {
				const tag = await this.tagService.findOne(tagId);
				tags.push(tag);
			}
		return tags;
	}

	async create(dto: CreateTaskDto) {
		const tags = await this._getTags(dto.tagsIds);
		
		const task = await this.taskRepository.save({
			title: dto.title,
			description: dto.description,
			deadline: dto.deadline,
			tags: tags?.length > 0 ? tags : undefined,
		});

		if (!task) throw new ServerError(500, 'internal server error');
		else return task;
	}

	async findAll() {
		return await this.taskRepository.find();
	}

	async findOne(id: string) {
		const task = await this.taskRepository.findOneBy({ id });

		if (!task) throw new ServerError(404, 'task not found');
		return task;
	}

	async update(id: string, dto: UpdateTaskDto) {
		const task = await this.findOne(id);
		const tags = await this._getTags(dto.tagsIds);

		let doneAt: Date = undefined;
		if(dto.done) doneAt = new Date();

		const result = await this.taskRepository.update(
			{ id: task.id },
			{
				title: dto.title,
				done: dto.done,
				doneAt, 
				description: dto.description,
				deadline: dto.deadline,
				tags: tags?.length > 0 ? tags : undefined,
			}
		);

		if (result.affected < 1) throw new ServerError(500, 'internal server error');
		return { ...task, ...dto };
	}

	async remove(id: string) {
		const task = await this.findOne(id);

		const result = await this.taskRepository.delete({ id: task.id });

		if (result.affected < 1) throw new ServerError(500, 'internal server error');
		else return 'OK';
	}
}
