import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {IOffer, newOfferRequest, patchOfferRequest} from '../models/offer.js';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment.development.js';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private offersUrl = `${environment.apiUrl}/offers`;

  constructor(private http: HttpClient) {}

  // Get all offers
  getByUserWhoOffered(userID: number): Observable<IOffer[]> {
    const params = new HttpParams().set('user_id', userID.toString());

    return this.http.get<IOffer[]>(this.offersUrl, { params });
  }

  getByPost(posts: string[]): Observable<IOffer[]>{
    const params = new HttpParams().set('posts', JSON.stringify(posts));

    return this.http.get<IOffer[]>(this.offersUrl, { params });
  }

  getByID(offerID: string): Observable<any>{
    return this.http.get<any>(`${this.offersUrl}/${offerID}`);
  }

  update(offerID: string, payload: patchOfferRequest): Observable<any>{
    return this.http.patch(`${this.offersUrl}/edit/${offerID}`, payload);
  }

  create(payload: newOfferRequest): Observable<any> {
    return this.http.post<any>(this.offersUrl, payload);
  }

  delete(offerID: string): Observable<any>{
    return this.http.delete(`${this.offersUrl}/${offerID}`);
  }
}
