import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {AuthService} from '../../../services/auth.service.js';
import {CommonModule} from '@angular/common';
import {routesSchema} from '../../../config/routes.schema.js';
import {Observable, Subscription} from 'rxjs';
import {NavigationService} from '../../../services/navigation.service.js';

@Component({
  selector: 'shared-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class SharedNavbarComponent {
  authStatus$: Observable<boolean>;
  isDropdownOpen = false;
  isMobileMenuOpen = false;

  constructor (
    private authService: AuthService,
    public navigationService: NavigationService
  ) {
    this.authStatus$ = this.authService.status;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  navigateTo(route: string) {
    const userId = this.authService.currentUser.id;
    const updatedRoute = route.replace(':userID', userId.toString());
    this.navigationService.navigateTo(updatedRoute);
    this.isDropdownOpen = false;
  }

  logout(): void {
    this.authService.logout().subscribe();
    this.isDropdownOpen = false;
    this.navigationService.navigateTo(this.navigationService.routes.home);
  }


  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

}
