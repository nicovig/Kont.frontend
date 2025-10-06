import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as PlayerActions from '../store/player.actions';
import * as PlayerSelectors from '../store/player.selectors';

@Component({
  selector: 'kont-player-landing-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-landing-page.component.html',
  styleUrls: ['./player-landing-page.component.css']
})
export class PlayerLandingPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(Store);

  readonly eventLink = this.route.snapshot.paramMap.get('eventLink') ?? '';

  event$ = this.store.select(PlayerSelectors.selectPlayerEventInfoView);
  loading$ = this.store.select(PlayerSelectors.selectPlayerLoading);
  error$ = this.store.select(PlayerSelectors.selectPlayerError);

  ngOnInit(): void {
    this.store.dispatch(PlayerActions.loadEventInfo({ eventLink: this.eventLink }));
  }
}


