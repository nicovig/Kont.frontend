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
    currentAdmin: {
      id: jwtResponse.userId,
      email: jwtResponse.email,
      firstname: jwtResponse.firstname,
      lastname: jwtResponse.lastname,
      password: '',
      createdAt: new Date(),
      phoneNumber: '',
      subscription: {} as any,
      sites: [],
      role: { id: '', roleType: jwtResponse.role } as any,
      isActive: true
    },
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

  on(AdminActions.logoutAdmin, (state) => ({
    ...state,
    currentAdmin: null,
    isAuthenticated: false,
    authError: null
  })),

  // Sites Reducers
  on(AdminActions.loadSites, (state) => ({
    ...state,
    sitesLoading: true,
    sitesError: null
  })),

  on(AdminActions.loadSitesSuccess, (state, { sites }) => ({
    ...state,
    sites,
    sitesLoading: false,
    sitesError: null
  })),

  on(AdminActions.loadSitesFailure, (state, { error }) => ({
    ...state,
    sitesLoading: false,
    sitesError: error
  })),

  on(AdminActions.createSiteSuccess, (state, { site }) => ({
    ...state,
    sites: [...state.sites, site]
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
);
