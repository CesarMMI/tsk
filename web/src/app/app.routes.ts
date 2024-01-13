import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full',
	},
	{
		path: 'home',
		data: { animation: 'isLeft' },
		loadComponent: () =>
			import('./features/home/home.component').then((c) => c.HomeComponent),
	},
	{
		path: 'tag/:tagId',
		data: { animation: 'isRight' },
		loadComponent: () =>
			import('./features/tag/tag-view/tag-view.component').then(
				(c) => c.TagViewComponent
			),
	},
];
