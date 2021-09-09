import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { Message } from 'primeng/api';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  // vars used to control data load on display component
  loading = false;
  //update form data
  registerForm!: FormGroup;
  submitted = false;

  msgs1: Message[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,

    ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      surnames: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
   }

  get formControlData() { return this.registerForm.controls; }

  setMessage(severity: string, summary: string, detail:string): void{
    this.msgs1 = [
      ...this.msgs1,
      {severity, summary, detail}
    ]
  }

  registerUser() {
    let registerOk:boolean = true;
    let registeredUser : Object = {}
    
    if (this.formControlData.name.value.trim().length <= 0) {
      this.setMessage('error','Error','Name field can not be empty.')
      registerOk = false;
    } else {
      registeredUser = {
        ...registeredUser,
        name: this.formControlData.name.value
      }
    } 
    if (this.formControlData.surnames.value.trim().length <= 0) {
      this.setMessage('error','Error','Surname field name can not be empty.')
      registerOk = false;
    } else {
      registeredUser = {
        ...registeredUser,
        surnames: this.formControlData.surnames.value
      } 
    }
    if (this.formControlData.email.value.trim().length <= 0) {
      this.setMessage('error','Error','Email field name can not be empty.')
      registerOk = false;
    } else {
      if (!this.formControlData.email.value.match('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')) {
          this.setMessage('error','Error','Email must be like mail@domain.com')
          registerOk = false;
      } else {
        registeredUser = {
         ...registeredUser,
         email: this.formControlData.email.value
        } 
      }
    }
    // debugger
    if(this.formControlData.password.value.trim().length<=0 
    || this.formControlData.confirmPassword.value.trim().length<=0) {
      this.setMessage('error', 'Error', 'Password fields can not be empty.')
      registerOk = false;
    } else {
      if(this.formControlData.password.value !== this.formControlData.confirmPassword.value) {
        this.setMessage('error', 'Error', 'Password fields must match.')
        registerOk = false;
      } else {
        registeredUser = {
          ...registeredUser,
          password: this.formControlData.password.value
        } 
      }
    }
    if (registerOk){
      this.loading = true;
      this.userService.registerUser(registeredUser).subscribe((user: any) => {
        this.loading = false;
        this.router.navigateByUrl('/login');
      });
    }
  }
}
