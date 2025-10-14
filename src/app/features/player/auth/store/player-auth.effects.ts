import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { PlayerService } from '../../services/player.service';
import * as PlayerAuthActions from './player-auth.actions';

@Injectable()
export class PlayerAuthEffects {
  private readonly actions$ = inject(Actions);
  private readonly playerService = inject(PlayerService);

  loginPlayer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerAuthActions.loginPlayer),
      switchMap(({ identifier, pin }) =>
        this.playerService.loginPlayer(identifier, pin).pipe(
          map((response) => PlayerAuthActions.loginPlayerSuccess({ 
            player: {
              id: response.playerId,
              firstname: '', // Will be loaded separately if needed
              lastname: '',
              email: '',
              username: ''
            }
          })),
          catchError((error) => of(PlayerAuthActions.loginPlayerFailure({ 
            error: error.error?.message || 'Erreur de connexion' 
          })))
        )
      )
    )
  );
}
