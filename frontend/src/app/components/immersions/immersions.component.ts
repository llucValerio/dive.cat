import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/models';

import { Message } from 'primeng/api';

@Component({
  selector: 'app-immersions',
  templateUrl: './immersions.component.html',
  styleUrls: ['./immersions.component.scss']
})

export class ImmersionsComponent implements OnInit {
  user: User = JSON.parse(localStorage.getItem('currentUser') || '');
  // vars used to control data load on display component
  loading = false;
  // messages array
  msgs1: Message[] = [];

  constructor() { }

  ngOnInit(): void { }

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
