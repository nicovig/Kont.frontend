import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PoolStatus } from '../../../../models';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  activePools = signal(3);
  connectedPlayers = signal(24);
  totalActivities = signal(8);
  totalScores = signal(156);

  recentPools = signal([
    {
      id: '1',
      name: 'Pool Scania - Équipe A',
      currentPlayers: 12,
      maxPlayers: 16,
      status: PoolStatus.IN_PROGRESS
    },
    {
      id: '2',
      name: 'Pool Scania - Équipe B',
      currentPlayers: 8,
      maxPlayers: 16,
      status: PoolStatus.WAITING_PLAYERS
    },
    {
      id: '3',
      name: 'Pool Scania - Équipe C',
      currentPlayers: 16,
      maxPlayers: 16,
      status: PoolStatus.READY
    }
  ]);

  topPlayers = signal([
    { id: '1', username: 'Player1', totalScore: 850, percentage: 95 },
    { id: '2', username: 'Player2', totalScore: 820, percentage: 92 },
    { id: '3', username: 'Player3', totalScore: 800, percentage: 90 },
    { id: '4', username: 'Player4', totalScore: 780, percentage: 88 },
    { id: '5', username: 'Player5', totalScore: 760, percentage: 85 }
  ]);

  getPoolStatusClass(status: PoolStatus): string {
    switch (status) {
      case PoolStatus.CREATED:
        return 'bg-gray-100 text-gray-800';
      case PoolStatus.WAITING_PLAYERS:
        return 'bg-yellow-100 text-yellow-800';
      case PoolStatus.READY:
        return 'bg-blue-100 text-blue-800';
      case PoolStatus.IN_PROGRESS:
        return 'bg-green-100 text-green-800';
      case PoolStatus.FINISHED:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getPoolStatusText(status: PoolStatus): string {
    switch (status) {
      case PoolStatus.CREATED:
        return 'Créée';
      case PoolStatus.WAITING_PLAYERS:
        return 'En attente';
      case PoolStatus.READY:
        return 'Prête';
      case PoolStatus.IN_PROGRESS:
        return 'En cours';
      case PoolStatus.FINISHED:
        return 'Terminée';
      default:
        return 'Inconnu';
    }
  }
}

