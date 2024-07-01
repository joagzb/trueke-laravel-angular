import {Component} from '@angular/core';
import {PostService} from '../../../../services/post.service.js';
import {FormBuilder} from '@angular/forms';
import {PostRequestFilters} from '../../../../models/request_filters.js';
import {Observable, map} from 'rxjs';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {routesSchema} from '../../../../config/routes.schema.js';
import {CardGridElement, CardGridViewComponent} from '../../../../shared/components/card-grid-view/card-grid-view.component.js';
import {AuthService} from '../../../../services/auth.service.js';
import {ListingFilterComponent} from '../listing-filter/listing-filter.component.js';

@Component({
  selector: 'furniture-grid',
  standalone: true,
  imports: [ListingFilterComponent, CardGridViewComponent, CommonModule],
  templateUrl: './forniture-grid.component.html'
})
export class FurnitureGridComponent{
  posts$: Observable<CardGridElement[]> | undefined;

  constructor (
    private fb: FormBuilder,
    private authService: AuthService,
    private postService: PostService,
    private router: Router) {
  }

  onSubmit(filters: PostRequestFilters) {
    this.posts$ = this.postService.getByFilter(filters)
      .pipe(
        map(posts => posts.map(post => new CardGridElement(post)))
      );
  }

  onPostClick(postID: string): void {
    this.router.navigate([routesSchema.listings.detail.replace(':postID', postID)]);
  }

}
