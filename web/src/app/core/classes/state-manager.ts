import { EventEmitter, WritableSignal, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
	Observable,
	Subject,
	catchError,
	filter,
	map,
	of,
	switchMap,
	tap,
} from 'rxjs';
import { StateManagerData } from '../types/state-manager-data';

export abstract class StateManager<T> {
	// Source
	protected state: WritableSignal<StateManagerData<T>>;
	// Actions
	protected actionsSub: { [key: string]: Subject<any> } = {};
	// Notifier
	private _actionNotifier = new EventEmitter<{
		action: string;
		result: Omit<StateManagerData<void>, 'value'>;
	} | null>();

	protected getActionNotification = (action: string) => {
		return this._actionNotifier.asObservable().pipe(
			filter((notification) => !!notification && notification.action === action),
			map((notification) => notification!.result),
		);
	};

	constructor(config: {
		source$: Observable<T>;
		initialState: T;
		sourceActions?: {
			[key: string]: (
				state: StateManagerData<T>,
				action$: Observable<any>
			) => Observable<StateManagerData<T>>;
		};
	}) {
		// Init
		this.state = signal({
			value: config.initialState,
			loaded: false,
			error: null,
		});
		// Source
		config.source$.pipe(takeUntilDestroyed()).subscribe({
			next: (val) =>
				this.state.update((state) => ({
					...state,
					value: val,
					loaded: true,
				})),
			error: (err) =>
				this.state.update((state) => ({
					...state,
					error: err,
				})),
		});
		// Actions
		if (config.sourceActions)
			Object.keys(config.sourceActions).forEach((key) => {
				this.actionsSub[key] = new Subject();
				this.actionsSub[key]
					.pipe(
						takeUntilDestroyed(),
						tap(() =>
							this.state.update((state) => ({
								...state,
								loaded: false,
								error: null,
							}))
						),
						switchMap((value) => config.sourceActions![key](this.state(), of(value)))
					)
					.subscribe((newState) => {
						this.state.update((state) => ({
							...state,
							...newState,
						}));
						this._actionNotifier.emit({
							action: key,
							result: { error: newState.error, loaded: newState.loaded },
						});
					});
			});
	}
}
