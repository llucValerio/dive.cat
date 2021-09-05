import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'

import {Message,MessageService} from 'primeng/api';
// import { PrimeNGConfig } from 'primeng/api';

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
 
  // View details about managins messages in https://www.primefaces.org/primeng/showcase/#/messages
  msgs1: Message[];

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.msgs1 = [
      {severity:'success', summary:'Success', detail:'Message Content'},
      {severity:'error', summary:'Error', detail:'Message Content'}
  ];
  }

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
