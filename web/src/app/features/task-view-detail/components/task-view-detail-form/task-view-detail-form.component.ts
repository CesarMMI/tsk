import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { WriteTaskRequest } from '../../../../shared/types/api/write-task.request';
import { Tag } from '../../../../shared/types/models/tag';
import { Task } from '../../../../shared/types/models/task';

@Component({
  selector: 'tsk-task-view-detail-form',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSelectModule,
    MatIconModule,
  ],
  templateUrl: './task-view-detail-form.component.html',
  styleUrl: './task-view-detail-form.component.scss',
})
export class TaskViewDetailFormComponent {
  private _formBuilder = inject(UntypedFormBuilder);

  @Input({ required: true })
  public task: Partial<Task> = {};

  @Input({ required: true })
  public tags: Tag[] = [];

  @Output()
  public submitEvent = new EventEmitter<WriteTaskRequest>();
  @Output()
  public cancelEvent = new EventEmitter<void>();

  public form = this._formBuilder.group({
    id: [null],
    title: [null, Validators.required],
    description: [null],
    done: [false],
    doneAt: [null],
    deadline: [null],
    createdAt: [null],
    updatedAt: [null],
    tagId: [null],
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task']) {
      this.form.patchValue({
        ...changes['task'].currentValue,
        tagId: changes['task'].currentValue.tag?.id,
      });
    }
  }
}
