import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GodService } from '../../services/god.service';
import { Subscription } from '../../../../models';
import { GodSubscriptionsListComponent } from './subscriptions-list/subscriptions-list.component';

@Component({
  selector: 'app-god-subscriptions',
  standalone: true,
  imports: [CommonModule, GodSubscriptionsListComponent],
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class GodSubscriptionsComponent implements OnInit {
  private readonly godService = inject(GodService);
  private readonly router = inject(Router);

  subscriptions: Subscription[] = [];
  loading = false;
  error: string | null = null;

  ngOnInit(): void { this.load(); }

  load() {
    this.loading = true;
    this.godService.getSubscriptions().subscribe({
      next: s => { this.subscriptions = s; this.loading = false; },
      error: e => { this.error = e.message ?? 'Erreur'; this.loading = false; }
    });
  }

  remove(id: string) {
    if (!confirm('Supprimer cet abonnement ?')) return;
    this.loading = true;
    this.godService.deleteSubscription(id).subscribe({
      next: _ => this.load(),
      error: e => { this.error = e.message ?? 'Erreur'; this.loading = false; }
    });
  }

  openDetails(id: string) { this.router.navigate(['/god/subscriptions', id]); }
}


