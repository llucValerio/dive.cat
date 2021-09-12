import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Immersion, User } from 'src/app/models';

declare var google: any;  

@Component({
  selector: 'app-immersion-details',
  templateUrl: './immersion-details.component.html',
  styleUrls: ['./immersion-details.component.scss']
})

export class ImmersionDetailsComponent implements OnInit {
  immersionId!: number;
  immersionsNumber!: number;
  immersionData!:boolean;
  immersion!: Immersion;
  //Map vars
  map_options: any=[];
  map_overlays: any=[];
  infoWindow: any=[];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const user: User = JSON.parse(localStorage.getItem('userData') || '')[0];
    const immersions  = user.immersions.sort((a:any,b:any)=>{
      if (a.date>b.date){
        return -1
      }
      if (a.date<b.date){
        return 1
      }
      return 0
    })
    
    this.immersionsNumber = immersions.length;

    this.immersionId = Number(this.route.snapshot.paramMap.get('immersionId'));
    if (isNaN(this.immersionId)) {
      this.immersionId = 0;
    }
    
    ((this.immersionId > this.immersionsNumber) || (this.immersionId < 1))
    ? this.immersionData = false
    : this.immersionData = true;

    (this.immersionData)
    ? this.immersion = immersions[this.immersionsNumber - this.immersionId]
    : this.router.navigate(['notFound'])

    // google maps start
    console.log(this.immersion.place.latitude)
    console.log(this.immersion.place.longitude)
    this.map_options = {
      center: {lat: this.immersion.place.latitude, lng: this.immersion.place.longitude},
      zoom: 8
      };
    this.infoWindow = new google.maps.InfoWindow();
    this.initOverlays();

    // debugger
  }

  getDepthImmersion(): number {
    return this.immersion.immersionStages.
    reduce((acc, stage) => acc = acc > stage.deep ? acc : stage.deep, 0);
  }

  getAirType() {
    return this.immersion.air ? 'Air' : 'Nitrox';
  }

  immersionMinutes() {
    let immMinutes:number = 0;
    for (let index=0;index<this.immersion.immersionStages.length;index++) {
      immMinutes = immMinutes + this.immersion.immersionStages[index].bottomMinuts;
    }
    return immMinutes;
  }

  atmCalculation() {
    const maxDepth = this.getDepthImmersion();
    return ((Math.floor(maxDepth/10))+1)
  }

  airConsumed(): number {
    const initialPressure:number = this.immersion.inicialBar;
    const finalPressure:number = this.immersion.finalBar;
    const immersionMinutes:number = this.immersionMinutes();
    const diveAtmospheres:number = this.atmCalculation();
    const tankAir:number = this.immersion.tankAirLiters;

    return (((initialPressure - finalPressure) / immersionMinutes)/diveAtmospheres)*tankAir
  }

  getBuddies():string {
    let immersionBuddies: string = '';
    if (this.immersion.buddies.length>0){
      for(let index=0;index<this.immersion.buddies.length;index++) {
        immersionBuddies = immersionBuddies + this.immersion.buddies[index].buddie.name;
        if (index<this.immersion.buddies.length-1){
          immersionBuddies = immersionBuddies + ', ';
        } else {
          immersionBuddies = immersionBuddies + '.';
        }
      }
      return immersionBuddies
    } else {
      return 'no buddies - you should not dive alone!!!'
    }
  }

  getValidator(): string {
    for (let index:number=0; index<this.immersion.buddies.length; index++){
      if (this.immersion.buddies[index].supervisor) {
        return this.immersion.buddies[index].buddie.name;
      }
    }
    return 'not validated'
  } 

  //Map functions
  initOverlays() {
    if (!this.map_overlays||!this.map_overlays.length) {
        this.map_overlays = [
            new google.maps.Marker({position: {
              lat: this.immersion.place.latitude, 
              lng: this.immersion.place.longitude}, 
              title:this.immersion.place.name
            }),
        ];
    }
  }

  handleOverlayClick(event:any) {
    let isMarker = event.overlay.getTitle != undefined;

    if (isMarker) {
        let title = event.overlay.getTitle();
        this.infoWindow.setContent('' + title);
        this.infoWindow.open(event.map, event.overlay);
        event.map.setCenter(event.overlay.getPosition());
    }
  }
}
