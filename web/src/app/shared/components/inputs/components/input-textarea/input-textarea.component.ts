import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { getValueAccessor } from '../../functions/value-accessor.utils';
import { InputBaseComponent } from '../input-base/input-base.component';

@Component({
  standalone: true,
  selector: 'tsk-input-textarea',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [getValueAccessor(InputTextareaComponent)],
  template: `
    <span class="label">{{ label }}</span>
    <textarea
      class="input"
      [cols]="cols"
      [rows]="rows"
      [value]="value"
      [placeholder]="placeholder"
      (focusout)="markAsTouched()"
      (input)="onInput($any($event.target).value)"
    ></textarea>
  `,
  styleUrl: './../../styles/input.style.scss',
  styles: '.input { resize: vertical; }',
  host: { class: 'tsk-input-textarea' },
})
export class InputTextareaComponent extends InputBaseComponent<string> {
  @Input() cols: number | string = 1;
  @Input() rows: number | string = 2;
}
