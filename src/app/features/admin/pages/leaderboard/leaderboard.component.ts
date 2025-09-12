import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PlayerGlobalScore } from '../../../models';
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
      playerEntity: 'player1',
      poolEntity: 'pool1'
    },
    {
      id: '2',
      totalScore: 140,
      percentage: 92,
      globalRank: 2,
      activitiesPlayed: 7,
      calculatedAt: new Date(),
      lastUpdatedAt: new Date(),
      playerEntity: 'player2',
      poolEntity: 'pool1'
    },
    {
      id: '3',
      totalScore: 135,
      percentage: 90,
      globalRank: 3,
      activitiesPlayed: 6,
      calculatedAt: new Date(),
      lastUpdatedAt: new Date(),
      playerEntity: 'player3',
      poolEntity: 'pool2'
    },
    {
      id: '4',
      totalScore: 130,
      percentage: 88,
      globalRank: 4,
      activitiesPlayed: 5,
      calculatedAt: new Date(),
      lastUpdatedAt: new Date(),
      playerEntity: 'player4',
      poolEntity: 'pool2'
    }
  ];
  
  get filteredPlayers() {
    let filtered = this.players;
    
    if (this.selectedPool) {
      filtered = filtered.filter(p => p.poolEntity === this.selectedPool);
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
