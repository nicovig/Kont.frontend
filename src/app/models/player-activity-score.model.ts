import { Activity } from "./activity.model";
import { Player } from "./player.model";
import { Pool } from "./pool.model";

export interface PlayerActivityScore {
  id: string;
  totalScore: number;
  percentage: number;
  rank: number;
  calculatedAt: Date;
  lastUpdatedAt: Date;
  playerEntity: Player;
  activityEntity: Activity;
  poolEntity: Pool;
}
