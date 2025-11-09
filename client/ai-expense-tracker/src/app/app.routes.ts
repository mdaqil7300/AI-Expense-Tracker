import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'expenses',
    pathMatch: 'full'
  },
  {
    path: 'expenses',
    loadComponent: () => import('../app/features/expenses/expenses-list/expenses-list').then(m => m.ExpensesList)
  },
  {
    path: 'categories',
    loadComponent: () => import('../app/features/categories/categories-list/categories-list').then(m => m.CategoriesList)
  },
  {
    path: '**',
    redirectTo: 'expenses'
  }
];
