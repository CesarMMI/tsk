import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IconDirective } from '../../shared/directives/icon.directive';

@Component({
	selector: 'tsk-sidenav',
	standalone: true,
	imports: [IconDirective, RouterLink, RouterLinkActive],
	template: `
		<div
			class="flex gap-2 rounded p-2 transition-colors hover:bg-neutral-800"
			routerLink="tasks"
			routerLinkActive="bg-neutral-800"
		>
			<span tskIcon>checklist</span>
			<span>Tasks</span>
		</div>
	`,
})
export class SidenavComponent {}
