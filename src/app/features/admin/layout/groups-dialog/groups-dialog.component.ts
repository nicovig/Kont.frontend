import { Component, Inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PlayerGroup } from '../../../../models';
import * as AdminSelectors from '../../store/admin.selectors';
import * as AdminActions from '../../store/admin.actions';
import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-groups-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, AsyncPipe, DragDropModule],
  templateUrl: './groups-dialog.component.html',
})
export class GroupsDialogComponent {
  groups$: Observable<PlayerGroup[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  scores$: Observable<any[]>;

  constructor(
    readonly dialogRef: MatDialogRef<GroupsDialogComponent>,
    readonly store: Store,
    @Inject(MAT_DIALOG_DATA) public data: { sessionId: string }
  ) {
    this.groups$ = this.store.select(AdminSelectors.selectSessionGroups(this.data.sessionId));
    this.loading$ = this.store.select(AdminSelectors.selectSessionGroupsLoading(this.data.sessionId));
    this.error$ = this.store.select(AdminSelectors.selectSessionGroupsError(this.data.sessionId));
    this.scores$ = this.store.select(AdminSelectors.selectSessionScores(this.data.sessionId));
  }

  close() {
    this.dialogRef.close();
  }

  drop(event: CdkDragDrop<any>, targetGroup: any) {
    const transferred = event.item.data as { player: any; group: any };
    if (!transferred || transferred.group.id === targetGroup.id) return;
    const poolId = targetGroup.gameSession.pool.id;
    const playerId = transferred.player.id;
    const newGroupId = targetGroup.id;
    this.store.dispatch(AdminActions.movePlayerToGroup({ poolId, playerId, newGroupId, sessionId: this.data.sessionId }));
  }
}
