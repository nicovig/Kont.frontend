export interface Activity {
  id: string;
  name: string;
  description: string;
  establishmentId: string;
  scoringType: ScoringType;
  maxScore?: number;
  timeLimit?: number;
  isActive: boolean;
  createdAt: Date;
  // Configuration de scoring par activité
  scoringConfig: {
    pointsPerUnit?: number;
    bonusMultiplier?: number;
    penaltyPoints?: number;
    timeBonusThreshold?: number;
  };
}

export enum ScoringType {
  POINTS = 'points',
  TIME = 'time',
  TIME_WITH_BONUS = 'time_with_bonus',
  PERCENTAGE = 'percentage'
}

export interface Score {
  id: string;
  userId: string;
  activityId: string;
  poolId: string;
  groupId: string;
  rawScore: number;
  normalizedScore: number;
  percentage: number;
  rank: number;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface ActivityRanking {
  activityId: string;
  activityName: string;
  scores: Score[];
  lastUpdated: Date;
}

