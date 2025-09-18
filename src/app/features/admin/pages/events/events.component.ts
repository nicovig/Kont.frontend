import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { EventsListComponent } from './events-list/events-list.component';
import { EventFormComponent } from './event-form/event-form.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Event, Site, Activity, User, Administrator } from '../../../../models';
import * as AdminActions from '../../store/admin.actions';
import * as AdminSelectors from '../../store/admin.selectors';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, EventsListComponent, EventFormComponent, EventDetailComponent],
  providers: [provideNativeDateAdapter()],
  templateUrl: './events.component.html',
})
export class EventsComponent {
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  events$: Observable<Event[]> = this.store.select(AdminSelectors.selectEvents);
  sites$: Observable<Site[]> = this.store.select(AdminSelectors.selectSites);
  activities$: Observable<Activity[]> = this.store.select(AdminSelectors.selectActivities);

  view: 'list' | 'create' | 'detail' | 'edit' = 'list';
  selectedEvent: Event | null = null;

  ngOnInit() {
    this.store.dispatch(AdminActions.loadEvents());
    this.store.dispatch(AdminActions.loadSites());
    this.store.dispatch(AdminActions.loadActivities());

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      const url = this.router.url;
      if (url.endsWith('/events/new')) {
        this.view = 'create';
        this.selectedEvent = null;
      } else if (id) {
        this.events$.subscribe(list => {
          const found = list.find(e => e.id === id) || null;
          this.selectedEvent = found;
          this.view = found ? 'detail' : 'list';
        }).unsubscribe();
      } else {
        this.view = 'list';
        this.selectedEvent = null;
      }
    });
  }

  onSelect(e: Event) { this.selectedEvent = e; this.view = 'detail'; }
  edit() { if (this.selectedEvent) this.view = 'edit'; }
  afterSave() { this.view = 'list'; this.selectedEvent = null; this.store.dispatch(AdminActions.loadEvents()); }
  deleteSelected() {
    if (!this.selectedEvent) return;
    this.store.dispatch(AdminActions.deleteEvent({ eventId: this.selectedEvent.id } as any));
    this.afterSave();
  }
}
