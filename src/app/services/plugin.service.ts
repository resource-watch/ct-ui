import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class PluginService {

  static BASE_URL = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {
  }

  getPlugins() {
    let url = `${PluginService.BASE_URL}/api/v1/plugin`;

    return this.http.get(url);
  }

  updatePlugin(id, plugin) {
    let url = `${PluginService.BASE_URL}/api/v1/plugin/${id}`;
    return this.http.patch(url, plugin);
  }

  flushCache() {
    let url = `${PluginService.BASE_URL}/cache/flush`;
    return this.http.get(url);
  }

}
