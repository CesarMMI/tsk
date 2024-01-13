import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { CrudService } from '../../../core/services/crud.service';
import { Task } from '../../types/models/task';
import { DateUtils } from '../../utils/date.utils';

@Injectable({
	providedIn: 'root',
})
export class TaskService extends CrudService<Task> {
	override _baseUrl = 'http://localhost:3000/tasks';

	override readAll() {
		return super
			.readAll()
			.pipe(
				map((tasks) =>
					tasks.map((task) =>
						DateUtils.stringToDate(task, [
							'createdAt',
							'updatedAt',
							'deadline',
							'doneAt',
						])
					)
				)
			);
	}

	override create(value: Partial<Task>) {
		return super
			.create(value)
			.pipe(
				map((task) =>
					DateUtils.stringToDate(task, [
						'createdAt',
						'updatedAt',
						'deadline',
						'doneAt',
					])
				)
			);
	}

	override update(id: string, value: Partial<Task>) {
		return super
			.update(id, value)
			.pipe(
				map((task) =>
					DateUtils.stringToDate(task, [
						'createdAt',
						'updatedAt',
						'deadline',
						'doneAt',
					])
				)
			);
	}
}
