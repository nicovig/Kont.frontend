import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Pool, PoolStatus } from '../../../../models';

@Component({
  selector: 'app-pools',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pools.component.html'
})
export class PoolsComponent {
  pools: Pool[] = [
    {
      id: '1',
      name: 'Team Building Scania - Janvier 2024',
      description: 'Évènement team building pour l\'équipe Scania',
      eventInfo: {
        companyName: 'Scania',
        eventDate: new Date('2024-01-15'),
        expectedDuration: 180,
        location: 'Parc de Jeux Scania'
      },
      status: PoolStatus.IN_PROGRESS,
      maxPlayers: 24,
      currentPlayers: 18,
      activities: [],
      referents: ['ref1', 'ref2'],
      qrCode: '',
      establishmentId: '',
      adminId: '',
      groups: [],
      createdAt: new Date()
    },
    {
      id: '2',
      name: 'Team Building Renault - Février 2024',
      description: 'Évènement team building pour l\'équipe Renault',
      eventInfo: {
        companyName: 'Renault',
        eventDate: new Date('2024-02-20'),
        expectedDuration: 240,
        location: 'Parc de Jeux Renault'
      },
      status: PoolStatus.WAITING_PLAYERS,
      maxPlayers: 16,
      currentPlayers: 12,
      activities: [],
      referents: ['ref3'],
      qrCode: '',
      establishmentId: '',
      adminId: '',
      groups: [],
      createdAt: new Date()
    }
  ];

  editPool(poolId: string) {
    console.log('Edit pool:', poolId);
    // TODO: Implémenter la logique d'édition
  }
}
