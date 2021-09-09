import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {Message,MessageService} from 'primeng/api';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user: any = {
    name: '',
    surnames: '',
    email : '',
    password: '',
    confirmPassword: ''
  }

  msgs1: Message[] = [];

  constructor(
    private userService: UserService,
    private router: Router
    ) {}

  ngOnInit(): void {}

  register() {
    // console.log(this.user.name);
    // console.log(this.user.surnames);
    // console.log(this.user.email);
    // console.log(this.user.password);
    // console.log(this.user.confirmPassword);

    // this.userService.registerUser(this.user)
    // .subscribe(data => {
    //   this.router.navigateByUrl('/login');
    // })
  }

}
