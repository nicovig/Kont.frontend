import { Routes } from '@angular/router';
import { godAuthGuard } from './guards/god-auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.GodLoginComponent)
  },
  {
    path: '',
    canActivate: [godAuthGuard],
    loadComponent: () => import('./layout/god-shell.component').then(m => m.GodShellComponent),
    children: [
      { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.GodDashboardComponent) },
      { path: 'sites', loadComponent: () => import('./pages/sites/sites.component').then(m => m.GodSitesComponent) },
      { path: 'sites/new', loadComponent: () => import('./pages/sites/sites-edit/sites-edit.component').then(m => m.GodSitesEditComponent) },
      { path: 'sites/:id', loadComponent: () => import('./pages/sites/sites-edit/sites-edit.component').then(m => m.GodSitesEditComponent) },
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' }
    ]
  }
];


