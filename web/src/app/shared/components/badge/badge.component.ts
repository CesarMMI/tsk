import { Component, Input } from '@angular/core';

@Component({
	standalone: true,
	selector: 'tsk-badge',
	template: '{{ text }}',
	host: {
		class:
			'inline-block rounded px-2 text-center text-sm text-neutral-400',
	},
})
export class BadgeComponent {
	@Input({ required: true }) text: string = '';
}
