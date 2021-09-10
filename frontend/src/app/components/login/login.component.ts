import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {first} from 'rxjs/operators'

import { AuthenticationService } from 'src/app/services';

import {Message,MessageService} from 'primeng/api';
// import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
 
  // View details about managins messages in https://www.primefaces.org/primeng/showcase/#/messages
  msgs1: Message[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
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

  login(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.setMessage('error','Error','Form can not have empty fields.')
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.email.value, this.f.password.value)
        .pipe(first())
        .subscribe({
            next: () => {
              // get return url from route parameters or default to '/'
              const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
              this.router.navigate([returnUrl]);
            },
            error: error => {
              debugger  
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
