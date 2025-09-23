import { createReducer, on } from '@ngrx/store';
import { AdminState, initialAdminState } from './admin.state';
import * as AdminActions from './admin.actions';

export const adminReducer = createReducer(
  initialAdminState,

  // Auth Reducers
  on(AdminActions.loginAdmin, (state) => ({
    ...state,
    authLoading: true,
    authError: null
  })),

  on(AdminActions.loginAdminSuccess, (state, { jwtResponse }) => ({
    ...state,
    currentAdmin: state.currentAdmin,
    isAuthenticated: true,
    authLoading: false,
    authError: null
  })),

  on(AdminActions.loginAdminFailure, (state, { error }) => ({
    ...state,
    currentAdmin: null,
    isAuthenticated: false,
    authLoading: false,
    authError: error
  })),

  on(AdminActions.loadCurrentAdminSuccess, (state, { admin }) => ({
    ...state,
    currentAdmin: admin,
    isAuthenticated: true
  })),

  on(AdminActions.logoutAdmin, (state) => ({
    ...state,
    currentAdmin: null,
    isAuthenticated: false,
    authError: null
  })),

  // Sites Reducers

  on(AdminActions.loadSitesSuccess, (state, { sites }) => ({
    ...state,
    sites,
    sitesLoading: false,
    sitesError: null,
    selectedSite: sites.length > 0 && !state.selectedSite ? sites[0] : state.selectedSite
  })),

  on(AdminActions.selectSite, (state, { site }) => ({
    ...state,
    selectedSite: site
  })),

  on(AdminActions.changeSite, (state, { site }) => ({
    ...state,
    selectedSite: site
  })),


  // Activities Reducers
  on(AdminActions.loadActivities, (state) => ({
    ...state,
    activitiesLoading: true,
    activitiesError: null
  })),

  on(AdminActions.loadActivitiesSuccess, (state, { activities }) => ({
    ...state,
    activities,
    activitiesLoading: false,
    activitiesError: null
  })),

  on(AdminActions.loadActivitiesFailure, (state, { error }) => ({
    ...state,
    activitiesLoading: false,
    activitiesError: error
  })),

  on(AdminActions.createActivitySuccess, (state, { activity }) => ({
    ...state,
    activities: [...state.activities, activity]
  })),

  on(AdminActions.updateActivitySuccess, (state, { activity }) => ({
    ...state,
    activities: state.activities.map(a => a.id === activity.id ? activity : a),
    selectedActivity: state.selectedActivity?.id === activity.id ? activity : state.selectedActivity
  })),

  on(AdminActions.deleteActivitySuccess, (state, { activityId }) => ({
    ...state,
    activities: state.activities.filter(a => a.id !== activityId),
    selectedActivity: state.selectedActivity?.id === activityId ? null : state.selectedActivity
  })),

  on(AdminActions.selectActivity, (state, { activity }) => ({
    ...state,
    selectedActivity: activity
  })),

  // Events Reducers
  on(AdminActions.loadEvents, (state) => ({
    ...state,
    eventsLoading: true,
    eventsError: null
  })),

  on(AdminActions.loadEventsSuccess, (state, { events }) => ({
    ...state,
    events,
    eventsLoading: false,
    eventsError: null
  })),

  on(AdminActions.loadEventsFailure, (state, { error }) => ({
    ...state,
    eventsLoading: false,
    eventsError: error
  })),

  on(AdminActions.createEventSuccess, (state, { event }) => ({
    ...state,
    events: [...state.events, event]
  })),

  on(AdminActions.updateEventSuccess, (state, { event }) => ({
    ...state,
    events: state.events.map(e => e.id === event.id ? event : e),
    selectedEvent: state.selectedEvent?.id === event.id ? event : state.selectedEvent
  })),

  on(AdminActions.updateEventStatusSuccess, (state, { event }) => ({
    ...state,
    events: state.events.map(e => e.id === event.id ? event : e),
    selectedEvent: state.selectedEvent?.id === event.id ? event : state.selectedEvent
  })),

  on(AdminActions.deleteEventSuccess, (state, { eventId }) => ({
    ...state,
    events: state.events.filter(e => e.id !== eventId),
    selectedEvent: state.selectedEvent?.id === eventId ? null : state.selectedEvent
  })),

  on(AdminActions.selectEvent, (state, { event }) => ({
    ...state,
    selectedEvent: event
  })),

  // Dashboard Reducers
  on(AdminActions.loadDashboardStats, (state) => ({
    ...state,
    dashboardLoading: true,
    dashboardError: null
  })),

  on(AdminActions.loadDashboardStatsSuccess, (state, { stats }) => ({
    ...state,
    dashboardStats: stats,
    dashboardLoading: false,
    dashboardError: null
  })),

  on(AdminActions.loadDashboardStatsFailure, (state, { error }) => ({
    ...state,
    dashboardLoading: false,
    dashboardError: error
  })),

  // Real-time Reducers
  on(AdminActions.enableRealTimeUpdates, (state) => ({
    ...state,
    realTimeEnabled: true
  })),

  on(AdminActions.disableRealTimeUpdates, (state) => ({
    ...state,
    realTimeEnabled: false
  })),

  on(AdminActions.realTimeUpdate, (state, { update }) => ({
    ...state,
    lastUpdate: new Date(),
    dashboardStats: state.dashboardStats ? {
      ...state.dashboardStats,
      recentActivity: [update, ...state.dashboardStats.recentActivity].slice(0, 10)
    } : state.dashboardStats
  })),

  // QR Code Email Reducers
  on(AdminActions.sendQRCodeToEmailList, (state) => ({
    ...state,
    // Could add loading state if needed
  })),

  // Player Registrations Reducers
  on(AdminActions.loadPlayerRegistrations, (state) => ({
    ...state,
    registrationsLoading: true,
    registrationsError: null
  })),

  on(AdminActions.loadPlayerRegistrationsSuccess, (state, { registrations }) => ({
    ...state,
    registrations,
    registrationsLoading: false,
    registrationsError: null
  })),

  on(AdminActions.loadPlayerRegistrationsFailure, (state, { error }) => ({
    ...state,
    registrationsLoading: false,
    registrationsError: error
  })),

  on(AdminActions.updatePlayerPresenceSuccess, (state) => ({
    ...state
  })),

  on(AdminActions.sendQRCodeToEmailListSuccess, (state, { message }) => ({
    ...state,
    // Handle success if needed
  })),

  on(AdminActions.sendQRCodeToEmailListFailure, (state, { error }) => ({
    ...state,
    // Handle error if needed
  })),
);
