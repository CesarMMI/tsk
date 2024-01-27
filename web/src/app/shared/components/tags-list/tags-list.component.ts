import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tag } from '../../types/models/tag';

@Component({
	standalone: true,
	selector: 'tsk-tags-list',
	template: `
		@for (tag of tags; track tag.id) {
			<div
				class="cursor-pointer rounded px-2 py-1 text-center text-sm hover:bg-neutral-700"
        (click)="selectedChange.emit(tag)"
			>
				<span>{{ tag.title }}</span>
			</div>
		}
	`,
	host: { class: 'grid p-1 gap-1' },
})
export class TagsListComponent {
	@Input() tags: Tag[] = [];
  @Output() selectedChange = new EventEmitter<Tag>();
}
