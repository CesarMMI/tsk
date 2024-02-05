import { Injectable, computed, inject } from '@angular/core';
import { Observable, first, map, switchMap } from 'rxjs';
import { stateManagerFactory } from '../../../core/functions/state-manage-factory';
import { Tag } from '../../types/models/tag';
import { DateUtils } from '../../utils/date.utils';
import { TagService } from '../services/tag.service';

@Injectable({
	providedIn: 'root',
})
export class TagsState {
	private _tagService = inject(TagService);

	private _state = stateManagerFactory({
		initialState: [],
		source$: this._tagService.readAll().pipe(first()),
		actions: {
			add: (state: Tag[], action$: Observable<Partial<Tag>>) =>
				action$.pipe(
					switchMap((tag) => this._tagService.create(tag)),
					map((tag) => [...state, tag]),
				),
			edit: (state: Tag[], action$: Observable<Partial<Tag> & { id: string }>) =>
				action$.pipe(
					switchMap((tag) => this._tagService.update(tag.id, tag)),
					map((tag) => [...state.filter((t) => t.id !== tag.id), tag]),
				),
			delete: (state: Tag[], action$: Observable<string>) =>
				action$.pipe(
					switchMap((id) => this._tagService.delete(id)),
					map((tag) => state.filter((t) => t.id !== tag.id)),
				),
		},
	});

	readonly tags = computed(() =>
		this._state
			.value()
			.sort((a, b) => DateUtils.compareDatesString(b.createdAt, a.createdAt)),
	);

	addTag(tag: Partial<Tag>) {
		this._state.actions?.add.next(tag);
	}

	editTag(tag: Partial<Tag> & { id: string }) {
		this._state.actions?.edit.next(tag);
	}

	deleteTag(id: string) {
		this._state.actions?.delete.next(id);
	}
}
