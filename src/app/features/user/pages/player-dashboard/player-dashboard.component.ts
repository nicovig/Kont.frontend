import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-player-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-50">
      <nav class="bg-white shadow-sm border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex items-center">
              <h1 class="text-xl font-bold text-gray-900">Kont</h1>
            </div>
            <div class="flex items-center space-x-4">
              <span class="text-sm text-gray-500">{{ playerInfo().username }}</span>
              <button (click)="disconnect()" 
                      class="text-red-600 hover:text-red-800 text-sm font-medium">
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="px-4 py-6 sm:px-0">
          <div class="text-center mb-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-2">{{ poolInfo().name }}</h2>
            <p class="text-gray-600">{{ poolInfo().currentPlayers }}/{{ poolInfo().maxPlayers }} joueurs connectés</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-white overflow-hidden shadow rounded-lg">
              <div class="p-5">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <div class="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                      <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
                      </svg>
                    </div>
                  </div>
                  <div class="ml-5 w-0 flex-1">
                    <dl>
                      <dt class="text-sm font-medium text-gray-500 truncate">Mon Rang</dt>
                      <dd class="text-lg font-medium text-gray-900">#{{ playerInfo().rank }}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-white overflow-hidden shadow rounded-lg">
              <div class="p-5">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <div class="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                      <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                  </div>
                  <div class="ml-5 w-0 flex-1">
                    <dl>
                      <dt class="text-sm font-medium text-gray-500 truncate">Score Total</dt>
                      <dd class="text-lg font-medium text-gray-900">{{ playerInfo().totalScore }}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-white overflow-hidden shadow rounded-lg">
              <div class="p-5">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <div class="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                      <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clip-rule="evenodd"/>
                      </svg>
                    </div>
                  </div>
                  <div class="ml-5 w-0 flex-1">
                    <dl>
                      <dt class="text-sm font-medium text-gray-500 truncate">Pourcentage</dt>
                      <dd class="text-lg font-medium text-gray-900">{{ playerInfo().percentage }}%</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div class="bg-white shadow rounded-lg">
              <div class="px-4 py-5 sm:p-6">
                <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Mes Scores par Activité</h3>
                <div class="space-y-3">
                  @for (score of playerScores(); track score.activityId) {
                    <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p class="text-sm font-medium text-gray-900">{{ score.activityName }}</p>
                        <p class="text-xs text-gray-500">Rang #{{ score.rank }}</p>
                      </div>
                      <div class="text-right">
                        <p class="text-sm font-medium text-gray-900">{{ score.score }}</p>
                        <p class="text-xs text-gray-500">{{ score.percentage }}%</p>
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>

            <div class="bg-white shadow rounded-lg">
              <div class="px-4 py-5 sm:p-6">
                <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Classement Général</h3>
                <div class="space-y-2">
                  @for (player of leaderboard(); track player.id; let i = $index) {
                    <div class="flex items-center justify-between p-2 rounded-lg"
                         [class.bg-yellow-50]="player.id === playerInfo().id"
                         [class.border]="player.id === playerInfo().id"
                         [class.border-yellow-200]="player.id === playerInfo().id">
                      <div class="flex items-center">
                        <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                             [class.bg-yellow-500]="i === 0"
                             [class.bg-gray-400]="i === 1"
                             [class.bg-orange-500]="i === 2"
                             [class.bg-gray-300]="i > 2"
                             [class.text-white]="i < 3"
                             [class.text-gray-700]="i >= 3">
                          {{ i + 1 }}
                        </div>
                        <div class="ml-3">
                          <p class="text-sm font-medium"
                             [class.text-gray-900]="player.id !== playerInfo().id"
                             [class.text-yellow-800]="player.id === playerInfo().id">
                            {{ player.username }}
                          </p>
                        </div>
                      </div>
                      <div class="text-right">
                        <p class="text-sm font-medium text-gray-900">{{ player.totalScore }}</p>
                        <p class="text-xs text-gray-500">{{ player.percentage }}%</p>
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Activités Disponibles</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                @for (activity of availableActivities(); track activity.id) {
                  <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div class="flex items-center justify-between mb-2">
                      <h4 class="text-sm font-medium text-gray-900">{{ activity.name }}</h4>
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                            [ngClass]="getActivityStatusClass(activity.status)">
                        {{ getActivityStatusText(activity.status) }}
                      </span>
                    </div>
                    <p class="text-xs text-gray-500 mb-3">{{ activity.description }}</p>
                    @if (activity.status === 'available') {
                      <button (click)="startActivity(activity.id)"
                              class="w-full bg-blue-600 text-white py-2 px-3 rounded-md text-sm font-medium hover:bg-blue-700">
                        Commencer
                      </button>
                    } @else if (activity.status === 'in_progress') {
                      <button (click)="enterScore(activity.id)"
                              class="w-full bg-green-600 text-white py-2 px-3 rounded-md text-sm font-medium hover:bg-green-700">
                        Saisir Score
                      </button>
                    } @else {
                      <button disabled
                              class="w-full bg-gray-300 text-gray-500 py-2 px-3 rounded-md text-sm font-medium cursor-not-allowed">
                        Terminée
                      </button>
                    }
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class PlayerDashboardComponent {
  playerInfo = signal({
    id: '1',
    username: 'Player1',
    rank: 3,
    totalScore: 850,
    percentage: 95
  });

  poolInfo = signal({
    name: 'Pool Scania - Équipe A',
    currentPlayers: 12,
    maxPlayers: 16
  });

  playerScores = signal([
    { activityId: '1', activityName: 'Karting', score: 95, percentage: 95, rank: 2 },
    { activityId: '2', activityName: 'Bowling', score: 88, percentage: 88, rank: 1 },
    { activityId: '3', activityName: 'Laser Game', score: 92, percentage: 92, rank: 4 }
  ]);

  leaderboard = signal([
    { id: '1', username: 'Player1', totalScore: 850, percentage: 95 },
    { id: '2', username: 'Player2', totalScore: 820, percentage: 92 },
    { id: '3', username: 'Player3', totalScore: 800, percentage: 90 },
    { id: '4', username: 'Player4', totalScore: 780, percentage: 88 },
    { id: '5', username: 'Player5', totalScore: 760, percentage: 85 }
  ]);

  availableActivities = signal([
    {
      id: '1',
      name: 'Karting',
      description: 'Course de karting sur circuit',
      status: 'completed'
    },
    {
      id: '2',
      name: 'Bowling',
      description: 'Partie de bowling',
      status: 'completed'
    },
    {
      id: '3',
      name: 'Laser Game',
      description: 'Mission laser game',
      status: 'completed'
    },
    {
      id: '4',
      name: 'Quiz',
      description: 'Quiz interactif',
      status: 'available'
    },
    {
      id: '5',
      name: 'Chasse au Trésor',
      description: 'Aventure de chasse au trésor',
      status: 'in_progress'
    }
  ]);

  getActivityStatusClass(status: string): string {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getActivityStatusText(status: string): string {
    switch (status) {
      case 'available':
        return 'Disponible';
      case 'in_progress':
        return 'En cours';
      case 'completed':
        return 'Terminée';
      default:
        return 'Inconnu';
    }
  }

  startActivity(activityId: string): void {
    console.log('Démarrer activité:', activityId);
  }

  enterScore(activityId: string): void {
    window.location.href = `/user/score/${this.poolInfo().name}/${activityId}`;
  }

  disconnect(): void {
    window.location.href = '/user';
  }
}

