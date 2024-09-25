import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

/**
 * 2. Реализация маршрутизации с параметрами
 * Задача: Создайте приложение с несколькими маршрутами.
 * Реализуйте маршрутизацию с параметрами и динамическими данными.
 * Обработайте сценарий, когда пользователь вводит недопустимый маршрут.
 */
const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./views/home/home.component').then(c => c.HomeComponent)
  },
  {
    path: 'details/:idx',
    loadComponent: () => import('./views/details/details.component').then(c => c.DetailsComponent)
  },
  {
    path: 'new-data',
    loadComponent: () => import('./views/add-user/add-user.component').then(c => c.AddUserComponent)
  },
  {
    path: 'not-found',
    loadComponent: () => import('./views/page-not-found/page-not-found.component').then(c => c.PageNotFoundComponent),
  },
  {
    path: '**',
    loadComponent: () => import('./views/page-not-found/page-not-found.component').then(c => c.PageNotFoundComponent),
  }
];

export const routerConfig: ExtraOptions = {
  useHash: true,
};

export const APP_ROUTES: ModuleWithProviders<RouterModule> = RouterModule.forRoot(routes, routerConfig);

