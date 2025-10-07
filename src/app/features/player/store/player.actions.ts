import { createAction, props } from '@ngrx/store';
import { PlayerEventInfo } from './player.state';

export const loadEventInfo = createAction('[Player] Load Event Info', props<{ eventId: string }>());
export const loadEventInfoSuccess = createAction('[Player] Load Event Info Success', props<{ event: PlayerEventInfo }>());
export const loadEventInfoFailure = createAction('[Player] Load Event Info Failure', props<{ error: string }>());


