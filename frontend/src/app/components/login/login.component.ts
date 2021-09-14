import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService, UserService } from 'src/app/services';
import { User } from 'src/app/models';

import {Message} from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  user!: User;
 
  // View details about managins messages in https://www.primefaces.org/primeng/showcase/#/messages
  msgs1: Message[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) { 
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  setMessage(severity: string, summary: string, detail:string): void{
    this.msgs1 = [
      ...this.msgs1,
      {severity, summary, detail}
    ]
  }

  login() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.setMessage('error','Error','Form can not have empty fields.')
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.email.value, this.f.password.value).subscribe({
      next: () => {
        // add user to localStorage
        this.userService.getUserByEmail(this.f.email.value).subscribe({
          next: (user: any) => {
            this.user = user[0];
            this.user.medicalCheckDate = new Date(this.user.medicalCheckDate)
            this.user.licenseExpeditionDate = new Date(this.user.licenseExpeditionDate)
            localStorage.setItem('userData', JSON.stringify(this.user));
          },
          error: (error) => {
            this.setMessage(`error`,`Error`, `${error.status} - ${error.statusText}`)
          } 
        });
        // get return url from route parameters or default to '/'
        // timeout to give time to localStorage to loadInfo... not very proud...
        // delete when ngrx redux is implemented
        setTimeout (() => {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigate([returnUrl]);
       }, 500);
      },
      error: error => {
        switch (error.status) {
          case 401:
            this.setMessage('error','Error','Unauthorized. Password is wrong.')
            break;
          case 404:
            this.setMessage('error','Error','Not Found. This user does not exist.')
            break;
          default:
            this.setMessage(`error`,`Error`, `${error.status} - ${error.statusText}`)
            break;
        }
        this.loading = false;
      }
    });
  }
}
