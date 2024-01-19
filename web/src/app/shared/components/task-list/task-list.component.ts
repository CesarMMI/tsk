import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TskBadgeComponent, TskIconComponent } from 'tsk-web-library';
import { Task } from '../../types/models/task';
import { InputCheckComponent } from '../inputs/components/input-check/input-check.component';

@Component({
  selector: 'tsk-task-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TskIconComponent,
    TskBadgeComponent,
    InputCheckComponent,
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
