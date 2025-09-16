import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/admin',
    pathMatch: 'full'
  },
  {
    path: 'god',
    loadChildren: () => import('./features/god/admin.routes').then(m => m.routes)
  },
  // {
  //   path: 'super-admin',
  //   loadChildren: () => import('./features/super-admin/super-admin.routes').then(m => m.routes)
  // },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.routes').then(m => m.routes)
  },
  // {
  //   path: 'user',
  //   loadChildren: () => import('./features/user/user.routes').then(m => m.routes)
  // },
  {
    path: '**',
    redirectTo: '/admin'
  }
];
