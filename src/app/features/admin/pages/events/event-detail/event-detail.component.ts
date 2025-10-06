import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { COMMA, ENTER, SEMICOLON, SPACE } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Validators, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Event, EventStatus, GameSession, GameSessionStatus, Activity } from '../../../../../models';
import { AdminService } from '../../../services/admin.service';
import * as AdminActions from '../../../store/admin.actions';
import { toFrenchStatusLabel } from '../../../../../shared/status.mapper';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatChipsModule, MatIconModule],
  templateUrl: './event-detail.component.html',
})
export class EventDetailComponent {

  @Input() event: Event | null = null;
  @Output() editRequested = new EventEmitter<Event>();
  @Output() backToList = new EventEmitter<void>();
  activities$!: Observable<Activity[]>;
  EventStatus = EventStatus;
  emails: string[] = [];
  readonly separatorKeysCodes = [ENTER, COMMA, SEMICOLON, SPACE] as const;
  emailCtrl = new FormControl<string>('', { nonNullable: true, validators: [Validators.email] });

  constructor(
    private readonly adminService: AdminService, 
    private readonly store: Store,
  ) {
    this.activities$ = this.adminService.getActivities();
  }

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
    const poolStatus = this.event.pools?.[0]?.status ?? 'Pending';
    if (eventStatus === EventStatus.Cancelled || eventStatus === EventStatus.Completed) return false;
    if (poolStatus === 'Cancelled' || poolStatus === 'Completed') return false;
    return true;
  }

  canAddPlayers(): boolean { return false; }

  statusLabel(): string { return this.event ? toFrenchStatusLabel(this.event.status as unknown as string) : ''; }

  statusClass(): string {
    if (this.event?.status === EventStatus.Pending) return 'text-blue-600';
    if (this.event?.status === EventStatus.Active) return 'text-green-600';
    if (this.event?.status === EventStatus.Completed) return 'text-gray-600';
    if (this.event?.status === EventStatus.Cancelled) return 'text-red-600';
    return 'text-gray-700';
  }

  sessionStatusLabel(s: GameSession): string { return toFrenchStatusLabel(s.status as unknown as string); }

  sessionStatusClass(s: GameSession): string {
    if (s.status === GameSessionStatus.Pending) return 'text-blue-600';
    if (s.status === GameSessionStatus.Active) return 'text-green-600';
    if (s.status === GameSessionStatus.Completed) return 'text-gray-600';
    if (s.status === GameSessionStatus.Cancelled) return 'text-red-600';
    return 'text-gray-700';
  }

  onAddSession(activityId: string) {}

  timeFromDate(d?: Date | string): string {
    if (!d) return '';
    const dt = new Date(d);
    const hh = String(dt.getHours()).padStart(2, '0');
    const mm = String(dt.getMinutes()).padStart(2, '0');
    return `${hh}:${mm}`;
  }

  onStartTimeChange(ev: { id: string; hhmm: string }) {}
  onEndTimeChange(ev: { id: string; hhmm: string }) {}
  onRemoveSession(sessionId: string) {}

  addEmail(event: MatChipInputEvent) {
    const value = (event.value || '').trim();
    this.emailCtrl.setValue(value);
    this.emailCtrl.markAsDirty();
    if (value && this.isValidEmail(value)) {
      if (!this.emails.includes(value)) this.emails.push(value);
      event.chipInput?.clear();
      this.emailCtrl.reset('');
      return;
    }
  }

  removeEmail(email: string) {
    const idx = this.emails.indexOf(email);
    if (idx >= 0) this.emails.splice(idx, 1);
  }

  onSendQRCode() {
    if (!this.event || this.emails.length === 0) return;
    this.store.dispatch(AdminActions.sendQRCodeToEmailList({ eventId: this.event.id, emails: this.emails }));
  }

  private isValidEmail(v: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }
}


