import { Component, Input, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PlayerRegistration } from '../../../../../../models';
import { Store } from '@ngrx/store';
import * as AdminActions from '../../../../store/admin.actions';
import * as AdminSelectors from '../../../../store/admin.selectors';

@Component({
  selector: 'app-player-registrations',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatTooltipModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './player-registrations.component.html',
})
export class PlayerRegistrationsComponent implements OnInit, OnDestroy {
  @Input() eventId: string = '';
  
  playerRegistrations: PlayerRegistration[] = [];
  loading: boolean = false;
  displayedColumns: string[] = ['name', 'email', 'username', 'type', 'registeredAt', 'checkedInAt'];
  
  private destroy$ = new Subject<void>();
  private readonly store = inject(Store);

  ngOnInit(): void {
    if (this.eventId) {
      this.loadPlayerRegistrations();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadPlayerRegistrations(): void {
    this.store.dispatch(AdminActions.loadPlayerRegistrations({ eventId: this.eventId }));
    this.store.select(AdminSelectors.selectRegistrations)
      .pipe(takeUntil(this.destroy$))
      .subscribe(r => this.playerRegistrations = r);
    this.store.select(AdminSelectors.selectRegistrationsLoading)
      .pipe(takeUntil(this.destroy$))
      .subscribe(l => this.loading = l);
  }

  onValidateAllPresent() {
    this.store.dispatch(AdminActions.validateAllPlayersPresent({ eventId: this.eventId, isAllPlayersPresent: true }));
  }

  isValidateAllPresentDisabled(): boolean {
    return this.playerRegistrations.every(pr => !!pr.checkedInAt);
  }

  refresh(): void {
    this.loadPlayerRegistrations();
  }

  togglePresent(player: PlayerRegistration, isPresent: boolean): void {
    if (!this.eventId) return;
    this.store.dispatch(AdminActions.updatePlayerPresence({ eventId: this.eventId, playerRegistrationId: player.id, isPresent }));
  }
}
