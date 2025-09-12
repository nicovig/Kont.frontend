import { GameSession } from "./game-session.model";
import { Player } from "./player.model";

export interface PlayerGroup {
  id: string;
  gameSession: GameSession;
  players: Player[];
  groupNumber: number;
  createdAt: Date;
}
