import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private router: Router,
    private userServices: UserService 
  ) {}

  ngOnInit(): void {
    const refreshToken = this.userServices.getCookieRefreshToken()
    this.userServices.refreshToken({refreshToken:refreshToken})
    .subscribe(
      (response)=>{
      console.log('observable response')
      console.log(response)
      },
      (error => {
        console.log('observable error')
        console.log(error)
        this.router.navigateByUrl('/login')
      })
    )
  }
}
