import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Activity, ScoringType } from '../../../../models';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './activities.component.html'
})
export class ActivitiesComponent {
  activities: Activity[] = [
    {
      id: '1',
      name: 'Karting',
      description: 'Course de karting sur circuit',
      establishmentId: 'est1',
      scoringType: ScoringType.TIME,
      maxScore: 100,
      timeLimit: 10,
      isActive: true,
      createdAt: new Date(),
      scoringConfig: {
        pointsPerUnit: 10,
        bonusMultiplier: 1.5,
        penaltyPoints: 5,
        timeBonusThreshold: 5
      }
    },
    {
      id: '2',
      name: 'Bowling',
      description: 'Partie de bowling',
      establishmentId: 'est1',
      scoringType: ScoringType.POINTS,
      maxScore: 300,
      isActive: true,
      createdAt: new Date(),
      scoringConfig: {
        pointsPerUnit: 1,
        bonusMultiplier: 2,
        penaltyPoints: 0
      }
    },
    {
      id: '3',
      name: 'Laser Game',
      description: 'Jeu de laser tag',
      establishmentId: 'est1',
      scoringType: ScoringType.POINTS,
      maxScore: 1000,
      timeLimit: 15,
      isActive: true,
      createdAt: new Date(),
      scoringConfig: {
        pointsPerUnit: 10,
        bonusMultiplier: 1.2,
        penaltyPoints: 2
      }
    }
  ];

  createActivity() {
    console.log('Create new activity');
    // TODO: Implémenter la création d'activité
  }

  viewActivity(activityId: string) {
    console.log('View activity:', activityId);
    // TODO: Implémenter la vue détaillée
  }

  editActivity(activityId: string) {
    console.log('Edit activity:', activityId);
    // TODO: Implémenter l'édition
  }

  deleteActivity(activityId: string) {
    console.log('Delete activity:', activityId);
    // TODO: Implémenter la suppression
  }
}
