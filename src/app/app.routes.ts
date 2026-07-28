import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'products',
    loadComponent: () => import('./pages/product-list/product-list.page').then((m) => m.ProductListPage),
  },
  {
    path: 'product-form',
    loadComponent: () => import('./pages/product-form/product-form.page').then((m) => m.ProductFormPage),
  },
  {
    path: 'product-form/:id',
    loadComponent: () => import('./pages/product-form/product-form.page').then((m) => m.ProductFormPage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
