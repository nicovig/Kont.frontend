import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, switchMap, exhaustMap, tap, withLatestFrom, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import * as AdminActions from './admin.actions';
import * as AdminSelectors from './admin.selectors';
import { MatDialog } from '@angular/material/dialog';
import { GroupsDialogComponent } from '../layout/groups-dialog/groups-dialog.component';

@Injectable()
export class AdminEffects {
  private readonly actions$ = inject(Actions);
  private readonly adminService = inject(AdminService);
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);

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
      switchMap(({ site }) =>
        this.adminService.getCurrentAdmin().pipe(
          switchMap(admin => [
            AdminActions.loadCurrentAdminSuccess({ admin }),
            AdminActions.selectSite({ site }),
            AdminActions.loadActivities(),
            AdminActions.loadEvents(),
            AdminActions.loadDashboardStats()
          ]),
          catchError(error => of(AdminActions.loadCurrentAdminFailure({ error: error.message })))
        )
      )
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
      withLatestFrom(this.store.select(AdminSelectors.selectSelectedSite)),
      switchMap(([{ activity }, selectedSite]) => {
        if (!selectedSite) {
          return of(AdminActions.updateActivityFailure({ error: 'No site selected' }));
        }
        const activityWithSite = { ...activity, site: selectedSite };
        return this.adminService.updateActivity(activityWithSite).pipe(
          map(updatedActivity => AdminActions.updateActivitySuccess({ activity: updatedActivity })),
          catchError(error => of(AdminActions.updateActivityFailure({ error: error.message })))
        );
      })
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

  togglePlayerType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.togglePlayerType),
      switchMap(({ playerRegistrationId, toReferent, eventId }) => {
        const call$ = toReferent
          ? this.adminService.assignReferent(playerRegistrationId)
          : this.adminService.removeReferent(playerRegistrationId);
        return call$.pipe(
          switchMap(() => [
            AdminActions.togglePlayerTypeSuccess(),
            AdminActions.loadPlayerRegistrations({ eventId })
          ]),
          catchError(error => of(AdminActions.togglePlayerTypeFailure({ error: error.message })))
        );
      })
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
        const eventWithSite = { ...request, siteId: selectedSite.id };
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

  updateEventStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.updateEventStatus),
      withLatestFrom(this.store.select(AdminSelectors.selectEvents)),
      switchMap(([{ eventId, status }, events]) => {
        const found = (events || []).find(e => e.id === eventId);
        if (!found) {
          return of(AdminActions.updateEventStatusFailure({ error: 'Event not found' }));
        }
        const req = {
          id: found.id,
          name: found.name,
          eventLink: found.eventLink,
          startedAt: found.startedAt as unknown as Date,
          endedAt: found.endedAt as unknown as Date,
          siteId: found.site.id,
          activityIds: (found.activities || []).map(a => a.id),
          status
        } as any;
        return this.adminService.updateEvent(req).pipe(
          map(event => AdminActions.updateEventStatusSuccess({ event })),
          catchError(error => of(AdminActions.updateEventStatusFailure({ error: error.message })))
        );
      })
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

  endEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.endEvent),
      switchMap(({ eventId }) =>
        this.adminService.endEvent(eventId).pipe(
          switchMap(event => [
            AdminActions.endEventSuccess({ event }),
            AdminActions.loadEvents()
          ]),
          catchError(error => of(AdminActions.endEventFailure({ error: error.message })))
        )
      )
    )
  );

  // Game Sessions Effects
  createGameSessionForEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.createGameSessionForEvent),
      switchMap(({ eventId, activityId }) =>
        this.adminService.createGameSessionForEvent(eventId, activityId).pipe(
          map(gameSession => AdminActions.createGameSessionForEventSuccess({ gameSession })),
          catchError(error => of(AdminActions.createGameSessionForEventFailure({ error: error.message })))
        )
      )
    )
  );

  updateGameSessionStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.updateGameSessionStatus),
      switchMap(({ sessionId, status }) =>
        this.adminService.updateGameSessionStatus(sessionId, status).pipe(
          map(gameSession => AdminActions.updateGameSessionStatusSuccess({ gameSession })),
          catchError(error => of(AdminActions.updateGameSessionStatusFailure({ error: error.message })))
        )
      )
    )
  );

  updateGameSessionStartTime$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.updateGameSessionStartTime),
      switchMap(({ sessionId, startedAt }) =>
        this.adminService.updateGameSessionStartTime(sessionId, startedAt).pipe(
          map(gameSession => AdminActions.updateGameSessionStartTimeSuccess({ gameSession })),
          catchError(error => of(AdminActions.updateGameSessionStartTimeFailure({ error: error.message })))
        )
      )
    )
  );

  updateGameSessionEndTime$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.updateGameSessionEndTime),
      switchMap(({ sessionId, endedAt }) =>
        this.adminService.updateGameSessionEndTime(sessionId, endedAt).pipe(
          map(gameSession => AdminActions.updateGameSessionEndTimeSuccess({ gameSession })),
          catchError(error => of(AdminActions.updateGameSessionEndTimeFailure({ error: error.message })))
        )
      )
    )
  );

  deleteGameSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.deleteGameSession),
      switchMap(({ sessionId }) =>
        this.adminService.deleteGameSession(sessionId).pipe(
          map(() => AdminActions.deleteGameSessionSuccess({ sessionId })),
          catchError(error => of(AdminActions.deleteGameSessionFailure({ error: error.message })))
        )
      )
    )
  );

  // Load groups for a session
  loadGameSessionGroups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.loadGameSessionGroups),
      switchMap(({ sessionId }) =>
        this.adminService.getGameSessionGroups(sessionId).pipe(
          map(groups => AdminActions.loadGameSessionGroupsSuccess({ sessionId, groups })),
          catchError(error => of(AdminActions.loadGameSessionGroupsFailure({ sessionId, error: error.message })))
        )
      )
    )
  );

  // Open dialog and ensure groups are loaded
  openGameSessionGroupsDialog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.openGameSessionGroupsDialog),
      withLatestFrom(this.store.select(AdminSelectors.selectSelectedEvent)),
      tap(([{ sessionId }]) => {
        this.dialog.open(GroupsDialogComponent, {
          width: '800px',
          data: { sessionId }
        });
      }),
      switchMap(([{ sessionId }]) => [
        AdminActions.loadGameSessionGroups({ sessionId }),
        AdminActions.loadGameSessionScores({ sessionId })
      ])
    )
  );

  loadGameSessionScores$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.loadGameSessionScores),
      switchMap(({ sessionId }) =>
        this.adminService.getGameSessionScores(sessionId).pipe(
          map(scores => AdminActions.loadGameSessionScoresSuccess({ sessionId, scores })),
          catchError(error => of(AdminActions.loadGameSessionScoresFailure({ sessionId, error: error.message })))
        )
      )
    )
  );

  movePlayerToGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.movePlayerToGroup),
      switchMap(({ poolId, playerId, newGroupId, sessionId }) =>
        this.adminService.updatePlayerGroup(poolId, playerId, newGroupId).pipe(
          switchMap(() => [
            AdminActions.movePlayerToGroupSuccess({ sessionId }),
            AdminActions.loadGameSessionGroups({ sessionId })
          ]),
          catchError(error => of(AdminActions.movePlayerToGroupFailure({ sessionId, error: error.message })))
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
