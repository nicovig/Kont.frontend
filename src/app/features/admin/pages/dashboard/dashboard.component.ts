import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { Observable, Subject } from 'rxjs';
import { AdminState, DashboardStats, RecentActivity } from '../../store/admin.state';
import * as AdminActions from '../../store/admin.actions';
import * as AdminSelectors from '../../store/admin.selectors';
import { Event, EventStatus, GameSession } from '../../../../models';
import { toFrenchStatusLabel } from '../../../../shared/status.mapper';
import { SessionsAdminComponent } from './sessions-admin/sessions-admin.component';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, MatExpansionModule, MatButtonModule, SessionsAdminComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  // Selectors
  dashboardStats$: Observable<DashboardStats | null>;
  recentActivity$: Observable<RecentActivity[]>;
  dashboardLoading$: Observable<boolean>;
  realTimeEnabled$: Observable<boolean>;
  events$: Observable<Event[]>;
  eventSessions: { [eventId: string]: GameSession[] } = {};
  EventStatus = EventStatus;

  constructor(private readonly store: Store<{ admin: AdminState }>, private readonly adminService: AdminService) {
    this.dashboardStats$ = this.store.select(AdminSelectors.selectDashboardStats);
    this.recentActivity$ = this.store.select(AdminSelectors.selectRecentActivity);
    this.dashboardLoading$ = this.store.select(AdminSelectors.selectDashboardLoading);
    this.realTimeEnabled$ = this.store.select(AdminSelectors.selectRealTimeEnabled);
    this.events$ = this.store.select(AdminSelectors.selectEvents);
  }

  ngOnInit(): void {
    // Load dashboard stats
    this.store.dispatch(AdminActions.loadDashboardStats());

    // Enable real-time updates
    this.store.dispatch(AdminActions.enableRealTimeUpdates());

    // Load events for dashboard
    this.store.dispatch(AdminActions.loadEvents());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    
    // Disable real-time updates when leaving
    this.store.dispatch(AdminActions.disableRealTimeUpdates());
  }

  getActivityIcon(type: string): string {
    const icons: { [key: string]: string } = {
      'pool_created': '🏊',
      'player_registered': '👤',
      'session_started': '▶️',
      'session_completed': '✅',
      'pool_ended': '🏁'
    };
    return icons[type] || '📝';
  }

  loadSessionsForEvent(eventId: string) {
    this.adminService.getGameSessionsByEvent(eventId).subscribe(s => {
      this.eventSessions[eventId] = s;
    });
  }

  sessionsFor(eventId: string): GameSession[] {
    return this.eventSessions[eventId] || [];
  }

  trackByEventId(index: number, ev: Event) { return ev.id; }

  statusLabel(ev: Event): string { return toFrenchStatusLabel(ev.status as unknown as string); }

  statusClass(ev: Event): string {
    if (ev.status === EventStatus.Pending) return 'text-blue-600';
    if (ev.status === EventStatus.Active) return 'text-green-600';
    if (ev.status === EventStatus.Completed) return 'text-gray-600';
    if (ev.status === EventStatus.Cancelled) return 'text-red-600';
    return 'text-gray-700';
  }

  private normalizeDate(d: Date | string | null | undefined): Date | null {
    if (!d) return null;
    const dt = new Date(d as unknown as string);
    if (isNaN(dt.getTime())) return null;
    return dt;
  }

  isOngoing(ev: Event): boolean {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const start = this.normalizeDate(ev.startedAt as unknown as any);
    const end = this.normalizeDate(ev.endedAt as unknown as any);
    if (!start) return false;
    if (!end) return start <= today; // started and no end date → consider ongoing if already started
    return start <= today && today <= end;
  }

  isUpcomingWithin7Days(ev: Event): boolean {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const in7 = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    const start = this.normalizeDate(ev.startedAt as unknown as any);
    if (!start) return false;
    return start > today && start <= in7;
  }

  onRemoveSession(eventId: string, sessionId: string) {
    this.store.dispatch(AdminActions.deleteGameSession({ sessionId }));
    const current = this.eventSessions[eventId] || [];
    this.eventSessions[eventId] = current.filter(s => s.id !== sessionId);
  }

  onAddSession(eventId: string, activityId: string) {
    if (!activityId) return;
    this.store.dispatch(AdminActions.createGameSessionForEvent({ eventId, activityId }));
    // optimistic: reload list from API after creation could be added via success effect
    this.loadSessionsForEvent(eventId);
  }

  onChangeSessionStatus(eventId: string, ev: { id: string; status: 'Pending' | 'Active' | 'Completed' | 'Cancelled' }) {
    this.store.dispatch(AdminActions.updateGameSessionStatus({ sessionId: ev.id, status: ev.status }));
    this.loadSessionsForEvent(eventId);
  }

  private buildTime(base?: Date | string, hhmm?: string): Date | null {
    if (!hhmm) return null;
    const [hh, mm] = hhmm.split(':').map(x => parseInt(x, 10));
    const dt = base ? new Date(base) : new Date();
    dt.setHours(hh || 0, mm || 0, 0, 0);
    return dt;
  }

  onStartTimeChange(eventId: string, p: { id: string; hhmm: string }) {
    const current = this.eventSessions[eventId] || [];
    const s = current.find(x => x.id === p.id);
    if (!s) return;
    const when = this.buildTime(s.startedAt, p.hhmm);
    if (!when) return;
    this.store.dispatch(AdminActions.updateGameSessionStartTime({ sessionId: p.id, startedAt: when }));
    this.loadSessionsForEvent(eventId);
  }

  onEndTimeChange(eventId: string, p: { id: string; hhmm: string }) {
    const current = this.eventSessions[eventId] || [];
    const s = current.find(x => x.id === p.id);
    if (!s) return;
    const base = s.endedAt ? s.endedAt : (s.startedAt ? s.startedAt : new Date());
    const when = this.buildTime(base, p.hhmm);
    if (!when) return;
    this.store.dispatch(AdminActions.updateGameSessionEndTime({ sessionId: p.id, endedAt: when }));
    this.loadSessionsForEvent(eventId);
  }

  canStartEvent(ev: Event): boolean {
    return ev.status === EventStatus.Pending && this.isOngoing(ev);
  }

  onStartEvent(ev: Event) {
    this.store.dispatch(AdminActions.updateEventStatus({ eventId: ev.id, status: 'Active' }));
    this.store.dispatch(AdminActions.loadEvents());
    this.loadSessionsForEvent(ev.id);
  }

  onEndEvent(ev: Event) {
    this.store.dispatch(AdminActions.endEvent({ eventId: ev.id }));
    this.store.dispatch(AdminActions.loadEvents());
    this.loadSessionsForEvent(ev.id);
  }
}
