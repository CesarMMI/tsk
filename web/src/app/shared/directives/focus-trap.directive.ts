import { AfterViewInit, Directive, ElementRef, inject } from '@angular/core';

@Directive({
	selector: '[tskFocusTrap]',
	standalone: true,
})
export class FocusTrapDirective implements AfterViewInit {
	elementRef = inject(ElementRef);

	ngAfterViewInit(): void {
		(this.elementRef.nativeElement as HTMLElement)?.focus();
	}
}
