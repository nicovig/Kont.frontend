export interface CreateEventRequest {
  name: string;
  eventLink: string;
  startedAt: string | Date;
  endedAt: string | Date;
  siteId: string;
  activityIds: string[];
  status?: 'Pending' | 'Active' | 'Completed' | 'Cancelled';
}

export interface UpdateEventRequest extends CreateEventRequest {
  id: string;
}


