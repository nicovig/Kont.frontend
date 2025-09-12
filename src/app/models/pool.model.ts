import { Event } from './event.model';
import { GameSession } from './game-session.model';
import { PlayerRegistration } from './player-registration.model';

export interface Pool {
  id: string;
  name: string;
  description?: string;
  qrCode: string;
  event: Event;
  playerRegistrations: PlayerRegistration[];
  gameSessions: GameSession[];
  isActive: boolean;
  isAllPlayersPresent: boolean;
  createdAt: Date;
  startedAt?: Date;
  endedAt?: Date;
  status: PoolStatus;
}

export enum PoolStatus {
  Pending = 'Pending',
  Active = 'Active',
  Completed = 'Completed',
  Cancelled = 'Cancelled'
}
