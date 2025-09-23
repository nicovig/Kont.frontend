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

export const selectAdministrators = createSelector(
  selectGodState,
  state => state.administrators
);
export const selectAdminsLoading = createSelector(
  selectGodState,
  state => state.adminsLoading
);
export const selectAdminsError = createSelector(
  selectGodState,
  state => state.adminsError
);

export const selectSubscriptions = createSelector(
  selectGodState,
  state => state.subscriptions
);
export const selectSubsLoading = createSelector(
  selectGodState,
  state => state.subsLoading
);
export const selectSubsError = createSelector(
  selectGodState,
  state => state.subsError
);

// Sites Selectors
export const selectSites = createSelector(
  selectGodState,
  (state) => state.sites
);

export const selectSitesLoading = createSelector(
  selectGodState,
  (state) => state.sitesLoading
);

export const selectSitesError = createSelector(
  selectGodState,
  (state) => state.sitesError
);


