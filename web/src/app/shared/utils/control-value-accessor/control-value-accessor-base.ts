import { ControlValueAccessor } from '@angular/forms';

export class ControlValueAccessorBase<T> implements ControlValueAccessor {
	value: T | null = null;
	touched: boolean = false;
	disabled: boolean = false;

	onChange = (val: T | null) => {};
	onTouched = () => {};

	onInput(val: T | null) {
		this.markAsTouched();
		this.value = val;
		this.onChange(this.value);
	}

	writeValue(val: T | null) {
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
