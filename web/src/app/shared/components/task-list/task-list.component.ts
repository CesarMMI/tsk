import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { Task } from '../../types/models/task';
import { CheckboxComponent } from '../checkbox/checkbox.component';

@Component({
  selector: 'tsk-task-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCheckboxModule,
    FormsModule,
    CheckboxComponent,
    MatIconModule,
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss', './../../styles/list.scss'],
})
export class TaskListComponent {
  @Input({ required: true }) tasks: Task[] = [];

  @Input() showAdd: boolean = true;
  @Output() addClick = new EventEmitter<void>();

  @Output() taskClick = new EventEmitter<Task>();
  @Output() checkClick = new EventEmitter<Task>();

  onCheckClick(event: Task) {
    this.checkClick.emit(event);
  }
}
