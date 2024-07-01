import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { register } from 'swiper/element/bundle';
import {PostService} from '../../../services/post.service.js';
import {IPost} from '../../../models/post.js';
import {routesSchema} from '../../../config/routes.schema.js';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ShowIfSignedInDirective} from '../../../directives/show-if-signed-in.directive.js';
import {AuthService} from '../../../services/auth.service.js';
import {CreateOrEditOfferComponent} from '../../offers/create-or-edit-offer/create-or-edit-offer.component.js';
register(); // swiper

@Component({
  selector: 'listing-details',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, ShowIfSignedInDirective, CreateOrEditOfferComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './listing-details.component.html',
  styleUrl: './listing-details.component.scss'
})
export class ListingDetailsComponent implements OnInit {
  post: IPost | undefined;
  isOfferModalShown = false;
  offerAlreadyMade = false;
  isOwnPost = false;

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
