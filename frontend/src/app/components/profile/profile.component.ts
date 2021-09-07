import { Component, OnInit } from '@angular/core';

import { first } from 'rxjs/operators';

import { User } from '../../models'
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  loading = false;
  // user: User = {
  //   name: '',
  //   surnames: '',
  //   email: '',
  //   password: '',
  //   picture: '',
  //   licenseNumber: '',
  //   medicalCheckDate: new Date,
  //   licenseExpeditionDate: new Date,
  //   certifications: [],
  //   center: {
  //       name: '',
  //       latitude: 0,
  //       longitude: 0
  //   },
  //   buddies: [],
  //   equipment: [],
  //   immersions: [],
  //   token: '',
  //   refreshToken: '',
  // }
  user!: User;
  



  // user!: User

  updatingState: boolean = false

  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.userService.getAll().pipe(first()).subscribe((user: any) => {
      this.loading = false;
      this.user = user[0];
      console.log(this.user)  
  });
  }

  updating() {
    return this.updatingState ? 'Save' : 'Update'
  }

  toUpdate() {
    this.updatingState = !this.updatingState
  }
}
