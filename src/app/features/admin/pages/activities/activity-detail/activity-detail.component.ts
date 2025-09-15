import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Activity } from '../../../../../models';
import { AdminState } from '../../../store/admin.state';
import * as AdminActions from '../../../store/admin.actions';
import * as AdminSelectors from '../../../store/admin.selectors';

@Component({
  selector: 'app-activity-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.css']
})
export class ActivityDetailComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  @Input() activityId: string | null = null;
  @Output() editRequested = new EventEmitter<Activity>();
  @Output() backToList = new EventEmitter<void>();

  activity$: Observable<Activity | null>;
  activityLoading$: Observable<boolean>;
  activityError$: Observable<string | null>;

  constructor(private readonly store: Store<{ admin: AdminState }>) {
    this.activity$ = this.store.select(AdminSelectors.selectSelectedActivity);
    this.activityLoading$ = this.store.select(AdminSelectors.selectActivitiesLoading);
    this.activityError$ = this.store.select(AdminSelectors.selectActivitiesError);
  }

  ngOnInit(): void {
    if (this.activityId) {
      // Charger toutes les activités pour s'assurer qu'on a les données
      this.store.dispatch(AdminActions.loadActivities());
      
      // Trouver l'activité spécifique dans la liste chargée
      this.store.select(AdminSelectors.selectActivities)
        .pipe(takeUntil(this.destroy$))
        .subscribe(activities => {
          if (activities && activities.length > 0) {
            const activity = activities.find(a => a.id === this.activityId);
            if (activity) {
              this.store.dispatch(AdminActions.selectActivity({ activity }));
            }
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onEdit(): void {
    this.activity$.pipe(takeUntil(this.destroy$)).subscribe(activity => {
      if (activity) {
        this.editRequested.emit(activity);
      }
    });
  }

  onDelete(): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette activité ? Cette action est irréversible.')) {
      if (this.activityId) {
        this.store.dispatch(AdminActions.deleteActivity({ activityId: this.activityId }));
        
        // Écouter le succès de la suppression
        this.store.select(AdminSelectors.selectActivitiesLoading)
          .pipe(takeUntil(this.destroy$))
          .subscribe(loading => {
            if (!loading) {
              this.activityError$.pipe(takeUntil(this.destroy$)).subscribe(error => {
                if (!error) {
                  this.backToList.emit();
                }
              });
            }
          });
      }
    }
  }

  onBack(): void {
    this.backToList.emit();
  }

  formatDate(date: Date | string): string {
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getScoringMetricsCount(activity: Activity): number {
    return activity.scoringMetrics?.length || 0;
  }

  getActivityStatus(activity: Activity): { text: string; class: string } {
    // Logique simple pour déterminer le statut
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
