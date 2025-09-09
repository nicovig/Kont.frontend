import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-establishment-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="establishment-detail-container">
      <div class="header">
        <button class="btn btn-back" routerLink="/super-admin/establishments">
          ← Retour aux établissements
        </button>
        <h1>{{ establishment?.name }}</h1>
        <button class="btn btn-primary" (click)="editEstablishment()">
          Modifier
        </button>
      </div>
      
      <div class="establishment-info" *ngIf="establishment">
        <div class="info-grid">
          <div class="info-card">
            <h3>Informations générales</h3>
            <div class="info-item">
              <label>Nom:</label>
              <span>{{ establishment.name }}</span>
            </div>
            <div class="info-item">
              <label>Adresse:</label>
              <span>{{ establishment.address }}</span>
            </div>
            <div class="info-item">
              <label>Email:</label>
              <span>{{ establishment.email }}</span>
            </div>
            <div class="info-item">
              <label>Téléphone:</label>
              <span>{{ establishment.phone }}</span>
            </div>
            <div class="info-item">
              <label>Statut:</label>
              <span class="status" [class]="'status-' + establishment.status">
                {{ establishment.status }}
              </span>
            </div>
          </div>
          
          <div class="info-card">
            <h3>Statistiques</h3>
            <div class="stats-grid">
              <div class="stat-item">
                <span class="stat-number">{{ establishment.totalUsers }}</span>
                <span class="stat-label">Utilisateurs</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">{{ establishment.totalPools }}</span>
                <span class="stat-label">Pools</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">{{ establishment.totalActivities }}</span>
                <span class="stat-label">Activités</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">{{ establishment.revenue }}€</span>
                <span class="stat-label">Revenus</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="info-card">
          <h3>Utilisateurs récents</h3>
          <div class="users-table">
            <div class="table-header">
              <div>Nom</div>
              <div>Email</div>
              <div>Rôle</div>
              <div>Dernière connexion</div>
              <div>Actions</div>
            </div>
            <div class="table-body">
              <div class="table-row" *ngFor="let user of establishment.recentUsers">
                <div>{{ user.name }}</div>
                <div>{{ user.email }}</div>
                <div>
                  <span class="role" [class]="'role-' + user.role">{{ user.role }}</span>
                </div>
                <div>{{ user.lastLogin }}</div>
                <div>
                  <button class="btn btn-sm btn-outline" (click)="viewUser(user.id)">
                    Voir
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="info-card">
          <h3>Pools actives</h3>
          <div class="pools-list">
            <div class="pool-item" *ngFor="let pool of establishment.pools">
              <div class="pool-info">
                <h4>{{ pool.name }}</h4>
                <p>{{ pool.description }}</p>
                <div class="pool-stats">
                  <span>{{ pool.participants }} participants</span>
                  <span>{{ pool.activities }} activités</span>
                </div>
              </div>
              <div class="pool-actions">
                <button class="btn btn-sm btn-secondary" (click)="viewPool(pool.id)">
                  Voir
                </button>
                <button class="btn btn-sm btn-outline" (click)="editPool(pool.id)">
                  Modifier
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .establishment-detail-container {
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
    
    .btn-secondary {
      background: #6c757d;
      color: white;
    }
    
    .btn-outline {
      background: transparent;
      color: #007bff;
      border: 1px solid #007bff;
    }
    
    .btn-sm {
      padding: 0.25rem 0.5rem;
      font-size: 0.8rem;
    }
    
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      margin-bottom: 2rem;
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
      border-bottom: 2px solid #007bff;
      padding-bottom: 0.5rem;
    }
    
    .info-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
    }
    
    .info-item label {
      font-weight: 500;
      color: #666;
    }
    
    .status {
      padding: 0.25rem 0.5rem;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: bold;
      text-transform: uppercase;
    }
    
    .status-active {
      background: #d4edda;
      color: #155724;
    }
    
    .status-inactive {
      background: #f8d7da;
      color: #721c24;
    }
    
    .status-pending {
      background: #fff3cd;
      color: #856404;
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
    
    .stat-item {
      text-align: center;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 4px;
    }
    
    .stat-number {
      display: block;
      font-size: 1.5rem;
      font-weight: bold;
      color: #007bff;
    }
    
    .stat-label {
      font-size: 0.9rem;
      color: #666;
    }
    
    .users-table, .pools-list {
      margin-top: 1rem;
    }
    
    .table-header {
      display: grid;
      grid-template-columns: 1fr 1fr 100px 150px 100px;
      background: #f8f9fa;
      padding: 0.75rem;
      font-weight: bold;
      border-bottom: 1px solid #e0e0e0;
    }
    
    .table-body {
      display: flex;
      flex-direction: column;
    }
    
    .table-row {
      display: grid;
      grid-template-columns: 1fr 1fr 100px 150px 100px;
      padding: 0.75rem;
      border-bottom: 1px solid #f0f0f0;
      align-items: center;
    }
    
    .role {
      padding: 0.25rem 0.5rem;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: bold;
      text-transform: uppercase;
    }
    
    .role-admin {
      background: #d1ecf1;
      color: #0c5460;
    }
    
    .role-user {
      background: #d4edda;
      color: #155724;
    }
    
    .pool-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 4px;
      margin-bottom: 0.5rem;
    }
    
    .pool-info h4 {
      margin: 0 0 0.5rem 0;
      color: #333;
    }
    
    .pool-info p {
      margin: 0 0 0.5rem 0;
      color: #666;
      font-size: 0.9rem;
    }
    
    .pool-stats {
      display: flex;
      gap: 1rem;
      font-size: 0.8rem;
      color: #666;
    }
    
    .pool-actions {
      display: flex;
      gap: 0.5rem;
    }
  `]
})
export class EstablishmentDetailComponent implements OnInit {
  establishment: any = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const establishmentId = this.route.snapshot.paramMap.get('id');
    this.loadEstablishment(establishmentId);
  }

  loadEstablishment(establishmentId: string | null) {
    if (establishmentId) {
      // Données mockées - à remplacer par un appel API
      this.establishment = {
        id: establishmentId,
        name: 'Club Sportif Parisien',
        address: '123 Rue de la Paix, 75001 Paris',
        email: 'contact@clubparisien.fr',
        phone: '+33 1 23 45 67 89',
        status: 'active',
        totalUsers: 156,
        totalPools: 8,
        totalActivities: 45,
        revenue: 12500,
        recentUsers: [
          {
            id: 1,
            name: 'Jean Dupont',
            email: 'jean.dupont@email.com',
            role: 'admin',
            lastLogin: '2024-01-15'
          },
          {
            id: 2,
            name: 'Marie Martin',
            email: 'marie.martin@email.com',
            role: 'user',
            lastLogin: '2024-01-14'
          }
        ],
        pools: [
          {
            id: 1,
            name: 'Pool Tennis 2024',
            description: 'Tournoi de tennis annuel',
            participants: 24,
            activities: 8
          },
          {
            id: 2,
            name: 'Pool Football',
            description: 'Championnat de football',
            participants: 16,
            activities: 12
          }
        ]
      };
    }
  }

  editEstablishment() {
    console.log('Edit establishment:', this.establishment?.id);
    // TODO: Implémenter l'édition
  }

  viewUser(userId: number) {
    console.log('View user:', userId);
    // TODO: Implémenter la vue utilisateur
  }

  viewPool(poolId: number) {
    console.log('View pool:', poolId);
    // TODO: Implémenter la vue pool
  }

  editPool(poolId: number) {
    console.log('Edit pool:', poolId);
    // TODO: Implémenter l'édition pool
  }
}
