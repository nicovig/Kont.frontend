import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiHttpService {
  private readonly http = inject(HttpClient);
  private readonly base = environment.apiBaseUrl;

  private buildUrl(path: string): string {
    const p = path.startsWith('/') ? path : `/${path}`;
    return `${this.base}${p}`;
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  get<T>(path: string, options?: { headers?: HttpHeaders | { [header: string]: string | string[] }; params?: HttpParams | { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean> } }): Observable<T> {
    const authHeaders = this.getAuthHeaders();
    const mergedOptions = {
      ...options,
      headers: options?.headers ? this.mergeHeaders(authHeaders, options.headers) : authHeaders
    };
    return this.http.get<T>(this.buildUrl(path), mergedOptions);
  }

  post<T>(path: string, body: unknown, options?: { headers?: HttpHeaders | { [header: string]: string | string[] }; params?: HttpParams | { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean> } }): Observable<T> {
    const authHeaders = this.getAuthHeaders();
    const mergedOptions = {
      ...options,
      headers: options?.headers ? this.mergeHeaders(authHeaders, options.headers) : authHeaders
    };
    return this.http.post<T>(this.buildUrl(path), body, mergedOptions);
  }

  put<T>(path: string, body: unknown, options?: { headers?: HttpHeaders | { [header: string]: string | string[] }; params?: HttpParams | { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean> } }): Observable<T> {
    const authHeaders = this.getAuthHeaders();
    const mergedOptions = {
      ...options,
      headers: options?.headers ? this.mergeHeaders(authHeaders, options.headers) : authHeaders
    };
    return this.http.put<T>(this.buildUrl(path), body, mergedOptions);
  }

  delete<T>(path: string, options?: { headers?: HttpHeaders | { [header: string]: string | string[] }; params?: HttpParams | { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean> } }): Observable<T> {
    const authHeaders = this.getAuthHeaders();
    const mergedOptions = {
      ...options,
      headers: options?.headers ? this.mergeHeaders(authHeaders, options.headers) : authHeaders
    };
    return this.http.delete<T>(this.buildUrl(path), mergedOptions);
  }

  private mergeHeaders(authHeaders: HttpHeaders, customHeaders: HttpHeaders | { [header: string]: string | string[] }): HttpHeaders {
    if (customHeaders instanceof HttpHeaders) {
      return authHeaders.append('Content-Type', 'application/json');
    } else {
      let merged = authHeaders;
      Object.entries(customHeaders).forEach(([key, value]) => {
        merged = merged.set(key, value);
      });
      return merged;
    }
  }
}


