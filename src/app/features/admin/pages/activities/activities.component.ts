import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Activity } from '../../../../models';
import { AdminState } from '../../store/admin.state';
import * as AdminActions from '../../store/admin.actions';
import * as AdminSelectors from '../../store/admin.selectors';
import { ActivityFormComponent } from './activity-form/activity-form.component';
import { ActivityDetailComponent } from './activity-detail/activity-detail.component';
import { ActivitiesListComponent } from './activities-list/activities-list.component';

export type ViewMode = 'list' | 'create' | 'edit' | 'detail';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    FormsModule,
    ActivityFormComponent,
    ActivityDetailComponent,
    ActivitiesListComponent
  ],
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

  // Component state
  currentView: ViewMode = 'list';
  selectedActivity: Activity | null = null;
  activityToEdit: Activity | null = null;

  constructor(private readonly store: Store<{ admin: AdminState }>) {
    this.activities$ = this.store.select(AdminSelectors.selectActivities);
    this.activitiesLoading$ = this.store.select(AdminSelectors.selectActivitiesLoading);
    this.activitiesError$ = this.store.select(AdminSelectors.selectActivitiesError);
    this.selectedActivity$ = this.store.select(AdminSelectors.selectSelectedActivity);
  }

  ngOnInit(): void {
    this.store.dispatch(AdminActions.loadActivities());
    
    // Écouter les changements d'état pour gérer les transitions
    this.activitiesLoading$.pipe(takeUntil(this.destroy$)).subscribe(loading => {
      if (!loading) {
        // Vérifier s'il y a une erreur
        this.activitiesError$.pipe(takeUntil(this.destroy$)).subscribe(error => {
          if (!error && this.currentView !== 'list') {
            // Retourner à la liste après une opération réussie
            this.currentView = 'list';
            this.selectedActivity = null;
            this.activityToEdit = null;
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Navigation methods
  showCreateForm(): void {
    this.currentView = 'create';
    this.selectedActivity = null;
    this.activityToEdit = null;
  }

  showEditForm(activity: Activity): void {
    this.currentView = 'edit';
    this.activityToEdit = activity;
    this.selectedActivity = null;
  }

  showActivityDetail(activity: Activity): void {
    this.currentView = 'detail';
    this.selectedActivity = activity;
    this.activityToEdit = null;
    this.store.dispatch(AdminActions.selectActivity({ activity }));
  }

  backToList(): void {
    this.currentView = 'list';
    this.selectedActivity = null;
    this.activityToEdit = null;
    this.store.dispatch(AdminActions.selectActivity({ activity: null }));
  }

  // Form event handlers
  onFormSubmitted(): void {
    // Le formulaire a été soumis avec succès
    // L'état sera géré par les effets NgRx
    this.backToList();
  }

  onFormCancelled(): void {
    this.backToList();
  }

  onEditRequested(activity: Activity): void {
    this.showEditForm(activity);
  }

  // Activity actions
  deleteActivity(activityId: string): void {
    this.store.dispatch(AdminActions.deleteActivity({ activityId }));
  }

  // List component event handlers
  onActivityOpen(activityId: string): void {
    if (activityId === 'new') {
      this.showCreateForm();
    } else {
      // Trouver l'activité par ID
      this.activities$.pipe(takeUntil(this.destroy$)).subscribe(activities => {
        const activity = activities.find(a => a.id === activityId);
        if (activity) {
          this.showActivityDetail(activity);
        }
      });
    }
  }

  // Utility methods
  formatDate(date: Date | string): string {
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  getScoringMetricsCount(activity: Activity): number {
    return activity.scoringMetrics?.length || 0;
  }

  getActivityStatus(activity: Activity): { text: string; class: string } {
    const now = new Date();
    const createdAt = new Date(activity.createdAt);
    const daysSinceCreation = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysSinceCreation < 7) {
      return { text: 'Nouvelle', class: 'status-new' };
    } else if (daysSinceCreation < 30) {
      return { text: 'Active', class: 'status-active' };
    } else {
      return { text: 'Ancienne', class: 'status-old' };
    }
  }
}
