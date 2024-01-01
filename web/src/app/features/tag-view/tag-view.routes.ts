import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./tag-view.component').then((c) => c.TagViewComponent),
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./features/tag-view-list/tag-view-list.component').then(
            (c) => c.TagViewListComponent
          ),
      },
      {
        path: 'edit',
        loadComponent: () =>
          import('./features/tag-view-detail/tag-view-detail.component').then(
            (c) => c.TagViewDetailComponent
          ),
      },
      {
        path: 'edit/:id',
        loadComponent: () =>
          import('./features/tag-view-detail/tag-view-detail.component').then(
            (c) => c.TagViewDetailComponent
          ),
      },
    ],
  },
];
