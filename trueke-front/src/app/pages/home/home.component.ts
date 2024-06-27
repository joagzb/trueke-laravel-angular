import { Component } from '@angular/core';
import {FornitureGridComponent} from './components/forniture-grid/forniture-grid.component.js';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FornitureGridComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
