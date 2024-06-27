import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IOffer, patchOfferRequest} from '../../../models/offer.js';
import {CommonModule} from '@angular/common';
import {OfferService} from '../../../services/offer.service.js';
import {OfferDetailComponent} from '../../offers/offer-detail/offer-detail.component.js';
import {IPost} from '../../../models/post.js';
import {IPiece} from '../../../models/piece.js';

@Component({
  selector: 'liked-offers-modal',
  standalone: true,
  imports: [CommonModule, OfferDetailComponent],
  templateUrl: './liked-offers-component.component.html',
  styleUrl: './liked-offers-component.component.scss'
})
export class LikedOffersComponentComponent {
  @Input() likedOffers: IOffer[] = [];
  @Output() onFinishMatching = new EventEmitter<void>();
  selectedOffer: IOffer | null = null;
  isDetailsModalShown: boolean = false;

  constructor (private offerService: OfferService) {}

  getPostPiecesTitles(post: IPost): string {
    return post.pieces.map(piece => piece.title).join(', ');
  }

  getOfferPiecesTitles(pieces: Omit<IPiece, 'user'>[]): string {
    return pieces.map(piece => piece.title).join(', ');
  }

  acceptOffer(offer: IOffer): void {
    const payload: patchOfferRequest = {
      isSelected: true,
    };
    this.offerService.update(offer.id, payload).subscribe(response => {
      console.log(`you've selected the offer ${offer.id} to start a trueke!`);
      console.log(response);
      this.finishMatching();
    });
  }

  finishMatching() {
    this.onCloseModal();
    this.onFinishMatching.emit();
  }

  openDetailsModal(offer: IOffer): void {
    this.selectedOffer = offer;
    this.isDetailsModalShown = true;
  }

  onCloseModal(): void {
    this.isDetailsModalShown = false;
    this.selectedOffer = null;
  }
}
