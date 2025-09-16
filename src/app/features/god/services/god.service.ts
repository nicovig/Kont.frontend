import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Administrator } from '../../../models';
import { ApiHttpService } from '../../../core/services/api-http.service';
import { Site } from '../../../models';

@Injectable({ providedIn: 'root' })
export class GodService {
  private readonly http = inject(ApiHttpService);

  login(email: string, password: string): Observable<Administrator> {
    return this.http.post<Administrator>(`/god`, { email, password });
  }

  getSites(): Observable<Site[]> {
    return this.http.get<Site[]>(`/sites`);
  }

  getSite(siteId: string): Observable<Site> {
    return this.http.get<Site>(`/sites/${siteId}`);
  }

  updateSite(site: Site): Observable<Site> {
    return this.http.put<Site>(`/sites/${site.id}`, site);
  }

  createSite(site: Site): Observable<Site> {
    return this.http.post<Site>(`/sites`, site);
  }

  deleteSite(siteId: string): Observable<void> {
    return this.http.delete<void>(`/sites/${siteId}`);
  }
}


