import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class MicroserviceService {

  static BASE_URL = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {
  }

  getMicroservices() {
    let url = `${MicroserviceService.BASE_URL}/api/v1/microservice`;

    return this.http.get(url);
  }

}
