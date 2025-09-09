import { Injectable, signal } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { User, Pool, Activity, Score, Establishment } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = 'https://api.kont.app';

  // Signals pour le state management
  currentUser = signal<User | null>(null);
  currentPool = signal<Pool | null>(null);
  establishments = signal<Establishment[]>([]);
  pools = signal<Pool[]>([]);
  activities = signal<Activity[]>([]);
  scores = signal<Score[]>([]);

  // Méthodes d'authentification
  login(email: string, password: string): Observable<{ user: User; token: string }> {
    // TODO: Implémenter l'appel API réel
    const mockUser: User = {
      id: '1',
      firstName: 'Admin',
      lastName: 'User',
      email: email,
      username: 'admin',
      pin: '1234',
      role: 'admin' as any,
      isActive: true,
      createdAt: new Date()
    };

    return of({ user: mockUser, token: 'mock-token' }).pipe(delay(1000));
  }

  joinPool(poolId: string, userData: Partial<User>): Observable<User> {
    // TODO: Implémenter l'appel API réel
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      email: userData.email || '',
      username: userData.username || '',
      pin: userData.pin || '',
      role: 'user' as any,
      poolId: poolId,
      isActive: true,
      createdAt: new Date()
    };

    return of(mockUser).pipe(delay(500));
  }

  // Méthodes pour les pools
  getPools(): Observable<Pool[]> {
    // TODO: Implémenter l'appel API réel
    const mockPools: Pool[] = [
      {
        id: '1',
        name: 'Pool Scania - Équipe A',
        qrCode: 'POOL123',
        establishmentId: '1',
        adminId: '1',
        status: 'in_progress' as any,
        maxPlayers: 16,
        currentPlayers: 12,
        activities: [],
        groups: [],
        createdAt: new Date()
      }
    ];

    return of(mockPools).pipe(delay(500));
  }

  createPool(poolData: Partial<Pool>): Observable<Pool> {
    // TODO: Implémenter l'appel API réel
    const mockPool: Pool = {
      id: Math.random().toString(36).substr(2, 9),
      name: poolData.name || 'Nouvelle Pool',
      qrCode: Math.random().toString(36).substr(2, 9).toUpperCase(),
      establishmentId: poolData.establishmentId || '1',
      adminId: poolData.adminId || '1',
      status: 'created' as any,
      maxPlayers: poolData.maxPlayers || 16,
      currentPlayers: 0,
      activities: [],
      groups: [],
      createdAt: new Date()
    };

    return of(mockPool).pipe(delay(500));
  }

  // Méthodes pour les activités
  getActivities(): Observable<Activity[]> {
    // TODO: Implémenter l'appel API réel
    const mockActivities: Activity[] = [
      {
        id: '1',
        name: 'Karting',
        description: 'Course de karting sur circuit',
        establishmentId: '1',
        scoringType: 'time' as any,
        maxScore: 100,
        timeLimit: 300,
        isActive: true,
        createdAt: new Date()
      },
      {
        id: '2',
        name: 'Bowling',
        description: 'Partie de bowling',
        establishmentId: '1',
        scoringType: 'points' as any,
        maxScore: 300,
        isActive: true,
        createdAt: new Date()
      }
    ];

    return of(mockActivities).pipe(delay(500));
  }

  // Méthodes pour les scores
  submitScore(scoreData: Partial<Score>): Observable<Score> {
    // TODO: Implémenter l'appel API réel
    const mockScore: Score = {
      id: Math.random().toString(36).substr(2, 9),
      userId: scoreData.userId || '1',
      activityId: scoreData.activityId || '1',
      poolId: scoreData.poolId || '1',
      groupId: scoreData.groupId || '1',
      rawScore: scoreData.rawScore || 0,
      normalizedScore: scoreData.normalizedScore || 0,
      percentage: scoreData.percentage || 0,
      rank: scoreData.rank || 1,
      timestamp: new Date(),
      metadata: scoreData.metadata
    };

    return of(mockScore).pipe(delay(500));
  }

  getScores(poolId: string): Observable<Score[]> {
    // TODO: Implémenter l'appel API réel
    const mockScores: Score[] = [
      {
        id: '1',
        userId: '1',
        activityId: '1',
        poolId: poolId,
        groupId: '1',
        rawScore: 95,
        normalizedScore: 95,
        percentage: 95,
        rank: 1,
        timestamp: new Date(),
        metadata: {}
      }
    ];

    return of(mockScores).pipe(delay(500));
  }

  // Méthodes pour les établissements (super-admin)
  getEstablishments(): Observable<Establishment[]> {
    // TODO: Implémenter l'appel API réel
    const mockEstablishments: Establishment[] = [
      {
        id: '1',
        name: 'Parc de Jeux Scania',
        address: '123 Rue des Jeux, 75001 Paris',
        ipAddress: '192.168.1.100',
        contactEmail: 'contact@scania.fr',
        contactPhone: '01 23 45 67 89',
        subscription: {
          id: 'sub1',
          establishmentId: '1',
          plan: 'klasel' as any,
          status: 'active' as any,
          monthlyPoolsLimit: -1,
          currentMonthPools: 12,
          startDate: new Date('2024-01-01'),
          endDate: new Date('2024-12-31'),
          price: 500,
          autoRenew: true
        },
        admins: ['admin1'],
        delegates: [],
        isActive: true,
        createdAt: new Date('2024-01-01'),
        lastActivity: new Date()
      }
    ];

    return of(mockEstablishments).pipe(delay(500));
  }

  // Méthodes utilitaires
  private handleError(error: any): Observable<never> {
    console.error('API Error:', error);
    throw error;
  }
}

