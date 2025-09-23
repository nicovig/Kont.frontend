import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AdminState } from './admin.state';
import { Pool, Event, Activity } from '../../../models';

export const selectAdminState = createFeatureSelector<AdminState>('admin');

// Auth Selectors
export const selectCurrentAdmin = createSelector(
  selectAdminState,
  (state) => state.currentAdmin
);

export const selectIsAuthenticated = createSelector(
  selectAdminState,
  (state) => state.isAuthenticated
);

export const selectAuthLoading = createSelector(
  selectAdminState,
  (state) => state.authLoading
);

export const selectAuthError = createSelector(
  selectAdminState,
  (state) => state.authError
);

// Sites Selectors
export const selectSites = createSelector(
  selectAdminState,
  (state) => state.sites
);

export const selectSitesLoading = createSelector(
  selectAdminState,
  (state) => state.sitesLoading
);

export const selectSitesError = createSelector(
  selectAdminState,
  (state) => state.sitesError
);

export const selectSelectedSite = createSelector(
  selectAdminState,
  (state) => state.selectedSite
);

export const selectRegistrations = createSelector(
  selectAdminState,
  (state) => state.registrations
);

export const selectRegistrationsLoading = createSelector(
  selectAdminState,
  (state) => state.registrationsLoading
);

// Activities Selectors
export const selectActivities = createSelector(
  selectAdminState,
  (state) => state.activities
);

export const selectActivitiesLoading = createSelector(
  selectAdminState,
  (state) => state.activitiesLoading
);

export const selectActivitiesError = createSelector(
  selectAdminState,
  (state) => state.activitiesError
);

export const selectSelectedActivity = createSelector(
  selectAdminState,
  (state) => state.selectedActivity
);

export const selectActivitiesBySite = createSelector(
  selectActivities,
  (activities: Activity[], siteId: string) => activities.filter(a => a.site.id === siteId)
);

// Events Selectors
export const selectEvents = createSelector(
  selectAdminState,
  (state) => state.events
);

export const selectEventsLoading = createSelector(
  selectAdminState,
  (state) => state.eventsLoading
);

export const selectEventsError = createSelector(
  selectAdminState,
  (state) => state.eventsError
);

export const selectSelectedEvent = createSelector(
  selectAdminState,
  (state) => state.selectedEvent
);

export const selectEventsBySite = createSelector(
  selectEvents,
  (events: Event[], siteId: string) => events.filter(e => e.site.id === siteId)
);

// Pools Selectors
export const selectPools = createSelector(
  selectAdminState,
  (state) => state.pools
);

export const selectPoolsLoading = createSelector(
  selectAdminState,
  (state) => state.poolsLoading
);

export const selectPoolsError = createSelector(
  selectAdminState,
  (state) => state.poolsError
);

export const selectSelectedPool = createSelector(
  selectAdminState,
  (state) => state.selectedPool
);

export const selectPoolStats = createSelector(
  selectAdminState,
  (state) => state.poolStats
);

export const selectPoolsByEvent = createSelector(
  selectPools,
  (pools: Pool[], eventId: string) => pools.filter(p => p.event.id === eventId)
);

export const selectActivePools = createSelector(
  selectPools,
  (pools) => pools.filter(p => p.status === 'Active')
);

export const selectPendingPools = createSelector(
  selectPools,
  (pools) => pools.filter(p => p.status === 'Pending')
);

export const selectCompletedPools = createSelector(
  selectPools,
  (pools) => pools.filter(p => p.status === 'Completed')
);

// Dashboard Selectors
export const selectDashboardStats = createSelector(
  selectAdminState,
  (state) => state.dashboardStats
);

export const selectDashboardLoading = createSelector(
  selectAdminState,
  (state) => state.dashboardLoading
);

export const selectDashboardError = createSelector(
  selectAdminState,
  (state) => state.dashboardError
);

export const selectRecentActivity = createSelector(
  selectDashboardStats,
  (stats) => stats?.recentActivity || []
);

// Real-time Selectors
export const selectRealTimeEnabled = createSelector(
  selectAdminState,
  (state) => state.realTimeEnabled
);

export const selectLastUpdate = createSelector(
  selectAdminState,
  (state) => state.lastUpdate
);

// Combined Selectors
export const selectAdminOverview = createSelector(
  selectCurrentAdmin,
  selectActivities,
  selectPools,
  selectDashboardStats,
  (admin, activities, pools, dashboardStats) => ({
    admin,
    activitiesCount: activities.length,
    poolsCount: pools.length,
    activePoolsCount: pools.filter(p => p.status === 'Active').length,
    dashboardStats
  })
);

export const selectPoolOverview = createSelector(
  selectSelectedPool,
  selectPoolStats,
  selectActivities,
  (pool, stats, activities) => ({
    pool,
    stats,
    poolActivities: pool ? activities.filter(a => pool.gameSessions.some(gs => gs.activity.id === a.id)) : []
  })
);

// Error Selectors
export const selectAllErrors = createSelector(
  selectAuthError,
  selectActivitiesError,
  selectEventsError,
  selectPoolsError,
  selectDashboardError,
  (authError, activitiesError, eventsError, poolsError, dashboardError) => ({
    authError,
    activitiesError,
    eventsError,
    poolsError,
    dashboardError
  })
);

// Loading Selectors
export const selectAllLoading = createSelector(
  selectAuthLoading,
  selectActivitiesLoading,
  selectEventsLoading,
  selectPoolsLoading,
  selectDashboardLoading,
  (authLoading, activitiesLoading, eventsLoading, poolsLoading, dashboardLoading) => ({
    authLoading,
    activitiesLoading,
    eventsLoading,
    poolsLoading,
    dashboardLoading
  })
);
