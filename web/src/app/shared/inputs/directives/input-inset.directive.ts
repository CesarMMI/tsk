import { Directive, Input, ElementRef, inject, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
	selector: '[tskInputInset]',
	standalone: true,
})
export class InputInsetDirective {
	@Input() tskInputInset: 'start' | 'end' = 'start';

	elementRef = inject(ElementRef);
	viewContainerRef = inject(ViewContainerRef);
}
