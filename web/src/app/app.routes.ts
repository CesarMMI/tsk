import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		redirectTo: 'tasks',
		pathMatch: 'full',
	},
	{
		path: 'tasks',
		loadComponent: () =>
			import('./features/tasks/tasks.component').then((c) => c.TasksComponent),
	},
];
