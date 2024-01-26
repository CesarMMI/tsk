import { Directive } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Directive()
export class ControlValueAccessorBase<T> implements ControlValueAccessor {
	value?: T;
	touched: boolean = false;
	disabled: boolean = false;

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
