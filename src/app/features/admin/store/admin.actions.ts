import { createAction, props } from '@ngrx/store';
import { Administrator, Site, Activity, Pool, Event, PlayerRegistration, GameSession, PlayerGroup, PlayerGlobalScore, ActivitySummaryData } from '../../../models';
import { PoolStats, DashboardStats, RecentActivity } from './admin.state';

// Auth Actions
export const loginAdmin = createAction(
  '[Admin] Login Admin',
  props<{ email: string; password: string }>()
);

export const loginAdminSuccess = createAction(
  '[Admin] Login Admin Success',
  props<{ admin: Administrator }>()
);

export const loginAdminFailure = createAction(
  '[Admin] Login Admin Failure',
  props<{ error: string }>()
);

export const logoutAdmin = createAction(
  '[Admin] Logout Admin'
);

export const loadCurrentAdmin = createAction(
  '[Admin] Load Current Admin'
);

// Sites Actions
export const loadSites = createAction(
  '[Admin] Load Sites'
);

export const loadSitesSuccess = createAction(
  '[Admin] Load Sites Success',
  props<{ sites: Site[] }>()
);

export const loadSitesFailure = createAction(
  '[Admin] Load Sites Failure',
  props<{ error: string }>()
);

export const createSite = createAction(
  '[Admin] Create Site',
  props<{ site: Omit<Site, 'id' | 'createdAt'> }>()
);

export const createSiteSuccess = createAction(
  '[Admin] Create Site Success',
  props<{ site: Site }>()
);

export const createSiteFailure = createAction(
  '[Admin] Create Site Failure',
  props<{ error: string }>()
);

// Activities Actions
export const loadActivities = createAction(
  '[Admin] Load Activities'
);

export const loadActivitiesSuccess = createAction(
  '[Admin] Load Activities Success',
  props<{ activities: Activity[] }>()
);

export const loadActivitiesFailure = createAction(
  '[Admin] Load Activities Failure',
  props<{ error: string }>()
);

export const createActivity = createAction(
  '[Admin] Create Activity',
  props<{ activity: Omit<Activity, 'id' | 'createdAt'> }>()
);

export const createActivitySuccess = createAction(
  '[Admin] Create Activity Success',
  props<{ activity: Activity }>()
);

export const createActivityFailure = createAction(
  '[Admin] Create Activity Failure',
  props<{ error: string }>()
);

export const updateActivity = createAction(
  '[Admin] Update Activity',
  props<{ activity: Activity }>()
);

export const updateActivitySuccess = createAction(
  '[Admin] Update Activity Success',
  props<{ activity: Activity }>()
);

export const updateActivityFailure = createAction(
  '[Admin] Update Activity Failure',
  props<{ error: string }>()
);

export const deleteActivity = createAction(
  '[Admin] Delete Activity',
  props<{ activityId: string }>()
);

export const deleteActivitySuccess = createAction(
  '[Admin] Delete Activity Success',
  props<{ activityId: string }>()
);

export const deleteActivityFailure = createAction(
  '[Admin] Delete Activity Failure',
  props<{ error: string }>()
);

export const selectActivity = createAction(
  '[Admin] Select Activity',
  props<{ activity: Activity | null }>()
);

// Events Actions
export const loadEvents = createAction(
  '[Admin] Load Events'
);

export const loadEventsSuccess = createAction(
  '[Admin] Load Events Success',
  props<{ events: Event[] }>()
);

export const loadEventsFailure = createAction(
  '[Admin] Load Events Failure',
  props<{ error: string }>()
);

export const createEvent = createAction(
  '[Admin] Create Event',
  props<{ event: Omit<Event, 'id' | 'createdAt'> }>()
);

export const createEventSuccess = createAction(
  '[Admin] Create Event Success',
  props<{ event: Event }>()
);

export const createEventFailure = createAction(
  '[Admin] Create Event Failure',
  props<{ error: string }>()
);

export const selectEvent = createAction(
  '[Admin] Select Event',
  props<{ event: Event | null }>()
);

// Pools Actions
export const loadPools = createAction(
  '[Admin] Load Pools'
);

export const loadPoolsSuccess = createAction(
  '[Admin] Load Pools Success',
  props<{ pools: Pool[] }>()
);

export const loadPoolsFailure = createAction(
  '[Admin] Load Pools Failure',
  props<{ error: string }>()
);

