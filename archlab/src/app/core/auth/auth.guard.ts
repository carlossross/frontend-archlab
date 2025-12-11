import { inject } from '@angular/core';
import { CanMatchFn, Router, UrlTree } from '@angular/router';
import { AuthStore } from './auth.store';

export const authGuard: CanMatchFn = () => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  const isAuthenticated = authStore.isAuthenticated(); // computed signal

  if (isAuthenticated) {
    return true;
  }

  // Si no está autenticado, lo mandamos a /login
  return router.createUrlTree(['/login']) as UrlTree;
};
