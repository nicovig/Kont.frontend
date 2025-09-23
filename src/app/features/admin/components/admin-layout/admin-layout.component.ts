import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Administrator } from '../../../../models';
import { SiteSelectorComponent } from '../site-selector/site-selector.component';
import * as AdminActions from '../../store/admin.actions';
import * as AdminSelectors from '../../store/admin.selectors';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    SiteSelectorComponent
  ],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit, OnDestroy {
  currentAdmin$: Observable<Administrator | null>;
  selectedSite$: Observable<any>;
  
  private destroy$ = new Subject<void>();

  constructor(private store: Store) {
    this.currentAdmin$ = this.store.select(AdminSelectors.selectCurrentAdmin);
    this.selectedSite$ = this.store.select(AdminSelectors.selectSelectedSite);
  }

  ngOnInit(): void {
    // Load current admin and sites on layout init
    this.store.dispatch(AdminActions.loadCurrentAdmin());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onLogout(): void {
    this.store.dispatch(AdminActions.logoutAdmin());
  }

  getAdminDisplayName(admin: Administrator | null): string {
    if (!admin) return '';
    return `${admin.firstname} ${admin.lastname}`;
  }
}
