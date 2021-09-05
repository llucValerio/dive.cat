import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-immersions',
  templateUrl: './immersions.component.html',
  styleUrls: ['./immersions.component.scss']
})
export class ImmersionsComponent implements OnInit {

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
