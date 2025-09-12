import { Activity } from "./activity.model";

export interface ScoringMetric {
  id: string;
  name: string;
  unit?: string;
  higherIsBetter: boolean;
  coefficient: number;
  activity: Activity;
}
