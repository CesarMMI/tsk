import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
	selector: 'input[tskInputText], textarea[tskInputText]',
	standalone: true,
	host: {
		class:
			'tsk-input tsk-input-text text-lg block w-full rounded border bg-neutral-950 py-1 px-2 text-neutral-50',
		'[class]': 'colorClasses',
	},
})
export class InputTextDirective {
	elementRef = inject(ElementRef);

	get hasError() {
		if (!this.elementRef) return;

		const el = this.elementRef.nativeElement as HTMLInputElement;
		return (
			el.classList.contains('ng-touched') && el.classList.contains('ng-invalid')
		);
	}

	get colorClasses() {
		if (this.hasError)
			return 'border-red-800 focus:border-red-700';

		return 'border-neutral-800 focus:border-neutral-700';
	}
}
