import {UserSelector} from './../../selectors/user';
import {UserAction} from './../../actions/user';
import {Subject, Subscription} from 'rxjs';
import {IUser} from './../../models/user';
import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

const emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: IUser[]
  usersFilter: IUser[]
  userSub: Subscription
  filterText = ''
  @ViewChild('createUserModal') createUserModal

  registerUserForm: FormGroup

  private searchUserStream = new Subject<string>()

  constructor(private userAction: UserAction, private userSelector: UserSelector, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.userAction.searchUsers();
    this.userSub = this.userSelector.getUsers().subscribe((data) => {
      data = data.map((el) => Object.assign({}, el))
      this.users = data;
      this.filter(this.filterText);
    });



    this.searchUserStream
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(term => {
        this.filterText = term
        this.filter(term)
      });

    this.registerUserForm = this.formBuilder.group({
      'email': ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      'passwords': this.formBuilder.group({
        password: ['', Validators.required],
        repeat: ['', Validators.required]
      }, {validator: this.areEqual})
    });
  }

  areEqual(group: FormGroup) {
    if ((<any>group.controls).password.value === (<any>group.controls).repeat.value) {
      return null;
    }

    return {
      areEqual: true
    };
  }

  private filter(term) {
    this.usersFilter = this.users.filter(d => {
      if (term) {
        return d.email && d.email.indexOf(term) >= 0;
      }
      return true;
    });
  }

  refresh() {
    this.userAction.searchUsers();
  }

  updateFilter(term) {
    this.searchUserStream.next(term);
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  updateRole(user, role) {
    this.userAction.updateUser(user._id, {role: role});
  }

  create() {
    this.createUserModal.open();
    this.registerUserForm.reset();
  }

  saveUser() {
    if (this.registerUserForm.valid) {
      let user = this.registerUserForm.value;
      this.userAction.createUser({
        email: user.email,
        password: user.passwords.password,
        repeatPassword: user.passwords.repeat
      });
    }
  }
}
