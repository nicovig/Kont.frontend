import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, exhaustMap, tap } from 'rxjs/operators';
import * as GodActions from './god.action';
import { GodService } from '../services/god.service';
import { Router } from '@angular/router';

@Injectable()
export class GodEffects {
  private readonly actions$ = inject(Actions);
  private readonly godService = inject(GodService);
  private readonly router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GodActions.loginGod),
      exhaustMap(({ email, password }) =>
        this.godService.login(email, password).pipe(
          map(god => GodActions.loginGodSuccess({ god })),
          catchError(error => of(GodActions.loginGodFailure({ error: error.message })))
        )
      )
    )
  );

  navigateOnSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(GodActions.loginGodSuccess),
        tap(() => this.router.navigateByUrl('/god/dashboard'))
      ),
    { dispatch: false }
  );
}


