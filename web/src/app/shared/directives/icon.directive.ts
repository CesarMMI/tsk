import { Directive } from '@angular/core';

@Directive({
	standalone: true,
	selector: '[tskIcon]',
	host: { class: 'material-symbols-rounded' },
})
export class IconDirective {}
