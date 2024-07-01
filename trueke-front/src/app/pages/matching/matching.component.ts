import { Component, OnInit, } from '@angular/core';
import {IOffer} from '../../models/offer.js';
import {OfferService} from '../../services/offer.service.js';
import {ActivatedRoute} from '@angular/router';
import {CommonModule} from '@angular/common';
import {LikedOffersComponentComponent} from './liked-offers-component/liked-offers-component.component.js';
import {NavigationService} from '../../services/navigation.service.js';
import {LikingRejectingOfferCardsComponent} from './liking-rejecting-offer-cards/liking-rejecting-offer-cards.component.js';

@Component({
  selector: 'app-matching',
  standalone: true,
  imports: [CommonModule, LikedOffersComponentComponent, LikingRejectingOfferCardsComponent],
  templateUrl: './matching.component.html',
  styleUrls: ['./matching.component.scss']
})
export class MatchingComponent implements OnInit {
  offers: IOffer[] = [];
  unseenOffers: IOffer[] = [];
  likedOffers: IOffer[] = [];

  constructor (
    private offerService: OfferService,
    private activatedRoute: ActivatedRoute,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    const postId = this.activatedRoute.snapshot.paramMap.get('postID');
    if (postId) {
      this._loadOffers(postId);
    } else {
      this.navigationService.navigateTo(this.navigationService.routes.notFound);
    }
  }

  private _loadOffers(postId: string): void {
    this.offerService.getByPost([postId]).subscribe((offers) => {
      this.offers = offers;
      this.unseenOffers = this.filterUnseenOffers(offers);
      this.likedOffers = this.likedOffers.concat(this.extractLikedOffers(offers));
    });
  }

  filterUnseenOffers(offers: IOffer[]): IOffer[] {
    return offers.filter(offer => offer.isLiked === null);
  }

  extractLikedOffers(offers: IOffer[]): IOffer[] {
    return offers.filter(offer => offer.isLiked);
  }

  moveToSelectingStage(offers: IOffer[]) {
    this.likedOffers = this.likedOffers.concat(offers);
  }

  onOfferSelected() {
    this.navigationService.navigateTo(this.navigationService.routes.exchanges);
  }
}
