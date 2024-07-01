import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {routesSchema} from '../../config/routes.schema.js';
import {PostService} from '../../services/post.service.js';
import {Observable, map} from 'rxjs';
import {CommonModule} from '@angular/common';
import {CardGridElement, CardGridViewComponent} from '../../shared/components/card-grid-view/card-grid-view.component.js';

@Component({
  selector: 'app-listings',
  standalone: true,
  imports: [CommonModule, CardGridViewComponent],
  templateUrl: './listings.component.html',
  styleUrl: './listings.component.scss'
})
export class ListingsComponent implements OnInit {
  userId?: string | null;
  userPosts$: Observable<CardGridElement[]> | undefined;

  constructor (
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private postService: PostService) {}

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.paramMap.get('userID');
    if (this.userId) {
      this._loadUserPosts();
    } else {
      this.router.navigate([routesSchema.notFound]);
    }
  }

  private _loadUserPosts(): void {
    this.userPosts$ = this.postService.getByUser(Number.parseInt(this.userId!)).pipe(
      map(posts => posts.map(post => new CardGridElement(post)))
    );
  }

  onPostClick(postId: string): void {
    this.router.navigate([routesSchema.listings.detail.replace(':postID', postId)]);
  }

  openPostOffers(postId:string):void{
    this.router.navigate([routesSchema.matching.replace(':postID', postId)]);
  }
}
