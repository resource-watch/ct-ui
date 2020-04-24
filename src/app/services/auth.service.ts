import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

export interface CheckLogged {
  id: string;
  name: string;
}

@Injectable()
export class AuthService {

  static BASE_URL = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {
  }

  logout(): any {
    localStorage.removeItem('username');
  }

  isLoggedIn() {
    const foo = this.http.get<CheckLogged>(`${AuthService.BASE_URL}/check-logged`);
    return foo;
  }

  generateToken() {
    return this.http.get(`${AuthService.BASE_URL}/generate-token`);
  }
}

@Injectable()
export class TokenService {

  constructor() {
  }

  logout(): any {
    localStorage.removeItem('token');
    window.location.href = `${environment.apiUrl}/auth?token=true&callbackUrl=${`${window.location.protocol}//${window.location.host}${window.location.pathname}`}`;
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

}

export const AUTH_PROVIDERS: Array<any> = [
  {provide: TokenService, useClass: TokenService},
  {provide: AuthService, useClass: AuthService}
];
