import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Event, EventStatus } from '../../../../../models';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './event-detail.component.html',
})
export class EventDetailComponent {
  @Input() event: Event | null = null;
  @Output() editRequested = new EventEmitter<Event>();
  @Output() backToList = new EventEmitter<void>();

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
}


