import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {IOffer} from '../../../models/offer.js';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import Swiper from 'swiper';
import {Navigation} from 'swiper/modules';
import {IPost} from '../../../models/post.js';
import {PostService} from '../../../services/post.service.js';

@Component({
  selector: 'offer-detail-modal',
  standalone: true,
  imports: [CommonModule,NgOptimizedImage],
  templateUrl: './offer-detail.component.html',
  styleUrl: './offer-detail.component.scss'
})
export class OfferDetailComponent implements OnInit, AfterViewInit, OnDestroy{
  @Input() offer: IOffer | undefined;
  @Output() onModalClose = new EventEmitter<void>();
  post: IPost | undefined;
  postImages: string[] = [];
  offerImages: string[] = [];
  imageCarousel: Swiper | null = null;

ngOnInit(): void {
  if (this.offer) {
    this.postImages = this.offer.post.pieces.map(piece => piece.imageURL);
    this.offerImages = this.offer.pieces.map(piece => piece.imageURL);
  }
}

ngAfterViewInit() {
  this.imageCarousel = new Swiper('.swiper-container', {
    modules: [Navigation],
    slidesPerView: 1,
    navigation: true,
    spaceBetween: 30,
    loop: true,
    autoplay: true,
  });
}

ngOnDestroy() {
  if (this.imageCarousel) {
    this.imageCarousel.destroy();
  }
}

  onCancel(event: Event): void {
    event.stopPropagation();
    this.onModalClose.emit();
  }
}
