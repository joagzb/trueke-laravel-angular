import {Component} from '@angular/core';
import {authorData} from '../../models/contact.model.js';

@Component({
  selector: 'contact-me',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  author = authorData;
}
