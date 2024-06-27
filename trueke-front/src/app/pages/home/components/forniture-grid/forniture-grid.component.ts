import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostService} from '../../../../services/post.service.js';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {PostRequestFilters} from '../../../../models/request_filters.js';
import {Observable, Subscription, filter, map} from 'rxjs';
import {CommonModule} from '@angular/common';
import {IPost} from '../../../../models/post.js';
import {Router} from '@angular/router';
import {routesSchema} from '../../../../config/routes.schema.js';
import {CardGridElement, CardGridViewComponent} from '../../../../shared/components/card-grid-view/card-grid-view.component.js';
import {AuthService} from '../../../../services/auth.service.js';

@Component({
  selector: 'forniture-grid',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, CardGridViewComponent],
  templateUrl: './forniture-grid.component.html',
  styleUrl: './forniture-grid.component.scss'
})
export class FornitureGridComponent implements OnInit {
  filterForm: FormGroup;
  posts$: Observable<CardGridElement[]> | undefined;

  constructor (
    private fb: FormBuilder,
    private authService: AuthService,
    private postService: PostService,
    private router: Router) {
    this.filterForm = this.fb.group({
      sortBy: ['date'],
      location: [''],
      date: [''],
      room: ['']
    });
  }

  ngOnInit() {
    this.onSubmit();
  }

  onFilterFormChange(): void {
    this.onSubmit();
  }


  onSubmit() {
    const filters: PostRequestFilters = {
      region: this.filterForm.get('location')?.value,
      sortBy: this.filterForm.get('sortBy')?.value,
      date: this.filterForm.get('date')?.value,
      room: this.filterForm.get('room')?.value,
    };

    this.posts$ = this.postService.getByFilter(filters)
      .pipe(
        map(posts => posts.map(post => new CardGridElement(post)))
      );
  }

  onPostClick(postID: string): void {
    this.router.navigate([routesSchema.listings.detail.replace(':postID', postID)]);
  }

}
