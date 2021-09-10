import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router'

import { AuthenticationService } from 'src/app/services';
 
import {MessageService} from 'primeng/api';
import {MenuItem} from 'primeng/api';
import {ButtonModule} from 'primeng/button';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [MessageService]
})

export class HeaderComponent implements OnInit {
items: MenuItem[]=[];

  constructor(
    private messageServices: MessageService,
    private authenticationService: AuthenticationService,
    private router: Router,

    ) { }

  ngOnInit(): void {
    this.items = [
      {
          label: 'Update',
          icon: 'pi pi-refresh'
      },
      {
          label: 'Delete',
          icon: 'pi pi-times'
      },
      {
          label: 'Angular Website',
          icon: 'pi pi-external-link',
          url: 'http://angular.io'
      },
      {
          label: 'Router',
          icon: 'pi pi-upload',
          routerLink: '/fileupload'
      }
  ];
  }

  logout() {
    this.router.navigate(['/login']);
    this.authenticationService.logout()
  }
}
