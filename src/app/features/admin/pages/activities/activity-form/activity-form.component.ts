import { Component, EventEmitter, Input, Output, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Activity, Site } from '../../../../../models';
import { AdminState } from '../../../store/admin.state';
import * as AdminActions from '../../../store/admin.actions';
import * as AdminSelectors from '../../../store/admin.selectors';
import { CreateActivityRequest, UpdateActivityRequest, CreateScoringMetricRequest } from '../../../services/request-models/activity.models';

@Component({
  selector: 'app-activity-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule, MatSlideToggleModule],
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.css']
})
export class ActivityFormComponent implements OnInit {
  private readonly store = inject(Store<{ admin: AdminState }>);

  @Input() activity: Activity | null = null;
  @Input() isEditMode = false;
  @Output() formSubmitted = new EventEmitter<void>();
  @Output() formCancelled = new EventEmitter<void>();

  activityData: Partial<Activity> = {};
  scoringMetrics: CreateScoringMetricRequest[] = [];
  sites$: Observable<Site[]>;
  loading = false;
  error: string | null = null;

  constructor() {
    this.sites$ = this.store.select(AdminSelectors.selectSites);
  }

  ngOnInit(): void {
    if (this.isEditMode && this.activity) {
      this.activityData = { ...this.activity };
      this.scoringMetrics = (this.activity.scoringMetrics || []).map(sm => ({
        name: sm.name,
        unit: sm.unit,
        higherIsBetter: sm.higherIsBetter,
        coefficient: sm.coefficient,
      }));
    } else {
      this.activityData = {
        name: '',
        description: ''
      };
      this.scoringMetrics = [{ name: '', unit: '', higherIsBetter: true, coefficient: 1 }];
    }
  }

  onSave() {
    this.error = this.getValidationError();
    if (this.error) return;

    this.loading = true;

    if (this.isEditMode && this.activity) {
      this.store.dispatch(AdminActions.updateActivity({ 
        activity: { 
          ...this.activity, 
          ...this.activityData,
          scoringMetrics: this.scoringMetrics
        } as UpdateActivityRequest 
      }));
    } else {
      this.store.dispatch(AdminActions.createActivity({ 
        activity: { 
          ...(this.activityData as any),
          scoringMetrics: this.scoringMetrics
        } as CreateActivityRequest 
      }));
    }

    // Écouter le succès/échec
    this.store.select(AdminSelectors.selectActivitiesLoading).subscribe(loading => {
      if (!loading) {
        this.store.select(AdminSelectors.selectActivitiesError).subscribe(error => {
          if (error) {
            this.error = error;
            this.loading = false;
          } else {
            this.formSubmitted.emit();
          }
        });
      }
    });
  }

  onCancel() {
    this.formCancelled.emit();
  }

  addMetric() {
    this.scoringMetrics = [
      ...this.scoringMetrics,
      { name: '', unit: '', higherIsBetter: true, coefficient: 1 }
    ];
  }

  removeMetric(index: number) {
    if (this.scoringMetrics.length <= 1) return;
    this.scoringMetrics = this.scoringMetrics.filter((_, i) => i !== index);
  }

  updateMetricName(index: number, value: string) {
    this.scoringMetrics[index].name = value;
  }

  updateMetricUnit(index: number, value: string) {
    this.scoringMetrics[index].unit = value;
  }

  toggleHigherIsBetter(index: number, value: boolean) {
    this.scoringMetrics[index].higherIsBetter = value;
  }

  updateMetricCoefficient(index: number, value: number) {
    let v = Number(value);
    if (Number.isNaN(v)) v = 0;
    if (v < 0) v = 0;
    if (v > 1) v = 1;
    this.scoringMetrics[index].coefficient = v;
  }

  coeffSum(): number {
    return this.scoringMetrics.reduce((acc, m) => acc + (Number(m.coefficient) || 0), 0);
  }

  getValidationError(): string | null {
    if (!this.activityData.name || !this.activityData.site) {
      return 'Nom et site sont requis.';
    }
    if (!this.scoringMetrics.length) {
      return 'Ajoutez au moins une métrique.';
    }
    for (const m of this.scoringMetrics) {
      if (!m.name || m.coefficient == null) {
        return 'Chaque métrique doit avoir un nom et un coefficient.';
      }
      const c = Number(m.coefficient);
      if (Number.isNaN(c) || c < 0 || c > 1) {
        return 'Le coefficient doit être compris entre 0 et 1.';
      }
    }
    if (Math.abs(this.coeffSum() - 1) > 1e-6) {
      return 'La somme des coefficients doit être exactement 1.';
    }
    return null;
  }
}
