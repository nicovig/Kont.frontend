import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Establishment, SubscriptionPlan, SubscriptionStatus } from '../../../../models';

@Component({
  selector: 'app-establishments',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-50">
      <nav class="bg-white shadow-sm border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex items-center">
              <a routerLink="/super-admin" class="text-blue-600 hover:text-blue-800 mr-4">← Retour</a>
              <h1 class="text-xl font-bold text-gray-900">Gestion des Établissements</h1>
            </div>
            <div class="flex items-center space-x-4">
              <button (click)="openCreateModal()" 
                      class="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                Nouvel Établissement
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="px-4 py-6 sm:px-0">
          <div class="mb-6">
            <div class="flex items-center justify-between">
              <h2 class="text-2xl font-bold text-gray-900">Établissements ({{ establishments().length }})</h2>
              <div class="flex items-center space-x-4">
                <input type="text" 
                       placeholder="Rechercher un établissement..."
                       class="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <select class="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Tous les plans</option>
                  <option value="derau">Deraou</option>
                  <option value="klasel">Klasel</option>
                  <option value="stroll">Stroll</option>
                </select>
              </div>
            </div>
          </div>

          <div class="bg-white shadow overflow-hidden sm:rounded-md">
            <ul class="divide-y divide-gray-200">
              @for (establishment of establishments(); track establishment.id) {
                <li>
                  <div class="px-4 py-4 sm:px-6 hover:bg-gray-50">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center">
                        <div class="flex-shrink-0">
                          <div class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <span class="text-sm font-medium text-gray-700">
                              {{ establishment.name.charAt(0).toUpperCase() }}
                            </span>
                          </div>
                        </div>
                        <div class="ml-4">
                          <div class="flex items-center">
                            <p class="text-sm font-medium text-gray-900">{{ establishment.name }}</p>
                            <span class="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                                  [ngClass]="getStatusClass(establishment.subscription.status)">
                              {{ getStatusText(establishment.subscription.status) }}
                            </span>
                          </div>
                          <div class="mt-1">
                            <p class="text-sm text-gray-500">{{ establishment.address }}</p>
                            <p class="text-sm text-gray-500">{{ establishment.contactEmail }}</p>
                          </div>
                        </div>
                      </div>
                      <div class="flex items-center space-x-4">
                        <div class="text-right">
                          <p class="text-sm font-medium text-gray-900">{{ getPlanText(establishment.subscription.plan) }}</p>
                          <p class="text-sm text-gray-500">{{ establishment.subscription.price }}€/mois</p>
                        </div>
                        <div class="flex items-center space-x-2">
                          <a [routerLink]="['/super-admin/establishments', establishment.id]"
                             class="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            Voir détails
                          </a>
                          <button (click)="toggleStatus(establishment.id)"
                                  [class]="establishment.isActive ? 'text-red-600 hover:text-red-800' : 'text-green-600 hover:text-green-800'"
                                  class="text-sm font-medium">
                            {{ establishment.isActive ? 'Suspendre' : 'Activer' }}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  `
})
export class EstablishmentsComponent {
  establishments = signal<Establishment[]>([
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
        plan: SubscriptionPlan.KLASEL,
        status: SubscriptionStatus.ACTIVE,
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
    },
    {
      id: '2',
      name: 'Laser Game Arena',
      address: '456 Avenue du Laser, 69000 Lyon',
      ipAddress: '192.168.1.101',
      contactEmail: 'info@laserarena.fr',
      contactPhone: '04 56 78 90 12',
      subscription: {
        id: 'sub2',
        establishmentId: '2',
        plan: SubscriptionPlan.DERAU,
        status: SubscriptionStatus.ACTIVE,
        monthlyPoolsLimit: 3,
        currentMonthPools: 2,
        startDate: new Date('2024-02-01'),
        endDate: new Date('2024-12-31'),
        price: 250,
        autoRenew: true
      },
      admins: ['admin2'],
      delegates: [],
      isActive: true,
      createdAt: new Date('2024-02-01'),
      lastActivity: new Date()
    }
  ]);

  getStatusClass(status: SubscriptionStatus): string {
    switch (status) {
      case SubscriptionStatus.ACTIVE:
        return 'bg-green-100 text-green-800';
      case SubscriptionStatus.SUSPENDED:
        return 'bg-yellow-100 text-yellow-800';
      case SubscriptionStatus.CANCELLED:
        return 'bg-red-100 text-red-800';
      case SubscriptionStatus.EXPIRED:
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getStatusText(status: SubscriptionStatus): string {
    switch (status) {
      case SubscriptionStatus.ACTIVE:
        return 'Actif';
      case SubscriptionStatus.SUSPENDED:
        return 'Suspendu';
      case SubscriptionStatus.CANCELLED:
        return 'Annulé';
      case SubscriptionStatus.EXPIRED:
        return 'Expiré';
      default:
        return 'Inconnu';
    }
  }

  getPlanText(plan: SubscriptionPlan): string {
    switch (plan) {
      case SubscriptionPlan.DERAU:
        return 'Deraou (3 pools/mois)';
      case SubscriptionPlan.KLASEL:
        return 'Klasel (Illimité)';
      case SubscriptionPlan.STROLL:
        return 'Stroll (Multi-sites)';
      default:
        return 'Inconnu';
    }
  }

  openCreateModal(): void {
    // TODO: Implémenter la modal de création
    console.log('Ouvrir modal de création');
  }

  toggleStatus(establishmentId: string): void {
    // TODO: Implémenter le toggle de statut
    console.log('Toggle status for:', establishmentId);
  }
}

