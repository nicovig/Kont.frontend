import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Subscription } from '../../../../../models';

@Component({
  selector: 'app-god-subscriptions-list',
  standalone: true,
  imports: [CommonModule, RouterModule, MatTableModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './subscriptions-list.component.html',
  styleUrls: ['./subscriptions-list.component.css']
})
export class GodSubscriptionsListComponent {
  @Input() subscriptions: Subscription[] = [];
  @Input() loading = false;
  @Input() error: string | null = null;
  @Output() delete = new EventEmitter<string>();
  @Output() open = new EventEmitter<string>();

  displayedColumns: string[] = ['type', 'paidAt', 'expiresAt', 'actions'];
  dataSource = new MatTableDataSource<Subscription>([]);

  ngOnChanges() { this.dataSource.data = this.subscriptions ?? []; }

  confirmDelete(id: string) { if (confirm('Supprimer cet abonnement ?')) this.delete.emit(id); }
}


