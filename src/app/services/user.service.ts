import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class UserService {

  static BASE_URL = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {
  }

  getUsers() {
    let url = `${UserService.BASE_URL}/auth/user`;

    return this.http.get(url)
  }

  updateUser(id, user) {
    let url = `${UserService.BASE_URL}/auth/user/${id}`;
    return this.http.patch(url, user)
  }

  createUser(user) {
    let url = `${UserService.BASE_URL}/auth/sign-up`;
    return this.http.post(url, user)
  }

}
