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
];
