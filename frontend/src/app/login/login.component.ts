import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'

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
 
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  login(): void {
    console.log(this.user.email);
    console.log(this.user.password);
    
    this.userService.loginUser(this.user)
    .subscribe((data: any) => {
      console.log(data)
      console.log(data.token)
      console.log(data.refreshToken)
      this.userService.setCookieToken({
        token:data.token,
        refreshToken: data.refreshToken
      })
      this.router.navigateByUrl('/')
    })
  }
}
