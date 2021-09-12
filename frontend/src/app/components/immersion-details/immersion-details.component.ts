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
    this.immersionsNumber = user.immersions.length;

    this.immersionId = Number(this.route.snapshot.paramMap.get('immersionId'));
    if (isNaN(this.immersionId)) {
      this.immersionId = 0;
    }
    
    ((this.immersionId > this.immersionsNumber) || (this.immersionId < 1))
    ? this.immersionData = false
    : this.immersionData = true;

    (this.immersionData)
    ? this.immersion = user.immersions[this.immersionsNumber-1]
    : this.router.navigate(['notFound'])

    // google maps start
    this.map_options = {
      center: {lat: 36.890257, lng: 30.707417},
      zoom: 10
      };
    this.infoWindow = new google.maps.InfoWindow();
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
