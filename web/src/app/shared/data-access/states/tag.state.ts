import { Injectable, computed } from '@angular/core';
import { Observable, catchError, first, map, of, switchMap, tap } from 'rxjs';
import { StateManager } from '../../../core/classes/state-manager';
import { StateManagerData } from '../../../core/types/state-manager-data';
import { Tag } from '../../types/models/tag';
import { TagService } from '../services/tag.service';

@Injectable({
	providedIn: 'root',
})
export class TagsState extends StateManager<Tag[]> {
	// Readables
	readonly loaded = computed(() => this.state().loaded);
	readonly error = computed(() => this.state().error);
	readonly tags = computed(() =>
		this.state().value.sort(
			(a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
		),
	);

	constructor(private _tagService: TagService) {
		super({
			initialState: [],
			source$: _tagService.readAll().pipe(first()),
			sourceActions: {
				add: (state, action$) => this._onAdd(state, action$),
				edit: (state, action$) => this._onEdit(state, action$),
				delete: (state, action$) => this._onDelete(state, action$),
			},
		});
	}

	private _handleError = (state: StateManagerData<Tag[]>, err: any) =>
		of({
			...state,
			error: err,
			loaded: true,
		});

	private _onAdd = (
		state: StateManagerData<Tag[]>,
		action$: Observable<Partial<Tag>>,
	) =>
		action$.pipe(
			switchMap((tag) => this._tagService.create(tag)),
			map((tag) => ({
				error: null,
				loaded: true,
				value: [...state.value, tag],
			})),
			catchError((err) => this._handleError(err, state)),
		);

	private _onEdit = (
		state: StateManagerData<Tag[]>,
		action$: Observable<Partial<Tag> & { id: string }>,
	) =>
		action$.pipe(
			switchMap((tag) => this._tagService.update(tag.id, tag)),
			map((tag) => ({
				error: null,
				loaded: true,
				value: [...state.value.filter((t) => t.id !== tag.id), tag],
			})),
			catchError((err) => this._handleError(err, state)),
		);

	private _onDelete = (
		state: StateManagerData<Tag[]>,
		action$: Observable<string>,
	) =>
		action$.pipe(
			switchMap((id) => this._tagService.delete(id)),
			map((tag) => ({
				error: null,
				loaded: true,
				value: state.value.filter((t) => t.id !== tag.id),
			})),
			catchError((err) => this._handleError(err, state)),
		);

	addTag(tag: Partial<Tag>) {
		this.actionsSub['add'].next(tag);
		return this.getActionNotification('add').pipe(tap(console.log));
	}

	editTag(tag: Partial<Tag> & { id: string }) {
		this.actionsSub['edit'].next(tag);
		return this.getActionNotification('edit');
	}

	deleteTag(id: string) {
		this.actionsSub['delete'].next(id);
		return this.getActionNotification('delete');
	}
}
