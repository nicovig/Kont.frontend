import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="billing-container">
      <div class="header">
        <h1>Facturation</h1>
        <div class="header-actions">
          <button class="btn btn-primary" (click)="generateInvoice()">
            Générer une facture
          </button>
          <button class="btn btn-secondary" (click)="exportBilling()">
            Exporter
          </button>
        </div>
      </div>
      
      <div class="billing-summary">
        <div class="summary-card">
          <h3>Revenus ce mois</h3>
          <span class="amount">{{ monthlyRevenue }}€</span>
        </div>
        <div class="summary-card">
          <h3>Factures en attente</h3>
          <span class="amount">{{ pendingInvoices }}€</span>
        </div>
        <div class="summary-card">
          <h3>Clients actifs</h3>
          <span class="amount">{{ activeClients }}</span>
        </div>
      </div>
      
      <div class="billing-content">
        <div class="invoices-section">
          <h2>Factures récentes</h2>
          <div class="invoices-table">
            <div class="table-header">
              <div>N° Facture</div>
              <div>Client</div>
              <div>Montant</div>
              <div>Date</div>
              <div>Statut</div>
              <div>Actions</div>
            </div>
            <div class="table-body">
              <div class="table-row" *ngFor="let invoice of invoices">
                <div>{{ invoice.number }}</div>
                <div>{{ invoice.client }}</div>
                <div>{{ invoice.amount }}€</div>
                <div>{{ invoice.date }}</div>
                <div>
                  <span class="status" [class]="'status-' + invoice.status">
                    {{ invoice.status }}
                  </span>
                </div>
                <div class="actions">
                  <button class="btn btn-sm btn-outline" (click)="viewInvoice(invoice.id)">
                    Voir
                  </button>
                  <button class="btn btn-sm btn-secondary" (click)="downloadInvoice(invoice.id)">
                    Télécharger
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="clients-section">
          <h2>Clients et abonnements</h2>
          <div class="clients-grid">
            <div class="client-card" *ngFor="let client of clients">
              <div class="client-header">
                <h4>{{ client.name }}</h4>
                <span class="plan" [class]="'plan-' + client.plan">{{ client.plan }}</span>
              </div>
              <div class="client-info">
                <p><strong>Email:</strong> {{ client.email }}</p>
                <p><strong>Prochaine facture:</strong> {{ client.nextBilling }}</p>
                <p><strong>Montant:</strong> {{ client.amount }}€/mois</p>
              </div>
              <div class="client-actions">
                <button class="btn btn-sm btn-outline" (click)="viewClient(client.id)">
                  Voir détails
                </button>
                <button class="btn btn-sm btn-primary" (click)="manageSubscription(client.id)">
                  Gérer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .billing-container {
      padding: 2rem;
    }
    
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }
    
    .header-actions {
      display: flex;
      gap: 1rem;
    }
    
    .billing-summary {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }
    
    .summary-card {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      text-align: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      border: 1px solid #e0e0e0;
    }
    
    .summary-card h3 {
      margin: 0 0 0.5rem 0;
      color: #666;
      font-size: 0.9rem;
      text-transform: uppercase;
    }
    
    .amount {
      font-size: 2rem;
      font-weight: bold;
      color: #007bff;
    }
    
    .billing-content {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 2rem;
    }
    
    .invoices-section, .clients-section {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      border: 1px solid #e0e0e0;
    }
    
    .invoices-section h2, .clients-section h2 {
      margin: 0 0 1rem 0;
      color: #333;
    }
    
    .invoices-table {
      margin-top: 1rem;
    }
    
    .table-header {
      display: grid;
      grid-template-columns: 120px 1fr 100px 120px 100px 150px;
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
      grid-template-columns: 120px 1fr 100px 120px 100px 150px;
      padding: 0.75rem;
      border-bottom: 1px solid #f0f0f0;
      align-items: center;
    }
    
    .status {
      padding: 0.25rem 0.5rem;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: bold;
      text-transform: uppercase;
    }
    
    .status-paid {
      background: #d4edda;
      color: #155724;
    }
    
    .status-pending {
      background: #fff3cd;
      color: #856404;
    }
    
    .status-overdue {
      background: #f8d7da;
      color: #721c24;
    }
    
    .actions {
      display: flex;
      gap: 0.5rem;
    }
    
    .clients-grid {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-top: 1rem;
    }
    
    .client-card {
      background: #f8f9fa;
      border-radius: 4px;
      padding: 1rem;
      border: 1px solid #e0e0e0;
    }
    
    .client-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }
    
    .client-header h4 {
      margin: 0;
      color: #333;
    }
    
    .plan {
      padding: 0.25rem 0.5rem;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: bold;
      text-transform: uppercase;
    }
    
    .plan-basic {
      background: #d1ecf1;
      color: #0c5460;
    }
    
    .plan-premium {
      background: #d4edda;
      color: #155724;
    }
    
    .plan-enterprise {
      background: #f8d7da;
      color: #721c24;
    }
    
    .client-info p {
      margin: 0.25rem 0;
      font-size: 0.9rem;
      color: #666;
    }
    
    .client-actions {
      display: flex;
      gap: 0.5rem;
      margin-top: 0.5rem;
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
  `]
})
export class BillingComponent {
  monthlyRevenue = 12500;
  pendingInvoices = 3200;
  activeClients = 24;
  
  invoices = [
    {
      id: 1,
      number: 'INV-2024-001',
      client: 'Club Sportif Parisien',
      amount: 500,
      date: '2024-01-15',
      status: 'paid'
    },
    {
      id: 2,
      number: 'INV-2024-002',
      client: 'Gym Central',
      amount: 300,
      date: '2024-01-20',
      status: 'pending'
    },
    {
      id: 3,
      number: 'INV-2024-003',
      client: 'Piscine Municipale',
      amount: 750,
      date: '2024-01-10',
      status: 'overdue'
    }
  ];
  
  clients = [
    {
      id: 1,
      name: 'Club Sportif Parisien',
      email: 'contact@clubparisien.fr',
      plan: 'premium',
      nextBilling: '2024-02-15',
      amount: 500
    },
    {
      id: 2,
      name: 'Gym Central',
      email: 'admin@gymcentral.fr',
      plan: 'basic',
      nextBilling: '2024-02-20',
      amount: 300
    },
    {
      id: 3,
      name: 'Piscine Municipale',
      email: 'direction@piscine-municipale.fr',
      plan: 'enterprise',
      nextBilling: '2024-02-10',
      amount: 750
    }
  ];

  generateInvoice() {
    console.log('Generating new invoice');
    // TODO: Implémenter la génération de facture
  }

  exportBilling() {
    console.log('Exporting billing data');
    // TODO: Implémenter l'export des données de facturation
  }

  viewInvoice(invoiceId: number) {
    console.log('Viewing invoice:', invoiceId);
    // TODO: Implémenter la vue de facture
  }

  downloadInvoice(invoiceId: number) {
    console.log('Downloading invoice:', invoiceId);
    // TODO: Implémenter le téléchargement
  }

  viewClient(clientId: number) {
    console.log('Viewing client:', clientId);
    // TODO: Implémenter la vue client
  }

  manageSubscription(clientId: number) {
    console.log('Managing subscription for client:', clientId);
    // TODO: Implémenter la gestion d'abonnement
  }
}
