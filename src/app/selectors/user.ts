import {IUser} from './../models/user';
import {Store} from '@ngrx/store';
import {Injectable} from '@angular/core';
import {State} from '../reducers';
import {Observable} from 'rxjs';

@Injectable()
export class UserSelector {

  constructor(private store: Store<State>) {
  }

  getUsers(): Observable<IUser[]> {
    return this.store.select(state => state.user.entities);
  }

}
