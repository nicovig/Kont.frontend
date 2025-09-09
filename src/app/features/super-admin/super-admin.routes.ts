import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'establishments',
    loadComponent: () => import('./pages/establishments/establishments.component').then(m => m.EstablishmentsComponent)
  },
  {
    path: 'establishments/:id',
    loadComponent: () => import('./pages/establishment-detail/establishment-detail.component').then(m => m.EstablishmentDetailComponent)
  },
  {
    path: 'monitoring',
    loadComponent: () => import('./pages/monitoring/monitoring.component').then(m => m.MonitoringComponent)
  },
  {
    path: 'billing',
    loadComponent: () => import('./pages/billing/billing.component').then(m => m.BillingComponent)
  }
];

