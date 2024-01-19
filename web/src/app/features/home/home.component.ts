import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TaskListComponent } from '../../shared/components/task-list/task-list.component';
import { TasksState } from '../../shared/data-access/states/task.state';
import { Task } from '../../shared/types/models/task';
import { TaskEditComponent } from '../task-edit/task-edit.component';
import { CalendarComponent } from '../../shared/components/calendar/calendar.component';

@Component({
  selector: 'tsk-home',
  standalone: true,
  imports: [
    CommonModule,
    TaskListComponent,
    TaskEditComponent,
    CalendarComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./../../shared/styles/header.scss', './home.component.scss'],
})
export class HomeComponent {
  private _tasksState = inject(TasksState);
  private _formBuilder = inject(FormBuilder);

  public tasks = this._tasksState.tasks;
  public loaded = this._tasksState.loaded;

  public isEditing = false;

  public form = this._formBuilder.group({
    title: '',
    description: '',
  });

  onEdit(task?: Task) {
    this.isEditing = true;
  }
  onCheck(task: Task) {
    this._tasksState.editTask({ ...task, tagId: task?.tag?.id });
  }
  onDelete(id: string) {
    this._tasksState.deleteTask(id);
  }
}
