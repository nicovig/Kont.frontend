import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Activity, Event, Site } from '../../../../../models';
import * as AdminSelectors from '../../../store/admin.selectors';
import * as AdminActions from '../../../store/admin.actions';
import { CreateEventRequest, UpdateEventRequest } from '../../../services/request-models/event.models';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './event-form.component.html',
  providers: [provideNativeDateAdapter(), { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }],
})
export class EventFormComponent {
  private readonly store = inject(Store);

  activities$: Observable<Activity[]> = this.store.select(AdminSelectors.selectActivities);
  selectedSite$ = this.store.select(AdminSelectors.selectSelectedSite);

  @Input() event: Event | null = null;
  @Input() isEditMode = false;
  @Output() saved = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  form: any = { name: '', eventLink: '', startedAt: '', endedAt: '', siteId: '', activityIds: [] as string[] };
  error: string | null = null;

  ngOnInit() {
    if (this.isEditMode && this.event) {
      this.form = {
        id: this.event.id,
        name: this.event.name,
        eventLink: this.event.eventLink,
        startedAt: this.event.startedAt ? new Date(this.event.startedAt) : '',
        endedAt: this.event.endedAt ? new Date(this.event.endedAt) : '',
        activityIds: (this.event.activities || []).map(a => a.id)
      };
    }
  }

  isDisable(): boolean {
    if (!this.form.name || !this.form.eventLink || !this.form.startedAt || !this.form.endedAt) {
      this.error = 'Nom, lien et dates sont requis.';
      return true;
    }
    const start = new Date(this.form.startedAt);
    const end = new Date(this.form.endedAt);  
    if (start && end && end < start) {
      this.error = 'La date de fin ne peut pas être antérieure à la date de début.';
      return true;
    }
    this.error = null;
    return false;
  }

  save() {
    this.error = null;
    if (this.isEditMode) {
      this.store.dispatch(AdminActions.updateEvent({ request: this.form as UpdateEventRequest }));
    } else {
      const req: CreateEventRequest = {
        name: this.form.name,
        eventLink: this.form.eventLink,
        startedAt: this.form.startedAt,
        endedAt: this.form.endedAt,
        activityIds: this.form.activityIds || []
      };
      this.store.dispatch(AdminActions.createEvent({ request: req }));
    }
    this.saved.emit();
  }

  cancel() { this.cancelled.emit(); }

  onLinkChange(value: string) {
    if (typeof value !== 'string') return;
    const sanitized = value.trim().replace(/\s+/g, '-');
    this.form.eventLink = sanitized;
  }
}


