import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-monitoring',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="monitoring-container">
      <div class="header">
        <h1>Monitoring Système</h1>
        <div class="refresh-controls">
          <button class="btn btn-primary" (click)="refreshData()">
            Actualiser
          </button>
          <span class="last-update">Dernière mise à jour: {{ lastUpdate }}</span>
        </div>
      </div>
      
      <div class="metrics-grid">
        <div class="metric-card">
          <h3>Serveur</h3>
          <div class="metric-item">
            <span class="metric-label">CPU Usage</span>
            <span class="metric-value" [class]="getCpuStatusClass()">{{ serverMetrics.cpu }}%</span>
          </div>
          <div class="metric-item">
            <span class="metric-label">Memory Usage</span>
            <span class="metric-value" [class]="getMemoryStatusClass()">{{ serverMetrics.memory }}%</span>
          </div>
          <div class="metric-item">
            <span class="metric-label">Disk Usage</span>
            <span class="metric-value" [class]="getDiskStatusClass()">{{ serverMetrics.disk }}%</span>
          </div>
          <div class="metric-item">
            <span class="metric-label">Uptime</span>
            <span class="metric-value">{{ serverMetrics.uptime }}</span>
          </div>
        </div>
        
        <div class="metric-card">
          <h3>Base de données</h3>
          <div class="metric-item">
            <span class="metric-label">Connexions actives</span>
            <span class="metric-value">{{ dbMetrics.activeConnections }}</span>
          </div>
          <div class="metric-item">
            <span class="metric-label">Requêtes/seconde</span>
            <span class="metric-value">{{ dbMetrics.queriesPerSecond }}</span>
          </div>
          <div class="metric-item">
            <span class="metric-label">Taille DB</span>
            <span class="metric-value">{{ dbMetrics.size }}</span>
          </div>
          <div class="metric-item">
            <span class="metric-label">Temps de réponse</span>
            <span class="metric-value" [class]="getDbResponseTimeClass()">{{ dbMetrics.responseTime }}ms</span>
          </div>
        </div>
        
        <div class="metric-card">
          <h3>Application</h3>
          <div class="metric-item">
            <span class="metric-label">Utilisateurs actifs</span>
            <span class="metric-value">{{ appMetrics.activeUsers }}</span>
          </div>
          <div class="metric-item">
            <span class="metric-label">Requêtes API/seconde</span>
            <span class="metric-value">{{ appMetrics.apiRequestsPerSecond }}</span>
          </div>
          <div class="metric-item">
            <span class="metric-label">Taux d'erreur</span>
            <span class="metric-value" [class]="getErrorRateClass()">{{ appMetrics.errorRate }}%</span>
          </div>
          <div class="metric-item">
            <span class="metric-label">Temps de réponse API</span>
            <span class="metric-value" [class]="getApiResponseTimeClass()">{{ appMetrics.apiResponseTime }}ms</span>
          </div>
        </div>
      </div>
      
      <div class="charts-section">
        <div class="chart-card">
          <h3>Utilisation CPU (24h)</h3>
          <div class="chart-placeholder">
            <p>Graphique CPU - Intégration avec une librairie de graphiques recommandée</p>
          </div>
        </div>
        
        <div class="chart-card">
          <h3>Requêtes API (24h)</h3>
          <div class="chart-placeholder">
            <p>Graphique API - Intégration avec une librairie de graphiques recommandée</p>
          </div>
        </div>
      </div>
      
      <div class="alerts-section">
        <h2>Alertes Récentes</h2>
        <div class="alerts-list">
          <div class="alert-item" *ngFor="let alert of alerts" [class]="'alert-' + alert.level">
            <div class="alert-icon">
              <span *ngIf="alert.level === 'critical'">🚨</span>
              <span *ngIf="alert.level === 'warning'">⚠️</span>
              <span *ngIf="alert.level === 'info'">ℹ️</span>
            </div>
            <div class="alert-content">
              <div class="alert-title">{{ alert.title }}</div>
              <div class="alert-message">{{ alert.message }}</div>
              <div class="alert-time">{{ alert.timestamp }}</div>
            </div>
            <div class="alert-actions">
              <button class="btn btn-sm btn-outline" (click)="acknowledgeAlert(alert.id)">
                Marquer comme lu
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .monitoring-container {
      padding: 2rem;
    }
    
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }
    
    .refresh-controls {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    
    .last-update {
      font-size: 0.9rem;
      color: #666;
    }
    
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }
    
    .metric-card {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      border: 1px solid #e0e0e0;
    }
    
    .metric-card h3 {
      margin: 0 0 1rem 0;
      color: #333;
      border-bottom: 2px solid #007bff;
      padding-bottom: 0.5rem;
    }
    
    .metric-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.75rem;
    }
    
    .metric-label {
      color: #666;
      font-size: 0.9rem;
    }
    
    .metric-value {
      font-weight: bold;
      font-size: 1.1rem;
    }
    
    .metric-value.status-good {
      color: #28a745;
    }
    
    .metric-value.status-warning {
      color: #ffc107;
    }
    
    .metric-value.status-critical {
      color: #dc3545;
    }
    
    .charts-section {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
      margin-bottom: 2rem;
    }
    
    .chart-card {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      border: 1px solid #e0e0e0;
    }
    
    .chart-card h3 {
      margin: 0 0 1rem 0;
      color: #333;
    }
    
    .chart-placeholder {
      height: 200px;
      background: #f8f9fa;
      border: 2px dashed #dee2e6;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #666;
      text-align: center;
    }
    
    .alerts-section {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      border: 1px solid #e0e0e0;
    }
    
    .alerts-section h2 {
      margin: 0 0 1rem 0;
      color: #333;
    }
    
    .alerts-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .alert-item {
      display: flex;
      align-items: center;
      padding: 1rem;
      border-radius: 4px;
      border-left: 4px solid;
    }
    
    .alert-critical {
      background: #f8d7da;
      border-left-color: #dc3545;
    }
    
    .alert-warning {
      background: #fff3cd;
      border-left-color: #ffc107;
    }
    
    .alert-info {
      background: #d1ecf1;
      border-left-color: #17a2b8;
    }
    
    .alert-icon {
      font-size: 1.5rem;
      margin-right: 1rem;
    }
    
    .alert-content {
      flex: 1;
    }
    
    .alert-title {
      font-weight: bold;
      margin-bottom: 0.25rem;
    }
    
    .alert-message {
      color: #666;
      font-size: 0.9rem;
      margin-bottom: 0.25rem;
    }
    
    .alert-time {
      color: #999;
      font-size: 0.8rem;
    }
    
    .alert-actions {
      margin-left: 1rem;
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
    
    .btn-primary {
      background: #007bff;
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
  `]
})
export class MonitoringComponent implements OnInit {
  lastUpdate = new Date().toLocaleString();
  
  serverMetrics = {
    cpu: 45,
    memory: 67,
    disk: 23,
    uptime: '15 jours, 3h 42m'
  };
  
  dbMetrics = {
    activeConnections: 12,
    queriesPerSecond: 156,
    size: '2.3 GB',
    responseTime: 45
  };
  
  appMetrics = {
    activeUsers: 89,
    apiRequestsPerSecond: 234,
    errorRate: 0.2,
    apiResponseTime: 120
  };
  
  alerts = [
    {
      id: 1,
      level: 'warning',
      title: 'Utilisation mémoire élevée',
      message: 'L\'utilisation de la mémoire atteint 67%',
      timestamp: 'Il y a 5 minutes'
    },
    {
      id: 2,
      level: 'info',
      title: 'Nouveau déploiement',
      message: 'Version 1.2.3 déployée avec succès',
      timestamp: 'Il y a 1 heure'
    },
    {
      id: 3,
      level: 'critical',
      title: 'Erreur de base de données',
      message: 'Connexion à la base de données interrompue',
      timestamp: 'Il y a 2 heures'
    }
  ];

  ngOnInit() {
    // TODO: Implémenter la récupération des métriques en temps réel
    this.startRealTimeUpdates();
  }

  startRealTimeUpdates() {
    // TODO: Implémenter les mises à jour en temps réel
    setInterval(() => {
      this.refreshData();
    }, 30000); // Mise à jour toutes les 30 secondes
  }

  refreshData() {
    this.lastUpdate = new Date().toLocaleString();
    // TODO: Implémenter la récupération des nouvelles données
    console.log('Refreshing monitoring data');
  }

  getCpuStatusClass() {
    if (this.serverMetrics.cpu > 80) return 'status-critical';
    if (this.serverMetrics.cpu > 60) return 'status-warning';
    return 'status-good';
  }

  getMemoryStatusClass() {
    if (this.serverMetrics.memory > 80) return 'status-critical';
    if (this.serverMetrics.memory > 60) return 'status-warning';
    return 'status-good';
  }

  getDiskStatusClass() {
    if (this.serverMetrics.disk > 90) return 'status-critical';
    if (this.serverMetrics.disk > 70) return 'status-warning';
    return 'status-good';
  }

  getDbResponseTimeClass() {
    if (this.dbMetrics.responseTime > 1000) return 'status-critical';
    if (this.dbMetrics.responseTime > 500) return 'status-warning';
    return 'status-good';
  }

  getErrorRateClass() {
    if (this.appMetrics.errorRate > 5) return 'status-critical';
    if (this.appMetrics.errorRate > 1) return 'status-warning';
    return 'status-good';
  }

  getApiResponseTimeClass() {
    if (this.appMetrics.apiResponseTime > 2000) return 'status-critical';
    if (this.appMetrics.apiResponseTime > 1000) return 'status-warning';
    return 'status-good';
  }

  acknowledgeAlert(alertId: number) {
    this.alerts = this.alerts.filter(alert => alert.id !== alertId);
    console.log('Alert acknowledged:', alertId);
  }
}
