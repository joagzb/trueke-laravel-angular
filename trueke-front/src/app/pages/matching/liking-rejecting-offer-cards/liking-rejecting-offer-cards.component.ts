import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import {IOffer, patchOfferRequest} from '../../../models/offer.js';
import Swiper from 'swiper';
import {CommonModule} from '@angular/common';
import {OfferService} from '../../../services/offer.service.js';

@Component({
  selector: 'liking-rejecting-offer-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './liking-rejecting-offer-cards.component.html',
  styleUrl: './liking-rejecting-offer-cards.component.scss'
})
export class LikingRejectingOfferCardsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('swiperContainer', {static: false}) swiperContainer: ElementRef | undefined;
  @Input() offers: IOffer[] = [];
  @Output() onFinishLiking = new EventEmitter<IOffer[]>;
  availableOffers: IOffer[] = [];
  viewedOffers: IOffer[] = [];
  imageCarousel: Swiper | undefined;
  currentOfferIndex: number = 0;

  constructor(private offerService: OfferService){}

  ngOnInit(): void {
    this.availableOffers = this.offers;
  }

  ngAfterViewInit() {
    this.imageCarousel = new Swiper(this.swiperContainer?.nativeElement, {
      grabCursor: true,
      effect: 'creative',
      creativeEffect: {
        prev: {
          shadow: true,
          translate: [0, 0, -400]
        },
        next: {
          translate: ['100%', 0, 0]
        }
      },
      loop: true,
      on: {
        slideNextTransitionEnd: () => this.onSwipeRight(),
        slidePrevTransitionEnd: () => this.onSwipeLeft()
      }
    });
  }

  ngOnDestroy() {
    if (this.imageCarousel) {
      this.imageCarousel.destroy();
    }
  }

  onSwipeLeft() {
    if (this.availableOffers.length > 0) {
      this.availableOffers[this.currentOfferIndex].isLiked = false;
      this.updateOfferStatus(this.availableOffers[this.currentOfferIndex]);
      this.moveOfferToViewed();
    }
  }

  onSwipeRight() {
    if (this.availableOffers.length > 0) {
      this.availableOffers[this.currentOfferIndex].isLiked = true;
      this.updateOfferStatus(this.availableOffers[this.currentOfferIndex]);
      this.moveOfferToViewed();
    }
  }

  updateOfferStatus(offer: IOffer) {
    const payload: patchOfferRequest = {
      isLiked: offer.isLiked,
    };

    this.offerService.update(offer.id, payload).subscribe(offerResponse => {
      console.log(offer.isLiked ? `offer ${offer.id} liked` : `offer ${offer.id} discarded`);
      console.log(offer);
    });
  }

  private moveOfferToViewed() {
    this.viewedOffers.push(this.availableOffers[this.currentOfferIndex]);
    this.availableOffers.splice(this.currentOfferIndex, 1);
    if (this.availableOffers.length > 0) {
      this.currentOfferIndex = this.currentOfferIndex % this.availableOffers.length;
    } else {
      this.currentOfferIndex = 0;

    }
    if (this.imageCarousel) {
      this.imageCarousel.update();
    }
  }

  finishLikingAndRejecting(){
    const likedOffers = this.extractLikedOffers();
    this.onFinishLiking.emit(likedOffers);
  }

  extractLikedOffers(): IOffer[] {
    return this.viewedOffers.filter(offer => offer.isLiked);
  }
}
