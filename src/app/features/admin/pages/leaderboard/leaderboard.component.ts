import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './leaderboard.component.html'
})
export class LeaderboardComponent {
  selectedPool = '';
  selectedPeriod = 'all';
  
  pools = [
    { id: 1, name: 'Pool Tennis 2024' },
    { id: 2, name: 'Pool Football' }
  ];
  
  players = [
    {
      id: 1,
      name: 'Jean Dupont',
      email: 'jean.dupont@email.com',
      poolName: 'Pool Tennis 2024',
      score: 150,
      activitiesCompleted: 8,
      trend: 5
    },
    {
      id: 2,
      name: 'Marie Martin',
      email: 'marie.martin@email.com',
      poolName: 'Pool Tennis 2024',
      score: 140,
      activitiesCompleted: 7,
      trend: -2
    },
    {
      id: 3,
      name: 'Pierre Durand',
      email: 'pierre.durand@email.com',
      poolName: 'Pool Football',
      score: 135,
      activitiesCompleted: 6,
      trend: 3
    },
    {
      id: 4,
      name: 'Sophie Bernard',
      email: 'sophie.bernard@email.com',
      poolName: 'Pool Football',
      score: 130,
      activitiesCompleted: 5,
      trend: 0
    }
  ];
  
  get filteredPlayers() {
    let filtered = this.players;
    
    if (this.selectedPool) {
      filtered = filtered.filter(p => p.poolName === this.pools.find(pool => pool.id.toString() === this.selectedPool)?.name);
    }
    
    return filtered.sort((a, b) => b.score - a.score);
  }
  
  get totalParticipants() {
    return this.filteredPlayers.length;
  }
  
  get averageScore() {
    const total = this.filteredPlayers.reduce((sum, player) => sum + player.score, 0);
    return Math.round(total / this.filteredPlayers.length);
  }
  
  get totalActivities() {
    return this.filteredPlayers.reduce((sum, player) => sum + player.activitiesCompleted, 0);
  }
  
  filterByPool() {
    // Le filtrage est géré par le getter filteredPlayers
  }
  
  filterByPeriod() {
    // TODO: Implémenter le filtrage par période
  }
}
