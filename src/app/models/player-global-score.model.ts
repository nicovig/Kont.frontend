import { Player } from "./player.model";
import { Pool } from "./pool.model";

export interface PlayerGlobalScore {
  id: string;
  totalScore: number;
  percentage: number;
  globalRank: number;
  activitiesPlayed: number;
  calculatedAt: Date;
  lastUpdatedAt: Date;
  playerEntity: Player;
  poolEntity: Pool;
}
