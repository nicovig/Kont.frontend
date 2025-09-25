import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { NotificationService } from '../../../../../core/services/notification.service';
import { Event, EventStatus, GameSession, GameSessionStatus, Activity, PoolStatus } from '../../../../../models';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './event-detail.component.html',
})
export class EventDetailComponent implements OnInit, OnDestroy {

  @Input() event: Event | null = null;
  @Output() editRequested = new EventEmitter<Event>();
  @Output() backToList = new EventEmitter<void>();
  activities$!: Observable<Activity[]>;
  private destroy$ = new Subject<void>();
  EventStatus = EventStatus;

  constructor(
    private readonly adminService: AdminService, 
    private readonly store: Store,
    private readonly dialog: MatDialog,
    private readonly notificationService: NotificationService
  ) {
    this.activities$ = this.adminService.getActivities();
  }

  ngOnInit(): void {
    // Rely on @Input() updates from parent; no manual subscriptions here
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnChanges() {}

  isDisabledStartEvent(): unknown {
    if (!this.event) return true;
    if (this.event.status !== EventStatus.Pending) return true;
    return false;
    }

  selectedSessionId(): string { return ''; }

  isFirstSessionOfActivity(): boolean { return true; }

  canGenerateGroups(): boolean { return false; }

  onEdit(event: Event) {
    this.editRequested.emit(event);
  }

  onBack() {
    this.backToList.emit();
  }

  canEdit(): boolean {
    if (!this.event) return false;
    const eventStatus = this.event.status;
    const poolStatus = (this.event.pools && this.event.pools[0]?.status) || 'Pending';
    if (eventStatus === EventStatus.Cancelled || eventStatus === EventStatus.Completed) return false;
    if (poolStatus === 'Cancelled' || poolStatus === 'Completed') return false;
    return true;
  }

  canAddPlayers(): boolean { return false; }

  statusLabel(): string {
    switch (this.event?.status) {
      case EventStatus.Pending: return 'Prévu';
      case EventStatus.Active: return 'En cours';
      case EventStatus.Completed: return 'Terminé';
      case EventStatus.Cancelled: return 'Annulé';
      default: return this.event?.status || '';
    }
  }

  statusClass(): string {
    if (this.event?.status === EventStatus.Pending) return 'text-blue-600';
    if (this.event?.status === EventStatus.Active) return 'text-green-600';
    if (this.event?.status === EventStatus.Completed) return 'text-gray-600';
    if (this.event?.status === EventStatus.Cancelled) return 'text-red-600';
    return 'text-gray-700';
  }

  sessionStatusLabel(s: GameSession): string {
    switch (s.status) {
      case GameSessionStatus.Pending: return 'En attente';
      case GameSessionStatus.Active: return 'En cours';
      case GameSessionStatus.Completed: return 'Terminé';
      case GameSessionStatus.Cancelled: return 'Annulé';
      default: return s.status as unknown as string;
    }
  }

  sessionStatusClass(s: GameSession): string {
    if (s.status === GameSessionStatus.Pending) return 'text-blue-600';
    if (s.status === GameSessionStatus.Active) return 'text-green-600';
    if (s.status === GameSessionStatus.Completed) return 'text-gray-600';
    if (s.status === GameSessionStatus.Cancelled) return 'text-red-600';
    return 'text-gray-700';
  }

  onAddSession(activityId: string) {}

  setSessionStatus(s: GameSession, status: 'Pending' | 'Active' | 'Completed' | 'Cancelled') {}

  onChangeStatus(ev: { id: string; status: GameSessionStatus }) {}

  deleteSession(s: GameSession) {}

  timeFromDate(d?: Date | string): string {
    if (!d) return '';
    const dt = new Date(d);
    const hh = String(dt.getHours()).padStart(2, '0');
    const mm = String(dt.getMinutes()).padStart(2, '0');
    return `${hh}:${mm}`;
  }

  updateSessionTime(s: GameSession, hhmm: string) {}

  onStartTimeChange(ev: { id: string; hhmm: string }) {}

  updateSessionEndTime(s: GameSession, hhmm: string) {}

  onEndTimeChange(ev: { id: string; hhmm: string }) {}

  onRemoveSession(sessionId: string) {}

  onSendQRCode() {}

  onStartEvent() {}
}


