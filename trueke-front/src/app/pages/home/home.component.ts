import { Component } from '@angular/core';
import {FurnitureGridComponent} from './components/furniture-grid/forniture-grid.component.js';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FurnitureGridComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
