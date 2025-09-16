import { createAction, props } from '@ngrx/store';
import { Administrator } from '../../../models';

export const loginGod = createAction(
  '[God] Login',
  props<{ email: string; password: string }>()
);

export const loginGodSuccess = createAction(
  '[God] Login Success',
  props<{ god: Administrator }>()
);

export const loginGodFailure = createAction(
  '[God] Login Failure',
  props<{ error: string }>()
);

export const logoutGod = createAction('[God] Logout');


