import { Routes } from '@angular/router';
import { PlayerLandingPageComponent } from './player-landing-page/player-landing-page.component';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { playerReducer } from './store/player.reducer';
import { PlayerEffects } from './store/player.effects';
import { playerAuthReducer } from './auth/store/player-auth.reducer';
import { PlayerAuthEffects } from './auth/store/player-auth.effects';
import { playerAuthGuard } from './auth/guards/player-auth.guard';

export const routes: Routes = [
  {
    path: ':eventId/:poolId',
    component: PlayerLandingPageComponent,
    data: { mobileFirst: true },
    providers: [
      provideState('player', playerReducer),
      provideEffects(PlayerEffects)
    ]
  },
  {
    path: ':eventId/:poolId/register',
    loadComponent: () => import('./register/register.component').then(m => m.PlayerRegisterComponent),
    data: { mobileFirst: true }
  },
      {
        path: ':eventId/:poolId/login',
        loadComponent: () => import('./login/login.component').then(m => m.PlayerLoginComponent),
        data: { mobileFirst: true }
      },
  {
    path: ':eventId/:poolId/dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.PlayerDashboardComponent),
    data: { mobileFirst: true }
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.component').then(m => m.PlayerAuthLoginComponent),
    data: { mobileFirst: true },
    providers: [
      provideState('playerAuth', playerAuthReducer),
      provideEffects(PlayerAuthEffects)
    ]
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.PlayerDashboardComponent),
    canActivate: [playerAuthGuard],
    data: { mobileFirst: true },
    providers: [
      provideState('playerAuth', playerAuthReducer),
      provideEffects(PlayerAuthEffects)
    ]
  }
];


