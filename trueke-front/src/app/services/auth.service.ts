import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {NewUserPostRequest, SigninPostRequest, SigninResponse} from '../models/auth.js';
import {environment} from '../../environments/environment.development.js';
import {getUserResponse} from '../models/user.js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private registerUrl = `${environment.apiUrl}/register`;
  private signinUrl = `${environment.apiUrl}/login`;
  private signoutUrl = `${environment.apiUrl}/logout`;

  constructor (private http: HttpClient) {
  }

  get status() {
    if (this.readToken()){
      this.isLoggedIn.next(true);
    }
    return this.isLoggedIn;
  }

  get currentUser(): getUserResponse{
    return JSON.parse(localStorage.getItem('user')!);
  }

  set currentUser(user: getUserResponse) {
    localStorage.setItem('user',JSON.stringify(user));
  }

  register(payload: NewUserPostRequest): Observable<any> {
    this.isLoggedIn.next(false);
    return this.http.post<any>(this.registerUrl, payload);
  };

  signin(payload: SigninPostRequest): Observable<any> {
    return this.http.post<SigninResponse>(this.signinUrl, payload).pipe(
      map((result: SigninResponse) => this.saveToken(result))
    );
  };

  logout(): Observable<any> {
    return this.http.post<any>(this.signoutUrl, {}).pipe(
      map(() => this.clearToken())
    );
  };

  readToken(): string {
    return localStorage.getItem('token') || '';
  }

  private saveToken(signinResponse: SigninResponse): void {
    localStorage.setItem('user', JSON.stringify(signinResponse.user));
    localStorage.setItem('token', signinResponse.token);
    this.isLoggedIn.next(true);
  }

  private clearToken(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.isLoggedIn.next(false);
  }
}
