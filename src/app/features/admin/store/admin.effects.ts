import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, switchMap, exhaustMap, tap, withLatestFrom, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import * as AdminActions from './admin.actions';
import * as AdminSelectors from './admin.selectors';

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
          switchMap(() => [
            AdminActions.validateAllPlayersPresentSuccess(),
            AdminActions.loadPlayerRegistrations({ eventId })
          ]),
          catchError(error => of(AdminActions.validateAllPlayersPresentFailure({ error: error.message })))
        )
      )
    )
  );

  // After validation, reload registrations
  // removed: handled directly in validateAllPlayersPresent$

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

  // Sites Effects
  changeSite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.changeSite),
      switchMap(({ site }) => [
        AdminActions.selectSite({ site }),
        AdminActions.loadActivities(),
        AdminActions.loadEvents()
      ])
    )
  );

  // Auto-reload data when site changes
  autoReloadOnSiteChange$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.selectSite),
      switchMap(({ site }) => [
        AdminActions.loadActivities(),
        AdminActions.loadEvents()
      ])
    )
  );

  navigateOnLoginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.loginAdminSuccess),
      tap(({ jwtResponse }) =>  localStorage.setItem('token', jwtResponse.token)),
      switchMap(() => this.adminService.getCurrentAdmin()),
      tap(() => this.router.navigateByUrl('/admin')),
      mergeMap(admin => [
        AdminActions.loadCurrentAdminSuccess({ admin }),
        AdminActions.loadSitesSuccess({ sites: (admin as any).sites || [] })
      ]),
      catchError(error => of(AdminActions.loadCurrentAdminFailure({ error: error.message })))
    )
  );


  // Activities Effects
  loadActivities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.loadActivities),
      withLatestFrom(this.store.select(AdminSelectors.selectSelectedSite)),
      switchMap(([action, selectedSite]) => {
        if (!selectedSite) {
          return of(AdminActions.loadActivitiesFailure({ error: 'No site selected' }));
        }
        return this.adminService.getActivities().pipe(
          map(activities => AdminActions.loadActivitiesSuccess({ activities })),
          catchError(error => of(AdminActions.loadActivitiesFailure({ error: error.message })))
        );
      })
    )
  );

  createActivity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.createActivity),
      withLatestFrom(this.store.select(AdminSelectors.selectSelectedSite)),
      switchMap(([{ activity }, selectedSite]) => {
        if (!selectedSite) {
          return of(AdminActions.createActivityFailure({ error: 'No site selected' }));
        }
        // Automatically add the selected site to the activity
        const activityWithSite = { ...activity, site: selectedSite };
        return this.adminService.createActivity(activityWithSite).pipe(
          map(createdActivity => AdminActions.createActivitySuccess({ activity: createdActivity })),
          catchError(error => of(AdminActions.createActivityFailure({ error: error.message })))
        );
      })
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

  // Generate Groups
  generateGroupsForGameSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.generateGroupsForGameSession),
      switchMap(({ gameSessionId, isFirstOfActivity }) => {
        const call$ = isFirstOfActivity
          ? this.adminService.generateGroupsWithoutScores(gameSessionId)
          : this.adminService.generateGroupsWithScores(gameSessionId);
        return call$.pipe(
          map(groups => AdminActions.generateGroupsForGameSessionSuccess({ gameSessionId, groups })),
          catchError(error => of(AdminActions.generateGroupsForGameSessionFailure({ error: error.message })))
        );
      })
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
      withLatestFrom(this.store.select(AdminSelectors.selectSelectedSite)),
      switchMap(([action, selectedSite]) => {
        if (!selectedSite) {
          return of(AdminActions.loadEventsFailure({ error: 'No site selected' }));
        }
        return this.adminService.getEvents().pipe(
          map(events => AdminActions.loadEventsSuccess({ events })),
          catchError(error => of(AdminActions.loadEventsFailure({ error: error.message })))
        );
      })
    )
  );

  // Player Registrations Effects
  loadRegistrations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.loadPlayerRegistrations),
      switchMap(({ eventId }) =>
        this.adminService.getPlayerRegistrations(eventId).pipe(
          map(registrations => AdminActions.loadPlayerRegistrationsSuccess({ registrations })),
          catchError(error => of(AdminActions.loadPlayerRegistrationsFailure({ error: error.message })))
        )
      )
    )
  );

  updatePresence$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.updatePlayerPresence),
      switchMap(({ eventId, playerRegistrationId, isPresent }) =>
        this.adminService.updateEventPlayerIsPresent(eventId, playerRegistrationId, isPresent).pipe(
          switchMap(() => [
            AdminActions.updatePlayerPresenceSuccess(),
            AdminActions.loadPlayerRegistrations({ eventId })
          ]),
          catchError(error => of(AdminActions.updatePlayerPresenceFailure({ error: error.message })))
        )
      )
    )
  );

  createEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.createEvent),
      withLatestFrom(this.store.select(AdminSelectors.selectSelectedSite)),
      switchMap(([{ request }, selectedSite]) => {
        if (!selectedSite) {
          return of(AdminActions.createEventFailure({ error: 'No site selected' }));
        }
        // Automatically add the selected site to the event
        const eventWithSite = { ...request, site: selectedSite };
        return this.adminService.createEvent(eventWithSite).pipe(
          map(createdEvent => AdminActions.createEventSuccess({ event: createdEvent })),
          catchError(error => of(AdminActions.createEventFailure({ error: error.message })))
        );
      })
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
