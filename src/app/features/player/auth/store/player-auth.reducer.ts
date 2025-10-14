import { createReducer, on } from '@ngrx/store';
import { initialPlayerAuthState, PlayerAuthState } from './player-auth.state';
import * as PlayerAuthActions from './player-auth.actions';

export const playerAuthReducer = createReducer(
  initialPlayerAuthState,
  on(PlayerAuthActions.loginPlayer, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(PlayerAuthActions.loginPlayerSuccess, (state, { player }) => ({
    ...state,
    isAuthenticated: true,
    player,
    loading: false,
    error: null
  })),
  on(PlayerAuthActions.loginPlayerFailure, (state, { error }) => ({
    ...state,
    isAuthenticated: false,
    player: null,
    loading: false,
    error
  })),
  on(PlayerAuthActions.logoutPlayer, (state) => ({
    ...state,
    isAuthenticated: false,
    player: null,
    loading: false,
    error: null
  }))
);
