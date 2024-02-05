import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, first, map, switchMap } from 'rxjs';
import { stateManagerFactory } from '../../../core/functions/state-manage-factory';
import { Task } from '../../types/models/task';
import { DateUtils } from '../../utils/date.utils';
import { TaskService } from '../services/task.service';

@Injectable({
	providedIn: 'root',
})
export class TasksState {
	private _taskService = inject(TaskService);

	private _state = stateManagerFactory({
		initialState: [],
		source$: this._taskService.readAll().pipe(first()),
		actions: {
			add: (state: Task[], action$: Observable<Partial<Task>>) =>
				action$.pipe(
					switchMap((task) => this._taskService.create(task)),
					map((task) => [...state, task]),
				),
			edit: (state: Task[], action$: Observable<Partial<Task>>) =>
				action$.pipe(
					switchMap((task) => this._taskService.update(task.id!, task)),
					map((task) => [...state.filter((t) => t.id !== task.id), task]),
				),
			delete: (state: Task[], action$: Observable<string>) =>
				action$.pipe(
					switchMap((id) => this._taskService.delete(id)),
					map((task) => state.filter((t) => t.id !== task.id)),
				),
		},
	});

	readonly doneFilter = signal<boolean | null>(false);

	readonly tasks = computed(() =>
		this._state
			.value()
			.sort((a, b) => {
				// Done
				if (a.done && !b.done) return 1;
				if (!a.done && b.done) return -1;
				// Deadline
				const deadlineDiff = DateUtils.compareDatesString(a.deadline, b.deadline);
				if (deadlineDiff !== 0) return deadlineDiff;
				// Created At
				return DateUtils.compareDatesString(b.createdAt, a.createdAt);
			})
			.filter((tag) =>
				typeof this.doneFilter() === 'boolean'
					? tag.done === this.doneFilter()
					: true,
			),
	);

	addTask(task: Partial<Task>) {
		this._state.actions?.add.next(task);
	}

	editTask(task: Partial<Task>) {
		this._state.actions?.edit.next(task);
	}

	deleteTask(id: string) {
		this._state.actions?.delete.next(id);
	}
}
