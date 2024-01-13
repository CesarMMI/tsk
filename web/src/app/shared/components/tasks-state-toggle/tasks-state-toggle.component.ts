import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputToggleChipComponent } from '../inputs/input-toggle-chip/input-toggle-chip.component';

@Component({
	selector: 'tsk-tasks-state-toggle',
	standalone: true,
	imports: [CommonModule, InputToggleChipComponent],
	templateUrl: './tasks-state-toggle.component.html',
	styleUrl: './tasks-state-toggle.component.scss',
})
export class TasksStateToggleComponent {
	@Input({ required: true }) value: boolean | null = false;
	@Output() valueChange = new EventEmitter<boolean | null>();

	options = [
		{ label: 'All', value: null },
		{ label: 'Todo', value: false },
		{ label: 'Done', value: true },
	];
}
