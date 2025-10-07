import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as PlayerActions from '../store/player.actions';
import * as PlayerSelectors from '../store/player.selectors';

@Component({
  selector: 'player-landing-page',
  standalone: true,
  templateUrl: './player-landing-page.component.html',
  styleUrls: ['./player-landing-page.component.css'],
  imports: [CommonModule]
})
export class PlayerLandingPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(Store);

  readonly eventId = this.route.snapshot.paramMap.get('eventId') ?? '';

  event$ = this.store.select(PlayerSelectors.selectPlayerEventInfoView);
  loading$ = this.store.select(PlayerSelectors.selectPlayerLoading);
  error$ = this.store.select(PlayerSelectors.selectPlayerError);

  ngOnInit(): void {
    this.store.dispatch(PlayerActions.loadEventInfo({ eventId: this.eventId }));
  }
}


