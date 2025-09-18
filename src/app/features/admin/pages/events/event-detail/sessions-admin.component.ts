import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Activity, Event, GameSession, GameSessionStatus } from '../../../../../models';

@Component({
  selector: 'app-sessions-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatFormFieldModule, MatSelectModule],
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

  timeFromDate(d?: Date | string): string {
    if (!d) return '';
    const dt = new Date(d);
    const hh = String(dt.getHours()).padStart(2, '0');
    const mm = String(dt.getMinutes()).padStart(2, '0');
    return `${hh}:${mm}`;
  }
}


