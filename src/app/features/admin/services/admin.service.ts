import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Site, Activity, Pool, Event, PlayerRegistration, GameSession, PlayerGlobalScore, ActivitySummaryData, JwtResponse } from '../../../models';
import { CreateEventRequest, UpdateEventRequest } from './request-models/event.models';
import { PoolStats, DashboardStats, RecentActivity } from '../store/admin.state';
import { ApiHttpService } from '../../../core/services/api-http.service';
import { CreateActivityRequest, UpdateActivityRequest } from './request-models/activity.models';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private readonly http = inject(ApiHttpService);

  // Auth
  login(email: string, password: string): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`/auth`, { email, password });
  }

  // Sites
  getSites(): Observable<Site[]> {
    return this.http.get<Site[]>(`/sites`);
  }

  createSite(site: Omit<Site, 'id' | 'createdAt'>): Observable<Site> {
    return this.http.post<Site>(`/sites`, site);
  }

  updateSite(site: Site): Observable<Site> {
    return this.http.put<Site>(`/sites/${site.id}`, site);
  }

  deleteSite(siteId: string): Observable<void> {
    return this.http.delete<void>(`/sites/${siteId}`);
  }

  // Activities
  getActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(`/activities`);
  }

  getActivity(activityId: string): Observable<Activity> {
    return this.http.get<Activity>(`/activities/${activityId}`);
  }

  createActivity(activity: CreateActivityRequest): Observable<Activity> {
    return this.http.post<Activity>(`/activities`, activity);
  }

  updateActivity(activity: UpdateActivityRequest): Observable<Activity> {
    return this.http.put<Activity>(`/activities/${activity.id}`, activity);
  }

  deleteActivity(activityId: string): Observable<void> {
    return this.http.delete<void>(`/activities/${activityId}`);
  }

  // Events
  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`/events`);
  }

  getEvent(eventId: string): Observable<Event> {
    return this.http.get<Event>(`/events/${eventId}`);
  }

  createEvent(event: CreateEventRequest): Observable<Event> {
    return this.http.post<Event>(`/events`, event);
  }

  updateEvent(event: UpdateEventRequest): Observable<Event> {
    return this.http.put<Event>(`/events/${event.id}`, event);
  }

  deleteEvent(eventId: string): Observable<void> {
    return this.http.delete<void>(`/events/${eventId}`);
  }

  // Pools
  getPools(): Observable<Pool[]> {
    return this.http.get<Pool[]>(`/pools`);
  }

  getPool(poolId: string): Observable<Pool> {
    return this.http.get<Pool>(`/pools/${poolId}`);
  }

  createPool(pool: Omit<Pool, 'id' | 'createdAt' | 'qrCode'>): Observable<Pool> {
    return this.http.post<Pool>(`/pools`, pool);
  }

  updatePool(pool: Pool): Observable<Pool> {
    return this.http.put<Pool>(`/pools/${pool.id}`, pool);
  }

  deletePool(poolId: string): Observable<void> {
    return this.http.delete<void>(`/pools/${poolId}`);
  }

  getPoolStats(poolId: string): Observable<PoolStats> {
    return this.http.get<PoolStats>(`/pools/${poolId}/stats`);
  }

  validateAllPlayersPresent(poolId: string): Observable<void> {
    return this.http.post<void>(`/pools/${poolId}/validate-players`, {});
  }

  endPool(poolId: string): Observable<void> {
    return this.http.post<void>(`/pools/${poolId}/end`, {});
  }

  // Dashboard
  getDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`/dashboard/stats`);
  }

  // Group Management
  updatePlayerGroup(poolId: string, playerId: string, newGroupId: string): Observable<void> {
    return this.http.put<void>(`/pools/${poolId}/players/${playerId}/group`, {
      groupId: newGroupId
    });
  }

  // Referent Management
  assignReferent(poolId: string, referentId: string): Observable<void> {
    return this.http.post<void>(`/pools/${poolId}/referents`, {
      referentId
    });
  }

  removeReferent(poolId: string, referentId: string): Observable<void> {
    return this.http.delete<void>(`/pools/${poolId}/referents/${referentId}`);
  }

  // Account Recovery
  generateRecoveryQR(playerId: string, poolId: string): Observable<string> {
    return this.http.post<{ qrCode: string }>(`/pools/${poolId}/players/${playerId}/recovery-qr`, {})
      .pipe(map(response => response.qrCode));
  }

  // Real-time updates
  subscribeToRealTimeUpdates(): Observable<RecentActivity> {
    return this.http.get<RecentActivity>(`/realtime/updates`);
  }

  // Player Management
  getPoolPlayers(poolId: string): Observable<PlayerRegistration[]> {
    return this.http.get<PlayerRegistration[]>(`/pools/${poolId}/players`);
  }

  getPlayerScores(poolId: string, playerId: string): Observable<PlayerGlobalScore[]> {
    return this.http.get<PlayerGlobalScore[]>(`/pools/${poolId}/players/${playerId}/scores`);
  }

  // Game Sessions
  getGameSessionsByEvent(eventId: string): Observable<GameSession[]> {
    return this.http.get<GameSession[]>(`/gamesessions/by-event/${eventId}`);
  }

  createGameSessionForEvent(eventId: string, activityId: string): Observable<GameSession> {
    return this.http.post<GameSession>(`/gamesessions/${eventId}`, { activityId });
  }

  updateGameSessionStatus(sessionId: string, status: 'Pending' | 'Active' | 'Completed' | 'Cancelled'): Observable<GameSession> {
    return this.http.put<GameSession>(`/gamesessions/${sessionId}/status/${status}`, {});
  }

  deleteGameSession(sessionId: string): Observable<void> {
    return this.http.delete<void>(`/gamesessions/${sessionId}`);
  }

  updateGameSessionStartTime(sessionId: string, startedAt: Date): Observable<GameSession> {
    return this.http.put<GameSession>(`/gamesessions/${sessionId}/start-time`, { id: sessionId, startedAt });
  }

  updateGameSessionEndTime(sessionId: string, endedAt: Date): Observable<GameSession> {
    return this.http.put<GameSession>(`/gamesessions/${sessionId}/end-time`, { id: sessionId, endedAt });
  }

  // Activity Summary
  getActivitySummary(poolId: string, activityId: string): Observable<ActivitySummaryData> {
    return this.http.get<ActivitySummaryData>(`/pools/${poolId}/activities/${activityId}/summary`);
  }
}
