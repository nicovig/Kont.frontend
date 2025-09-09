import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-score-entry',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './score-entry.component.html',
  
})
export class ScoreEntryComponent {
  poolId = signal('');
  activityId = signal('');
  
  scoreData = signal({
    score: 0,
    bonus: 0,
    notes: ''
  });

  activityInfo = signal({
    id: '1',
    name: 'Karting',
    description: 'Course de karting sur circuit - Temps le plus rapide gagne',
    scoringType: 'time',
    maxScore: 100,
    timeLimit: 300
  });

  constructor(private readonly route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.poolId.set(params['poolId']);
      this.activityId.set(params['activityId']);
    });
  }

  setScore(value: number) {
    this.scoreData.update(d => ({ ...d, score: Number(value) }));
  }

  setBonus(value: number) {
    this.scoreData.update(d => ({ ...d, bonus: Number(value) }));
  }

  setNotes(value: string) {
    this.scoreData.update(d => ({ ...d, notes: value }));
  }

  getScoreLabel(): string {
    switch (this.activityInfo().scoringType) {
      case 'time':
        return 'Temps (secondes)';
      case 'time_with_bonus':
        return 'Temps (secondes)';
      case 'points':
        return 'Points';
      case 'percentage':
        return 'Pourcentage';
      default:
        return 'Score';
    }
  }

  getMinScore(): number {
    return 0;
  }

  getMaxScore(): number {
    return this.activityInfo().maxScore || 100;
  }

  getScoreHelp(): string {
    switch (this.activityInfo().scoringType) {
      case 'time':
        return 'Saisissez votre temps en secondes (ex: 120 pour 2 minutes)';
      case 'time_with_bonus':
        return 'Saisissez votre temps en secondes, les bonus seront ajoutés automatiquement';
      case 'points':
        return 'Saisissez votre nombre de points';
      case 'percentage':
        return 'Saisissez votre pourcentage (0-100)';
      default:
        return 'Saisissez votre score';
    }
  }

  getEstimatedScore(): number {
    const score = this.scoreData().score;
    const bonus = this.scoreData().bonus || 0;
    
    if (this.activityInfo().scoringType === 'time') {
      // Pour le temps, plus c'est rapide, plus le score est élevé
      const maxTime = this.activityInfo().timeLimit || 300;
      return Math.max(0, Math.round((maxTime - score) / maxTime * 100));
    }
    
    return score + bonus;
  }

  getEstimatedPercentage(): number {
    const estimatedScore = this.getEstimatedScore();
    const maxScore = this.activityInfo().maxScore || 100;
    return Math.min(100, Math.round((estimatedScore / maxScore) * 100));
  }

  isScoreValid(): boolean {
    const score = this.scoreData().score;
    return score >= this.getMinScore() && score <= this.getMaxScore();
  }

  submitScore(): void {
    if (this.isScoreValid()) {
      // TODO: Envoyer le score au serveur
      console.log('Soumettre score:', this.scoreData());
      
      // Simulation de succès - redirection vers le dashboard
      window.location.href = `/user/pool/${this.poolId()}`;
    }
  }

  goBack(): void {
    window.location.href = `/user/pool/${this.poolId()}`;
  }
}
