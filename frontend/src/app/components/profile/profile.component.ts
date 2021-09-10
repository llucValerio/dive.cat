import { Component, DebugElement, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';

import { first } from 'rxjs/operators';
import { take } from 'rxjs/operators';

import { User } from '../../models'
import { UserService } from '../../services/user.service';

import { Message } from 'primeng/api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  //user DDBB loaded
  user!: User;
  allUsers!:[User]
  // vars used to control data load on display component
  loading = false;
  //update form data
  updateForm!: FormGroup;
  submitted = false;
  newPassword:string = '';
  repeatPassword:string = '';
  certificationName: string = '';
  certifyingEntity:string = '';
  // messages array
  msgs1: Message[] = [];
  // ************************** MESSAGE EXAMPLES **************************
  // {severity:'success', summary:'Success', detail:'Message Content'},
  // {severity:'error', summary:'Error', detail:'Message Content'}
  // {severity:'info', summary:'Info', detail:'Message Content'}
  // {severity:'warn', summary:'Warn', detail:'Message Content'}
  // **********************************************************************
  // var to control update function
  updatingState: boolean = false
  // modal vars for popup
  certificationModal: boolean = false;
  buddieModal: boolean = false;
  displayPosition: boolean = false;
  position: string= '';

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private primengConfig: PrimeNGConfig
  ) { }

  ngOnInit(): void {
    this.loading = true;
    // this.userService.getAll().pipe(first()).subscribe((user: any) => {
    // this.userService.getAll().subscribe((user: any) => {
    this.userService.getUserByEmail().pipe(take(1)).subscribe({
      next: (user: any) => {
        this.loading = false;
        this.user = user[0];
        this.user.medicalCheckDate = new Date(this.user.medicalCheckDate)
        this.user.licenseExpeditionDate = new Date(this.user.licenseExpeditionDate)
        this.primengConfig.ripple = true;
      },
      error: (error) => {
        this.setError(error)
      } 
    });
  }

  // convenience getter for easy access to form fields
  // get f() { return this.updateForm.controls; }
  get formControlData() { return this.updateForm.controls; }

  setMessage(severity: string, summary: string, detail:string): void{
    this.msgs1 = [
      ...this.msgs1,
      {severity, summary, detail}
    ]
  }

  setError(error: any) {
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
  }

  updateProfile() { 
    let touched:boolean = false;
    let updateOk:boolean = true;
    let updatedUser : Object = {}
    
    if (this.formControlData.name.touched) {
      if (this.formControlData.name.value.trim().length <= 0) {
        this.setMessage('error','Error','Name field can not be empty.')
        updateOk = false;
      }
      updatedUser = {
        ...updatedUser,
        name: this.formControlData.name.value
      } 
      touched = true;
    }
    if (this.formControlData.surnames.touched) {
      if (this.formControlData.surnames.value.trim().length <= 0) {
        this.setMessage('error','Error','Surname field name can not be empty.')
        updateOk = false;
      }
      updatedUser = {
        ...updatedUser,
        surnames: this.formControlData.surnames.value
      } 
      touched = true;
    }
    if (this.formControlData.email.touched) {
      if (this.formControlData.email.value.trim().length <= 0) {
        this.setMessage('error','Error','Email field name can not be empty.')
        updateOk = false;
      }
      if (!this.formControlData.email.value.match('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')) {
         this.setMessage('error','Error','Email must be like mail@domain.com')
         updateOk = false;
      }
      updatedUser = {
        ...updatedUser,
        email: this.formControlData.email.value
      } 
      touched = true;
    }
    if (this.formControlData.licenseNumber.touched) {
      if (this.formControlData.licenseNumber.value.trim().length <= 0) {
        this.setMessage('error','Error','License Number field name can not be empty.')
        updateOk = false;
      }      
      updatedUser = {
        ...updatedUser,
        licenseNumber: this.formControlData.licenseNumber.value
      } 
      touched = true;
    }
    if (this.formControlData.medicalCheckDate.touched) {
      if (!this.formControlData.medicalCheckDate.value) {
        this.setMessage('error','Error','Medical check date can not be empty.')
        updateOk = false;
      }      
      updatedUser = {
        ...updatedUser,
        medicalCheckDate: this.formControlData.medicalCheckDate.value
      } 
      touched = true;
    }
    if (this.formControlData.licenseExpeditionDate.touched) {
      if (!this.formControlData.licenseExpeditionDate.value) {
        this.setMessage('error','Error','License expedition date can not be empty.')
        updateOk = false;
      }      
      updatedUser = {
        ...updatedUser,
        licenseExpeditionDate: this.formControlData.licenseExpeditionDate.value
      } 
      touched = true;
    }
    if (this.formControlData.certifications.touched) {
      updatedUser = {
        ...updatedUser,
        certifications: this.formControlData.certifications.value
      } 
      touched = true;
    }
    if (this.formControlData.buddies.touched) {
      updatedUser = {
        ...updatedUser,
        buddies: this.formControlData.buddies.value
      } 
      touched = true;
    }
    if (this.formControlData.newPassword.touched || this.formControlData.repeatPassword.touched) {
      if(this.formControlData.newPassword.value !== this.formControlData.repeatPassword.value) {
        this.setMessage('error', 'Error', 'Password fields must match.')
        updateOk = false;
      }
      updatedUser = {
        ...updatedUser,
        password: this.formControlData.newPassword.value
      } 
      touched = true;
    }
    if (!touched) {
      this.setMessage('warn', 'Warn', 'No changes made.');
      return;
    }
    if (updateOk && touched){
      this.loading = true;
      this.userService.updateUserById(updatedUser,this.user._id).subscribe({
        next: (user: any) => {
          this.loading = false;
          this.user = user;
          this.user.medicalCheckDate = new Date(this.user.medicalCheckDate)
          this.user.licenseExpeditionDate = new Date(this.user.licenseExpeditionDate)
          this.primengConfig.ripple = true;
        },
        error: (error) => {
          this.setError(error)
        }
      });
      this.updatingState = false;
    }
  }

  updateFormEnable() {
    this.updatingState = true;

    this.updateForm = this.formBuilder.group({
      _id: [this.user._id, Validators.required],
      name: [this.user.name, Validators.required],
      surnames: [this.user.surnames, Validators.required],
      email: [this.user.email, Validators.required],
      newPassword: [this.newPassword, Validators.required],
      repeatPassword: [this.repeatPassword, Validators.required],
      licenseNumber: [this.user.licenseNumber, Validators.required],
      medicalCheckDate: [this.user.medicalCheckDate, Validators.required],
      licenseExpeditionDate: [this.user.licenseExpeditionDate, Validators.required],
      certifications:[this.user.certifications.slice(0)],
      buddies: [this.user.buddies.slice(0)],
      certificationName: [this.certificationName,Validators.required],
      certifyingEntity:[this.certifyingEntity,Validators.required]
    });
  }

  cancelFormEnable():void {
    this.updatingState = false;
  }

  deleteBuddie(arrayIndex: number):void {
    this.formControlData.buddies.value.splice(arrayIndex,1)
    this.formControlData.buddies.markAsTouched()
  }

  deleteCertification(arrayIndex: number):void {
    this.formControlData.certifications.value.splice(arrayIndex,1)
    this.formControlData.certifications.markAsTouched()
  }

  addBuddie(buddie: any):void {
    this.formControlData.buddies.value.push({
      _id:buddie._id,
      name:buddie.name,
      surnames:buddie.surnames,
      picture: buddie.picture
    })
    this.buddieModal = false;
    this.formControlData.buddies.markAsTouched()
  }

  addCertification():void {
    if (this.formControlData.certificationName.value.trim().length <= 0 || this.formControlData.certifyingEntity.value.trim().length<= 0) {
      this.setMessage('error', 'Error', 'Must fill both fields.')
      return
    }
    this.formControlData.certifications.value.push({
      name: this.formControlData.certificationName.value,
      certifyingEntity: this.formControlData.certifyingEntity.value
    })
    this.certificationModal = false
    this.formControlData.certifications.markAsTouched()

  }

  showCertificationModalDialog() {
    this.formControlData.certificationName.setValue('')
    this.formControlData.certifyingEntity.setValue('')
    this.certificationModal = true;
  }

  showPositionDialog(position: string) {
    this.position = position;
    this.displayPosition = true;
  }

  showBuddiesModalDialog() {
    this.loading = true;
    this.userService.getAllUsers().pipe(take(1)).subscribe({
      next: (users: any) => {
        this.loading = false;
        this.allUsers = users;
      },
      error: (error) => {
        this.setError(error)
      }
    });
    this.buddieModal = true;
  }
}

