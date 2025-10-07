import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PlayerState } from './player.state';

export const selectPlayerState = createFeatureSelector<PlayerState>('player');

export const selectPlayerEventInfo = createSelector(selectPlayerState, s => s.eventInfo);
export const selectPlayerLoading = createSelector(selectPlayerState, s => s.loading);
export const selectPlayerError = createSelector(selectPlayerState, s => s.error);

export const selectPlayerEventInfoView = createSelector(selectPlayerEventInfo, (e) => {
  if (!e) return null;
  return {
    name: e.name,
    startDate: e.startDate,
    endDate: e.endDate,
    location: e.location
  };
});


