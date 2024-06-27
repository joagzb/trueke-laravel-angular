import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service.js';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.readToken();

  req = req.clone({
    setHeaders: {
      Authorization: token ? `Bearer ${token}` : '',
      "Content-Type": 'application/json',
    }
  });

  return next(req);
};
