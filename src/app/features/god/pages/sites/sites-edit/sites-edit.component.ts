import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { GodSiteFormComponent } from '../site-form/site-form.component';
import { GodService } from '../../../services/god.service';
import { Site } from '../../../../../models';

@Component({
  selector: 'app-god-sites-edit',
  standalone: true,
  imports: [CommonModule, GodSiteFormComponent],
  templateUrl: './sites-edit.component.html',
  styleUrls: ['./sites-edit.component.css']
})
export class GodSitesEditComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly godService = inject(GodService);

  site: Site | null = null;
  loading = false;
  error: string | null = null;
  isNew = false;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.isNew = !id;
    if (id) {
      this.loading = true;
      this.godService.getSite(id).subscribe({
        next: s => { this.site = s; this.loading = false; },
        error: e => { this.error = e.message ?? 'Erreur'; this.loading = false; }
      });
    }
  }

  onSave(site: Site) {
    this.loading = true;
    const payload = this.isNew ? site : { ...site, id: this.site?.id } as Site;
    const action$ = this.isNew ? this.godService.createSite(payload) : this.godService.updateSite(payload);
    action$.subscribe({
      next: _ => this.router.navigateByUrl('/god/sites'),
      error: e => { this.error = e.message ?? 'Erreur'; this.loading = false; }
    });
  }
}


