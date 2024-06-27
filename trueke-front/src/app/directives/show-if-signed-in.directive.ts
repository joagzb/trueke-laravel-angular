import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import {AuthService} from '../services/auth.service.js';
import {Subscription} from 'rxjs';

@Directive({
  selector: '[ShowIfSignedIn]',
  standalone: true
})
export class ShowIfSignedInDirective implements OnInit, OnDestroy {
  private isVisible: boolean = false;
  private authSubscription?: Subscription;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authSubscription = this.authService.status.subscribe(isSignedIn => {
      this.updateView(isSignedIn);
    });
  }


  private updateView(isSignedIn: boolean) {
    this.viewContainer.clear();
    if (isSignedIn) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.isVisible = true;
    } else {
      this.isVisible = false;
    }
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
