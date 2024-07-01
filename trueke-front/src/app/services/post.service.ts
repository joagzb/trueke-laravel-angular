import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {IPost, NewPostRequest, patchPostRequest} from '../models/post.js';
import {environment} from '../../environments/environment.development.js';
import {PostRequestFilters} from '../models/request_filters.js';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postsUrl = `${environment.apiUrl}/posts`;

  constructor (private http: HttpClient) {
  }

  private applyFilters(filter: PostRequestFilters): HttpParams {
    let params = new HttpParams();
    params = params.append('sortBy', filter.sortBy);
    params = filter.region ? params.append('location', filter.region) : params;
    params = filter.date ? params.append('date', filter.date.toISOString()) : params;
    params = filter.room ? params.append('room', filter.room) : params;

    return params;
  }

  // Get all posts
  getByFilter(filterOptions?: PostRequestFilters): Observable<IPost[]> {
    const params = this.applyFilters(filterOptions || new PostRequestFilters());

    return this.http.get<IPost[]>(this.postsUrl, {params});
  }

  getByUser(userID: number): Observable<IPost[]> {
    const params = new HttpParams().set('user_id', userID.toString());

    return this.http.get<IPost[]>(this.postsUrl, {params});
  }

  getByID(postID: string): Observable<IPost> {
    return this.http.get<IPost>(`${this.postsUrl}/${postID}`);
  }

  update(postID: string, payload: patchPostRequest): Observable<any> {
    return this.http.patch(`${this.postsUrl}/edit/${postID}`, payload);
  }

  create(payload: NewPostRequest): Observable<any> {
    return this.http.post<any>(`${this.postsUrl}/create`, payload);
  }

  delete(postID: string): Observable<any> {
    return this.http.delete(`${this.postsUrl}/${postID}`);
  }


}
