import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Event, EventStatus, GameSession, GameSessionStatus, Activity } from '../../../../../models';
import { AdminService } from '../../../services/admin.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SessionsAdminComponent } from './sessions-admin.component';
import { Store } from '@ngrx/store';
import * as AdminActions from '../../../store/admin.actions';
import { NotificationService } from '../../../../../core/services/notification.service';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatFormFieldModule, MatSelectModule, SessionsAdminComponent],
  templateUrl: './event-detail.component.html',
})
export class EventDetailComponent implements OnInit, OnDestroy {
  @Input() event: Event | null = null;
  @Output() editRequested = new EventEmitter<Event>();
  @Output() backToList = new EventEmitter<void>();
  sessions: GameSession[] = [];
  activities$!: Observable<Activity[]>;
  newSessionActivityId: string = '';
  private destroy$ = new Subject<void>();

  constructor(
    private readonly adminService: AdminService, 
    private readonly store: Store,
    private readonly dialog: MatDialog,
    private readonly notificationService: NotificationService
  ) {
    this.activities$ = this.adminService.getActivities();
  }

  ngOnInit(): void {
    // Listen to QR code email actions
    this.store.select(state => state).pipe(
      takeUntil(this.destroy$)
    ).subscribe((state: any) => {
      if (state.admin?.qrCodeEmailSuccess) {
        this.notificationService.showSuccess('QR codes envoyés avec succès !');
      }
      if (state.admin?.qrCodeEmailError) {
        this.notificationService.showError(`Erreur lors de l'envoi : ${state.admin.qrCodeEmailError}`);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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

  canAddPlayers(): boolean {
    return this.event?.pools[0]?.isAllPlayersPresent!;
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

  onAddSession(activityId: string) {
    this.newSessionActivityId = activityId;
    this.addSession();
  }

  setSessionStatus(s: GameSession, status: 'Pending' | 'Active' | 'Completed' | 'Cancelled') {
    this.adminService.updateGameSessionStatus(s.id, status).subscribe(upd => {
      this.sessions = this.sessions.map(x => x.id === upd.id ? upd : x);
    });
  }

  onChangeStatus(ev: { id: string; status: GameSessionStatus }) {
    const s = this.sessions.find(k => k.id === ev.id);
    if (!s) return;
    this.setSessionStatus(s, ev.status);
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

  onStartTimeChange(ev: { id: string; hhmm: string }) {
    const s = this.sessions.find(k => k.id === ev.id);
    if (!s) return;
    this.updateSessionTime(s, ev.hhmm);
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

  onEndTimeChange(ev: { id: string; hhmm: string }) {
    const s = this.sessions.find(k => k.id === ev.id);
    if (!s) return;
    this.updateSessionEndTime(s, ev.hhmm);
  }

  onRemoveSession(sessionId: string) {
    const s = this.sessions.find(k => k.id === sessionId);
    if (!s) return;
    this.deleteSession(s);
  }

  onValidateAllPresent() {
    if (!this.event?.id) return;
    this.store.dispatch(AdminActions.validateAllPlayersPresent({ eventId: this.event.id, isAllPlayersPresent: true }));
  }

  onSendQRCode() {
    if (!this.event?.id) return;

    const emailsInput = prompt('Entrez les adresses email séparées par des virgules:');
    if (!emailsInput) return;

    const emails = emailsInput.split(',').map(email => email.trim()).filter(email => email);
    
    if (emails.length === 0) {
      this.notificationService.showError('Aucune adresse email valide fournie');
      return;
    }

    // Validate emails
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const invalidEmails = emails.filter(email => !emailRegex.test(email));
    
    if (invalidEmails.length > 0) {
      this.notificationService.showError(`Adresses email invalides : ${invalidEmails.join(', ')}`);
      return;
    }

    this.store.dispatch(AdminActions.sendQRCodeToEmailList({ 
      eventId: this.event.id, 
      emails 
    }));
  }
}


