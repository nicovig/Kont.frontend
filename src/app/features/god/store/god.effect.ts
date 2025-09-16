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

  loadAdministrators$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GodActions.loadAdministrators),
      exhaustMap(() =>
        this.godService.getAdministrators().pipe(
          map(administrators => GodActions.loadAdministratorsSuccess({ administrators })),
          catchError(error => of(GodActions.loadAdministratorsFailure({ error: error.message })))
        )
      )
    )
  );

  createAdministrator$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GodActions.createAdministrator),
      exhaustMap(({ admin }) =>
        this.godService.createAdministrator(admin).pipe(
          map(created => GodActions.createAdministratorSuccess({ admin: created })),
          catchError(error => of(GodActions.createAdministratorFailure({ error: error.message })))
        )
      )
    )
  );

  updateAdministrator$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GodActions.updateAdministrator),
      exhaustMap(({ admin }) =>
        this.godService.updateAdministrator(admin).pipe(
          map(updated => GodActions.updateAdministratorSuccess({ admin: updated })),
          catchError(error => of(GodActions.updateAdministratorFailure({ error: error.message })))
        )
      )
    )
  );

  deleteAdministrator$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GodActions.deleteAdministrator),
      exhaustMap(({ id }) =>
        this.godService.deleteAdministrator(id).pipe(
          map(() => GodActions.deleteAdministratorSuccess({ id })),
          catchError(error => of(GodActions.deleteAdministratorFailure({ error: error.message })))
        )
      )
    )
  );

  loadSubscriptions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GodActions.loadSubscriptions),
      exhaustMap(() =>
        this.godService.getSubscriptions().pipe(
          map(subs => GodActions.loadSubscriptionsSuccess({ subscriptions: subs })),
          catchError(error => of(GodActions.loadSubscriptionsFailure({ error: error.message })))
        )
      )
    )
  );

  createSubscription$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GodActions.createSubscription),
      exhaustMap(({ subscription }) =>
        this.godService.createSubscription(subscription).pipe(
          map(created => GodActions.createSubscriptionSuccess({ subscription: created })),
          catchError(error => of(GodActions.createSubscriptionFailure({ error: error.message })))
        )
      )
    )
  );

  updateSubscription$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GodActions.updateSubscription),
      exhaustMap(({ subscription }) =>
        this.godService.updateSubscription(subscription).pipe(
          map(updated => GodActions.updateSubscriptionSuccess({ subscription: updated })),
          catchError(error => of(GodActions.updateSubscriptionFailure({ error: error.message })))
        )
      )
    )
  );

  deleteSubscription$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GodActions.deleteSubscription),
      exhaustMap(({ id }) =>
        this.godService.deleteSubscription(id).pipe(
          map(() => GodActions.deleteSubscriptionSuccess({ id })),
          catchError(error => of(GodActions.deleteSubscriptionFailure({ error: error.message })))
        )
      )
    )
  );
}


