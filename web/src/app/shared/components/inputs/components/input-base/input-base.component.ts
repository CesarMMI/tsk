import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { TskIconComponent } from 'tsk-web-library';

@Component({
  standalone: true,
  selector: 'tsk-input-base',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'tsk-input',
    '[style.margin-top]': 'marginTop',
  },
  imports: [TskIconComponent],
})
export class InputBaseComponent<T> implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() placeholder: string = '';

  value?: T;
  touched: boolean = false;
  disabled: boolean = false;

  get marginTop() {
    return this.label ? 'var(--size-md)' : '0';
  }

  onChange = (val: T) => {};
  onTouched = () => {};

  onInput(val: T) {
    this.markAsTouched();
    this.value = val;
    this.onChange(this.value);
  }

  writeValue(val: T) {
    this.value = val;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }
}
