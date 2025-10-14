import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as PlayerAuthSelectors from '../auth/store/player-auth.selectors';

@Component({
  standalone: true,
  selector: 'player-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html'
})
export class PlayerDashboardComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(Store);
  
  eventId = '';
  poolId = '';
  player$ = this.store.select(PlayerAuthSelectors.selectPlayerInfo);

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('eventId') ?? '';
    this.poolId = this.route.snapshot.paramMap.get('poolId') ?? '';
  }
}


