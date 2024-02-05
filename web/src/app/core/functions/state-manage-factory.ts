import { signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, Subject, catchError, of, switchMap } from 'rxjs';

export const stateManagerFactory = <
	T,
	U extends Record<
		string,
		(state: T, action$: Observable<any>) => Observable<T>
	>,
>(configs: {
	initialState: T;
	source$: Observable<T>;
	actions?: U;
}) => {
	// Init
	const value = signal(configs.initialState);
	// Source
	configs.source$
		.pipe(
			takeUntilDestroyed(),
			catchError(() => of(configs.initialState)),
		)
		.subscribe((res) => value.set(res));
	// Actions
	let actions;
	if (configs.actions)
		actions = Object.keys(configs.actions).reduce(
			(acc, curr) => {
				const key = curr as keyof U;
				const sub = new Subject();

				sub.pipe(
					takeUntilDestroyed(),
					switchMap((v) => configs.actions![key](value(), of(v))),
				).subscribe((res) => value.set(res));

				acc[curr as keyof U] = sub;
				return acc;
			},
			{} as Record<keyof U, Subject<any>>,
		);
	// Result
	return { value, actions };
};
