import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'tsk-input-toggle-chip',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './input-toggle-chip.component.html',
	styleUrl: './input-toggle-chip.component.scss',
})
export class InputToggleChipComponent {
	@Input({ required: true }) value: any;
	@Output() valueChange = new EventEmitter<any>();

	@Input({ required: true })
	options: { label: string; value: any }[] = [];
}
