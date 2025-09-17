import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="events-container">
      <h1>Événements</h1>
      <div class="coming-soon">
        <p>Cette fonctionnalité sera bientôt disponible.</p>
        <p>L'endpoint backend pour les événements n'est pas encore implémenté.</p>
      </div>
    </div>
  `,
  styles: [`
    .events-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .coming-soon {
      background: #f8f9fa;
      border: 1px solid #dee2e6;
      border-radius: 8px;
      padding: 40px;
      text-align: center;
      margin-top: 20px;
    }
    
    .coming-soon p {
      margin: 10px 0;
      color: #6c757d;
    }
  `]
})
export class EventsComponent {
}
