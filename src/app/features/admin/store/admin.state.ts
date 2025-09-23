import { Administrator, Site, Activity, Pool, Event, PlayerRegistration, GameSession, PlayerGroup, PlayerGlobalScore, ActivitySummaryData } from '../../../models';

export interface AdminState {
  // Auth
  currentAdmin: Administrator | null;
  isAuthenticated: boolean;
  authLoading: boolean;
  authError: string | null;

  // Sites
  sites: Site[];
  sitesLoading: boolean;
  sitesError: string | null;
  selectedSite: Site | null;

  // Activities
  activities: Activity[];
  activitiesLoading: boolean;
  activitiesError: string | null;
  selectedActivity: Activity | null;

  // Events
  events: Event[];
  eventsLoading: boolean;
  eventsError: string | null;
  selectedEvent: Event | null;

  // Pools
  pools: Pool[];
  poolsLoading: boolean;
  poolsError: string | null;
  selectedPool: Pool | null;
  poolStats: PoolStats | null;

  // Player registrations
  registrations: PlayerRegistration[];
  registrationsLoading: boolean;
  registrationsError: string | null;

  // Dashboard
  dashboardStats: DashboardStats | null;
  dashboardLoading: boolean;
  dashboardError: string | null;

  // Real-time updates
  realTimeEnabled: boolean;
  lastUpdate: Date | null;
}

export interface PoolStats {
  totalPlayers: number;
  registeredPlayers: number;
  checkedInPlayers: number;
  activeSessions: number;
  completedSessions: number;
  totalActivities: number;
}

export interface DashboardStats {
  totalPools: number;
  activePools: number;
  totalPlayers: number;
  totalActivities: number;
  recentActivity: RecentActivity[];
}

export interface RecentActivity {
  id: string;
  type: 'pool_created' | 'player_registered' | 'session_started' | 'session_completed' | 'pool_ended';
  message: string;
  timestamp: Date;
  poolId?: string;
  playerId?: string;
}

export const initialAdminState: AdminState = {
  currentAdmin: null,
  isAuthenticated: false,
  authLoading: false,
  authError: null,

  sites: [],
  sitesLoading: false,
  sitesError: null,
  selectedSite: null,

  activities: [],
  activitiesLoading: false,
  activitiesError: null,
  selectedActivity: null,

  events: [],
  eventsLoading: false,
  eventsError: null,
  selectedEvent: null,

  pools: [],
  poolsLoading: false,
  poolsError: null,
  selectedPool: null,
  poolStats: null,

  registrations: [],
  registrationsLoading: false,
  registrationsError: null,

  dashboardStats: null,
  dashboardLoading: false,
  dashboardError: null,

  realTimeEnabled: false,
  lastUpdate: null
};
