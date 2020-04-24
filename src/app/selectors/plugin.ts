import {IPlugin} from './../models/plugin';
import {Store} from '@ngrx/store';
import {Injectable} from '@angular/core';
import {State} from '../reducers';
import {Observable} from 'rxjs';

@Injectable()
export class PluginSelector {

  constructor(private store: Store<State>) {
  }

  getPlugins(): Observable<IPlugin[]> {
    return this.store.select(state => state.plugin.entities);
  }

}
