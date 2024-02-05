import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output,
} from '@angular/core';
import { Tag } from '../../../../shared/types/models/tag';
import { IconDirective } from './../../../../shared/directives/icon.directive';
import { NgClass } from '@angular/common';

@Component({
	standalone: true,
	imports: [IconDirective, NgClass],
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'tsk-tags-list',
	template: `
		@for (tag of tags; track tag.id) {
			<div
				class="flex cursor-pointer gap-2 rounded px-2 py-1 transition-colors hover:bg-neutral-700"
				[ngClass]="selectedId === tag.id ? 'bg-neutral-700' : 'bg-transparent'"
				(click)="selectedChange.emit(selectedId === tag.id ? null : tag)"
			>
				<span class="text-sm">{{ tag.title }}</span>
				<span class="flex-1"></span>
				<span
					tskIcon
					class="cursor-pointer text-xs text-neutral-500 hover:text-red-400"
					(click)="$event.stopPropagation(); deleteEvent.emit(tag)"
					>delete</span
				>
				<span
					tskIcon
					class="cursor-pointer text-xs text-neutral-500 hover:text-neutral-50"
					(click)="$event.stopPropagation(); editEvent.emit(tag)"
				>
					edit</span
				>
			</div>
		}
	`,
	host: { class: 'grid p-1 gap-1' },
})
export class TagsListComponent {
	@Input() tags: Tag[] = [];
	@Input() selectedId: string | null = null;

	@Output() selectedChange = new EventEmitter<Tag | null>();
	@Output() deleteEvent = new EventEmitter<Tag>();
	@Output() editEvent = new EventEmitter<Tag>();
}
