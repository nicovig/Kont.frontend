import { Administrator } from '../../../models';

export interface GodState {
  currentGod: Administrator | null;
  isAuthenticated: boolean;
  authLoading: boolean;
  authError: string | null;
}

export const initialGodState: GodState = {
  currentGod: null,
  isAuthenticated: false,
  authLoading: false,
  authError: null
};


