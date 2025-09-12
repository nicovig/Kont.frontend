import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AdminService } from '../services/admin.service';
import * as AdminActions from './admin.actions';

@Injectable()
export class AdminEffects {

  // Auth Effects
  loginAdmin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.loginAdmin),
      switchMap(({ email, password }) =>
        this.adminService.login(email, password).pipe(
          map(admin => AdminActions.loginAdminSuccess({ admin })),
          catchError(error => of(AdminActions.loginAdminFailure({ error: error.message })))
        )
      )
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
      switchMap(({ event }) =>
        this.adminService.createEvent(event).pipe(
          map(createdEvent => AdminActions.createEventSuccess({ event: createdEvent })),
          catchError(error => of(AdminActions.createEventFailure({ error: error.message })))
        )
      )
    )
  );

  // Pools Effects
  loadPools$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.loadPools),
      switchMap(() =>
        this.adminService.getPools().pipe(
          map(pools => AdminActions.loadPoolsSuccess({ pools })),
          catchError(error => of(AdminActions.loadPoolsFailure({ error: error.message })))
        )
      )
    )
  );

  createPool$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.createPool),
      switchMap(({ pool }) =>
        this.adminService.createPool(pool).pipe(
          map(createdPool => AdminActions.createPoolSuccess({ pool: createdPool })),
          catchError(error => of(AdminActions.createPoolFailure({ error: error.message })))
        )
      )
    )
  );

  updatePool$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.updatePool),
      switchMap(({ pool }) =>
        this.adminService.updatePool(pool).pipe(
          map(updatedPool => AdminActions.updatePoolSuccess({ pool: updatedPool })),
          catchError(error => of(AdminActions.updatePoolFailure({ error: error.message })))
        )
      )
    )
  );

  deletePool$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.deletePool),
      switchMap(({ poolId }) =>
        this.adminService.deletePool(poolId).pipe(
          map(() => AdminActions.deletePoolSuccess({ poolId })),
          catchError(error => of(AdminActions.deletePoolFailure({ error: error.message })))
        )
      )
    )
  );

  loadPoolStats$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.loadPoolStats),
      switchMap(({ poolId }) =>
        this.adminService.getPoolStats(poolId).pipe(
          map(stats => AdminActions.loadPoolStatsSuccess({ poolId, stats })),
          catchError(error => of(AdminActions.loadPoolStatsFailure({ error: error.message })))
        )
      )
    )
  );

  validateAllPlayersPresent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.validateAllPlayersPresent),
      switchMap(({ poolId }) =>
        this.adminService.validateAllPlayersPresent(poolId).pipe(
          map(() => AdminActions.validateAllPlayersPresentSuccess({ poolId })),
          catchError(error => of(AdminActions.validateAllPlayersPresentFailure({ error: error.message })))
        )
      )
    )
  );

  endPool$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.endPool),
      switchMap(({ poolId }) =>
        this.adminService.endPool(poolId).pipe(
          map(() => AdminActions.endPoolSuccess({ poolId })),
          catchError(error => of(AdminActions.endPoolFailure({ error: error.message })))
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

  // Group Management Effects
  updatePlayerGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.updatePlayerGroup),
      switchMap(({ poolId, playerId, newGroupId }) =>
        this.adminService.updatePlayerGroup(poolId, playerId, newGroupId).pipe(
          map(() => AdminActions.updatePlayerGroupSuccess({ poolId, playerId, newGroupId })),
          catchError(error => of(AdminActions.updatePlayerGroupFailure({ error: error.message })))
        )
      )
    )
  );

  // Referent Management Effects
  assignReferent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.assignReferent),
      switchMap(({ poolId, referentId }) =>
        this.adminService.assignReferent(poolId, referentId).pipe(
          map(() => AdminActions.assignReferentSuccess({ poolId, referentId })),
          catchError(error => of(AdminActions.assignReferentFailure({ error: error.message })))
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

  // Auto-load data when admin logs in
  loadInitialData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.loginAdminSuccess),
      switchMap(() => [
        AdminActions.loadSites(),
        AdminActions.loadActivities(),
        AdminActions.loadEvents(),
        AdminActions.loadPools(),
        AdminActions.loadDashboardStats()
      ])
    )
  );

  // Enable real-time updates when dashboard loads
  enableRealTimeOnDashboardLoad$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.loadDashboardStatsSuccess),
      map(() => AdminActions.enableRealTimeUpdates())
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly adminService: AdminService,
    private readonly store: Store
  ) {}
}
