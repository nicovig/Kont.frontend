import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Administrator } from '../../../../../models';

@Component({
  selector: 'app-god-administrators-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatTableModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './administrators-list.component.html',
  styleUrls: ['./administrators-list.component.css']
})
export class GodAdministratorsListComponent {
  @Input() administrators: Administrator[] = [];
  @Input() loading = false;
  @Input() error: string | null = null;
  @Output() delete = new EventEmitter<string>();
  @Output() open = new EventEmitter<string>();

  query = '';
  displayedColumns: string[] = ['name', 'email', 'phone', 'role', 'actions'];
  dataSource = new MatTableDataSource<Administrator>([]);

  ngOnChanges() {
    this.dataSource.data = this.administrators ?? [];
    this.applyFilter(this.query);
  }

  applyFilter(value: string) {
    this.query = value;
    this.dataSource.filterPredicate = (data: Administrator, filter: string) => {
      const q = filter.toLowerCase();
      return (
        (data.firstname?.toLowerCase().includes(q)) ||
        (data.lastname?.toLowerCase().includes(q)) ||
        (data.email?.toLowerCase().includes(q)) ||
        (data.phoneNumber?.toLowerCase().includes(q))
      );
    };
    this.dataSource.filter = value.trim().toLowerCase();
  }

  confirmDelete(id: string) {
    if (confirm('Supprimer cet administrateur ?')) {
      this.delete.emit(id);
    }
  }
}


