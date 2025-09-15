import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Activity, Site, ScoringMetric } from '../../../../../models';
import { AdminState } from '../../../store/admin.state';
import * as AdminActions from '../../../store/admin.actions';
import * as AdminSelectors from '../../../store/admin.selectors';

@Component({
  selector: 'app-activity-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.css']
})
export class ActivityFormComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  @Input() activity: Activity | null = null;
  @Input() isEditMode = false;
  @Output() formSubmitted = new EventEmitter<Activity>();
  @Output() formCancelled = new EventEmitter<void>();

  activityForm: FormGroup;
  sites$: Observable<Site[]>;
  sitesLoading$: Observable<boolean>;
  formLoading$: Observable<boolean>;
  formError$: Observable<string | null>;

  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store<{ admin: AdminState }>
  ) {
    this.activityForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      siteId: ['', Validators.required],
      scoringMetrics: this.fb.array([])
    });

    this.sites$ = this.store.select(AdminSelectors.selectSites);
    this.sitesLoading$ = this.store.select(AdminSelectors.selectSitesLoading);
    this.formLoading$ = this.store.select(AdminSelectors.selectActivitiesLoading);
    this.formError$ = this.store.select(AdminSelectors.selectActivitiesError);
  }

  ngOnInit(): void {
    this.store.dispatch(AdminActions.loadSites());
    
    if (this.isEditMode && this.activity) {
      this.populateForm();
    }

    // Écouter les erreurs de formulaire
    this.formError$.pipe(takeUntil(this.destroy$)).subscribe(error => {
      if (error) {
        console.error('Erreur lors de la soumission:', error);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private populateForm(): void {
    if (this.activity) {
      this.activityForm.patchValue({
        name: this.activity.name,
        description: this.activity.description || '',
        siteId: this.activity.site.id
      });
    }
  }

  onSubmit(): void {
    if (this.activityForm.valid) {
      const formValue = this.activityForm.value;
      
      const activityData: Omit<Activity, 'id' | 'createdAt'> = {
        name: formValue.name,
        description: formValue.description,
        site: { id: formValue.siteId } as Site,
        scoringMetrics: formValue.scoringMetrics || [],
        createdBy: {} as any // Sera rempli par le backend
      };

      if (this.isEditMode && this.activity) {
        const updatedActivity: Activity = {
          ...this.activity,
          ...activityData
        };
        this.store.dispatch(AdminActions.updateActivity({ activity: updatedActivity }));
      } else {
        this.store.dispatch(AdminActions.createActivity({ activity: activityData }));
      }

      // Écouter le succès de l'opération
      this.store.select(AdminSelectors.selectActivitiesLoading)
        .pipe(takeUntil(this.destroy$))
        .subscribe(loading => {
          if (!loading) {
            // Vérifier s'il y a une erreur
            this.formError$.pipe(takeUntil(this.destroy$)).subscribe(error => {
              if (!error) {
                this.formSubmitted.emit();
              }
            });
          }
        });
    } else {
      this.markFormGroupTouched();
    }
  }

  onCancel(): void {
    this.formCancelled.emit();
  }

  private markFormGroupTouched(): void {
    Object.keys(this.activityForm.controls).forEach(key => {
      const control = this.activityForm.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.activityForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return `${fieldName} est requis`;
      }
      if (field.errors['minlength']) {
        return `${fieldName} doit contenir au moins ${field.errors['minlength'].requiredLength} caractères`;
      }
    }
    return '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.activityForm.get(fieldName);
    return !!(field?.invalid && field.touched);
  }
}
