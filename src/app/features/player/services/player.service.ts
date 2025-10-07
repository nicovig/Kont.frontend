import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlayerEventInfo } from '../store/player.state';
import { ApiHttpService } from '../../../core/services/api-http.service';

@Injectable({ providedIn: 'root' })
export class PlayerService {
  private readonly http = inject(ApiHttpService);

  getEventInfo(eventId: string): Observable<PlayerEventInfo> {
    return this.http.get<PlayerEventInfo>(`/player/${eventId}`);
  }

  register(eventId: string, poolId: string, payload: { firstname: string; lastname: string; email: string; username: string; pin: string; }): Observable<{ id: string }> {
    return this.http.post<{ id: string }>(`/player/${eventId}/${poolId}/register`, payload);
  }
}


