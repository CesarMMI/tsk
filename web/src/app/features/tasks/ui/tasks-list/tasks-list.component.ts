import { DatePipe, NgClass, NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconDirective } from '../../../../shared/directives/icon.directive';
import { Task } from '../../../../shared/types/models/task';
import { BadgeComponent } from '../../../../shared/components/badge/badge.component';

@Component({
	standalone: true,
	selector: 'tsk-tasks-list',
	imports: [NgClass, DatePipe, IconDirective, NgStyle, BadgeComponent],
	template: `
		<table>
			@for (task of tasks; track task.id) {
				<tr class="border-b border-neutral-800 last:border-none">
					<!-- Check -->
					<td class="p-2 pr-0 align-top">
						<span
							tskIcon
							class="cursor-pointer text-lg text-neutral-700 transition-colors hover:text-neutral-50"
							(click)="checkEvent.emit(task)"
						>
							check
						</span>
					</td>
					<!-- Title/Description -->
					<td class="w-full p-2">
						<div class="grid">
							<!-- Title -->
							<span
								class="text-base"
								[ngClass]="{ 'text-neutral-700 line-through': task.done }"
								>{{ task.title }}</span
							>
							<!-- Description -->
							<span
								class="text-neutral-500"
								[ngClass]="{ 'text-neutral-700 line-through': task.done }"
								>{{ task.description }}</span
							>
						</div>
					</td>
					<!-- Tag -->
					<td class="whitespace-nowrap p-2 align-top">
						@if (task.tag) {
							<tsk-badge [text]="task.tag.title" />
						}
					</td>
					<!-- Deadline -->
					<td class="whitespace-nowrap p-2 align-top">
						@if (task.deadline) {
							<span
								class="text-sm text-neutral-500"
								[ngClass]="{ 'text-neutral-700 line-through': task.done }"
								>{{ task.deadline | date }}</span
							>
						}
					</td>
					<!-- Delete/Edit -->
					<td class="flex gap-2 p-2 align-top">
						<!-- Delete -->
						<span
							tskIcon
							class="cursor-pointer text-base text-neutral-500 transition-colors hover:text-red-400"
							(click)="deleteEvent.emit(task)"
						>
							delete
						</span>
						<!-- Edit -->
						<span
							tskIcon
							class="cursor-pointer text-base text-neutral-500 transition-colors hover:text-neutral-50"
							(click)="editEvent.emit(task)"
						>
							edit
						</span>
					</td>
				</tr>
			}
		</table>
	`,
})
export class TasksListComponent {
	@Input() tasks: Task[] = [];

	@Output() checkEvent = new EventEmitter<Task>();
	@Output() deleteEvent = new EventEmitter<Task>();
	@Output() editEvent = new EventEmitter<Task>();
}
