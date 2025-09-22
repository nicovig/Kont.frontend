import { Site } from "../../../../models";

export interface CreateActivityRequest {
    name: string;
    description: string;
    site: Site;
    playersPerGroupLimit: number;
    scoringMetrics: CreateScoringMetricRequest[];
}

export interface UpdateActivityRequest extends CreateActivityRequest {
    id: string;
}

export interface CreateScoringMetricRequest {
    name: string;
    unit?: string | null;
    higherIsBetter: boolean;
    coefficient: number;
}


