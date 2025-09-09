import { Activity } from './activity.model';

export interface Pool {
  id: string;
  name: string;
  description?: string;
  qrCode: string;
  establishmentId: string;
  adminId: string;
  status: PoolStatus;
  maxPlayers: number;
  currentPlayers: number;
  activities: Activity[];
  groups: Group[];
  // Informations sur l'évènement
  eventInfo: {
    companyName: string;
    eventDate: Date;
    expectedDuration: number; // en minutes
    location?: string;
  };
  // Référents assignés
  referents: string[]; // userIds
  createdAt: Date;
  startedAt?: Date;
  endedAt?: Date;
}

export enum PoolStatus {
  CREATED = 'created',
  WAITING_PLAYERS = 'waiting_players',
  READY = 'ready',
  IN_PROGRESS = 'in_progress',
  FINISHED = 'finished'
}

export interface Group {
  id: string;
  poolId: string;
  name: string;
  players: string[];
  activityId: string;
  currentRound: number;
  maxRounds: number;
  isActive: boolean;
}

