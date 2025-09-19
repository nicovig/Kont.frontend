# Intégration Frontend - Envoi de QR Codes par Email

## Vue d'ensemble
Cette intégration ajoute la fonctionnalité d'envoi de QR codes par email dans l'interface d'administration des événements.

## Architecture NgRx

### Actions
- `sendQRCodeToEmailList` - Déclenche l'envoi des QR codes
- `sendQRCodeToEmailListSuccess` - Succès de l'envoi
- `sendQRCodeToEmailListFailure` - Échec de l'envoi

### Effects
- `sendQRCodeToEmailList$` - Gère l'appel API et les actions de succès/échec

### Reducers
- Gestion des états de succès/erreur pour les notifications

## Composants

### EventDetailComponent
- **Bouton "📧 Envoyer QR Codes"** dans la page de détail d'événement
- **Prompt simple** pour saisir les emails
- **Validation** des emails en temps réel
- **Notifications** de succès/erreur

## Services

### AdminService
```typescript
sendQRCodeToEmailList(eventId: string, emails: string[]): Observable<{ message: string }>
```

### NotificationService (Core)
- `showSuccess(message)` - Notification de succès
- `showError(message)` - Notification d'erreur
- `showInfo(message)` - Notification d'information

## Flux d'utilisation

1. **Administrator** ouvre la page de détail d'un événement
2. **Clic** sur le bouton "📧 Envoyer QR Codes"
3. **Prompt** s'ouvre pour saisir les emails
4. **Saisie** des adresses email séparées par des virgules
5. **Validation** automatique des emails
6. **Envoi** automatique si validation OK
7. **Appel API** via NgRx effect
8. **Notification** de succès/erreur

## Validation

### Emails
- Format email valide (regex)
- Séparation par virgules
- Au moins un email requis
- Validation en temps réel

## Styles

### Notifications
- **Succès** : Vert (#4caf50)
- **Erreur** : Rouge (#f44336)
- **Info** : Bleu (#2196f3)

### Interface
- Prompt simple et rapide
- Validation en temps réel
- Feedback immédiat

## Intégration

### Imports nécessaires
```typescript
import { NotificationService } from '../../../../core/services/notification.service';
```

### Dépendances
- Angular Material
- NgRx Store
- RxJS

## Tests

### Composants à tester
- `EventDetailComponent.onSendQRCode()`
- `NotificationService` (affichage des messages)

### Scénarios
- Envoi réussi avec notification
- Erreur d'envoi avec notification
- Validation des emails
- Gestion des emails invalides
