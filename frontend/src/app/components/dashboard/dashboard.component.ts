import { Component, OnInit } from '@angular/core';

import { first } from 'rxjs/operators';

import { User } from '../../models'
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  loading = false;
  user!: User

  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.userService.getAll().pipe(first()).subscribe((user: any) => {
      this.loading = false;
      // console.log(user)
      this.user = user[0];
      // console.log('after ***************')
      // console.log(this.user)
  });
  }
}
