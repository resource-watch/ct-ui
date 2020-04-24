import {routerReducer} from '@ngrx/router-store';

import * as microservice from './microservice';
import * as endpoint from './endpoint';
import * as user from './user';
import * as auth from './auth';
import * as dashboard from './dashboard';
import * as plugin from './plugin';


export interface State {
  microservice: microservice.State
  endpoint: endpoint.State
  user: user.State
  auth: auth.State
  dashboard: dashboard.State
  plugin: plugin.State
}

export const reducers = {
  router: routerReducer,
  microservice: microservice.reducer,
  endpoint: endpoint.reducer,
  user: user.reducer,
  auth: auth.reducer,
  dashboard: dashboard.reducer,
  plugin: plugin.reducer,
};
