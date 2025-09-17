import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { Event, EventStatus } from '../../../../../models';

@Component({
  selector: 'app-events-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatTableModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule],
  providers: [provideNativeDateAdapter(), { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }],
  templateUrl: './events-list.component.html',
})
export class EventsListComponent {
  @Input() events: Event[] = [];
  @Output() create = new EventEmitter<void>();
  @Output() select = new EventEmitter<Event>();

  displayedColumns: string[] = ['name', 'site', 'dates', 'status', 'actions'];
  dataSource = new MatTableDataSource<Event>([]);
  filterText = '';
  filterStatus: EventStatus | '' = '';
  filterDateFrom: string = '';
  filterDateTo: string = '';
  EventStatus = EventStatus;

  ngOnChanges() {
    this.dataSource.data = this.events ?? [];
    this.applyFilters();
  }

  applyFilters() {
    const text = (this.filterText || '').toLowerCase();
    const status = this.filterStatus || '';
    const from = this.filterDateFrom ? new Date(this.filterDateFrom) : null;
    const to = this.filterDateTo ? new Date(this.filterDateTo) : null;
    this.dataSource.data = (this.events || []).filter(e => {
      const matchesText = !text || (e.name || '').toLowerCase().includes(text);
      const matchesStatus = !status || (e.status || '') === status;
      let matchesDate = true;
      const start = e.startedAt ? new Date(e.startedAt) : null;
      const end = e.endedAt ? new Date(e.endedAt) : null;
      if (from) {
        const startOk = !!(start && start >= from);
        const endOk = !!(end && end >= from);
        matchesDate = matchesDate && (startOk || endOk);
      }
      if (to) {
        const toEndOfDay = new Date(to);
        toEndOfDay.setHours(23,59,59,999);
        const startOk = !!(start && start <= toEndOfDay);
        const endOk = !!(end && end <= toEndOfDay);
        matchesDate = matchesDate && (startOk || endOk);
      }
      return matchesText && matchesStatus && matchesDate;
    });
  }

  statusLabel(e: Event): string {
    switch (e.status) {
      case EventStatus.Pending: return 'Prévu';
      case EventStatus.Active: return 'En cours';
      case EventStatus.Completed: return 'Terminé';
      case EventStatus.Cancelled: return 'Annulé';
      default: return e.status || '';
    }
  }

  statusClass(e: Event): string {
    if (e.status === EventStatus.Pending) return 'text-blue-600';
    if (e.status === EventStatus.Active) return 'text-green-600';
    if (e.status === EventStatus.Completed) return 'text-gray-600';
    if (e.status === EventStatus.Cancelled) return 'text-red-600';
    return 'text-gray-700';
  }
}


