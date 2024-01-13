import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'tsk-input-checkbox',
	standalone: true,
	imports: [CommonModule, MatIconModule],
	templateUrl: './input-checkbox.component.html',
	styleUrl: './input-checkbox.component.scss',
})
export class InputCheckboxComponent {
	@Input({ required: true }) value!: boolean;
	@Output() valueChange = new EventEmitter<boolean>();

	@Input() disabled: boolean = false;
}
