import { createAction, props } from '@ngrx/store';
import { DashboardStats, RecentActivity } from './admin.state';
import { Site, Activity, Event, JwtResponse, Administrator, PlayerGroup } from '../../../models';
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
export const loadSitesSuccess = createAction(
  '[Admin] Load Sites Success',
  props<{ sites: Site[] }>()
);

export const selectSite = createAction(
  '[Admin] Select Site',
  props<{ site: Site }>()
);

export const changeSite = createAction(
  '[Admin] Change Site',
  props<{ site: Site }>()
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

export const updateEventStatus = createAction(
  '[Admin] Update Event Status',
  props<{ eventId: string; status: 'Pending' | 'Active' | 'Completed' | 'Cancelled' }>()
);

export const updateEventStatusSuccess = createAction(
  '[Admin] Update Event Status Success',
  props<{ event: Event }>()
);

export const updateEventStatusFailure = createAction(
  '[Admin] Update Event Status Failure',
  props<{ error: string }>()
);

// End Event
export const endEvent = createAction(
  '[Admin] End Event',
  props<{ eventId: string }>()
);

export const endEventSuccess = createAction(
  '[Admin] End Event Success',
  props<{ event: Event }>()
);

export const endEventFailure = createAction(
  '[Admin] End Event Failure',
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

// Player Registrations
export const loadPlayerRegistrations = createAction(
  '[Admin] Load Player Registrations',
  props<{ eventId: string }>()
);

export const loadPlayerRegistrationsSuccess = createAction(
  '[Admin] Load Player Registrations Success',
  props<{ registrations: import('../../../models').PlayerRegistration[] }>()
);

export const loadPlayerRegistrationsFailure = createAction(
  '[Admin] Load Player Registrations Failure',
  props<{ error: string }>()
);

export const updatePlayerPresence = createAction(
  '[Admin] Update Player Presence',
  props<{ eventId: string; playerRegistrationId: string; isPresent: boolean }>()
);

export const updatePlayerPresenceSuccess = createAction(
  '[Admin] Update Player Presence Success'
);

export const updatePlayerPresenceFailure = createAction(
  '[Admin] Update Player Presence Failure',
  props<{ error: string }>()
);

// Referent toggle
export const togglePlayerType = createAction(
  '[Admin] Toggle Player Type',
  props<{ playerRegistrationId: string; toReferent: boolean; eventId: string }>()
);

export const togglePlayerTypeSuccess = createAction(
  '[Admin] Toggle Player Type Success'
);

export const togglePlayerTypeFailure = createAction(
  '[Admin] Toggle Player Type Failure',
  props<{ error: string }>()
);

// QR Code Email Actions
export const sendQRCodeToEmailList = createAction(
  '[Admin] Send QR Code To Email List',
  props<{ eventId: string; emails: string[] }>()
);

export const sendQRCodeToEmailListSuccess = createAction(
  '[Admin] Send QR Code To Email List Success',
  props<{ message: string }>()
);

export const sendQRCodeToEmailListFailure = createAction(
  '[Admin] Send QR Code To Email List Failure',
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

// Groups Generation Actions
export const generateGroupsForGameSession = createAction(
  '[Admin] Generate Groups For GameSession',
  props<{ gameSessionId: string; isFirstOfActivity: boolean }>()
);

export const generateGroupsForGameSessionSuccess = createAction(
  '[Admin] Generate Groups For GameSession Success',
  props<{ gameSessionId: string; groups: PlayerGroup[] }>()
);

export const generateGroupsForGameSessionFailure = createAction(
  '[Admin] Generate Groups For GameSession Failure',
  props<{ error: string }>()
);

// Game Sessions Actions
export const createGameSessionForEvent = createAction(
  '[Admin] Create GameSession For Event',
  props<{ eventId: string; activityId: string }>()
);

export const createGameSessionForEventSuccess = createAction(
  '[Admin] Create GameSession For Event Success',
  props<{ gameSession: import('../../../models').GameSession }>()
);

export const createGameSessionForEventFailure = createAction(
  '[Admin] Create GameSession For Event Failure',
  props<{ error: string }>()
);

export const updateGameSessionStatus = createAction(
  '[Admin] Update GameSession Status',
  props<{ sessionId: string; status: 'Pending' | 'Active' | 'Completed' | 'Cancelled' }>()
);

export const updateGameSessionStatusSuccess = createAction(
  '[Admin] Update GameSession Status Success',
  props<{ gameSession: import('../../../models').GameSession }>()
);

export const updateGameSessionStatusFailure = createAction(
  '[Admin] Update GameSession Status Failure',
  props<{ error: string }>()
);

export const updateGameSessionStartTime = createAction(
  '[Admin] Update GameSession Start Time',
  props<{ sessionId: string; startedAt: Date }>()
);

export const updateGameSessionStartTimeSuccess = createAction(
  '[Admin] Update GameSession Start Time Success',
  props<{ gameSession: import('../../../models').GameSession }>()
);

export const updateGameSessionStartTimeFailure = createAction(
  '[Admin] Update GameSession Start Time Failure',
  props<{ error: string }>()
);

export const updateGameSessionEndTime = createAction(
  '[Admin] Update GameSession End Time',
  props<{ sessionId: string; endedAt: Date }>()
);

export const updateGameSessionEndTimeSuccess = createAction(
  '[Admin] Update GameSession End Time Success',
  props<{ gameSession: import('../../../models').GameSession }>()
);

export const updateGameSessionEndTimeFailure = createAction(
  '[Admin] Update GameSession End Time Failure',
  props<{ error: string }>()
);

export const deleteGameSession = createAction(
  '[Admin] Delete GameSession',
  props<{ sessionId: string }>()
);

export const deleteGameSessionSuccess = createAction(
  '[Admin] Delete GameSession Success',
  props<{ sessionId: string }>()
);

export const deleteGameSessionFailure = createAction(
  '[Admin] Delete GameSession Failure',
  props<{ error: string }>()
);

// Game Session Groups
export const openGameSessionGroupsDialog = createAction(
  '[Admin] Open Game Session Groups Dialog',
  props<{ sessionId: string }>()
);

export const loadGameSessionGroups = createAction(
  '[Admin] Load Game Session Groups',
  props<{ sessionId: string }>()
);

export const loadGameSessionGroupsSuccess = createAction(
  '[Admin] Load Game Session Groups Success',
  props<{ sessionId: string; groups: PlayerGroup[] }>()
);

export const loadGameSessionGroupsFailure = createAction(
  '[Admin] Load Game Session Groups Failure',
  props<{ sessionId: string; error: string }>()
);

// Drag & Drop move player between groups
export const movePlayerToGroup = createAction(
  '[Admin] Move Player To Group',
  props<{ poolId: string; playerId: string; newGroupId: string; sessionId: string }>()
);

export const movePlayerToGroupSuccess = createAction(
  '[Admin] Move Player To Group Success',
  props<{ sessionId: string }>()
);

export const movePlayerToGroupFailure = createAction(
  '[Admin] Move Player To Group Failure',
  props<{ sessionId: string; error: string }>()
);

// Session Scores
export const loadGameSessionScores = createAction(
  '[Admin] Load Game Session Scores',
  props<{ sessionId: string }>()
);

export const loadGameSessionScoresSuccess = createAction(
  '[Admin] Load Game Session Scores Success',
  props<{ sessionId: string; scores: any[] }>()
);

export const loadGameSessionScoresFailure = createAction(
  '[Admin] Load Game Session Scores Failure',
  props<{ sessionId: string; error: string }>()
);