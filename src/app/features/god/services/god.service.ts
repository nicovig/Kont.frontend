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

  getAdministrators(): Observable<Administrator[]> {
    return this.http.get<Administrator[]>(`/administrators`);
  }

  getAdministrator(id: string): Observable<Administrator> {
    return this.http.get<Administrator>(`/administrators/${id}`);
  }

  createAdministrator(admin: Omit<Administrator, 'id' | 'createdAt'>): Observable<Administrator> {
    return this.http.post<Administrator>(`/administrators`, admin);
  }

  updateAdministrator(admin: Administrator): Observable<Administrator> {
    return this.http.put<Administrator>(`/administrators/${admin.id}`, admin);
  }

  deleteAdministrator(id: string): Observable<void> {
    return this.http.delete<void>(`/administrators/${id}`);
  }

  // Subscriptions
  getSubscriptions(): Observable<import('../../../models').Subscription[]> {
    return this.http.get<import('../../../models').Subscription[]>(`/subscriptions`);
  }

  getSubscription(id: string): Observable<import('../../../models').Subscription> {
    return this.http.get<import('../../../models').Subscription>(`/subscriptions/${id}`);
  }

  createSubscription(sub: Omit<import('../../../models').Subscription, 'id'>): Observable<import('../../../models').Subscription> {
    return this.http.post<import('../../../models').Subscription>(`/subscriptions`, sub);
  }

  updateSubscription(sub: import('../../../models').Subscription): Observable<import('../../../models').Subscription> {
    return this.http.put<import('../../../models').Subscription>(`/subscriptions/${sub.id}`, sub);
  }

  deleteSubscription(id: string): Observable<void> {
    return this.http.delete<void>(`/subscriptions/${id}`);
  }
}


