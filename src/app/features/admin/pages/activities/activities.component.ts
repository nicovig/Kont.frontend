import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Activity } from '../../../models';
import { AdminState } from '../../store/admin.state';
import * as AdminActions from '../../store/admin.actions';
import * as AdminSelectors from '../../store/admin.selectors';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  // Selectors
  activities$: Observable<Activity[]>;
  activitiesLoading$: Observable<boolean>;
  activitiesError$: Observable<string | null>;
  selectedActivity$: Observable<Activity | null>;

  constructor(private readonly store: Store<{ admin: AdminState }>) {
    this.activities$ = this.store.select(AdminSelectors.selectActivities);
    this.activitiesLoading$ = this.store.select(AdminSelectors.selectActivitiesLoading);
    this.activitiesError$ = this.store.select(AdminSelectors.selectActivitiesError);
    this.selectedActivity$ = this.store.select(AdminSelectors.selectSelectedActivity);
  }

  ngOnInit(): void {
    this.store.dispatch(AdminActions.loadActivities());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  createActivity(): void {
    console.log('Create new activity');
    // TODO: Implémenter la création d'activité
  }

  viewActivity(activityId: string): void {
    console.log('View activity:', activityId);
    // TODO: Implémenter la vue détaillée
  }

  editActivity(activityId: string): void {
    console.log('Edit activity:', activityId);
    // TODO: Implémenter l'édition
  }

  deleteActivity(activityId: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette activité ?')) {
      this.store.dispatch(AdminActions.deleteActivity({ activityId }));
    }
  }
}
