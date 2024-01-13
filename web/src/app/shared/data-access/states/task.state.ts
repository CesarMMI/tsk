import { Injectable, computed } from '@angular/core';
import { Observable, catchError, first, map, of, switchMap } from 'rxjs';
import { StateManager } from '../../../core/classes/state-manager';
import { StateManagerData } from '../../../core/types/state-manager-data';
import { Task } from '../../types/models/task';
import { TaskService } from '../services/task.service';
import { WriteTask } from '../../types/api/write-task';

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
			if (a.deadline && !b.deadline) return -1;
			if (!a.deadline && b.deadline) return 1;
			if (a.deadline && b.deadline)
				return a.deadline.getTime() - b.deadline.getTime();
			// Created At
			return b.createdAt.getTime() - a.createdAt.getTime();
		})
	);

	constructor(private _taskService: TaskService) {
		super({
			initialState: [],
			source$: _taskService.readAll().pipe(first()),
			sourceActions: {
				add: (state, action$) => this._onAdd(state, action$),
				edit: (state, action$) => this._onEdit(state, action$),
				delete: (state, action$) => this._onDelete(state, action$),
			},
		});
	}

	private _handleError = (state: StateManagerData<Task[]>, err: any) =>
		of({
			...state,
			error: err,
			loaded: true,
		});

	private _onAdd = (
		state: StateManagerData<Task[]>,
		action$: Observable<WriteTask>
	) =>
		action$.pipe(
			switchMap((task) => this._taskService.create(task)),
			map((task) => ({
				error: null,
				loaded: true,
				value: [...state.value, task],
			})),
			catchError((err) => this._handleError(err, state))
		);

	private _onEdit = (
		state: StateManagerData<Task[]>,
		action$: Observable<WriteTask>
	) =>
		action$.pipe(
			switchMap((task) => this._taskService.update(task.id!, task)),
			map((task) => ({
				error: null,
				loaded: true,
				value: [...state.value.filter((t) => t.id !== task.id), task],
			})),
			catchError((err) => this._handleError(err, state))
		);

	private _onDelete = (
		state: StateManagerData<Task[]>,
		action$: Observable<string>
	) =>
		action$.pipe(
			switchMap((id) => this._taskService.delete(id)),
			map((task) => ({
				error: null,
				loaded: true,
				value: state.value.filter((t) => t.id !== task.id),
			})),
			catchError((err) => this._handleError(err, state))
		);

	addTask(task: WriteTask) {
		this.actionsSub['add'].next(task);
		return this.getActionNotification('add');
	}

	editTask(task: WriteTask) {
		this.actionsSub['edit'].next(task);
		return this.getActionNotification('edit');
	}

	deleteTask(id: string) {
		this.actionsSub['delete'].next(id);
		return this.getActionNotification('delete');
	}
}
