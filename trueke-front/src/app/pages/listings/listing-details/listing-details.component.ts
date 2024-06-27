import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import Swiper from 'swiper';
import {Navigation, Pagination} from 'swiper/modules';
import {PostService} from '../../../services/post.service.js';
import {IPost} from '../../../models/post.js';
import {routesSchema} from '../../../config/routes.schema.js';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ShowIfSignedInDirective} from '../../../directives/show-if-signed-in.directive.js';
import {AuthService} from '../../../services/auth.service.js';
import {getUserResponse} from '../../../models/user.js';
import {CreateOrEditOfferComponent} from '../../offers/create-or-edit-offer/create-or-edit-offer.component.js';
import {IOffer} from '../../../models/offer.js';

@Component({
  selector: 'listing-details',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, ShowIfSignedInDirective, CreateOrEditOfferComponent],
  templateUrl: './listing-details.component.html',
  styleUrl: './listing-details.component.scss'
})
export class ListingDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  post: IPost | undefined;
  imageCarousel: Swiper | null = null;
  isOfferModalShown: boolean = false;
  offerAlreadyMade: boolean = false;
  isOwnPost: boolean = false;

  constructor (
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const postID = this._getPostIDfromCurrentURL();
    if (postID) {
      this._loadPost(postID);
    } else {
      this.router.navigate([routesSchema.notFound]);
    }
  }

  ngAfterViewInit() {
    this.imageCarousel = new Swiper('.swiper-container', {
      modules: [Navigation, Pagination],
      slidesPerView: 1,
      navigation: true,
      pagination: {
        clickable: true,
        type: 'bullets',
      },
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

  private _getPostIDfromCurrentURL():string | undefined{
    return this.activatedRoute.snapshot.paramMap.get('postID') ?? undefined;
  }

  private _loadPost(postID: string): void {
    this.postService.getByID(postID).subscribe(responsePost => {
      this.post = responsePost;
      this._checkOfferAlreadyMade(responsePost);
      this._checkIfOwnPost();
    });
  }

  private _checkOfferAlreadyMade(post: IPost) {
    this.offerAlreadyMade = post.offers.some((offer) => offer.user.id === this.authService.currentUser.id);
  }

  private _checkIfOwnPost():void{
    this.isOwnPost = this.post?.user.id === this.authService.currentUser.id;
  }

  onOfferClick(postID: string) {
    this.isOfferModalShown = true;
  }

  onCloseModal() {
    this.isOfferModalShown = false;
    this._loadPost(this.post?.id!);
  }
}
