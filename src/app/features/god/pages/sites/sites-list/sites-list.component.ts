import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource } from '@angular/material/table';
import { Site } from '../../../../../models';

@Component({
  selector: 'app-god-sites-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatTableModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule],
  templateUrl: './sites-list.component.html',
  styleUrls: ['./sites-list.component.css']
})
export class GodSitesListComponent {
  @Input() sites: Site[] = [];
  @Input() loading = false;
  @Input() error: string | null = null;
  @Output() delete = new EventEmitter<string>();
  @Output() open = new EventEmitter<string>();

  query = '';

  displayedColumns: string[] = ['name', 'address', 'city', 'country', 'actions'];
  dataSource = new MatTableDataSource<Site>([]);

  ngOnChanges() {
    this.dataSource.data = this.sites ?? [];
    this.applyFilter(this.query);
  }

  confirmDelete(id: string) {
    if (confirm('Supprimer ce site ?')) {
      this.delete.emit(id);
    }
  }

  applyFilter(value: string) {
    this.query = value;
    this.dataSource.filterPredicate = (data: Site, filter: string) => {
      const q = filter.toLowerCase();
      return (
        (data.name?.toLowerCase().includes(q)) ||
        (data.address?.toLowerCase().includes(q)) ||
        (data.city?.toLowerCase().includes(q)) ||
        (data.zipCode?.toLowerCase().includes(q)) ||
        (data.country?.toLowerCase().includes(q))
      );
    };
    this.dataSource.filter = value.trim().toLowerCase();
  }
}


