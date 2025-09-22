import { Administrator } from "./administrator.model";
import { ScoringMetric } from "./scoring-metric.model";
import { Site } from "./site.model";

export interface Activity {
  id: string;
  name: string;
  description?: string;
  site: Site;
  playersPerGroupLimit: number;
  scoringMetrics: ScoringMetric[];
  createdBy: Administrator;
  createdAt: Date;
}
