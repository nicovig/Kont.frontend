import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as AdminSelectors from '../store/admin.selectors';

export const authGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);
  return store.select(AdminSelectors.selectCurrentAdmin).pipe(
    map(user => {
      if (user) {
        return true;
      }
      return router.parseUrl('/admin/login');
    })
  );
};



