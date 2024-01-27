import { DatePipe, NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconDirective } from '../../directives/icon.directive';
import { Task } from '../../types/models/task';

@Component({
	standalone: true,
	selector: 'tsk-tasks-list',
	imports: [NgClass, DatePipe, IconDirective],
	template: `
		@for (task of tasks; track task.id) {
			<div
				class="flex gap-2 bg-neutral-900 p-2 transition-colors hover:bg-neutral-800"
			>
				<div>
					<!-- Check -->
					<span
						tskIcon
						class="cursor-pointer text-lg text-neutral-700 transition-colors hover:text-neutral-50"
						(click)="checkEvent.emit(task)"
					>
						check
					</span>
				</div>
				<div class="grid flex-1 gap-2 text-neutral-50">
					<div class="flex items-center gap-4">
						<!-- Title -->
						<span
							class="text-base"
							[ngClass]="{ 'text-neutral-500 line-through': task.done }"
							>{{ task.title }}</span
						>
						<span class="flex-1"></span>
						<!-- Tag -->
						@if (task.tag) {
							<span class="rounded bg-neutral-700 px-1 text-sm text-neutral-400">{{
								task.tag.title
							}}</span>
						}
						<!-- Deadline -->
						@if (task.deadline) {
							<span class="text-sm text-neutral-500">{{ task.deadline | date }}</span>
						}
						<!-- Actions -->
						<div class="flex gap-2">
							<!-- Delete -->
							<span
								tskIcon
								class="cursor-pointer text-base text-neutral-900 transition-colors hover:text-red-400"
								(click)="deleteEvent.emit(task)"
							>
								delete
							</span>
							<!-- Edit -->
							<span
								tskIcon
								class="cursor-pointer text-base text-neutral-900 transition-colors hover:text-neutral-300"
								(click)="editEvent.emit(task)"
							>
								edit
							</span>
						</div>
					</div>
					@if (task.description) {
						<div>
							<!-- Description -->
							<span class="text-neutral-500">{{ task.description }}</span>
						</div>
					}
				</div>
			</div>
		}
	`,
	host: { class: 'grid divide-y divide-neutral-800' },
})
export class TasksListComponent {
	@Input() tasks: Task[] = [];

	@Output() checkEvent = new EventEmitter<Task>();
	@Output() deleteEvent = new EventEmitter<Task>();
	@Output() editEvent = new EventEmitter<Task>();
}
