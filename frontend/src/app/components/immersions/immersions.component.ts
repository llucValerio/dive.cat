import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/models';

import { Message } from 'primeng/api';

declare var google: any;  

@Component({
  selector: 'app-immersions',
  templateUrl: './immersions.component.html',
  styleUrls: ['./immersions.component.scss']
})

export class ImmersionsComponent implements OnInit {
  user!: User;
  immersions!: [];
  // vars used to control data load on display component
  loading = false;
  // messages array
  msgs1: Message[] = [];
  //Map vars
  map_options: any=[];
  map_overlays: any=[];
  infoWindow: any=[];

  constructor() { }

  ngOnInit(): void { 
    // debugger
    // order immersions by date
    this.user = JSON.parse(localStorage.getItem('userData') || '')[0];
    this.immersions = this.user.immersions.sort((a:any,b:any)=>{
      if (a.date>b.date){
        return -1
      }
      if (a.date<b.date){
        return 1
      }
      return 0
    })
    // google maps start
    this.map_options = {
      center: {lat: 36.890257, lng: 30.707417},
      zoom: 10
     };
    this.infoWindow = new google.maps.InfoWindow();
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

  setNumberCard(immersionIndex:number): number {
    return 0;
  }
  
  setDateCard(immersionIndex:number): number {
    return 0;
  }
  
  setDepthCard(immersionIndex:number): number {
    return 0;
  }

  setValidatorCard(immersionIndex:number): number {
    return 0;
  }

  setBottomTimeCard(immersionIndex:number): number {
    return 0;
  }

    //Map functions
    initOverlays() {
      if (!this.map_overlays||!this.map_overlays.length) {
          this.map_overlays = [
              new google.maps.Marker({position: {lat: 36.879466, lng: 30.667648}, title:"Roses", data:'25/05/09'}),
          ];
      }
    }
    handleOverlayClick(event:any) {
      let isMarker = event.overlay.getTitle != undefined;
  
      if (isMarker) {
          let title = event.overlay.getTitle();
          this.infoWindow.setContent('' + title + ''+ '</br> sdasdasd');
          this.infoWindow.open(event.map, event.overlay);
          event.map.setCenter(event.overlay.getPosition());
      }
    }
}
