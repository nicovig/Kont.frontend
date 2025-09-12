import { Activity } from "./activity.model";
import { Pool } from "./pool.model";

export interface ActivitySummaryData {
  id: string;
  playersPlayed: number;
  bestScore: number;
  averageScore: number;
  calculatedAt: Date;
  lastUpdatedAt: Date;
  activityEntity: Activity;
  poolEntity: Pool;
}
