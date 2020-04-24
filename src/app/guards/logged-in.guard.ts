import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {environment} from '../../environments/environment';
import {HttpParams} from '@angular/common/http';

@Injectable()
export class LoggedInGuard implements CanActivate {

  static BASE_URL = `${environment.apiUrl}/auth`;

  constructor(private authService: AuthService) {
  }

  canActivate(): Promise<any> {

    return new Promise((resolve, reject) => {
      const request = this.authService.isLoggedIn();

      request.subscribe((data) => {
        let params = new HttpParams({fromString: window.location.search.substring(1, window.location.search.length)});
        let token = params.get('token');
        if (!token) {
          resolve(true);
        } else {
          params.delete('token');
          window.location.href = `${window.location.href.split(/[?#]/)[0]}${params.toString ? '' : '?'}${params.toString()}`;
        }
      }, (error) => {
        reject(error);
        window.location.href = `${LoggedInGuard.BASE_URL}?token=true&callbackUrl=${`${window.location.protocol}//${window.location.host}${window.location.pathname}`}`;
      });
    });
  }
}
