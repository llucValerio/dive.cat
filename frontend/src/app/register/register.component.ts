import { Component, OnInit } from '@angular/core';
import { map, filter } from 'rxjs/operators';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  name: string = '';
  surnames: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  apiUsers: any[] = [];

  users$: any;

  // check tap || tap for log observables

  constructor(public userService: UserService) {
     }

  ngOnInit(): void {
    // this.userService.fetchUsers()
    //   .subscribe(users => this.apiUsers = users )
  }

  register() {
    this.users$ = this.userService.fetchUsers()
    .pipe(
      map((pokes: any) => pokes.results),
     //  map((pokes: any) => pokes.filter((poke: any) => poke.name[0] === 'c'))
    )
  }

}
