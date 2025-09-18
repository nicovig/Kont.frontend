import { createAction, props } from '@ngrx/store';
import { Site, Activity, Pool, Event, PlayerRegistration, GameSession, PlayerGroup, PlayerGlobalScore, ActivitySummaryData, JwtResponse, Administrator } from '../../../models';
import { PoolStats, DashboardStats, RecentActivity } from './admin.state';
import { CreateActivityRequest, UpdateActivityRequest } from '../services/request-models/activity.models';
import { CreateEventRequest, UpdateEventRequest } from '../services/request-models/event.models';

// Auth Actions
export const loginAdmin = createAction(
  '[Admin] Login Admin',
  props<{ email: string; password: string }>()
);

export const loginAdminSuccess = createAction(
  '[Admin] Login Admin Success',
  props<{ jwtResponse: JwtResponse }>()
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

export const loadCurrentAdminSuccess = createAction(
  '[Admin] Load Current Admin Success',
  props<{ admin: Administrator }>()
);

export const loadCurrentAdminFailure = createAction(
  '[Admin] Load Current Admin Failure',
  props<{ error: string }>()
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
  props<{ activity: CreateActivityRequest }>()
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
  props<{ activity: UpdateActivityRequest }>()
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
  props<{ request: CreateEventRequest }>()
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

export const updateEvent = createAction(
  '[Admin] Update Event',
  props<{ request: UpdateEventRequest }>()
);

export const updateEventSuccess = createAction(
  '[Admin] Update Event Success',
  props<{ event: Event }>()
);

export const updateEventFailure = createAction(
  '[Admin] Update Event Failure',
  props<{ error: string }>()
);

export const deleteEvent = createAction(
  '[Admin] Delete Event',
  props<{ eventId: string }>()
);

export const deleteEventSuccess = createAction(
  '[Admin] Delete Event Success',
  props<{ eventId: string }>()
);

export const deleteEventFailure = createAction(
  '[Admin] Delete Event Failure',
  props<{ error: string }>()
);

export const validateAllPlayersPresent = createAction(
  '[Admin] Validate All Players Present',
  props<{ eventId: string; isAllPlayersPresent: boolean }>()
);

export const validateAllPlayersPresentSuccess = createAction(
  '[Admin] Validate All Players Present Success'
);

export const validateAllPlayersPresentFailure = createAction(
  '[Admin] Validate All Players Present Failure',
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
