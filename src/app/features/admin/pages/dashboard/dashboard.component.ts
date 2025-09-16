import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { AdminState, DashboardStats, RecentActivity } from '../../store/admin.state';
import * as AdminActions from '../../store/admin.actions';
import * as AdminSelectors from '../../store/admin.selectors';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  // Selectors
  dashboardStats$: Observable<DashboardStats | null>;
  recentActivity$: Observable<RecentActivity[]>;
  dashboardLoading$: Observable<boolean>;
  realTimeEnabled$: Observable<boolean>;

  constructor(private readonly store: Store<{ admin: AdminState }>) {
    this.dashboardStats$ = this.store.select(AdminSelectors.selectDashboardStats);
    this.recentActivity$ = this.store.select(AdminSelectors.selectRecentActivity);
    this.dashboardLoading$ = this.store.select(AdminSelectors.selectDashboardLoading);
    this.realTimeEnabled$ = this.store.select(AdminSelectors.selectRealTimeEnabled);
  }

  ngOnInit(): void {
    // Load dashboard stats
    this.store.dispatch(AdminActions.loadDashboardStats());

    // Enable real-time updates
    this.store.dispatch(AdminActions.enableRealTimeUpdates());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    
    // Disable real-time updates when leaving
    this.store.dispatch(AdminActions.disableRealTimeUpdates());
  }

  getActivityIcon(type: string): string {
    const icons: { [key: string]: string } = {
      'pool_created': '🏊',
      'player_registered': '👤',
      'session_started': '▶️',
      'session_completed': '✅',
      'pool_ended': '🏁'
    };
    return icons[type] || '📝';
  }
}
