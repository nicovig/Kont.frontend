import { createAction, props } from '@ngrx/store';

export const loginPlayer = createAction(
  '[Player Auth] Login Player',
  props<{ identifier: string; pin: string }>()
);

export const loginPlayerSuccess = createAction(
  '[Player Auth] Login Player Success',
  props<{ player: PlayerInfo }>()
);

export const loginPlayerFailure = createAction(
  '[Player Auth] Login Player Failure',
  props<{ error: string }>()
);

export const logoutPlayer = createAction(
  '[Player Auth] Logout Player'
);

export const loadPlayerProfile = createAction(
  '[Player Auth] Load Player Profile'
);

export interface PlayerInfo {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  username: string;
}
