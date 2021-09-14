import { Component, OnInit } from '@angular/core';

import { Immersion, User } from 'src/app/models';

import { Message } from 'primeng/api';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {
  user!: User;
  immersions!: [Immersion];
  // vars used to control data load on display component
  loading = false;
  // messages array
  msgs1: Message[] = [];

  constructor() {
    // This is intentional
  }

  ngOnInit(): void { 
    // debugger
    // order immersions by date
    this.user = JSON.parse(localStorage.getItem('userData') || '');
    this.immersions  = this.user.immersions.sort((a:any,b:any)=>{
      if (a.date>b.date){
        return -1
      }
      if (a.date<b.date){
        return 1
      }
      return 0
    })

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

  setBottomTimeCard(immersionIndex:number): number {
    if (this.immersions[immersionIndex].endHour === this.immersions[immersionIndex].startHour) {
      return (this.immersions[immersionIndex].endMinut - this.immersions[immersionIndex].startMinut);  
     } else{
       return (this.immersions[immersionIndex].endMinut+(60-this.immersions[immersionIndex].startMinut));  
     }
  }

  setDepthCard(immersionIndex:number): number {
    return this.immersions[immersionIndex].immersionStages.
    reduce((acc, immersion) => acc > immersion.deep ? acc : immersion.deep, 0);
  }

  setValidatorCard(immersionIndex:number): string {
    for (let buddie of this.immersions[immersionIndex].buddies) {
      if (buddie.supervisor) {
        return buddie.buddie.name;
      }
    }
    return 'not validated'
  }
}
