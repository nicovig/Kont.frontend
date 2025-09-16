import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GodSitesListComponent } from './sites-list/sites-list.component';
import { GodService } from '../../services/god.service';
import { Site } from '../../../../models';

@Component({
  selector: 'app-god-sites',
  standalone: true,
  imports: [CommonModule, FormsModule, GodSitesListComponent],
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css']
})
export class GodSitesComponent implements OnInit {
  private readonly godService = inject(GodService);
  private readonly router = inject(Router);
  
  sites: Site[] = [];
  loading = false;
  error: string | null = null;
  query = '';

  form: Partial<Site> = {
    name: '', address: '', city: '', zipCode: '', country: '', state: '', phoneNumber: '', email: ''
  };

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.loading = true;
    this.error = null;
    this.godService.getSites().subscribe({
      next: s => { this.sites = s; this.loading = false; },
      error: e => { this.error = e.message ?? 'Erreur chargement'; this.loading = false; }
    });
  }

  create() {
    this.loading = true;
    this.godService.createSite(this.form as Site).subscribe({
      next: _ => { this.resetForm(); this.load(); },
      error: e => { this.error = e.message ?? 'Erreur création'; this.loading = false; }
    });
  }

  remove(id: string) {
    this.loading = true;
    this.godService.deleteSite(id).subscribe({
      next: _ => this.load(),
      error: e => { this.error = e.message ?? 'Erreur suppression'; this.loading = false; }
    });
  }

  private resetForm() {
    this.form = { name: '', address: '', city: '', zipCode: '', country: '', state: '', phoneNumber: '', email: '' };
  }

  openDetails(id: string) {
    this.router.navigateByUrl(`/god/sites/${id}`);
  }
}


