import { Directive, OnInit, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import {routesSchema} from '../config/routes.schema.js';
import {Subscription} from 'rxjs';
@Directive({
  selector: '[HideWhenSigningIn]',
  standalone: true
})
export class HideWhenSigningInDirective implements OnInit, OnDestroy {
  private hideElement = false;
  private navigationSubscription?: Subscription;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.navigationSubscription = this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Check if the current route is the login route
      this.hideElement = event.url.includes(routesSchema.auth.signin) || event.url.includes(routesSchema.auth.register) || event.url.includes(routesSchema.notFound);
      this.updateView();
    });
  }

  private updateView() {
    this.viewContainer.clear();
    if (!this.hideElement) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

}
