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
    path: 'tag',
    data: { animation: 'isLeft' },
    loadChildren: () =>
      import('./features/tag-view/tag-view.routes').then((r) => r.routes),
  },
];
