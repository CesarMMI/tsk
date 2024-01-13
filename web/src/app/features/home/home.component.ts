import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TaskListComponent } from '../../shared/components/task-list/task-list.component';
import { TasksStateToggleComponent } from '../../shared/components/tasks-state-toggle/tasks-state-toggle.component';
import { TasksState } from '../../shared/data-access/states/task.state';
import { MatDialog } from '@angular/material/dialog';
import { TaskEditComponent } from '../task/task-edit/task-edit.component';
import { Task } from '../../shared/types/models/task';

@Component({
	selector: 'tsk-home',
	standalone: true,
	imports: [CommonModule, TaskListComponent, TasksStateToggleComponent],
	templateUrl: './home.component.html',
	styleUrls: ['./../../shared/styles/header.scss', './home.component.scss'],
})
export class HomeComponent {
	private _dialog = inject(MatDialog);
	private _tasksState = inject(TasksState);

	public tasks = this._tasksState.tasks;
	public loaded = this._tasksState.loaded;

	onEdit(task?: Task) {
		this._dialog.open(TaskEditComponent, {
			width: 'min(90vw, 600px)',
			data: task ?? null,
		});
	}
	onCheck(task: Task) {
		this._tasksState.editTask({ ...task, tagId: task?.tag?.id });
	}
	onDelete(id: string) {
		this._tasksState.deleteTask(id);
	}
}
