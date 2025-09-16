import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GodService } from '../../../services/god.service';
import { Administrator } from '../../../../../models';

@Component({
  selector: 'app-god-administrators-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './administrators-edit.component.html',
  styleUrls: ['./administrators-edit.component.css']
})
export class GodAdministratorsEditComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly godService = inject(GodService);

  admin: Partial<Administrator> = {};
  loading = false;
  error: string | null = null;
  isNew = false;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.isNew = !id;
    if (id) {
      this.loading = true;
      this.godService.getAdministrator(id).subscribe({
        next: a => { this.admin = a; this.loading = false; },
        error: e => { this.error = e.message ?? 'Erreur'; this.loading = false; }
      });
    }
  }

  onSave() {
    this.loading = true;
    const action$ = this.isNew ? this.godService.createAdministrator(this.admin as any) : this.godService.updateAdministrator(this.admin as Administrator);
    action$.subscribe({
      next: _ => this.router.navigateByUrl('/god/administrators'),
      error: e => { this.error = e.message ?? 'Erreur'; this.loading = false; }
    });
  }
}


