import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PlayerAuthState } from './player-auth.state';

export const selectPlayerAuthState = createFeatureSelector<PlayerAuthState>('playerAuth');

export const selectIsPlayerAuthenticated = createSelector(
  selectPlayerAuthState,
  (state) => state.isAuthenticated
);

export const selectPlayerInfo = createSelector(
  selectPlayerAuthState,
  (state) => state.player
);

export const selectPlayerLoading = createSelector(
  selectPlayerAuthState,
  (state) => state.loading
);

export const selectPlayerError = createSelector(
  selectPlayerAuthState,
  (state) => state.error
);
