import { User } from './user.model';

export interface Player extends User {
  username: string;
  playerType: PlayerType;
}

export enum PlayerType {
  Player = 'Player',
  KeyPlayer = 'KeyPlayer'
}
