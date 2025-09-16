import { createReducer, on } from '@ngrx/store';
import { initialGodState } from './god.state';
import * as GodActions from './god.action';

export const godReducer = createReducer(
  initialGodState,
  on(GodActions.loginGod, state => ({ ...state, authLoading: true, authError: null })),
  on(GodActions.loginGodSuccess, (state, { god }) => ({ ...state, currentGod: god, isAuthenticated: true, authLoading: false })),
  on(GodActions.loginGodFailure, (state, { error }) => ({ ...state, authLoading: false, authError: error })),
  on(GodActions.logoutGod, () => ({ ...initialGodState })),

  on(GodActions.loadAdministrators, state => ({ ...state, adminsLoading: true, adminsError: null })),
  on(GodActions.loadAdministratorsSuccess, (state, { administrators }) => ({ ...state, administrators, adminsLoading: false })),
  on(GodActions.loadAdministratorsFailure, (state, { error }) => ({ ...state, adminsLoading: false, adminsError: error })),

  on(GodActions.createAdministratorSuccess, (state, { admin }) => ({ ...state, administrators: [admin, ...state.administrators] })),
  on(GodActions.updateAdministratorSuccess, (state, { admin }) => ({ ...state, administrators: state.administrators.map(a => a.id === admin.id ? admin : a) })),
  on(GodActions.deleteAdministratorSuccess, (state, { id }) => ({ ...state, administrators: state.administrators.filter(a => a.id !== id) })),

  on(GodActions.loadSubscriptions, state => ({ ...state, subsLoading: true, subsError: null })),
  on(GodActions.loadSubscriptionsSuccess, (state, { subscriptions }) => ({ ...state, subscriptions, subsLoading: false })),
  on(GodActions.loadSubscriptionsFailure, (state, { error }) => ({ ...state, subsLoading: false, subsError: error })),
  on(GodActions.createSubscriptionSuccess, (state, { subscription }) => ({ ...state, subscriptions: [subscription, ...state.subscriptions] })),
  on(GodActions.updateSubscriptionSuccess, (state, { subscription }) => ({ ...state, subscriptions: state.subscriptions.map(s => s.id === subscription.id ? subscription : s) })),
  on(GodActions.deleteSubscriptionSuccess, (state, { id }) => ({ ...state, subscriptions: state.subscriptions.filter(s => s.id !== id) }))
);


