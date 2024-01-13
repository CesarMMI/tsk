import { Inject, Injectable } from '@nestjs/common';
import { Tag } from 'src/database/entities/tag.entity';
import { ServerError } from 'src/shared/classes/server-error.class';
import { Repository } from 'typeorm';
import { Task } from '../../database/entities/task.entity';
import { TagService } from '../tag/tag.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
	constructor(
		@Inject('TASK_REPOSITORY')
		private taskRepository: Repository<Task>,
		private tagService: TagService
	) {}

	async create(dto: CreateTaskDto) {
		let tag = undefined;
		if (dto.tagId) tag = await this.tagService.findOne(dto.tagId);

		const task = await this.taskRepository.save({
			title: dto.title,
			description: dto.description,
			deadline: dto.deadline,
			tag,
		});

		if (!task) throw new ServerError(500, 'internal server error');
		else return task;
	}

	async findAll(tagId?: string) {
		return await this.taskRepository.find({ where: { tag: { id: tagId } } });
	}

	async findOne(id: string) {
		const task = await this.taskRepository.findOneBy({ id });

		if (!task) throw new ServerError(404, 'task not found');
		return task;
	}

	async update(id: string, dto: UpdateTaskDto) {
		const task = await this.findOne(id);
		let tag: Tag = null;
		if (dto.tagId) tag = await this.tagService.findOne(dto.tagId);

		let doneAt: Date = undefined;
		if (dto.done) doneAt = new Date();
		delete dto.tagId;

		const result = await this.taskRepository.update(
			{ id: task.id },
			{
				...task,
				...dto,
				id,
				doneAt,
				tag,
			}
		);

		if (result.affected < 1) throw new ServerError(500, 'internal server error');
		return { ...task, ...dto, tag };
	}

	async remove(id: string) {
		const task = await this.findOne(id);

		const result = await this.taskRepository.delete({ id: task.id });

		if (result.affected < 1) throw new ServerError(500, 'internal server error');
		else return task;
	}
}
