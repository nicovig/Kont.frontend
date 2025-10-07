import { Routes } from '@angular/router';
import { PlayerLandingPageComponent } from './player-landing-page/player-landing-page.component';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { playerReducer } from './store/player.reducer';
import { PlayerEffects } from './store/player.effects';

export const routes: Routes = [
  {
    path: ':eventId/:poolId',
    component: PlayerLandingPageComponent,
    data: { mobileFirst: true },
    providers: [
      provideState('player', playerReducer),
      provideEffects(PlayerEffects)
    ]
  }
];


