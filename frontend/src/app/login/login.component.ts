import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: any = {
    email : '',
    password: ''
  }
 
  constructor(private userService: UserService) {
   }

  ngOnInit(): void {
  }

  login() {
    console.log(this.user.email);
    console.log(this.user.password);
  }

}
