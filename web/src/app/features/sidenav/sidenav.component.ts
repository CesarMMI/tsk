import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DialogService } from '../../core/services/dialog.service';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { Tag } from '../../shared/types/models/tag';
import { TagsState } from './../../shared/data-access/states/tag.state';
import { TagEditComponent } from './../tag-edit/tag-edit.component';

@Component({
	selector: 'app-sidenav',
	standalone: true,
	imports: [IconComponent, RouterLink, RouterLinkActive],
	template: `
		<div
			class="flex cursor-pointer gap-2 px-2 py-4 text-neutral-50 transition-colors hover:bg-neutral-800"
			routerLink="home"
			routerLinkActive="bg-neutral-800"
		>
			<tsk-icon>home</tsk-icon>
			<span>Home</span>
		</div>

		@for (tag of tagsState.tags(); track tag.id) {
			<div
				class="flex cursor-pointer gap-2 bg-neutral-900 px-2 py-4 text-neutral-50 transition-colors hover:bg-neutral-800"
			>
				<tsk-icon [style]="'color: ' + tag.color"> circle </tsk-icon>
				<span>{{ tag.name }}</span>
				<span class="flex-1"></span>
				<tsk-icon
					class="text-base text-neutral-900 transition-colors hover:text-violet-400"
					(click)="$event.stopPropagation(); onOpen(tag)"
					>edit</tsk-icon
				>
				<tsk-icon
					class="text-base text-neutral-900 transition-colors hover:text-red-400"
					>delete</tsk-icon
				>
			</div>
		}

		<div
			class="flex cursor-pointer gap-2 bg-neutral-900 px-2 py-4 text-neutral-50 transition-colors hover:bg-neutral-800"
			(click)="onOpen()"
		>
			<tsk-icon>add</tsk-icon>
			<span>Create Tag</span>
		</div>
	`,
})
export class SidenavComponent {
	tagsState = inject(TagsState);
	dialogService = inject(DialogService);

	onOpen(tag?: Tag) {
		this.dialogService.open(TagEditComponent, {
			data: tag,
			width: 'min(600px, 90vw)',
		});
	}
}
