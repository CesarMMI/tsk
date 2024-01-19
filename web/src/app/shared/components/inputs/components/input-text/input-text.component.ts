import { ChangeDetectionStrategy, Component } from '@angular/core';
import { getValueAccessor } from '../../functions/value-accessor.utils';
import { InputBaseComponent } from '../input-base/input-base.component';

@Component({
  standalone: true,
  selector: 'tsk-input-text',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [getValueAccessor(InputTextComponent)],
  template: `
    <span class="label">{{ label }}</span>
    <ng-content select="[prefix]"></ng-content>
    <input
      class="input"
      type="text"
      [value]="value"
      [placeholder]="placeholder"
      (focusout)="markAsTouched()"
      (input)="onInput($any($event.target).value)"
    />
    <ng-content select="[suffix]"></ng-content>
  `,
  styleUrl: './../../styles/input.style.scss',
  host: { class: 'tsk-input-text' },
})
export class InputTextComponent extends InputBaseComponent<string> {}
