import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../types/models/task';
import { BadgeComponent } from '../badge/badge.component';
import { ButtonDirective } from '../../directives/button.directive';
import { IconComponent } from '../icon/icon.component';

@Component({
	standalone: true,
	selector: 'tsk-tasks-list',
	imports: [CommonModule, BadgeComponent, ButtonDirective, IconComponent],
	template: `
		@for (task of tasks; track task.id) {
			<div class="grid border-b border-neutral-800 p-2 text-neutral-50">
				<div class="flex items-center gap-4">
					<!-- Title -->
					<span class="text-base">{{ task.title }}</span>
					<span class="flex-1"></span>
					<!-- Deadline -->
					@if (task.deadline) {
						<span class="text-sm text-neutral-500">{{ task.deadline | date }}</span>
					}
					<!-- Tag -->
					@if (task.tag) {
						<tsk-badge [text]="task.tag.name" [color]="task.tag.color" />
					}
				</div>
				<div>
					<!-- Description -->
					<span class="text-neutral-500">{{ task.description }}</span>
				</div>
			</div>
		}
		<button tskButton class="flex w-full justify-center gap-2" (click)="add.emit()">
			<tsk-icon>add</tsk-icon>
			<span>Add Task</span>
		</button>
	`,
})
export class TasksListComponent {
	@Input() tasks: Task[] = [];
	@Output() add = new EventEmitter<void>();
}
