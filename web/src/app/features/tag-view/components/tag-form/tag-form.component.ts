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
import { MatInputModule } from '@angular/material/input';
import { Tag } from '../../../../shared/types/models/tag';

@Component({
  selector: 'tsk-tag-form',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './tag-form.component.html',
  styleUrl: './tag-form.component.scss',
})
export class TagFormComponent {
  private _formBuilder = inject(UntypedFormBuilder);

  @Input({ required: true })
  public tag: Partial<Tag> = {};

  @Output()
  public submitEvent = new EventEmitter<Partial<Tag>>();
  @Output()
  public cancelEvent = new EventEmitter<void>();

  public form = this._formBuilder.group({
    id: [null],
    name: [null, Validators.required],
    color: [null, Validators.required],
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tag'])
      this.form.patchValue({ ...changes['tag'].currentValue });
  }
}
