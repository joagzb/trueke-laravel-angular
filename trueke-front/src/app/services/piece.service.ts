import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable, Type } from '@angular/core';
import {NewUserPostRequest, SigninPostRequest} from '../models/auth.js';
import {patchUserRequest} from '../models/user.js';
import {NewPostRequest, patchPostRequest} from '../models/post.js';
import {IPiece, NewPieceRequest, patchPieceRequest} from '../models/piece.js';
import {environment} from '../../environments/environment.js';

@Injectable({
  providedIn: 'root'
})
export class PieceService {
  private piecesUrl = `${environment.apiUrl}/pieces`;

  constructor(private http: HttpClient) {
  }

  getByUser(userID: number): Observable<IPiece[]>{
    const params = new HttpParams().set('user_id', userID.toString());

    return this.http.get<IPiece[]>(this.piecesUrl, { params });
  }

  getByFilter(userID: number, filterOptions?: { room?: string, isPosted?: boolean }): Observable<any[]> {
    let params = new HttpParams().set('user_id', userID.toString());

    if (filterOptions) {
      if (filterOptions.room) {
        params = params.set('room', filterOptions.room);
      }
      if (filterOptions.isPosted !== undefined) { // explicitly check for undefined
        params = params.set('isPosted', filterOptions.isPosted.toString());
      }
    }

    return this.http.get<any[]>(this.piecesUrl, { params });
  }

  getByID(pieceID: string): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.get<any>(`${this.piecesUrl}/${pieceID}`, httpOptions);
  }

  update(pieceID: string, payload: patchPieceRequest): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.patch(`${this.piecesUrl}/${pieceID}`, payload, httpOptions);
  }

  create(payload: NewPieceRequest): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post<any>(this.piecesUrl, payload, httpOptions);
  }

  delete(pieceID: string): Observable<any>{
    return this.http.delete(`${this.piecesUrl}/${pieceID}`);
  }

}
