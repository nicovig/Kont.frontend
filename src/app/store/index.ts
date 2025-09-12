import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';

export interface AppState {
  // Add other feature states here
}

export const reducers: ActionReducerMap<AppState> = {
  // Add other feature reducers here
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
