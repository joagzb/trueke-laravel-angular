import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, Output} from '@angular/core';
import {IOffer} from '../../../models/offer.js';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { register } from 'swiper/element/bundle';
register(); // swiper

@Component({
  selector: 'offer-detail-modal',
  standalone: true,
  imports: [CommonModule,NgOptimizedImage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './offer-detail.component.html',
  styleUrl: './offer-detail.component.scss'
})
export class OfferDetailComponent{
  @Input() offer: IOffer | undefined;
  @Output() onModalClose = new EventEmitter<void>();

  onCancel(event: Event): void {
    event.stopPropagation();
    this.onModalClose.emit();
  }
}
