import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import * as AdminActions from '../store/admin.actions';

@Component({
  selector: 'app-admin-shell',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule],
  templateUrl: './admin-shell.component.html',
  styleUrls: ['./admin-shell.component.css']
})
export class AdminShellComponent {
  private readonly router = inject(Router);
  private readonly store = inject(Store);

  logout() {
    // Supprimer les données de session
    localStorage.removeItem('admin');
    sessionStorage.clear();
    
    // Dispatch logout action
    this.store.dispatch(AdminActions.logoutAdmin());
    
    // Rediriger vers la page de connexion
    this.router.navigateByUrl('/admin/login');
  }
}
