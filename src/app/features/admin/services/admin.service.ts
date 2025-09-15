import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Administrator, Site, Activity, Pool, Event, PlayerRegistration, GameSession, PlayerGlobalScore, ActivitySummaryData } from '../../../models';
import { PoolStats, DashboardStats, RecentActivity } from '../store/admin.state';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private readonly baseUrl = `${environment.apiBaseUrl}/admin`;

  constructor(private readonly http: HttpClient) {}

  // Auth
  login(email: string, password: string): Observable<Administrator> {
    return this.http.post<Administrator>(`${this.baseUrl}/auth/login`, { email, password });
  }

  // Sites
  getSites(): Observable<Site[]> {
    return this.http.get<Site[]>(`${this.baseUrl}/sites`);
  }

  createSite(site: Omit<Site, 'id' | 'createdAt'>): Observable<Site> {
    return this.http.post<Site>(`${this.baseUrl}/sites`, site);
  }

  updateSite(site: Site): Observable<Site> {
    return this.http.put<Site>(`${this.baseUrl}/sites/${site.id}`, site);
  }

  deleteSite(siteId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/sites/${siteId}`);
  }

  // Activities
  getActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${this.baseUrl}/activities`);
  }

  getActivity(activityId: string): Observable<Activity> {
    return this.http.get<Activity>(`${this.baseUrl}/activities/${activityId}`);
  }

  createActivity(activity: Omit<Activity, 'id' | 'createdAt'>): Observable<Activity> {
    return this.http.post<Activity>(`${this.baseUrl}/activities`, activity);
  }

  updateActivity(activity: Activity): Observable<Activity> {
    return this.http.put<Activity>(`${this.baseUrl}/activities/${activity.id}`, activity);
  }

  deleteActivity(activityId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/activities/${activityId}`);
  }

  // Events
  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.baseUrl}/events`);
  }

  getEvent(eventId: string): Observable<Event> {
    return this.http.get<Event>(`${this.baseUrl}/events/${eventId}`);
  }

  createEvent(event: Omit<Event, 'id' | 'createdAt'>): Observable<Event> {
    return this.http.post<Event>(`${this.baseUrl}/events`, event);
  }

  updateEvent(event: Event): Observable<Event> {
    return this.http.put<Event>(`${this.baseUrl}/events/${event.id}`, event);
  }

  deleteEvent(eventId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/events/${eventId}`);
  }

  // Pools
  getPools(): Observable<Pool[]> {
    return this.http.get<Pool[]>(`${this.baseUrl}/pools`);
  }

  getPool(poolId: string): Observable<Pool> {
    return this.http.get<Pool>(`${this.baseUrl}/pools/${poolId}`);
  }

  createPool(pool: Omit<Pool, 'id' | 'createdAt' | 'qrCode'>): Observable<Pool> {
    return this.http.post<Pool>(`${this.baseUrl}/pools`, pool);
  }

  updatePool(pool: Pool): Observable<Pool> {
    return this.http.put<Pool>(`${this.baseUrl}/pools/${pool.id}`, pool);
  }

  deletePool(poolId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/pools/${poolId}`);
  }

  getPoolStats(poolId: string): Observable<PoolStats> {
    return this.http.get<PoolStats>(`${this.baseUrl}/pools/${poolId}/stats`);
  }

  validateAllPlayersPresent(poolId: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/pools/${poolId}/validate-players`, {});
  }

  endPool(poolId: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/pools/${poolId}/end`, {});
  }

  // Dashboard
  getDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.baseUrl}/dashboard/stats`);
  }

  // Group Management
  updatePlayerGroup(poolId: string, playerId: string, newGroupId: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/pools/${poolId}/players/${playerId}/group`, {
      groupId: newGroupId
    });
  }

  // Referent Management
  assignReferent(poolId: string, referentId: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/pools/${poolId}/referents`, {
      referentId
    });
  }

  removeReferent(poolId: string, referentId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/pools/${poolId}/referents/${referentId}`);
  }

  // Account Recovery
  generateRecoveryQR(playerId: string, poolId: string): Observable<string> {
    return this.http.post<{ qrCode: string }>(`${this.baseUrl}/pools/${poolId}/players/${playerId}/recovery-qr`, {})
      .pipe(map(response => response.qrCode));
  }

  // Real-time updates
  subscribeToRealTimeUpdates(): Observable<RecentActivity> {
    // This would typically use WebSocket or Server-Sent Events
    // For now, we'll simulate with polling
    return this.http.get<RecentActivity>(`${this.baseUrl}/realtime/updates`);
  }

  // Player Management
  getPoolPlayers(poolId: string): Observable<PlayerRegistration[]> {
    return this.http.get<PlayerRegistration[]>(`${this.baseUrl}/pools/${poolId}/players`);
  }

  getPlayerScores(poolId: string, playerId: string): Observable<PlayerGlobalScore[]> {
    return this.http.get<PlayerGlobalScore[]>(`${this.baseUrl}/pools/${poolId}/players/${playerId}/scores`);
  }

  // Game Sessions
  getPoolGameSessions(poolId: string): Observable<GameSession[]> {
    return this.http.get<GameSession[]>(`${this.baseUrl}/pools/${poolId}/sessions`);
  }

  createGameSession(poolId: string, session: Omit<GameSession, 'id' | 'createdAt'>): Observable<GameSession> {
    return this.http.post<GameSession>(`${this.baseUrl}/pools/${poolId}/sessions`, session);
  }

  updateGameSession(poolId: string, sessionId: string, session: GameSession): Observable<GameSession> {
    return this.http.put<GameSession>(`${this.baseUrl}/pools/${poolId}/sessions/${sessionId}`, session);
  }

  // Activity Summary
  getActivitySummary(poolId: string, activityId: string): Observable<ActivitySummaryData> {
    return this.http.get<ActivitySummaryData>(`${this.baseUrl}/pools/${poolId}/activities/${activityId}/summary`);
  }
}
