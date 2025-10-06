import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as PlayerActions from './player.actions';
import { PlayerService } from '../services/player.service';

@Injectable()
export class PlayerEffects {
  private readonly actions$ = inject(Actions);
  private readonly service = inject(PlayerService);

  loadEventInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.loadEventInfo),
      switchMap(({ eventLink }) => this.service.getEventInfo(eventLink)),
      map(event => PlayerActions.loadEventInfoSuccess({ event })),
      catchError(err => of(PlayerActions.loadEventInfoFailure({ error: err?.message || 'Une erreur est survenue' })))
    )
  );
}


