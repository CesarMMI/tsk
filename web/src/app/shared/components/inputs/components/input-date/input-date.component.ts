import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { getValueAccessor } from '../../functions/value-accessor.utils';
import { InputBaseComponent } from '../input-base/input-base.component';
import { TskIconComponent } from 'tsk-web-library';

@Component({
  standalone: true,
  selector: 'tsk-input-date',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [getValueAccessor(InputDateComponent)],
  imports: [TskIconComponent],
  template: `
    <span class="label">{{ label }}</span>
    <ng-content select="[prefix]"></ng-content>
    <input
      #inputRef
      class="input"
      type="text"
      [value]="value"
      [placeholder]="placeholder"
      (focusout)="markAsTouched()"
      (input)="onInput($any($event.target).value)"
    />
    <tsk-icon class="tsk-input-date-icon">calendar_month</tsk-icon>

    <dialog class="dialog" #dialogRef>olá mundo :D</dialog>
  `,
  host: { class: 'tsk-input-date' },
  styleUrl: './../../styles/input.style.scss',
  styles: `
    .input {
      cursor: pointer;
    }

    .tsk-input-date-icon {
      color: var(--color-text-100);
    }

    .dialog {
      top: 0;
      left: 0;
      width: 100%;
      box-sizing: border-box;
      
      margin: 0;
      padding: 0;
      border-radius: var(--size-sm);
      border: 1px solid var(--border-color);
    }
  `,
})
export class InputDateComponent extends InputBaseComponent<string> {
  @ViewChild('inputRef') inputRef?: ElementRef<HTMLInputElement>;
  @ViewChild('dialogRef') dialogRef?: ElementRef<HTMLDialogElement>;

  @HostListener('focusin', ['$event'])
  public onFocusIn(ev: Event) {
    if (
      !this.dialogRef ||
      ev.target !== this.inputRef?.nativeElement ||
      this.dialogRef.nativeElement.open
    )
      return;
    this.dialogRef.nativeElement.show();
  }

  @HostListener('focusout', ['$event'])
  public onFocusOut(ev: Event) {
    if (
      !this.dialogRef ||
      ev.target !== this.dialogRef?.nativeElement ||
      !this.dialogRef.nativeElement.open
    )
      return;
    this.dialogRef.nativeElement.close();
  }
}
