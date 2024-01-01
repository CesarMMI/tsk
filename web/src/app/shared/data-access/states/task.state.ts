import { Injectable } from '@angular/core';
import { catchError, first, map, of } from 'rxjs';
import { StateManager } from '../../../core/classes/state-manager';
import { WriteTaskRequest } from '../../types/api/write-task.request';
import { Task } from '../../types/models/task';
import { TaskService } from '../services/task.service';
import { TagState } from './tag.state';

@Injectable({
  providedIn: 'root',
})
export class TaskState extends StateManager<Task[]> {
  constructor(private _tagState: TagState, private _taskService: TaskService) {
    super();
  }

  public pushTask(task: Task, tagId?: string) {
    const tag = this._tagState.value?.find((tag) => tag.id === tagId);

    const value = (this.value ?? [])
      .slice()
      .filter((t) => t.id !== task?.id)
      .concat({ ...task, tag });

    this.setValue(value);
  }

  public refresh(params?: { [key: string]: any }) {
    this._taskService
      .readAll()
      .pipe(first())
      .subscribe((res) => this.setValue(res));
  }

  public updateTask(task: WriteTaskRequest) {
    if (!task.id) return of(false);
    return this._taskService.update(task.id, task).pipe(
      first(),
      catchError((_) => of(false)),
      map((res) => {
        if (typeof res !== 'boolean') this.pushTask(res, task.tagId);
        return !!res;
      })
    );
  }

  public createTask(task: WriteTaskRequest) {
    return this._taskService.create(task).pipe(
      first(),
      catchError((_) => of(false)),
      map((res) => {
        if (typeof res !== 'boolean') this.pushTask(res, task.tagId);
        return !!res;
      })
    );
  }
}
