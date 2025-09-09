import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-pool-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pool-detail.component.html',
  styles: [`
    .pool-detail-container {
      padding: 2rem;
    }
    
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }
    
    .btn {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      text-decoration: none;
      display: inline-block;
      text-align: center;
    }
    
    .btn-back {
      background: #6c757d;
      color: white;
    }
    
    .btn-primary {
      background: #007bff;
      color: white;
    }
    
    .pool-info {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
    
    .info-card {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      border: 1px solid #e0e0e0;
    }
    
    .info-card h3 {
      margin: 0 0 1rem 0;
      color: #333;
    }
    
    .participants-list, .activities-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .participant, .activity {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem;
      background: #f8f9fa;
      border-radius: 4px;
    }
    
    .score {
      font-weight: bold;
      color: #007bff;
    }
    
    .date {
      color: #666;
      font-size: 0.9rem;
    }
  `]
})
export class PoolDetailComponent implements OnInit {
  pool: any = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const poolId = this.route.snapshot.paramMap.get('id');
    // TODO: Charger les données du pool depuis l'API
    this.loadPool(poolId);
  }

  loadPool(poolId: string | null) {
    if (poolId) {
      // Données mockées - à remplacer par un appel API
      this.pool = {
        id: poolId,
        name: 'Pool Tennis 2024',
        description: 'Tournoi de tennis annuel',
        participants: 24,
        activities: 8,
        status: 'Actif',
        participantsList: [
          { name: 'Jean Dupont', score: 150 },
          { name: 'Marie Martin', score: 140 },
          { name: 'Pierre Durand', score: 135 }
        ],
        activitiesList: [
          { name: 'Match 1', date: '2024-01-15' },
          { name: 'Match 2', date: '2024-01-22' },
          { name: 'Match 3', date: '2024-01-29' }
        ]
      };
    }
  }

  editPool() {
    console.log('Edit pool:', this.pool?.id);
    // TODO: Implémenter la logique d'édition
  }
}
