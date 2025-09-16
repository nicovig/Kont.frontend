import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-god-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
  <div class="content">
    <section class="card">
      <h2>Bienvenue</h2>
      <p class="muted">Accédez à la supervision et la gestion des sites.</p>
    </section>
  </div>
  `,
  styles: [
    `.content{max-width:1100px;margin:20px auto;padding:0 20px;display:grid;gap:16px}`,
    `.card{background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:18px;box-shadow:0 8px 24px rgba(0,0,0,.06)}`,
    `.muted{color:#6b7280}`
  ]
})
export class GodDashboardComponent {}


