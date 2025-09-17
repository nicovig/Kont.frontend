import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { GodService } from '../../../services/god.service';
import { CreateAdministratorRequest } from '../../../services/request-models/administrator.model';
import { Administrator, Site, Role, SubscriptionType } from '../../../../../models';

@Component({
  selector: 'app-god-administrators-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule, MatCheckboxModule, MatInputModule, MatButtonModule, MatSlideToggleModule],
  templateUrl: './administrators-edit.component.html',
  styleUrls: ['./administrators-edit.component.css']
})
export class GodAdministratorsEditComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly godService = inject(GodService);

  admin: Partial<Administrator> = { isActive: true };
  loading = false;
  error: string | null = null;
  isNew = false;
  sites: Site[] = [];
  roles: Role[] = [];
  subscriptionTypes = Object.values(SubscriptionType);
  selectedSubscriptionType: SubscriptionType = SubscriptionType.Klasel;

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

    this.godService.getSites().subscribe({ next: s => this.sites = s });
    this.godService.getAdministratorRoles().subscribe({ next: r => {
      this.roles = r;
      if (this.isNew && !this.admin.role && this.roles.length > 0) {
        // Par défaut, sélectionner le rôle "Admin"
        const adminRole = this.roles.find(role => role.roleType === 'Admin') || this.roles[0];
        this.admin.role = adminRole;
      }
    }});
  }

  onSave() {
    this.loading = true;
    if (this.isNew) {
      const createRequest: CreateAdministratorRequest = {
        firstname: this.admin.firstname!,
        lastname: this.admin.lastname!,
        email: this.admin.email!,
        password: this.admin.password!,
        phoneNumber: this.admin.phoneNumber!,
        sites: this.admin.sites || [],
        role: this.admin.role!,
        isActive: this.admin.isActive ?? true,
        subscriptionType: this.selectedSubscriptionType
      };
      this.godService.createAdministrator(createRequest).subscribe({
        next: _ => this.router.navigateByUrl('/god/administrators'),
        error: e => { this.error = e.message ?? 'Erreur'; this.loading = false; }
      });
    } else {
      // Pour l'édition, ne pas envoyer le mot de passe s'il est vide
      const updateData: any = { ...this.admin };
      if (!this.admin.password || this.admin.password.trim() === '') {
        delete updateData.password;
      }
      this.godService.updateAdministrator(updateData as Administrator).subscribe({
        next: _ => this.router.navigateByUrl('/god/administrators'),
        error: e => { this.error = e.message ?? 'Erreur'; this.loading = false; }
      });
    }
  }

  toggleSite(site: Site, checked: boolean) {
    const current = (this.admin.sites || []).slice();
    if (checked) {
      if (!current.find(s => s.id === site.id)) current.push(site);
    } else {
      const idx = current.findIndex(s => s.id === site.id);
      if (idx >= 0) current.splice(idx, 1);
    }
    this.admin.sites = current;
  }

  setRole(roleIdOrType: any) {
    const found = this.roles.find(x => x.id === roleIdOrType) || this.roles.find(x => x.roleType === roleIdOrType);
    if (found) this.admin.role = found;
  }

  hasSite(site: Site): boolean {
    return (this.admin.sites || []).some(x => x.id === site.id);
  }
}


