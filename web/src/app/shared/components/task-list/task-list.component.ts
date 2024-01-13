import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Task } from '../../types/models/task';
import { InputCheckboxComponent } from '../inputs/input-checkbox/input-checkbox.component';

@Component({
	selector: 'tsk-task-list',
	standalone: true,
	imports: [
		CommonModule,
		FormsModule,
		MatButtonModule,
		MatIconModule,
		InputCheckboxComponent,
	],
	templateUrl: './task-list.component.html',
	styleUrls: ['./../../styles/list.scss', './task-list.component.scss'],
})
export class TaskListComponent {
	@Input({ required: true }) tasks: Task[] = [];

	@Output() taskClick = new EventEmitter<Task>();
	@Output() checkClick = new EventEmitter<Task>();
	@Output() deleteClick = new EventEmitter<Task>();

	@Input() showAdd: boolean = true;
	@Output() addClick = new EventEmitter<MouseEvent>();

	onCheckClick(event: Task) {
		this.checkClick.emit(event);
	}
}
