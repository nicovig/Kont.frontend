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
  styles: [`
    .dashboard-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .real-time-indicator {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      background: #f0f0f0;
      color: #666;
    }

    .real-time-indicator.active {
      background: #e8f5e8;
      color: #2d5a2d;
    }

    .indicator-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #ccc;
    }

    .real-time-indicator.active .indicator-dot {
      background: #4caf50;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0% { opacity: 1; }
      50% { opacity: 0.5; }
      100% { opacity: 1; }
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      text-align: center;
    }

    .stat-value {
      font-size: 2rem;
      font-weight: bold;
      color: #007bff;
      margin-bottom: 0.5rem;
    }

    .stat-label {
      color: #666;
      font-size: 0.9rem;
    }

    .dashboard-content {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 2rem;
    }

    .recent-activity, .quick-actions {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .activity-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .activity-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 6px;
    }

    .activity-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
    }

    .icon-pool_created { background: #e3f2fd; color: #1976d2; }
    .icon-player_registered { background: #e8f5e8; color: #388e3c; }
    .icon-session_started { background: #fff3e0; color: #f57c00; }
    .icon-session_completed { background: #f3e5f5; color: #7b1fa2; }
    .icon-pool_ended { background: #ffebee; color: #d32f2f; }

    .activity-content {
      flex: 1;
    }

    .activity-message {
      font-weight: 500;
      margin-bottom: 0.25rem;
    }

    .activity-time {
      font-size: 0.8rem;
      color: #666;
    }

    .action-buttons {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .btn {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      text-decoration: none;
      text-align: center;
      font-weight: 500;
      transition: all 0.2s;
    }

    .btn-primary {
      background: #007bff;
      color: white;
    }

    .btn-primary:hover {
      background: #0056b3;
    }

    .btn-secondary {
      background: #6c757d;
      color: white;
    }

    .btn-secondary:hover {
      background: #545b62;
    }

    .btn-accent {
      background: #28a745;
      color: white;
    }

    .btn-accent:hover {
      background: #1e7e34;
    }

    .loading-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #007bff;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `]
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
