import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CommonModule} from '@angular/common';
import {SharedNavbarComponent} from './shared/components/navbar/navbar.component.js';
import {HideWhenSigningInDirective} from './directives/hide-when-signing-in.directive.js';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SharedNavbarComponent,HideWhenSigningInDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
