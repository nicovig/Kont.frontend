import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AdminActions from '../../../store/admin.actions';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { Event, GameSession, GameSessionStatus } from '../../../../../models';
import { GenerateGroupsButtonComponent } from '../generate-groups-button/generate-groups-button.component';

@Component({
  selector: 'app-sessions-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatFormFieldModule, MatSelectModule, GenerateGroupsButtonComponent, MatIconModule],
  templateUrl: './sessions-admin.component.html',
})
export class SessionsAdminComponent {
  @Input() event: Event | null = null;
  @Input() sessions: GameSession[] = [];
  @Input() canEdit = false;
  @Input() canAddPlayers = false;
  @Output() add = new EventEmitter<string>();
  @Output() startTimeChange = new EventEmitter<{ id: string; hhmm: string }>();
  @Output() endTimeChange = new EventEmitter<{ id: string; hhmm: string }>();
  @Output() changeStatus = new EventEmitter<{ id: string; status: GameSessionStatus }>();
  @Output() remove = new EventEmitter<string>();
  @Output() validateAllPresent = new EventEmitter<void>();

  newSessionActivityId = '';
  GameSessionStatus = GameSessionStatus;

  constructor(private store: Store) {}

  onAddClick() {
    if (!this.newSessionActivityId) return;
    this.add.emit(this.newSessionActivityId);
    this.newSessionActivityId = '';
  }

  timeFromDate(d?: Date | string): string {
    if (!d) return '';
    const dt = new Date(d);
    const hh = String(dt.getHours()).padStart(2, '0');
    const mm = String(dt.getMinutes()).padStart(2, '0');
    return `${hh}:${mm}`;
  }

  private isPreviousClosed(index: number): boolean {
    if (index === 0) return true;
    const prev = this.sessions[index - 1];
    return prev.status === GameSessionStatus.Completed || prev.status === GameSessionStatus.Cancelled;
  }

  canStart(index: number): boolean {
    const s = this.sessions[index];
    if (!s) return false;
    if (s.status !== GameSessionStatus.Pending) return false;
    return this.isPreviousClosed(index);
  }

  isFirstOfActivity(): boolean {
    return this.sessions.length === 0 || this.sessions.every(x => x.status === GameSessionStatus.Completed || x.status === GameSessionStatus.Cancelled || x.status === GameSessionStatus.Pending);
  }

  hasActiveSession(): boolean {
    return this.sessions.some(x => x.status === GameSessionStatus.Active);
  }

  canGenerateFor(index: number, session: GameSession): boolean {
    if (!this.canEdit) return false;
    if (this.hasActiveSession()) return false;
    if (session.status !== GameSessionStatus.Pending) return false;
    return this.isPreviousClosed(index);
  }

  openGroups(sessionId: string) {
    this.store.dispatch(AdminActions.openGameSessionGroupsDialog({ sessionId }));
  }
}


