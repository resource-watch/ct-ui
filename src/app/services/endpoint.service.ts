import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class EndpointService {

  static BASE_URL = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {
  }

  getEndpoints() {
    let url = `${EndpointService.BASE_URL}/api/v1/endpoint`;

    return this.http.get(url)
  }

}
