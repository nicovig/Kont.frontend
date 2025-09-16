import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GodService } from '../../services/god.service';
import { Administrator } from '../../../../models';
import { GodAdministratorsListComponent } from './administrators-list/administrators-list.component';

@Component({
  selector: 'app-god-administrators',
  standalone: true,
  imports: [CommonModule, FormsModule, GodAdministratorsListComponent],
  templateUrl: './administrators.component.html',
  styleUrls: ['./administrators.component.css']
})
export class GodAdministratorsComponent implements OnInit {
  private readonly godService = inject(GodService);
  private readonly router = inject(Router);

  administrators: Administrator[] = [];
  loading = false;
  error: string | null = null;

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.loading = true;
    this.error = null;
    this.godService.getAdministrators().subscribe({
      next: a => { this.administrators = a; this.loading = false; },
      error: e => { this.error = e.message ?? 'Erreur chargement'; this.loading = false; }
    });
  }

  remove(id: string) {
    if (!confirm('Supprimer cet administrateur ?')) return;
    this.loading = true;
    this.godService.deleteAdministrator(id).subscribe({
      next: _ => this.load(),
      error: e => { this.error = e.message ?? 'Erreur suppression'; this.loading = false; }
    });
  }

  openDetails(id: string) {
    this.router.navigate(['/god/administrators', id]);
  }
}


