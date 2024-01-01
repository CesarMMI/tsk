import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { TaskViewDetailData } from './types/task-view-detail-data';
import { TaskViewDetailFormComponent } from './components/task-view-detail-form/task-view-detail-form.component';
import { TagFacade } from '../../shared/data-access/facades/tag.facade';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { WriteTaskRequest } from '../../shared/types/api/write-task.request';
import { first, tap } from 'rxjs';
import { TaskFacade } from '../../shared/data-access/facades/task.facade';

@Component({
  selector: 'tsk-task-view-detail',
  standalone: true,
  imports: [CommonModule, HeaderComponent, TaskViewDetailFormComponent],
  template: `
    @if(data.task; as task){
    <div class="wrapper">
      <tsk-header [title]="task.id ? 'Edit ' + task.title : 'Create Task'" />
      <div class="form">
        <tsk-task-view-detail-form
          [task]="task"
          [tags]="(tags$ | async) ?? []"
          (cancelEvent)="onEvent()"
          (submitEvent)="onEvent($event)"
        />
      </div>
    </div>
    }
  `,
  styles: `
    .wrapper {
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: 0 var(--padding-md);
    }

    .form {
      flex: 1 1 auto;
    }
  `,
})
export class TaskViewDetailComponent {
  private _tagFacade = inject(TagFacade);
  private _taskFacade = inject(TaskFacade);
  private _dialogRef = inject(MatDialogRef<TaskViewDetailComponent>);

  public tags$ = this._tagFacade.getTags$();

  constructor(@Inject(MAT_DIALOG_DATA) public data: TaskViewDetailData) {}

  onEvent(task?: WriteTaskRequest) {
    if (!task) {
      this._dialogRef.close();
      return;
    }

    const action = task.id ? 'updateTask' : 'createTask';
    this._taskFacade[action](task)
      .pipe(first())
      .subscribe((success) => (success ? this._dialogRef.close() : null));
  }
}
