import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { routesSchema } from '../config/routes.schema.js';
import { getUserResponse } from '../models/user.js';

export const isSignedInGuard: CanActivateFn = () => {
  const router = inject(Router);
  const user: getUserResponse | null = JSON.parse(localStorage.getItem('user') || 'null');

  if (user) return true;

  router.navigate([routesSchema.auth.signin]);
  return false;
};
