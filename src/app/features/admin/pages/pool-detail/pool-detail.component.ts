import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AdminState } from '../../store/admin.state';
import * as AdminActions from '../../store/admin.actions';
import * as AdminSelectors from '../../store/admin.selectors';
import { Pool, PoolStatus } from '../../../../models';

@Component({
  selector: 'app-pool-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pool-detail.component.html',
  styleUrls: ['./pool-detail.component.css']
})
export class PoolDetailComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  // Selectors
  selectedPool$: Observable<Pool | null>;
  poolStats$: Observable<any>;
  poolsLoading$: Observable<boolean>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store<{ admin: AdminState }>
  ) {
    this.selectedPool$ = this.store.select(AdminSelectors.selectSelectedPool);
    this.poolStats$ = this.store.select(AdminSelectors.selectPoolStats);
    this.poolsLoading$ = this.store.select(AdminSelectors.selectPoolsLoading);
  }

  ngOnInit(): void {
    const poolId = this.route.snapshot.paramMap.get('id');
    if (poolId) {
      this.store.dispatch(AdminActions.loadPoolStats({ poolId }));
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  editPool(): void {
    console.log('Edit pool');
    // TODO: Implémenter la logique d'édition
  }

  validateAllPlayersPresent(): void {
    this.selectedPool$.pipe(takeUntil(this.destroy$)).subscribe(pool => {
      if (pool) {
        this.store.dispatch(AdminActions.validateAllPlayersPresent({ poolId: pool.id }));
      }
    });
  }

  endPool(): void {
    this.selectedPool$.pipe(takeUntil(this.destroy$)).subscribe(pool => {
      if (pool && confirm('Êtes-vous sûr de vouloir terminer cette pool ?')) {
        this.store.dispatch(AdminActions.endPool({ poolId: pool.id }));
      }
    });
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
