import { Component, Input } from '@angular/core';

@Component({
	selector: 'tsk-header',
	standalone: true,
	template: `
		<header class="flex items-center py-2">
			<h1 class="text-4xl font-bold text-neutral-50">{{ title }}</h1>
		</header>
	`,
})
export class HeaderComponent {
	@Input({ required: true }) title: string = '';
}
