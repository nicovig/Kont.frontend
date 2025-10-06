export type KnownStatus = 'Pending' | 'Active' | 'Completed' | 'Cancelled';

export function toFrenchStatusLabel(status: string): string {
  switch (status as KnownStatus) {
    case 'Pending': return 'Prévu';
    case 'Active': return 'En cours';
    case 'Completed': return 'Terminé';
    case 'Cancelled': return 'Annulé';
    default: return status;
  }
}


