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

// Administrators CRUD
export const loadAdministrators = createAction('[God] Load Administrators');
export const loadAdministratorsSuccess = createAction('[God] Load Administrators Success', props<{ administrators: Administrator[] }>());
export const loadAdministratorsFailure = createAction('[God] Load Administrators Failure', props<{ error: string }>());

export const createAdministrator = createAction('[God] Create Administrator', props<{ admin: Omit<Administrator, 'id' | 'createdAt'> }>());
export const createAdministratorSuccess = createAction('[God] Create Administrator Success', props<{ admin: Administrator }>());
export const createAdministratorFailure = createAction('[God] Create Administrator Failure', props<{ error: string }>());

export const updateAdministrator = createAction('[God] Update Administrator', props<{ admin: Administrator }>());
export const updateAdministratorSuccess = createAction('[God] Update Administrator Success', props<{ admin: Administrator }>());
export const updateAdministratorFailure = createAction('[God] Update Administrator Failure', props<{ error: string }>());

export const deleteAdministrator = createAction('[God] Delete Administrator', props<{ id: string }>());
export const deleteAdministratorSuccess = createAction('[God] Delete Administrator Success', props<{ id: string }>());
export const deleteAdministratorFailure = createAction('[God] Delete Administrator Failure', props<{ error: string }>());

// Subscriptions
export const loadSubscriptions = createAction('[God] Load Subscriptions');
export const loadSubscriptionsSuccess = createAction('[God] Load Subscriptions Success', props<{ subscriptions: import('../../../models').Subscription[] }>());
export const loadSubscriptionsFailure = createAction('[God] Load Subscriptions Failure', props<{ error: string }>());

export const createSubscription = createAction('[God] Create Subscription', props<{ subscription: Omit<import('../../../models').Subscription, 'id'> }>());
export const createSubscriptionSuccess = createAction('[God] Create Subscription Success', props<{ subscription: import('../../../models').Subscription }>());
export const createSubscriptionFailure = createAction('[God] Create Subscription Failure', props<{ error: string }>());

export const updateSubscription = createAction('[God] Update Subscription', props<{ subscription: import('../../../models').Subscription }>());
export const updateSubscriptionSuccess = createAction('[God] Update Subscription Success', props<{ subscription: import('../../../models').Subscription }>());
export const updateSubscriptionFailure = createAction('[God] Update Subscription Failure', props<{ error: string }>());

export const deleteSubscription = createAction('[God] Delete Subscription', props<{ id: string }>());
export const deleteSubscriptionSuccess = createAction('[God] Delete Subscription Success', props<{ id: string }>());
export const deleteSubscriptionFailure = createAction('[God] Delete Subscription Failure', props<{ error: string }>());


