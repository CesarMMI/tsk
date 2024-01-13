import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { CrudService } from '../../../core/services/crud.service';
import { Tag } from '../../types/models/tag';
import { DateUtils } from '../../utils/date.utils';

@Injectable({
	providedIn: 'root',
})
export class TagService extends CrudService<Tag> {
	override _baseUrl = 'http://localhost:3000/tags';

	override readAll() {
		return super
			.readAll()
			.pipe(
				map((tags) =>
					tags.map((tag) => DateUtils.stringToDate(tag, ['createdAt', 'updatedAt']))
				)
			);
	}

	override create(value: Partial<Tag>) {
		return super
			.create(value)
			.pipe(map((tag) => DateUtils.stringToDate(tag, ['createdAt', 'updatedAt'])));
	}

	override update(id: string, value: Partial<Tag>) {
		return super
			.update(id, value)
			.pipe(map((tag) => DateUtils.stringToDate(tag, ['createdAt', 'updatedAt'])));
	}
}
