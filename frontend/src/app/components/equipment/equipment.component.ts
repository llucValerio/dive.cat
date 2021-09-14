import { Component, OnInit } from '@angular/core';

import { Equipment, User } from 'src/app/models';

import { Message } from 'primeng/api';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {
  user!: User;
  equipment!: [Equipment];
  // vars used to control data load on display component
  loading = false;
  // messages array
  msgs1: Message[] = [];

  constructor() {
    // This is intentional
  }

  ngOnInit(): void { 
    this.user = JSON.parse(localStorage.getItem('userData') || '');
    this.equipment  = this.user.equipment;
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
}
