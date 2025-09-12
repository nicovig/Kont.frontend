import { Player } from "./player.model";
import { Pool } from "./pool.model";

export interface PlayerRegistration {
  id: string;
  player: Player;
  pool: Pool;
  registeredAt: Date;
  checkedInAt?: Date;
}
