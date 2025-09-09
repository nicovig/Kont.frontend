import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/scan/scan.component').then(m => m.ScanComponent)
  },
  {
    path: 'join/:poolId',
    loadComponent: () => import('./pages/join/join.component').then(m => m.JoinComponent)
  },
  {
    path: 'pool/:poolId',
    loadComponent: () => import('./pages/player-dashboard/player-dashboard.component').then(m => m.PlayerDashboardComponent)
  },
  {
    path: 'score/:poolId/:activityId',
    loadComponent: () => import('./pages/score-entry/score-entry.component').then(m => m.ScoreEntryComponent)
  }
];

