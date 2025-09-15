import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EventStatus, PlayerGlobalScore, PlayerType, PoolStatus } from '../../../../models';
import { AdminState } from '../../store/admin.state';
import * as AdminActions from '../../store/admin.actions';
import * as AdminSelectors from '../../store/admin.selectors';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  
  selectedPool = '';
  selectedPeriod = 'all';
  
  pools = [
    { id: '1', name: 'Pool Tennis 2024' },
    { id: '2', name: 'Pool Football' }
  ];
  
  players: PlayerGlobalScore[] = [
    {
      id: '1',
      totalScore: 150,
      percentage: 95,
      globalRank: 1,
      activitiesPlayed: 8,
      calculatedAt: new Date(),
      lastUpdatedAt: new Date(),
      playerEntity: { id: '1', firstname: 'Player 1', lastname: 'Player 1', username: 'player1', playerType: PlayerType.Player, password: 'password', email: 'player1@example.com', createdAt: new Date() },
      poolEntity: {
        id: '1', name: 'Pool 1', qrCode: '1234567890', event: {
          id: '1', name: 'Event 1',
          eventLink: '',
          site: {
            id: '1', name: 'Site 1', address: '123 Main St', city: 'Anytown', state: 'CA', zipCode: '12345', country: 'USA', createdAt: new Date(),
            phoneNumber: '',
            email: '',
            administrators: [],
            activities: []
          },
          status: EventStatus.Pending,
          createdAt: new Date(),
          activities: [],
          pools: []
        }, playerRegistrations: [], gameSessions: [], createdAt: new Date(), endedAt: new Date(),
        isActive: false,
        isAllPlayersPresent: false,
        status: PoolStatus.Pending
      }
    },
  ];
  
  get filteredPlayers() {
    let filtered = this.players;
    
    if (this.selectedPool) {
      filtered = filtered.filter(p => p.poolEntity.id === this.selectedPool);
    }
    
    return filtered.sort((a, b) => b.totalScore - a.totalScore);
  }
  
  get totalParticipants() {
    return this.filteredPlayers.length;
  }
  
  get averageScore() {
    const total = this.filteredPlayers.reduce((sum, player) => sum + player.totalScore, 0);
    return Math.round(total / this.filteredPlayers.length);
  }
  
  get totalActivities() {
    return this.filteredPlayers.reduce((sum, player) => sum + player.activitiesPlayed, 0);
  }
  
  filterByPool() {
    // Le filtrage est géré par le getter filteredPlayers
  }
  
  filterByPeriod() {
    // TODO: Implémenter le filtrage par période
  }

  ngOnInit(): void {
    // Load initial data if needed
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
