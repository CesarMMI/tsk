import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
import { startWith, map, first, combineLatest, tap, switchMap } from 'rxjs';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { TaskListComponent } from '../../../../shared/components/task-list/task-list.component';
import { TaskFacade } from '../../../../shared/data-access/facades/task.facade';
import { Task } from '../../../../shared/types/models/task';
import { combineLatestInit } from 'rxjs/internal/observable/combineLatest';
import { TagFacade } from '../../../../shared/data-access/facades/tag.facade';

@Component({
  selector: 'tsk-tag-view-list',
  standalone: true,
  imports: [
    CommonModule,
    TaskListComponent,
    HeaderComponent,
    MatExpansionModule,
    MatChipsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './tag-view-list.component.html',
  styleUrl: './tag-view-list.component.scss',
})
export class TagViewListComponent {
  private _router = inject(Router);
  private _tagFacade = inject(TagFacade);
  private _taskFacade = inject(TaskFacade);
  private _formBuilder = inject(FormBuilder);
  private _activatedRoute = inject(ActivatedRoute);

  public filterControl = this._formBuilder.control('all');

  public tag$ = this._tagFacade.getTag$(
    this._activatedRoute.paramMap.pipe(
      map((paramMap) => paramMap.get('id') ?? '')
    )
  );

  public tasks$ = this._taskFacade.getTasks$(
    combineLatest({
      paramMap: this._activatedRoute.paramMap,
      filter: this.filterControl.valueChanges.pipe(
        startWith(this.filterControl.value)
      ),
    }).pipe(
      map((value) => ({
        filter: value.filter ?? 'all',
        tagId: value.paramMap.get('id') ?? '',
      }))
    )
  );

  public onCheck(task: Task) {
    this._taskFacade
      .updateTask(task)
      .pipe(first())
      .subscribe(() => {});
  }

  public navigateTask(task?: Task) {
    if (task) this._router.navigate(['..', 'task', task.id]);
    else this._router.navigate(['..', 'task']);
  }
}
