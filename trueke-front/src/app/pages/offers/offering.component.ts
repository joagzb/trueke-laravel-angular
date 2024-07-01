import {Component, OnInit} from '@angular/core';
import {IPost} from '../../models/post.js';
import {IPiece} from '../../models/piece.js';
import { Router} from '@angular/router';
import {OfferService} from '../../services/offer.service.js';
import {IOffer } from '../../models/offer.js';
import {PieceService} from '../../services/piece.service.js';
import {CommonModule, Location} from '@angular/common';
import {AuthService} from '../../services/auth.service.js';
import {Observable, map} from 'rxjs';
import {CreateOrEditOfferComponent} from './create-or-edit-offer/create-or-edit-offer.component.js';

@Component({
  selector: 'app-offering',
  standalone: true,
  imports: [CommonModule, CreateOrEditOfferComponent],
  templateUrl: './offering.component.html',
  styleUrl: './offering.component.scss'
})
export class OfferingComponent implements OnInit {
  post?: IPost;
  offers$: Observable<IOffer[]> | undefined;
  isCreateModalShown = false;
  selectedOffer?: IOffer;

  // TODO: ADD HERE A NOTIFICATION BADGE SAYING IF AN USER LIKED THE OFFER

  constructor (
    private pieceService: PieceService,
    private offerService: OfferService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this._loadOffers();
  }

  private _loadOffers(): void {
    const userID = this.authService.currentUser.id;
    this.offers$ = this.offerService.getByUserWhoOffered(userID);
  }

  getPostPiecesTitles(post: IPost): string {
    return post.pieces.map(piece => piece.title).join(', ');
  }

  getOfferPiecesTitles(pieces: Omit<IPiece, 'user'>[]): string {
    return pieces.map(piece => piece.title).join(', ');
  }


  editOffer(offer: IOffer): void {
    this.isCreateModalShown = true;
    this.selectedOffer = offer;
  }

  removeOffer(offerId: string): void {
    this.offerService.delete(offerId).subscribe(() => {
      console.log('Removed offer with ID:', offerId);
    });

    this.offers$ = this.offers$?.pipe(
      map(offers => offers.filter(offer => offer.id !== offerId))
    );
  }

  onCloseModal(): void {
    this.isCreateModalShown = false;
    this.selectedOffer = undefined;
    this._loadOffers();
  }

}
