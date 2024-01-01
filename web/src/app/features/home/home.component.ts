import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { first, map, startWith } from 'rxjs';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { TaskListComponent } from '../../shared/components/task-list/task-list.component';
import { TaskFacade } from '../../shared/data-access/facades/task.facade';
import { Task } from '../../shared/types/models/task';
import { MatDialog } from '@angular/material/dialog';
import { TaskViewDetailComponent } from '../task-view-detail/task-view-detail.component';

@Component({
  selector: 'tsk-home',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    MatChipsModule,
    ReactiveFormsModule,
    TaskListComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private _dialog = inject(MatDialog);
  private _taskFacade = inject(TaskFacade);
  private _formBuilder = inject(FormBuilder);

  public filterControl = this._formBuilder.control('all');

  public tasks$ = this._taskFacade.getTasks$(
    this.filterControl.valueChanges.pipe(
      startWith(this.filterControl.value),
      map((value) => ({ filter: value ?? 'all' }))
    )
  );

  public onCheck(task: Task) {
    this._taskFacade
      .updateTask(task)
      .pipe(first())
      .subscribe(() => {});
  }

  public navigateTask(task?: Task) {
    this._dialog.open(TaskViewDetailComponent, {
      height: '90vh',
      width: 'min(900px, 90vw)',
      data: {
        task: task ?? {},
      },
    });
    // if (task) this._dialog.navigate(['..', 'task', task.id]);
    // else this._dialog.navigate(['..', 'task']);
  }
}
