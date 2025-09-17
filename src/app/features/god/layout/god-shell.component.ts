import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-god-shell',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule],
  templateUrl: './god-shell.component.html',
  styleUrls: ['./god-shell.component.css']
})
export class GodShellComponent {
  private readonly router = inject(Router);

  logout() {
    // Supprimer les données de session si nécessaire
    localStorage.removeItem('token');
    sessionStorage.clear();
    
    // Rediriger vers la page de connexion
    this.router.navigateByUrl('/login');
  }
}


