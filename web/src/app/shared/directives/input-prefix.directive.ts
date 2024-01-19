import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[tskInputPrefix]',
  standalone: true,
})
export class InputPrefixDirective {
  elementRef = inject(ElementRef);
}
