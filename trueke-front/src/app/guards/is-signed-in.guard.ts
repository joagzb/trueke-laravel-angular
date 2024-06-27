import { CanActivateFn, Router } from '@angular/router';
import {getUserResponse} from '../models/user.js';
import {routesSchema} from '../config/routes.schema.js';
import {inject} from '@angular/core';

export const isSignedInGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const user: getUserResponse | null = JSON.parse(localStorage.getItem('user') || 'null');
  if (user) {
    return true;
  }
  return false;
  router.navigate([routesSchema.auth.signin]);
};
