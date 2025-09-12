import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Pool, PoolStatus } from '../../../models';
import { AdminState } from '../../store/admin.state';
import * as AdminActions from '../../store/admin.actions';
import * as AdminSelectors from '../../store/admin.selectors';

@Component({
  selector: 'app-pools',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './pools.component.html',
  styles: [`
    .pools-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .pools-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .pools-filters {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 8px;
    }

    .filter-group {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .filter-group label {
      font-weight: 500;
      color: #333;
    }

    .filter-group select {
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      background: white;
    }

    .pools-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 1.5rem;
    }

    .pool-card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      border-left: 4px solid #ddd;
      overflow: hidden;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .pool-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    }

    .pool-card.status-pending {
      border-left-color: #ffc107;
    }

    .pool-card.status-active {
      border-left-color: #28a745;
    }

    .pool-card.status-completed {
      border-left-color: #007bff;
    }

    .pool-card.status-cancelled {
      border-left-color: #dc3545;
    }

    .pool-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 1.5rem;
      background: #f8f9fa;
      border-bottom: 1px solid #e9ecef;
    }

    .pool-header h3 {
      margin: 0;
      color: #333;
      font-size: 1.1rem;
    }

    .pool-status {
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: 500;
      text-transform: uppercase;
    }

    .pool-status.status-pending {
      background: #fff3cd;
      color: #856404;
    }

    .pool-status.status-active {
      background: #d4edda;
      color: #155724;
    }

    .pool-status.status-completed {
      background: #d1ecf1;
      color: #0c5460;
    }

    .pool-status.status-cancelled {
      background: #f8d7da;
      color: #721c24;
    }

    .pool-content {
      padding: 1.5rem;
    }

    .pool-description {
      color: #666;
      margin-bottom: 1rem;
      line-height: 1.5;
    }

    .pool-stats {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }

    .stat {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .stat-label {
      color: #666;
      font-size: 0.9rem;
    }

    .stat-value {
      font-weight: 500;
      color: #333;
    }

    .pool-actions {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .btn {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      text-decoration: none;
      text-align: center;
      font-size: 0.9rem;
      font-weight: 500;
      transition: all 0.2s;
    }

    .btn-sm {
      padding: 0.375rem 0.75rem;
      font-size: 0.8rem;
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

    .btn-outline {
      background: transparent;
      color: #007bff;
      border: 1px solid #007bff;
    }

    .btn-outline:hover {
      background: #007bff;
      color: white;
    }

    .btn-danger {
      background: #dc3545;
      color: white;
    }

    .btn-danger:hover {
      background: #c82333;
    }

    .empty-state {
      text-align: center;
      padding: 3rem;
      color: #666;
    }

    .empty-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
    }

    .empty-state h3 {
      margin-bottom: 0.5rem;
      color: #333;
    }

    .empty-state p {
      margin-bottom: 2rem;
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
export class PoolsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  selectedStatus: string = '';

  // Selectors
  pools$: Observable<Pool[]>;
  filteredPools$: Observable<Pool[]>;
  poolsLoading$: Observable<boolean>;
  poolsError$: Observable<string | null>;

  constructor(private readonly store: Store<{ admin: AdminState }>) {
    this.pools$ = this.store.select(AdminSelectors.selectPools);
    this.poolsLoading$ = this.store.select(AdminSelectors.selectPoolsLoading);
    this.poolsError$ = this.store.select(AdminSelectors.selectPoolsError);
    
    // Create filtered pools observable
    this.filteredPools$ = this.pools$.pipe(
      takeUntil(this.destroy$)
    );
  }

  ngOnInit(): void {
    // Load pools
    this.store.dispatch(AdminActions.loadPools());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  filterPools(): void {
    // This would be implemented with a more sophisticated filtering mechanism
    // For now, we'll just reload the pools
    this.store.dispatch(AdminActions.loadPools());
  }

  createPool(): void {
    // TODO: Open create pool modal or navigate to create page
    console.log('Create pool');
  }

  editPool(pool: Pool): void {
    // TODO: Open edit pool modal or navigate to edit page
    console.log('Edit pool:', pool);
  }

  deletePool(poolId: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette pool ?')) {
      this.store.dispatch(AdminActions.deletePool({ poolId }));
    }
  }

  getStatusText(status: PoolStatus): string {
    const statusTexts: { [key in PoolStatus]: string } = {
      [PoolStatus.Pending]: 'En attente',
      [PoolStatus.Active]: 'Active',
      [PoolStatus.Completed]: 'Terminée',
      [PoolStatus.Cancelled]: 'Annulée'
    };
    return statusTexts[status] || status;
  }
}