export const createPool = createAction(
  '[Admin] Create Pool',
  props<{ pool: Omit<Pool, 'id' | 'createdAt' | 'qrCode'> }>()
);

export const createPoolSuccess = createAction(
  '[Admin] Create Pool Success',
  props<{ pool: Pool }>()
);

export const createPoolFailure = createAction(
  '[Admin] Create Pool Failure',
  props<{ error: string }>()
);

export const updatePool = createAction(
  '[Admin] Update Pool',
  props<{ pool: Pool }>()
);

export const updatePoolSuccess = createAction(
  '[Admin] Update Pool Success',
  props<{ pool: Pool }>()
);

export const updatePoolFailure = createAction(
  '[Admin] Update Pool Failure',
  props<{ error: string }>()
);

export const deletePool = createAction(
  '[Admin] Delete Pool',
  props<{ poolId: string }>()
);

export const deletePoolSuccess = createAction(
  '[Admin] Delete Pool Success',
  props<{ poolId: string }>()
);

export const deletePoolFailure = createAction(
  '[Admin] Delete Pool Failure',
  props<{ error: string }>()
);

export const selectPool = createAction(
  '[Admin] Select Pool',
  props<{ pool: Pool | null }>()
);

export const loadPoolStats = createAction(
  '[Admin] Load Pool Stats',
  props<{ poolId: string }>()
);

export const loadPoolStatsSuccess = createAction(
  '[Admin] Load Pool Stats Success',
  props<{ poolId: string; stats: PoolStats }>()
);

export const loadPoolStatsFailure = createAction(
  '[Admin] Load Pool Stats Failure',
  props<{ error: string }>()
);

export const validateAllPlayersPresent = createAction(
  '[Admin] Validate All Players Present',
  props<{ poolId: string }>()
);

export const validateAllPlayersPresentSuccess = createAction(
  '[Admin] Validate All Players Present Success',
  props<{ poolId: string }>()
);

export const validateAllPlayersPresentFailure = createAction(
  '[Admin] Validate All Players Present Failure',
  props<{ error: string }>()
);

export const endPool = createAction(
  '[Admin] End Pool',
  props<{ poolId: string }>()
);

export const endPoolSuccess = createAction(
  '[Admin] End Pool Success',
  props<{ poolId: string }>()
);

export const endPoolFailure = createAction(
  '[Admin] End Pool Failure',
  props<{ error: string }>()
);

// Dashboard Actions
export const loadDashboardStats = createAction(
  '[Admin] Load Dashboard Stats'
);

export const loadDashboardStatsSuccess = createAction(
  '[Admin] Load Dashboard Stats Success',
  props<{ stats: DashboardStats }>()
);

export const loadDashboardStatsFailure = createAction(
  '[Admin] Load Dashboard Stats Failure',
  props<{ error: string }>()
);

// Real-time Actions
export const enableRealTimeUpdates = createAction(
  '[Admin] Enable Real Time Updates'
);

export const disableRealTimeUpdates = createAction(
  '[Admin] Disable Real Time Updates'
);

export const realTimeUpdate = createAction(
  '[Admin] Real Time Update',
  props<{ update: RecentActivity }>()
);

// Group Management Actions
export const updatePlayerGroup = createAction(
  '[Admin] Update Player Group',
  props<{ poolId: string; playerId: string; newGroupId: string }>()
);

export const updatePlayerGroupSuccess = createAction(
  '[Admin] Update Player Group Success',
  props<{ poolId: string; playerId: string; newGroupId: string }>()
);

export const updatePlayerGroupFailure = createAction(
  '[Admin] Update Player Group Failure',
  props<{ error: string }>()
);

// Referent Management Actions
export const assignReferent = createAction(
  '[Admin] Assign Referent',
  props<{ poolId: string; referentId: string }>()
);

export const assignReferentSuccess = createAction(
  '[Admin] Assign Referent Success',
  props<{ poolId: string; referentId: string }>()
);

export const assignReferentFailure = createAction(
  '[Admin] Assign Referent Failure',
  props<{ error: string }>()
);

// Account Recovery Actions
export const generateRecoveryQR = createAction(
  '[Admin] Generate Recovery QR',
  props<{ playerId: string; poolId: string }>()
);

export const generateRecoveryQRSuccess = createAction(
  '[Admin] Generate Recovery QR Success',
  props<{ playerId: string; qrCode: string }>()
);

export const generateRecoveryQRFailure = createAction(
  '[Admin] Generate Recovery QR Failure',
  props<{ error: string }>()
);
