import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { User, UserRole } from '../models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'kont_token';
  private readonly USER_KEY = 'kont_user';

  // Signals pour le state management
  private _currentUser = signal<User | null>(null);
  private _isAuthenticated = signal(false);
  private _isLoading = signal(false);

  // Computed properties
  currentUser = computed(() => this._currentUser());
  isAuthenticated = computed(() => this._isAuthenticated());
  isLoading = computed(() => this._isLoading());
  userRole = computed(() => this._currentUser()?.role || null);

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {
    this.initializeAuth();
  }

  private initializeAuth(): void {
    const token = localStorage.getItem(this.TOKEN_KEY);
    const userStr = localStorage.getItem(this.USER_KEY);

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        this._currentUser.set(user);
        this._isAuthenticated.set(true);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        this.clearAuth();
      }
    }
  }

  login(email: string, password: string): Observable<{ user: User; token: string }> {
    this._isLoading.set(true);

    return this.apiService.login(email, password).pipe(
      tap({
        next: (response) => {
          this._currentUser.set(response.user);
          this._isAuthenticated.set(true);
          localStorage.setItem(this.TOKEN_KEY, response.token);
          localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
          this._isLoading.set(false);
        },
        error: (error) => {
          this._isLoading.set(false);
          throw error;
        }
      })
    );
  }

  logout(): void {
    this.clearAuth();
    this.router.navigate(['/user']);
  }

  private clearAuth(): void {
    this._currentUser.set(null);
    this._isAuthenticated.set(false);
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  // Méthodes de vérification des rôles
  isSuperAdmin(): boolean {
    return this.userRole() === UserRole.SUPER_ADMIN;
  }

  isAdmin(): boolean {
    return this.userRole() === UserRole.ADMIN;
  }

  isDelegate(): boolean {
    return this.userRole() === UserRole.DELEGATE;
  }

  isUser(): boolean {
    return this.userRole() === UserRole.USER;
  }

  hasRole(role: UserRole): boolean {
    return this.userRole() === role;
  }

  hasAnyRole(roles: UserRole[]): boolean {
    const currentRole = this.userRole();
    return currentRole != null && roles.includes(currentRole);
  }

  // Méthodes pour la navigation basée sur les rôles
  getDefaultRoute(): string {
    const role = this.userRole();
    
    switch (role) {
      case UserRole.SUPER_ADMIN:
        return '/super-admin';
      case UserRole.ADMIN:
      case UserRole.DELEGATE:
        return '/admin';
      case UserRole.USER:
        return '/user';
      default:
        return '/user';
    }
  }

  // Méthode pour rejoindre une pool (utilisateurs)
  joinPool(poolId: string, userData: Partial<User>): Observable<User> {
    this._isLoading.set(true);

    return this.apiService.joinPool(poolId, userData).pipe(
      tap({
        next: (user) => {
          this._currentUser.set(user);
          this._isAuthenticated.set(true);
          localStorage.setItem(this.USER_KEY, JSON.stringify(user));
          this._isLoading.set(false);
        },
        error: (error) => {
          this._isLoading.set(false);
          throw error;
        }
      })
    );
  }

  // Méthode pour la reconnexion avec PIN
  reconnectWithPin(username: string, pin: string): Observable<User> {
    // TODO: Implémenter la logique de reconnexion
    // Pour l'instant, on simule une reconnexion réussie
    const mockUser: User = {
      id: '1',
      firstName: 'User',
      lastName: 'Test',
      email: 'user@test.com',
      username: username,
      pin: pin,
      role: UserRole.USER,
      poolId: '1',
      isActive: true,
      createdAt: new Date()
    };

    return of(mockUser).pipe(
      tap((user) => {
        this._currentUser.set(user);
        this._isAuthenticated.set(true);
        localStorage.setItem(this.USER_KEY, JSON.stringify(user));
      })
    );
  }

  // Méthode pour vérifier si l'utilisateur peut accéder à une route
  canAccess(route: string): boolean {
    const role = this.userRole();
    
    if (route.startsWith('/super-admin')) {
      return role === UserRole.SUPER_ADMIN;
    }
    
    if (route.startsWith('/admin')) {
      return role === UserRole.ADMIN || role === UserRole.DELEGATE;
    }
    
    if (route.startsWith('/user')) {
      return true; // Tous les utilisateurs peuvent accéder à l'interface utilisateur
    }
    
    return false;
  }
}

