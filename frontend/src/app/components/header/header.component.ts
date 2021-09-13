import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router'

import { AuthenticationService } from 'src/app/services';
 
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,

    ) { }

  ngOnInit(): void { 
    // This is intentional
  }

  logout() {
    this.router.navigate(['/login']);
    this.authenticationService.logout()
  }
}
