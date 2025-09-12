import { Activity } from "./activity.model";
import { PlayerGroup } from "./player-group.model";

export interface GroupScore {
  id: string;
  group: PlayerGroup;
  activity: Activity;
  totalScore: number;
  averageScore: number;
  playerCount: number;
  calculatedAt: Date;
}
