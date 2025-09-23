import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import * as AdminActions from '../../../../store/admin.actions';

@Component({
  selector: 'app-generate-groups-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './generate-groups-button.component.html',
})
export class GenerateGroupsButtonComponent {
  private readonly store = inject(Store);

  @Input() gameSessionId: string = '';
  @Input() isFirstOfActivity: boolean = true;
  @Input() disabled: boolean = false;
  @Output() done = new EventEmitter<void>();

  onClick() {
    if (!this.gameSessionId) return;
    this.store.dispatch(AdminActions.generateGroupsForGameSession({ gameSessionId: this.gameSessionId, isFirstOfActivity: this.isFirstOfActivity }));
    this.done.emit();
  }
}


