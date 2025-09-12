import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
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
