import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {NewTruekeRequest, patchTruekeRequest} from '../models/trueke.js';

@Injectable({
  providedIn: 'root'
})
export class TruekeService {
  private truekesUrl = `${environment.apiUrl}/truekes`;

  constructor(private http: HttpClient) {}

  getByUser(truekeID: number): Observable<any[]> {
    const params = new HttpParams().set('user_id', truekeID.toString());

    return this.http.get<any[]>(this.truekesUrl, { params });
  }

  getByID(truekeID: string): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.get<any>(`${this.truekesUrl}/${truekeID}`, httpOptions);
  }

  update(truekeID: string, payload: patchTruekeRequest): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.patch(`${this.truekesUrl}/${truekeID}`, payload, httpOptions);
  }

  create(payload: NewTruekeRequest): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post<any>(this.truekesUrl, payload, httpOptions);
  }

  delete(truekeID: string): Observable<any>{
    return this.http.delete(`${this.truekesUrl}/${truekeID}`);
  }
}
