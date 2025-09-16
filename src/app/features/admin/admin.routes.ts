import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.AdminLoginComponent)
  },
  {
    path: 'pools',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/pools/pools.component').then(m => m.PoolsComponent)
  },
  {
    path: 'pools/:id',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/pool-detail/pool-detail.component').then(m => m.PoolDetailComponent)
  },
  {
    path: 'activities',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/activities/activities.component').then(m => m.ActivitiesComponent)
  },
  {
    path: 'leaderboard',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/leaderboard/leaderboard.component').then(m => m.LeaderboardComponent)
  },
  {
    path: 'settings',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/settings/settings.component').then(m => m.SettingsComponent)
  }
];
