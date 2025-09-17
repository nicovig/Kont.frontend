import { Component, EventEmitter, Input, Output, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Activity } from '../../../../../models';
import { AdminState } from '../../../store/admin.state';
import * as AdminSelectors from '../../../store/admin.selectors';

@Component({
  selector: 'app-activity-detail',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule],
  templateUrl: './activity-detail.component.html',
})
export class ActivityDetailComponent implements OnInit {
  private readonly store = inject(Store<{ admin: AdminState }>);

  @Input() activityId: string = '';
  @Output() editRequested = new EventEmitter<Activity>();
  @Output() backToList = new EventEmitter<void>();

  selectedActivity$: Observable<Activity | null>;

  constructor() {
    this.selectedActivity$ = this.store.select(AdminSelectors.selectSelectedActivity);
  }

  ngOnInit(): void {
    // L'activité est déjà sélectionnée par le composant parent
  }

  onEdit(activity: Activity) {
    this.editRequested.emit(activity);
  }

  onBack() {
    this.backToList.emit();
  }
}
