import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.AdminLoginComponent)
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./layout/admin-shell.component').then(m => m.AdminShellComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'activities',
        loadComponent: () => import('./pages/activities/activities.component').then(m => m.ActivitiesComponent)
      },
      {
        path: 'events',
        loadComponent: () => import('./pages/events/events.component').then(m => m.EventsComponent)
      },
      {
        path: 'events/new',
        loadComponent: () => import('./pages/events/events.component').then(m => m.EventsComponent)
      },
      {
        path: 'events/:id',
        loadComponent: () => import('./pages/events/events.component').then(m => m.EventsComponent)
      }
    ]
  }
];
