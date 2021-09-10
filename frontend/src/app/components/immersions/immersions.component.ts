import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { take } from 'rxjs/operators';

import { ImmersionsService } from '../../services/immersions.service';
import { UserService } from '../../services/user.service';

import { Message } from 'primeng/api';
import { Immersion } from 'src/app/models/immersion';

@Component({
  selector: 'app-immersions',
  templateUrl: './immersions.component.html',
  styleUrls: ['./immersions.component.scss']
})


export class ImmersionsComponent implements OnInit {
  userImmersions = Immersion

  // modal vars for popup
  certificationModal: boolean = false;
  displayPosition: boolean = false;
  position: string= '';
  // vars used to control data load on display component
  loading = false;
  // messages array
  msgs1: Message[] = [];

  constructor(
    private userService: UserService,
    private immerService: ImmersionsService,
    ) { }

  ngOnInit(): void {
    this.loading = true;
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

  setMessage(severity: string, summary: string, detail:string): void{
    this.msgs1 = [
      ...this.msgs1,
      {severity, summary, detail}
    ]
  }

  setError(error: any) {
    switch (error.status) {
      case 401:
      this.setMessage('error','Error','Unauthorized.')
        break;
      case 404:
        this.setMessage('error','Error','Not Found. This does not exist.')
        break;
      default:
        this.setMessage(`error`,`Error`, `${error.status} - ${error.statusText}`)
      break;
    }
  }

  showCertificationModalDialog() {
    // this.formControlData.certificationName.setValue('')
    // this.formControlData.certifyingEntity.setValue('')
    this.certificationModal = true;
  }
}
