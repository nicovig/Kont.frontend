import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { Site } from '../../../../models';
import * as AdminActions from '../../store/admin.actions';
import * as AdminSelectors from '../../store/admin.selectors';

@Component({
  selector: 'app-site-selector',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatFormFieldModule, MatIconModule, MatButtonModule],
  templateUrl: './site-selector.component.html',
  styleUrls: ['./site-selector.component.css']
})
export class SiteSelectorComponent implements OnDestroy {
  sites$: Observable<Site[]>;
  selectedSite$: Observable<Site | null>;
  sitesLoading$: Observable<boolean>;
  sitesError$: Observable<string | null>;
  
  private destroy$ = new Subject<void>();

  constructor(private store: Store) {
    this.sites$ = this.store.select(AdminSelectors.selectSites);
    this.selectedSite$ = this.store.select(AdminSelectors.selectSelectedSite);
    this.sitesLoading$ = this.store.select(AdminSelectors.selectSitesLoading);
    this.sitesError$ = this.store.select(AdminSelectors.selectSitesError);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSiteChange(site: Site): void {
    this.store.dispatch(AdminActions.changeSite({ site }));
  }

  getSiteDisplayName(site: Site): string {
    return `${site.name} - ${site.city}`;
  }
}
