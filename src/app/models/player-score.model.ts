import { Activity } from "./activity.model";
import { Player } from "./player.model";
import { ScoringMetric } from "./scoring-metric.model";

export interface PlayerScore {
  id: string;
  player: Player;
  activity: Activity;
  scoringMetric: ScoringMetric;
  value: number;
  recordedAt: Date;
}
