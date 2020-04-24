import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class DashboardService {

  static BASE_URL = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {
  }

  countRequestToday() {
    let url = `${DashboardService.BASE_URL}/api/v1/statistic/countRequestToday`;
    return this.http.get(url);
  }

  countRequestLastWeek() {
    let url = `${DashboardService.BASE_URL}/api/v1/statistic/countRequestLastWeek`;
    return this.http.get(url);
  }

  countRequestTodayByCountry() {
    let url = `${DashboardService.BASE_URL}/api/v1/statistic/countRequestTodayByCountry`;
    return this.http.get(url);
  }

  avgByRequest(from, to) {
    let url = `${DashboardService.BASE_URL}/api/v1/statistic/avgByRequest?from=${from}&to=${to}`;
    return this.http.get(url);
  }

  requestByDay(from, to) {
    let url = `${DashboardService.BASE_URL}/api/v1/statistic/requestByDay?from=${from}&to=${to}`;
    return this.http.get(url);
  }

}
