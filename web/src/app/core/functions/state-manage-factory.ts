import { WritableSignal, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, catchError, of } from 'rxjs';
import { StateManagerData } from '../types/state-manager-data';

export const stateManagerFactory = <
	T,
	U extends {
		[key: string]: (
			state: StateManagerData<T>,
			action$: Observable<any>,
		) => Observable<StateManagerData<T>>;
	},
>(
	source$: Observable<T>,
	initialState: T | null,
	actions?: U,
): {
	value: WritableSignal<T | null>;
	actions: U;
} => {
	// Init
	const state = {
		value: signal(initialState),
		actions: {} as U,
	};
	// Source
	source$
		.pipe(
			takeUntilDestroyed(),
			catchError(() => of(null)),
		)
		.subscribe((res) => state.value.set(res));
	// Actions
	//
	return state;
};
