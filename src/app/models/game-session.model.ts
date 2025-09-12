import { Activity } from './activity.model';
import { PlayerGroup } from './player-group.model';
import { Pool } from './pool.model';

export interface GameSession {
  id: string;
  pool: Pool;
  activity: Activity;
  playerGroups: PlayerGroup[];
  status: GameSessionStatus;
  startedAt?: Date;
  endedAt?: Date;
  createdAt: Date;
}

export enum GameSessionStatus {
  Pending = 'Pending',
  Active = 'Active',
  Completed = 'Completed',
  Cancelled = 'Cancelled'
}
