import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-join',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './join.component.html'
})
export class JoinComponent {
  poolId = signal('');
  formData = signal({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    pin: ''
  });

  poolInfo = signal({
    name: 'Pool Scania - Équipe A',
    maxPlayers: 16,
    currentPlayers: 8
  });

  constructor(private readonly route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.poolId.set(params['poolId']);
    });
  }

  setFirstName(value: string) {
    this.formData.update(d => ({ ...d, firstName: value }));
  }

  setLastName(value: string) {
    this.formData.update(d => ({ ...d, lastName: value }));
  }

  setEmail(value: string) {
    this.formData.update(d => ({ ...d, email: value }));
  }

  setUsername(value: string) {
    this.formData.update(d => ({ ...d, username: value }));
  }

  setPin(value: string) {
    this.formData.update(d => ({ ...d, pin: value }));
  }

  isFormValid(): boolean {
    const data = this.formData();
    return !!(data.firstName && data.lastName && data.email && data.username && data.pin.length === 4);
  }

  joinPool(): void {
    if (this.isFormValid()) {
      // TODO: Envoyer les données au serveur
      console.log('Rejoindre pool:', this.poolId(), this.formData());
      
      // Simulation de succès - redirection vers le dashboard
      window.location.href = `/user/pool/${this.poolId()}`;
    }
  }

  showReconnectModal(): void {
    // TODO: Implémenter la modal de reconnexion
    console.log('Afficher modal de reconnexion');
  }
}
