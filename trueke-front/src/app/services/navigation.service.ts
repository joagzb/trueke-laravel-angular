import { Injectable } from '@angular/core';
import {routesSchema} from '../config/routes.schema.js';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  routes = routesSchema;

  constructor(private router:Router) { }

  navigateTo(route: string, args?: string[]) {
    const resolvedRoute = this.resolveDynamicRoute(route, args ?? []);
    this.router.navigate([resolvedRoute]);
  }

  private resolveDynamicRoute(route: string, args: string[]): string {
    const subUrls = route.split('/');
    const url = subUrls.reduce((previous, current) => {
      if (current.startsWith(':')) {
        return previous + (args.pop() ?? '') + '/';
      } else {
        return previous + current + '/';
      }
    }, '');

    return url;
  }
}
