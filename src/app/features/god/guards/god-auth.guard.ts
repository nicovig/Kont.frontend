import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { selectCurrentGod } from '../store/god.selector';

export const godAuthGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);
  return store.select(selectCurrentGod).pipe(
    map(user => (user ? true : router.parseUrl('/god')))
  );
};


