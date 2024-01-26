import { Component, Input } from '@angular/core';

@Component({
	selector: 'tsk-header',
	standalone: true,
	template: `
		<span class="text-4xl font-bold text-neutral-50">{{ title }}</span>
	`,
	host: { class: 'tsk-header', '[class]': '"pt-2 pb-4 block"' },
})
export class HeaderComponent {
	@Input({ required: true }) title: string = '';
}
