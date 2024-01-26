import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({
	selector: '[tskOption]',
	standalone: true,
})
export class OptionDirective {
	templateRef = inject(TemplateRef);
}
