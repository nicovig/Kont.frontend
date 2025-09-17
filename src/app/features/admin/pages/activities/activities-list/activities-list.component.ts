import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Activity } from '../../../../../models';

@Component({
  selector: 'app-activities-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatTableModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './activities-list.component.html',
})
export class ActivitiesListComponent {
  @Input() activities: Activity[] = [];
  @Input() loading = false;
  @Input() error: string | null = null;
  @Output() delete = new EventEmitter<string>();
  @Output() open = new EventEmitter<string>();

  displayedColumns: string[] = ['name', 'description', 'site', 'metrics', 'actions'];
  dataSource = new MatTableDataSource<Activity>([]);

  ngOnChanges() {
    this.dataSource.data = this.activities ?? [];
  }

  confirmDelete(id: string) {
    if (confirm('Supprimer cette activité ?')) {
      this.delete.emit(id);
    }
  }

  getScoringMetricsCount(activity: Activity): number {
    return activity.scoringMetrics?.length || 0;
  }
}
