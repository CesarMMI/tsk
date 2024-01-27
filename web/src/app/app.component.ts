import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidenavComponent } from './features/sidenav/sidenav.component';

@Component({
	selector: 'tsk-root',
	standalone: true,
	imports: [RouterOutlet, SidenavComponent],
	template: `
		<main class="flex h-screen w-screen bg-neutral-950 text-neutral-50">
			<div class="w-52 border-r border-neutral-800 bg-neutral-900 p-2">
				<tsk-sidenav></tsk-sidenav>
			</div>
			<div class="flex-1">
				<div class="mx-auto w-full max-w-5xl">
					<router-outlet></router-outlet>
				</div>
			</div>
		</main>
	`,
})
export class AppComponent {}
