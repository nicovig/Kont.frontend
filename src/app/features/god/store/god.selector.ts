import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GodState } from './god.state';

export const selectGodState = createFeatureSelector<GodState>('god');

export const selectCurrentGod = createSelector(
  selectGodState,
  state => state.currentGod
);

export const selectGodIsAuthenticated = createSelector(
  selectGodState,
  state => state.isAuthenticated
);


