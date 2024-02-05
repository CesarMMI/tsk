import { NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { BadgeComponent } from '../../shared/components/badge/badge.component';
import { CalendarComponent } from '../../shared/components/calendar/calendar.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { TasksState } from '../../shared/data-access/states/task.state';
import { IconDirective } from '../../shared/directives/icon.directive';
import { Task } from '../../shared/types/models/task';
import { TaskFormComponent } from './ui/task-form/task-form.component';
import { TasksListComponent } from './ui/tasks-list/tasks-list.component';

@Component({
	standalone: true,
	imports: [
		HeaderComponent,
		TaskFormComponent,
		TasksListComponent,
		CalendarComponent,
		IconDirective,
		BadgeComponent,
		NgClass,
	],
	selector: 'tsk-tasks',
	template: `
		<tsk-header title="Tasks">
			<div class="flex items-center gap-2" actions>
				@for (opt of doneOpts; track $index) {
					<tsk-badge
						class="cursor-pointer transition-colors"
						[ngClass]="
							tasksState.doneFilter() === opt.value
								? 'bg-neutral-800'
								: 'bg-tranparent hover:bg-neutral-800'
						"
						[text]="opt.label"
						(click)="tasksState.doneFilter.set(opt.value)"
					/>
				}
			</div>
		</tsk-header>

		<div class="overflow-hidden rounded border border-neutral-800">
			<tsk-task-form [task]="currEdit()" (submitEvent)="onSubmit($event)" />
		</div>

		<div class="overflow-hidden rounded border border-neutral-800">
			<tsk-tasks-list
				[tasks]="tasks()"
				(checkEvent)="onCheck($event)"
				(deleteEvent)="onDelete($event)"
				(editEvent)="currEdit.set($event)"
			/>
		</div>
	`,
	host: { class: 'grid gap-4' },
})
export class TasksComponent {
	public tasksState = inject(TasksState);

	public tasks = this.tasksState.tasks;
	public currEdit = signal<Partial<Task>>({});
	public doneOpts = [
		{ label: 'All', value: null },
		{ label: 'To do', value: false },
		{ label: 'Done', value: true },
	];

	public onSubmit(task: Partial<Task>) {
		const action = task.id ? 'editTask' : 'addTask';
		this.tasksState[action](task);
		this.currEdit.set({});
	}

	public onDelete(task: Task) {
		this.tasksState.deleteTask(task.id);
	}

	public onCheck(task: Task) {
		this.tasksState.editTask({ ...task, done: !task.done });
	}
}
