import { Activity } from "./activity.model";
import { Pool } from "./pool.model";
import { Site } from "./site.model";

export interface Event {
  id: string;
  name: string;
  eventLink: string;
  startedAt?: Date;
  endedAt?: Date;
  site: Site;
  status: EventStatus;
  createdAt: Date;
  activities: Activity[];
  pools: Pool[];
}

export enum EventStatus {
  Pending = 'Pending',
  Active = 'Active',
  Completed = 'Completed',
  Cancelled = 'Cancelled'
}
