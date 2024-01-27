import { Injectable, computed } from '@angular/core';
import { Observable, catchError, first, map, of, switchMap } from 'rxjs';
import { StateManager } from '../../../core/classes/state-manager';
import { StateManagerData } from '../../../core/types/state-manager-data';
import { Task } from '../../types/models/task';
import { DateUtils } from '../../utils/date.utils';
import { TaskService } from '../services/task.service';

@Injectable({
	providedIn: 'root',
})
export class TasksState extends StateManager<Task[]> {
	// Readables
	readonly loaded = computed(() => this.state().loaded);
	readonly error = computed(() => this.state().error);
	readonly tasks = computed(() =>
		this.state().value.sort((a, b) => {
			// Done
			if (a.done && !b.done) return 1;
			if (!a.done && b.done) return -1;
			// Deadline
			const deadlineDiff = DateUtils.compareDatesString(a.deadline, b.deadline);
			if (deadlineDiff !== 0) return deadlineDiff;
			// Created At
			return DateUtils.compareDatesString(b.createdAt, a.createdAt);
		}),
	);

	private _handleError = (state: StateManagerData<Task[]>, err: any) =>
		of({
			...state,
			error: err,
			loaded: true,
		});

	constructor(private _taskService: TaskService) {
		super({
			initialState: [],
			source$: _taskService.readAll().pipe(first()),
			sourceActions: {
				add: (
					state: StateManagerData<Task[]>,
					action$: Observable<Partial<Task>>,
				) =>
					action$.pipe(
						switchMap((task) => this._taskService.create(task)),
						map((task) => ({
							error: null,
							loaded: true,
							value: [...state.value, task],
						})),
						catchError((err) => this._handleError(err, state)),
					),
				edit: (
					state: StateManagerData<Task[]>,
					action$: Observable<Partial<Task>>,
				) =>
					action$.pipe(
						switchMap((task) => this._taskService.update(task.id!, task)),
						map((task) => ({
							error: null,
							loaded: true,
							value: [...state.value.filter((t) => t.id !== task.id), task],
						})),
						catchError((err) => this._handleError(err, state)),
					),
				delete: (
					state: StateManagerData<Task[]>,
					action$: Observable<string>,
				) =>
					action$.pipe(
						switchMap((id) => this._taskService.delete(id)),
						map((task) => ({
							error: null,
							loaded: true,
							value: state.value.filter((t) => t.id !== task.id),
						})),
						catchError((err) => this._handleError(err, state)),
					),
			},
		});
	}

	addTask(task: Partial<Task>) {
		this.actionsSub['add'].next(task);
		return this.getActionNotification('add');
	}

	editTask(task: Partial<Task>) {
		this.actionsSub['edit'].next(task);
		return this.getActionNotification('edit');
	}

	deleteTask(id: string) {
		this.actionsSub['delete'].next(id);
		return this.getActionNotification('delete');
	}
}
