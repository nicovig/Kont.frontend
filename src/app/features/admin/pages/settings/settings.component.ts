import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="settings-container">
      <div class="header">
        <h1>Paramètres</h1>
      </div>
      
      <div class="settings-content">
        <div class="settings-section">
          <h2>Paramètres Généraux</h2>
          <div class="setting-item">
            <label for="establishmentName">Nom de l'établissement</label>
            <input type="text" id="establishmentName" [(ngModel)]="settings.establishmentName" 
                   class="form-input">
          </div>
          
          <div class="setting-item">
            <label for="timezone">Fuseau horaire</label>
            <select id="timezone" [(ngModel)]="settings.timezone" class="form-select">
              <option value="Europe/Paris">Europe/Paris</option>
              <option value="Europe/London">Europe/London</option>
              <option value="America/New_York">America/New_York</option>
            </select>
          </div>
          
          <div class="setting-item">
            <label for="language">Langue</label>
            <select id="language" [(ngModel)]="settings.language" class="form-select">
              <option value="fr">Français</option>
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </div>
        </div>
        
        <div class="settings-section">
          <h2>Notifications</h2>
          <div class="setting-item">
            <label class="checkbox-label">
              <input type="checkbox" [(ngModel)]="settings.emailNotifications">
              <span class="checkmark"></span>
              Notifications par email
            </label>
          </div>
          
          <div class="setting-item">
            <label class="checkbox-label">
              <input type="checkbox" [(ngModel)]="settings.pushNotifications">
              <span class="checkmark"></span>
              Notifications push
            </label>
          </div>
          
          <div class="setting-item">
            <label for="notificationEmail">Email de notification</label>
            <input type="email" id="notificationEmail" [(ngModel)]="settings.notificationEmail" 
                   class="form-input">
          </div>
        </div>
        
        <div class="settings-section">
          <h2>Sécurité</h2>
          <div class="setting-item">
            <label for="currentPassword">Mot de passe actuel</label>
            <input type="password" id="currentPassword" [(ngModel)]="passwordForm.currentPassword" 
                   class="form-input">
          </div>
          
          <div class="setting-item">
            <label for="newPassword">Nouveau mot de passe</label>
            <input type="password" id="newPassword" [(ngModel)]="passwordForm.newPassword" 
                   class="form-input">
          </div>
          
          <div class="setting-item">
            <label for="confirmPassword">Confirmer le mot de passe</label>
            <input type="password" id="confirmPassword" [(ngModel)]="passwordForm.confirmPassword" 
                   class="form-input">
          </div>
          
          <button class="btn btn-primary" (click)="changePassword()">
            Changer le mot de passe
          </button>
        </div>
        
        <div class="settings-section">
          <h2>Données</h2>
          <div class="setting-item">
            <button class="btn btn-secondary" (click)="exportData()">
              Exporter les données
            </button>
            <p class="help-text">Téléchargez une copie de toutes vos données</p>
          </div>
          
          <div class="setting-item">
            <button class="btn btn-danger" (click)="deleteAccount()">
              Supprimer le compte
            </button>
            <p class="help-text danger">Cette action est irréversible</p>
          </div>
        </div>
      </div>
      
      <div class="actions">
        <button class="btn btn-primary" (click)="saveSettings()">
          Sauvegarder
        </button>
        <button class="btn btn-outline" (click)="resetSettings()">
          Réinitialiser
        </button>
      </div>
    </div>
  `,
  styles: [`
    .settings-container {
      padding: 2rem;
      max-width: 800px;
    }
    
    .header {
      margin-bottom: 2rem;
    }
    
    .settings-content {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
    
    .settings-section {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      border: 1px solid #e0e0e0;
    }
    
    .settings-section h2 {
      margin: 0 0 1.5rem 0;
      color: #333;
      border-bottom: 2px solid #007bff;
      padding-bottom: 0.5rem;
    }
    
    .setting-item {
      margin-bottom: 1.5rem;
    }
    
    .setting-item label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #333;
    }
    
    .form-input, .form-select {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }
    
    .form-input:focus, .form-select:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
    }
    
    .checkbox-label {
      display: flex !important;
      align-items: center;
      cursor: pointer;
    }
    
    .checkbox-label input[type="checkbox"] {
      margin-right: 0.5rem;
    }
    
    .help-text {
      margin: 0.5rem 0 0 0;
      font-size: 0.9rem;
      color: #666;
    }
    
    .help-text.danger {
      color: #dc3545;
    }
    
    .btn {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      text-decoration: none;
      display: inline-block;
      text-align: center;
      font-size: 1rem;
      margin-right: 1rem;
    }
    
    .btn-primary {
      background: #007bff;
      color: white;
    }
    
    .btn-secondary {
      background: #6c757d;
      color: white;
    }
    
    .btn-outline {
      background: transparent;
      color: #007bff;
      border: 1px solid #007bff;
    }
    
    .btn-danger {
      background: #dc3545;
      color: white;
    }
    
    .actions {
      margin-top: 2rem;
      padding-top: 2rem;
      border-top: 1px solid #e0e0e0;
      text-align: right;
    }
  `]
})
export class SettingsComponent {
  settings = {
    establishmentName: 'Mon Établissement',
    timezone: 'Europe/Paris',
    language: 'fr',
    emailNotifications: true,
    pushNotifications: false,
    notificationEmail: 'admin@etablissement.com'
  };
  
  passwordForm = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  saveSettings() {
    console.log('Saving settings:', this.settings);
    // TODO: Implémenter la sauvegarde des paramètres
  }

  resetSettings() {
    console.log('Resetting settings');
    // TODO: Implémenter la réinitialisation
  }

  changePassword() {
    if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    
    console.log('Changing password');
    // TODO: Implémenter le changement de mot de passe
  }

  exportData() {
    console.log('Exporting data');
    // TODO: Implémenter l'export des données
  }

  deleteAccount() {
    if (confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
      console.log('Deleting account');
      // TODO: Implémenter la suppression du compte
    }
  }
}
