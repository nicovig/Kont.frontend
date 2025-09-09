import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'pools',
        loadComponent: () => import('./pages/pools/pools.component').then(m => m.PoolsComponent)
      },
      {
        path: 'pools/:id',
        loadComponent: () => import('./pages/pool-detail/pool-detail.component').then(m => m.PoolDetailComponent)
      },
      {
        path: 'activities',
        loadComponent: () => import('./pages/activities/activities.component').then(m => m.ActivitiesComponent)
      },
      {
        path: 'leaderboard',
        loadComponent: () => import('./pages/leaderboard/leaderboard.component').then(m => m.LeaderboardComponent)
      },
      {
        path: 'settings',
        loadComponent: () => import('./pages/settings/settings.component').then(m => m.SettingsComponent)
      }
    ]
  },
];

