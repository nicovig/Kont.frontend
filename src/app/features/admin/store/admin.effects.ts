import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, switchMap, exhaustMap, concatMap, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import * as AdminActions from './admin.actions';

@Injectable()
export class AdminEffects {
  private readonly actions$ = inject(Actions);
  private readonly adminService = inject(AdminService);
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  // Auth Effects
  loginAdmin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.loginAdmin),
      exhaustMap(({ email, password }) =>
        this.adminService.login(email, password).pipe(
          map(jwtResponse => AdminActions.loginAdminSuccess({ jwtResponse })),
          catchError(error => of(AdminActions.loginAdminFailure({ error: error.message })))
        )
      )
    )
  );
  validateAllPlayersPresent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.validateAllPlayersPresent),
      switchMap(({ eventId, isAllPlayersPresent }) =>
        this.adminService.updateEventAllPlayersPresent(eventId, isAllPlayersPresent).pipe(
          map(() => AdminActions.validateAllPlayersPresentSuccess()),
          catchError(error => of(AdminActions.validateAllPlayersPresentFailure({ error: error.message })))
        )
      )
    )
  );

  sendQRCodeToEmailList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.sendQRCodeToEmailList),
      switchMap(({ eventId, emails }) =>
        this.adminService.sendQRCodeToEmailList(eventId, emails).pipe(
          map(response => AdminActions.sendQRCodeToEmailListSuccess({ message: response.message })),
          catchError(error => of(AdminActions.sendQRCodeToEmailListFailure({ error: error.message })))
        )
      )
    )
  );

  loadCurrentAdmin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.loadCurrentAdmin),
      switchMap(() => this.adminService.getCurrentAdmin().pipe(
        map(admin => AdminActions.loadCurrentAdminSuccess({ admin })),
        catchError(error => of(AdminActions.loadCurrentAdminFailure({ error: error.message })))
      ))
    )
  );

  navigateOnLoginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.loginAdminSuccess),
      tap(({ jwtResponse }) =>  localStorage.setItem('token', jwtResponse.token)),
      switchMap(() => this.adminService.getCurrentAdmin()),
      tap(() => this.router.navigateByUrl('/admin')),
      map(admin => AdminActions.loadCurrentAdminSuccess({ admin })),
      catchError(error => of(AdminActions.loadCurrentAdminFailure({ error: error.message })))
    )
  );

  // Sites Effects
  loadSites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.loadSites),
      switchMap(() =>
        this.adminService.getSites().pipe(
          map(sites => AdminActions.loadSitesSuccess({ sites })),
          catchError(error => of(AdminActions.loadSitesFailure({ error: error.message })))
        )
      )
    )
  );

  createSite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.createSite),
      switchMap(({ site }) =>
        this.adminService.createSite(site).pipe(
          map(createdSite => AdminActions.createSiteSuccess({ site: createdSite })),
          catchError(error => of(AdminActions.createSiteFailure({ error: error.message })))
        )
      )
    )
  );

  // Activities Effects
  loadActivities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.loadActivities),
      switchMap(() =>
        this.adminService.getActivities().pipe(
          map(activities => AdminActions.loadActivitiesSuccess({ activities })),
          catchError(error => of(AdminActions.loadActivitiesFailure({ error: error.message })))
        )
      )
    )
  );

  createActivity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.createActivity),
      switchMap(({ activity }) =>
        this.adminService.createActivity(activity).pipe(
          map(createdActivity => AdminActions.createActivitySuccess({ activity: createdActivity })),
          catchError(error => of(AdminActions.createActivityFailure({ error: error.message })))
        )
      )
    )
  );

  updateActivity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.updateActivity),
      switchMap(({ activity }) =>
        this.adminService.updateActivity(activity).pipe(
          map(updatedActivity => AdminActions.updateActivitySuccess({ activity: updatedActivity })),
          catchError(error => of(AdminActions.updateActivityFailure({ error: error.message })))
        )
      )
    )
  );

  deleteActivity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.deleteActivity),
      switchMap(({ activityId }) =>
        this.adminService.deleteActivity(activityId).pipe(
          map(() => AdminActions.deleteActivitySuccess({ activityId })),
          catchError(error => of(AdminActions.deleteActivityFailure({ error: error.message })))
        )
      )
    )
  );

  // Events Effects
  loadEvents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.loadEvents),
      switchMap(() =>
        this.adminService.getEvents().pipe(
          map(events => AdminActions.loadEventsSuccess({ events })),
          catchError(error => of(AdminActions.loadEventsFailure({ error: error.message })))
        )
      )
    )
  );

  createEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.createEvent),
      switchMap(({ request }) =>
        this.adminService.createEvent(request).pipe(
          map(createdEvent => AdminActions.createEventSuccess({ event: createdEvent })),
          catchError(error => of(AdminActions.createEventFailure({ error: error.message })))
        )
      )
    )
  );

  updateEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.updateEvent),
      switchMap(({ request }) =>
        this.adminService.updateEvent(request).pipe(
          map(event => AdminActions.updateEventSuccess({ event })),
          catchError(error => of(AdminActions.updateEventFailure({ error: error.message })))
        )
      )
    )
  );

  deleteEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.deleteEvent),
      switchMap(({ eventId }) =>
        this.adminService.deleteEvent(eventId).pipe(
          map(() => AdminActions.deleteEventSuccess({ eventId })),
          catchError(error => of(AdminActions.deleteEventFailure({ error: error.message })))
        )
      )
    )
  );

  // Dashboard Effects
  loadDashboardStats$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.loadDashboardStats),
      switchMap(() =>
        this.adminService.getDashboardStats().pipe(
          map(stats => AdminActions.loadDashboardStatsSuccess({ stats })),
          catchError(error => of(AdminActions.loadDashboardStatsFailure({ error: error.message })))
        )
      )
    )
  );

  // Account Recovery Effects
  generateRecoveryQR$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.generateRecoveryQR),
      switchMap(({ playerId, poolId }) =>
        this.adminService.generateRecoveryQR(playerId, poolId).pipe(
          map(qrCode => AdminActions.generateRecoveryQRSuccess({ playerId, qrCode })),
          catchError(error => of(AdminActions.generateRecoveryQRFailure({ error: error.message })))
        )
      )
    )
  );

  // Enable real-time updates when dashboard loads
  enableRealTimeOnDashboardLoad$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.loadDashboardStatsSuccess),
      map(() => AdminActions.enableRealTimeUpdates())
    )
  );

  
}
