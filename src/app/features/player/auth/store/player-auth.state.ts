import { PlayerInfo } from './player-auth.actions';

export interface PlayerAuthState {
  isAuthenticated: boolean;
  player: PlayerInfo | null;
  loading: boolean;
  error: string | null;
}

export const initialPlayerAuthState: PlayerAuthState = {
  isAuthenticated: false,
  player: null,
  loading: false,
  error: null
};
