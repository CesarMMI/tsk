import { Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, map, of, switchMap } from 'rxjs';
import { WriteTaskRequest } from '../../types/api/write-task.request';
import { Task } from '../../types/models/task';
import { TaskState } from '../states/task.state';
import { TaskService } from '../services/task.service';

@Injectable({
  providedIn: 'root',
})
export class TaskFacade {
  constructor(
    private _taskState: TaskState,
    private _taskService: TaskService,
  ) {
    this._taskState.refresh();
  }

  private _sortTasks = (a: Task, b: Task) => {
    if (a.done && !b.done) return 1;
    if (!a.done && b.done) return -1;

    if (a.deadline && !b.deadline) return -1;
    if (!a.deadline && b.deadline) return 1;

    if (a.deadline && b.deadline) {
      return a.deadline !== b.deadline ? (a.deadline > b.deadline ? 1 : -1) : 0;
    }

    return a.createdAt !== b.createdAt
      ? a.createdAt > b.createdAt
        ? 1
        : -1
      : 0;
  };

  public getTask$(obs$: Observable<string>) {
    return obs$.pipe(takeUntilDestroyed()).pipe(
      switchMap((tagId) =>
        this._taskState.value$.pipe(
          map((tasks) => tasks ?? []),
          map((tasks) => tasks.find((task) => task.id === tagId)),
          map((task) => task ?? {})
        )
      )
    ) as Observable<Partial<Task>>;
  }

  public getTasks$(
    obs$?: Observable<{
      tagId?: string;
      filter?: string;
    }>
  ) {
    return (obs$ ?? of({ tagId: undefined, filter: 'all' })).pipe(
      takeUntilDestroyed(),
      switchMap((params) =>
        this._taskState.value$.pipe(
          map((tasks) => tasks ?? []),
          map((tasks) => {
            if (params.tagId) {
              tasks = tasks.filter((task) => task.tag?.id === params.tagId);
            }
            if (params.filter && params.filter !== 'all') {
              tasks = tasks.filter((task) =>
                params.filter === 'done' ? task.done : !task.done
              );
            }

            return tasks;
          })
        )
      ),
      map((res) => res.sort(this._sortTasks))
    );
  }

  public createTask(task: WriteTaskRequest) {
    return this._taskService.create(task).pipe(
      
    )
    this._taskState.createTask(task);
  }

  public updateTask(task: WriteTaskRequest) {
    return this._taskState.updateTask(task);
  }
}
