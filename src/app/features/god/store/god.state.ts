import { Administrator } from '../../../models';

export interface GodState {
  currentGod: Administrator | null;
  isAuthenticated: boolean;
  authLoading: boolean;
  authError: string | null;

  administrators: Administrator[];
  adminsLoading: boolean;
  adminsError: string | null;

  subscriptions: import('../../../models').Subscription[];
  subsLoading: boolean;
  subsError: string | null;
}

export const initialGodState: GodState = {
  currentGod: null,
  isAuthenticated: false,
  authLoading: false,
  authError: null,

  administrators: [],
  adminsLoading: false,
  adminsError: null,

  subscriptions: [],
  subsLoading: false,
  subsError: null
};


