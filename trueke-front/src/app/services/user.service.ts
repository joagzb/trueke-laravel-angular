import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {getUserResponse, patchUserRequest} from '../models/user.js';
import {environment} from '../../environments/environment.js';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {
  }

  getByID(userID: number): Observable<getUserResponse>{
    return this.http.get<any>(`${this.usersUrl}/${userID}`);
  }

  update(userID: number, payload: patchUserRequest): Observable<any>{
    return this.http.patch(`${this.usersUrl}/${userID}`, payload);
  }

}
