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

  get<T>(path: string, options?: { headers?: HttpHeaders | { [header: string]: string | string[] }; params?: HttpParams | { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean> } }): Observable<T> {
    return this.http.get<T>(this.buildUrl(path), options);
  }

  post<T>(path: string, body: unknown, options?: { headers?: HttpHeaders | { [header: string]: string | string[] }; params?: HttpParams | { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean> } }): Observable<T> {
    return this.http.post<T>(this.buildUrl(path), body, options);
  }

  put<T>(path: string, body: unknown, options?: { headers?: HttpHeaders | { [header: string]: string | string[] }; params?: HttpParams | { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean> } }): Observable<T> {
    return this.http.put<T>(this.buildUrl(path), body, options);
  }

  delete<T>(path: string, options?: { headers?: HttpHeaders | { [header: string]: string | string[] }; params?: HttpParams | { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean> } }): Observable<T> {
    return this.http.delete<T>(this.buildUrl(path), options);
  }
}


