export interface PlayerRegistration {
  id: string;
  playerFirstname: string;
  playerLastname: string;
  playerEmail: string;
  playerUsername: string;
  playerType: PlayerType;
  registeredAt: string;
  checkedInAt?: string;
}

export enum PlayerType {
  Player = 'Player',
  KeyPlayer = 'KeyPlayer'
}