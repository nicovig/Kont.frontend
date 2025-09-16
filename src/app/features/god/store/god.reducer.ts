import { createReducer, on } from '@ngrx/store';
import { initialGodState } from './god.state';
import * as GodActions from './god.action';

export const godReducer = createReducer(
  initialGodState,
  on(GodActions.loginGod, state => ({ ...state, authLoading: true, authError: null })),
  on(GodActions.loginGodSuccess, (state, { god }) => ({ ...state, currentGod: god, isAuthenticated: true, authLoading: false })),
  on(GodActions.loginGodFailure, (state, { error }) => ({ ...state, authLoading: false, authError: error })),
  on(GodActions.logoutGod, () => ({ ...initialGodState }))
);


