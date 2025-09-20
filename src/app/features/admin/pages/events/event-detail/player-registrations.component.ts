import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PlayerRegistration, PlayerType } from '../../../../models/player-registration.model';
import { AdminService } from '../../../services/admin.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-player-registrations',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatTooltipModule,
    MatProgressSpinnerModule
  ],
  template: `
    <mat-card class="mt-6">
      <mat-card-header>
        <mat-card-title>
          <mat-icon>people</mat-icon>
          Joueurs inscrits ({{ playerRegistrations.length }})
        </mat-card-title>
      </mat-card-header>
      
      <mat-card-content>
        <div *ngIf="loading" class="flex justify-center p-4">
          <mat-spinner diameter="40"></mat-spinner>
        </div>
        
        <div *ngIf="!loading && playerRegistrations.length === 0" class="text-center p-8 text-gray-500">
          <mat-icon class="text-6xl mb-4">person_off</mat-icon>
          <p>Aucun joueur inscrit pour le moment</p>
        </div>
        
        <div *ngIf="!loading && playerRegistrations.length > 0" class="overflow-x-auto">
          <table mat-table [dataSource]="playerRegistrations" class="w-full">
            <!-- Nom -->
            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef>Nom</th>
              <td mat-cell *matCellDef="let player">
                <div class="flex items-center gap-2">
                  <mat-icon class="text-gray-500">person</mat-icon>
                  <span class="font-medium">{{ player.playerFirstname }} {{ player.playerLastname }}</span>
                </div>
              </td>
            </ng-container>
            
            <!-- Email -->
            <ng-container matColumnDef="email">
              <th mat-header-cell *matHeaderCellDef>Email</th>
              <td mat-cell *matCellDef="let player">
                <div class="flex items-center gap-2">
                  <mat-icon class="text-gray-500">email</mat-icon>
                  <span class="text-sm">{{ player.playerEmail }}</span>
                </div>
              </td>
            </ng-container>
            
            <!-- Username -->
            <ng-container matColumnDef="username">
              <th mat-header-cell *matHeaderCellDef>Username</th>
              <td mat-cell *matCellDef="let player">
                <span class="text-sm text-gray-600">@{{ player.playerUsername }}</span>
              </td>
            </ng-container>
            
            <!-- Type -->
            <ng-container matColumnDef="type">
              <th mat-header-cell *matHeaderCellDef>Type</th>
              <td mat-cell *matCellDef="let player">
                <mat-chip [color]="player.playerType === 'KeyPlayer' ? 'accent' : 'primary'" selected>
                  {{ player.playerType === 'KeyPlayer' ? 'Joueur clé' : 'Joueur' }}
                </mat-chip>
              </td>
            </ng-container>
            
            <!-- Inscription -->
            <ng-container matColumnDef="registeredAt">
              <th mat-header-cell *matHeaderCellDef>Inscrit le</th>
              <td mat-cell *matCellDef="let player">
                <div class="flex items-center gap-2">
                  <mat-icon class="text-gray-500">schedule</mat-icon>
                  <span class="text-sm">{{ player.registeredAt | date:'dd/MM/yyyy HH:mm' }}</span>
                </div>
              </td>
            </ng-container>
            
            <!-- Check-in -->
            <ng-container matColumnDef="checkedInAt">
              <th mat-header-cell *matHeaderCellDef>Check-in</th>
              <td mat-cell *matCellDef="let player">
                <div *ngIf="player.checkedInAt" class="flex items-center gap-2 text-green-600">
                  <mat-icon>check_circle</mat-icon>
                  <span class="text-sm">{{ player.checkedInAt | date:'dd/MM/yyyy HH:mm' }}</span>
                </div>
                <div *ngIf="!player.checkedInAt" class="flex items-center gap-2 text-gray-400">
                  <mat-icon>pending</mat-icon>
                  <span class="text-sm">En attente</span>
                </div>
              </td>
            </ng-container>
            
            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>
        </div>
      </mat-card-content>
    </mat-card>
  `
})
export class PlayerRegistrationsComponent implements OnInit, OnDestroy {
  @Input() eventId: string = '';
  
  playerRegistrations: PlayerRegistration[] = [];
  loading: boolean = false;
  displayedColumns: string[] = ['name', 'email', 'username', 'type', 'registeredAt', 'checkedInAt'];
  
  private destroy$ = new Subject<void>();

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    if (this.eventId) {
      this.loadPlayerRegistrations();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadPlayerRegistrations(): void {
    this.loading = true;
    this.adminService.getPlayerRegistrations(this.eventId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (registrations) => {
          this.playerRegistrations = registrations;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading player registrations:', error);
          this.loading = false;
        }
      });
  }

  refresh(): void {
    this.loadPlayerRegistrations();
  }
}
