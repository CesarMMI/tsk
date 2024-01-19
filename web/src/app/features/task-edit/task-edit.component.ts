import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputDateComponent } from '../../shared/components/inputs/components/input-date/input-date.component';
import { InputTextComponent } from '../../shared/components/inputs/components/input-text/input-text.component';
import { InputTextareaComponent } from '../../shared/components/inputs/components/input-textarea/input-textarea.component';

@Component({
  selector: 'tsk-task-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextComponent,
    InputTextareaComponent,
    InputDateComponent,
  ],
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskEditComponent {
  private _fb = inject(FormBuilder);

  form = this._fb.group({
    title: ['', Validators.required],
    description: [''],
    deadline: [''],
    tagId: [''],
  });

  get valores() {
    return Object.keys(this.form.value).map((key) => [
      key,
      this.form.get(key)!.value,
    ]);
  }
}
