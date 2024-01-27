import { Component, inject } from '@angular/core';
import { first } from 'rxjs';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { TaskFormComponent } from '../../shared/components/task-form/task-form.component';
import { TasksListComponent } from '../../shared/components/tasks-list/tasks-list.component';
import { TasksState } from '../../shared/data-access/states/task.state';
import { Task } from '../../shared/types/models/task';
import { CalendarComponent } from '../../shared/components/calendar/calendar.component';

@Component({
	standalone: true,
	imports: [
		HeaderComponent,
		TaskFormComponent,
		TasksListComponent,
		CalendarComponent,
	],
	selector: 'tsk-tasks',
	template: `
		<tsk-header title="Tasks" />

		<div class="overflow-hidden rounded border border-neutral-800 bg-neutral-900">
			<tsk-task-form [task]="currEdit" (submitEvent)="onSubmit($event)" />
		</div>

		<div class="overflow-hidden rounded border border-neutral-800 bg-neutral-900">
			<tsk-tasks-list
				[tasks]="tasks()"
				(checkEvent)="onCheck($event)"
				(deleteEvent)="onDelete($event)"
				(editEvent)="currEdit = $event"
			/>
		</div>
	`,
	host: { class: 'grid gap-4' },
})
export class TasksComponent {
	private _tasksState = inject(TasksState);

	public currEdit: Partial<Task> = {};
	public tasks = this._tasksState.tasks;

	public onSubmit(task: Partial<Task>) {
		const action = task.id ? 'editTask' : 'addTask';

		this._tasksState[action](task)
			.pipe(first())
			.subscribe(
				(res) => (this.currEdit = !res.error && res.loaded ? {} : this.currEdit),
			);
	}

	public onDelete(task: Task) {
		this._tasksState.deleteTask(task.id);
	}

	public onCheck(task: Task) {
		this._tasksState.editTask({ ...task, done: !task.done });
	}
}
