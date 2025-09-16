import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GodService } from '../../../services/god.service';
import { Subscription } from '../../../../../models';

@Component({
  selector: 'app-god-subscriptions-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subscriptions-edit.component.html',
  styleUrls: ['./subscriptions-edit.component.css']
})
export class GodSubscriptionsEditComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly godService = inject(GodService);

  sub: Partial<Subscription> = { subscriptionType: 'Klasel' as any };
  loading = false;
  error: string | null = null;
  isNew = false;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.isNew = !id;
    if (id) {
      this.loading = true;
      this.godService.getSubscription(id).subscribe({
        next: s => { this.sub = s; this.loading = false; },
        error: e => { this.error = e.message ?? 'Erreur'; this.loading = false; }
      });
    }
  }

  onSave() {
    this.loading = true;
    const action$ = this.isNew ? this.godService.createSubscription(this.sub as any) : this.godService.updateSubscription(this.sub as Subscription);
    action$.subscribe({
      next: _ => this.router.navigateByUrl('/god/subscriptions'),
      error: e => { this.error = e.message ?? 'Erreur'; this.loading = false; }
    });
  }
}


