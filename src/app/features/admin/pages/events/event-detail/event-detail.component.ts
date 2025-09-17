import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Event, EventStatus, GameSession, GameSessionStatus, Activity } from '../../../../../models';
import { AdminService } from '../../../services/admin.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './event-detail.component.html',
})
export class EventDetailComponent {
  @Input() event: Event | null = null;
  @Output() editRequested = new EventEmitter<Event>();
  @Output() backToList = new EventEmitter<void>();
  sessions: GameSession[] = [];
  activities$!: Observable<Activity[]>;
  newSessionActivityId: string = '';
  constructor(private readonly adminService: AdminService) {
    this.activities$ = this.adminService.getActivities();
  }

  ngOnChanges() {
    if (this.event?.id) {
      this.adminService.getGameSessionsByEvent(this.event.id).subscribe(s => this.sessions = s);
    }
  }

  onEdit(event: Event) {
    this.editRequested.emit(event);
  }

  onBack() {
    this.backToList.emit();
  }

  canEdit(): boolean {
    return this.event?.status === EventStatus.Pending;
  }

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

  addSession() {
    if (!this.event?.id || !this.newSessionActivityId) return;
    this.adminService.createGameSessionForEvent(this.event.id, this.newSessionActivityId).subscribe(gs => {
      this.sessions = [...this.sessions, gs];
      this.newSessionActivityId = '';
    });
  }

  setSessionStatus(s: GameSession, status: 'Pending' | 'Active' | 'Completed' | 'Cancelled') {
    this.adminService.updateGameSessionStatus(s.id, status).subscribe(upd => {
      this.sessions = this.sessions.map(x => x.id === upd.id ? upd : x);
    });
  }

  deleteSession(s: GameSession) {
    if (!confirm('Supprimer cette session ?')) return;
    this.adminService.deleteGameSession(s.id).subscribe(() => {
      this.sessions = this.sessions.filter(x => x.id !== s.id);
    });
  }

  timeFromDate(d?: Date | string): string {
    if (!d) return '';
    const dt = new Date(d);
    const hh = String(dt.getHours()).padStart(2, '0');
    const mm = String(dt.getMinutes()).padStart(2, '0');
    return `${hh}:${mm}`;
  }

  updateSessionTime(s: GameSession, hhmm: string) {
    if (!this.canEdit() || !hhmm) return;
    const [hh, mm] = hhmm.split(':').map(x => parseInt(x, 10));
    const base = s.startedAt ? new Date(s.startedAt) : new Date();
    base.setHours(hh || 0, mm || 0, 0, 0);
    this.adminService.updateGameSessionStartTime(s.id, base).subscribe(upd => {
      this.sessions = this.sessions.map(x => x.id === upd.id ? upd : x);
    });
  }

  updateSessionEndTime(s: GameSession, hhmm: string) {
    if (!this.canEdit() || !hhmm) return;
    const [hh, mm] = hhmm.split(':').map(x => parseInt(x, 10));
    const base = s.endedAt ? new Date(s.endedAt) : (s.startedAt ? new Date(s.startedAt) : new Date());
    base.setHours(hh || 0, mm || 0, 0, 0);
    if (s.startedAt && base < new Date(s.startedAt)) return;
    this.adminService.updateGameSessionEndTime(s.id, base).subscribe(upd => {
      this.sessions = this.sessions.map(x => x.id === upd.id ? upd : x);
    });
  }
}


