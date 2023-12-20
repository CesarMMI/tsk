import { Inject, Injectable } from '@nestjs/common';
import { Tag } from 'src/database/entities/tag.entity';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { ServerError } from 'src/shared/classes/server-error.class';

@Injectable()
export class TagService {
	constructor(
		@Inject('TAG_REPOSITORY')
		private tagRepository: Repository<Tag>
	) {}

	async create(dto: CreateTagDto) {
		const tag = await this.tagRepository.save({
			name: dto.name,
			color: dto.color,
		});

		if (!tag) throw new ServerError(500, 'internal server error');
		else return tag;
	}

	async findAll() {
		return await this.tagRepository.find();
	}

	async findOne(id: string) {
		const task = await this.tagRepository.findOneBy({ id });

		if (!task) throw new ServerError(404, 'tag not found');
		return task;
	}

	async update(id: string, dto: UpdateTagDto) {
		const tag = await this.findOne(id);

		const result = await this.tagRepository.update(
			{ id: tag.id },
			{
				name: dto.name ?? tag.name,
				color: dto.color ?? tag.color,
			}
		);

		if (result.affected < 1) throw new ServerError(500, 'internal server error');
		return { ...tag, ...dto };
	}

	async remove(id: string) {
		const tag = await this.findOne(id);

		const result = await this.tagRepository.delete({ id: tag.id });

		if (result.affected < 1) throw new ServerError(500, 'internal server error');
		else return 'OK';
	}
}
