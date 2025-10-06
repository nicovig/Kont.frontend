import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlayerEventInfo } from '../store/player.state';

@Injectable({ providedIn: 'root' })
export class PlayerService {
  private readonly http = inject(HttpClient);

  getEventInfo(eventLink: string): Observable<PlayerEventInfo> {
    return this.http.get<PlayerEventInfo>(`/public/events/${eventLink}`);
  }
}


