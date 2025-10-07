export interface PlayerEventInfo {
  name: string;
  startDate: string;
  endDate: string;
  location: string;
}

export interface PlayerState {
  eventInfo: PlayerEventInfo | null;
  loading: boolean;
  error?: string | null;
}

export const initialPlayerState: PlayerState = {
  eventInfo: null,
  loading: false,
  error: null
};


