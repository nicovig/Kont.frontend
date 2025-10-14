import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { selectIsPlayerAuthenticated } from '../store/player-auth.selectors';

export const playerAuthGuard = () => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectIsPlayerAuthenticated).pipe(
    map(authenticated => {
      if (!authenticated) {
        router.navigate(['/player/login']);
        return false;
      }
      return true;
    })
  );
};
