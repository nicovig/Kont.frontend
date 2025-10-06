import { createReducer, on } from '@ngrx/store';
import { initialPlayerState } from './player.state';
import * as PlayerActions from './player.actions';

export const playerReducer = createReducer(
  initialPlayerState,
  on(PlayerActions.loadEventInfo, (state) => ({ ...state, loading: true, error: null })),
  on(PlayerActions.loadEventInfoSuccess, (state, { event }) => ({ ...state, loading: false, eventInfo: event })),
  on(PlayerActions.loadEventInfoFailure, (state, { error }) => ({ ...state, loading: false, error }))
);


