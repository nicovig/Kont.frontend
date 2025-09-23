import { createAction, props } from '@ngrx/store';
import { Administrator, JwtResponse, Site } from '../../../models';
import { CreateAdministratorRequest } from '../services/request-models/administrator.model';

export const loginGod = createAction(
  '[God] Login',
  props<{ email: string; password: string }>()
);

export const loginGodSuccess = createAction(
  '[God] Login Success',
  props<{ jwtResponse: JwtResponse }>()
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

export const createAdministrator = createAction('[God] Create Administrator', props<{ admin: CreateAdministratorRequest }>());
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

// Sites Actions
export const loadSites = createAction(
  '[God] Load Sites'
);

export const loadSitesSuccess = createAction(
  '[God] Load Sites Success',
  props<{ sites: Site[] }>()
);

export const loadSitesFailure = createAction(
  '[God] Load Sites Failure',
  props<{ error: string }>()
);

export const createSite = createAction(
  '[God] Create Site',
  props<{ site: Omit<Site, 'id' | 'createdAt' | 'administrators' | 'activities'> }>()
);

export const createSiteSuccess = createAction(
  '[God] Create Site Success',
  props<{ site: Site }>()
);

export const createSiteFailure = createAction(
  '[God] Create Site Failure',
  props<{ error: string }>()
);


