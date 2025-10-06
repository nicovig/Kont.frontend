import { Routes } from '@angular/router';
import { PlayerLandingPageComponent } from './PlayerLandingPage/player-landing-page.component';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { playerReducer } from './store/player.reducer';
import { PlayerEffects } from './store/player.effects';

export const routes: Routes = [
  {
    path: ':eventLink/:poolId',
    component: PlayerLandingPageComponent,
    data: { mobileFirst: true },
    providers: [
      provideState('player', playerReducer),
      provideEffects(PlayerEffects)
    ]
  }
];


