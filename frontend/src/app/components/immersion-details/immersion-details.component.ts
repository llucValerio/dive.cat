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
  // graph vars
  chartBar_options:any=[];  
  dataConsumInfo:any =[];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const user: User = JSON.parse(localStorage.getItem('userData') || '');
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
    this.map_options = {
      center: {
        lat: parseFloat(this.immersion.place.latitude.$numberDecimal),
        lng: parseFloat(this.immersion.place.longitude.$numberDecimal)
      },
      zoom: 8
      };
    this.infoWindow = new google.maps.InfoWindow();
    this.initOverlays();
     //Config Chart
     this.chartBar_options = {
      plugins: {
        legend: {
          labels: { color: '#000' }
        }
      },
      scales: {
        x: {
          ticks: { color: '#000' },
          grid: { color: 'rgba(255,255,255,0.2)' }
        },
        y: {
          ticks: { color: '#000' },
          grid: { color: 'rgba(255,255,255,0.2)' }
        }
      }
    };
     //Consum Chart data
     this.dataConsumInfo = {
      labels: ["0"],
      datasets: [
        {
          label: 'Inmersion Stage',
          data: [0],
          fill: false,
          borderColor: '#617ae5',
          tension: .0
        }
      ]
    };
    this.feedStageImmersion();
  }

  getDepthImmersion(): number {
    return this.immersion.immersionStages.
    reduce((acc, stage) => acc > stage.deep ? acc : stage.deep, 0);
  }

  getAirType() {
    return this.immersion.air ? 'Air' : 'Nitrox';
  }

  immersionMinutes() {
    let immMinutes:number = 0;
    for (let stage of this.immersion.immersionStages) {
      immMinutes = immMinutes + stage.bottomMinuts;
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
    for (let buddie of this.immersion.buddies) {
      if (buddie.supervisor) {
        return buddie.buddie.name;
      }
    }
    return 'not validated'
  } 

  //Map functions
  initOverlays() {
    if (!this.map_overlays||!this.map_overlays.length) {
        this.map_overlays = [
            new google.maps.Marker({position: {
              lat: parseFloat(this.immersion.place.latitude.$numberDecimal), 
              lng: parseFloat(this.immersion.place.longitude.$numberDecimal)}, 

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

  goBacktoList():void {
    this.router.navigateByUrl('/immersions');
  }

  feedStageImmersion() {
    const stages = this.immersion.immersionStages;
    
    //sum all minutes immersion
    const reducer = (previousValue:number, currentValue:any) => previousValue + currentValue.bottomMinuts;
    const numMinutes = stages.reduce(reducer, 0);
    
    //Generate X axis
    for (let minIndex=0; minIndex<numMinutes; minIndex++){
      this.dataConsumInfo.labels.push(minIndex+1);
    }
    //Generate Y axis
    for (const stage of stages) {
      for (let longIndex=0; longIndex<stage.bottomMinuts; longIndex++){
        this.dataConsumInfo.datasets[0].data.push(stage.deep*-1);
      }
    }
    //Add arraving point
    this.dataConsumInfo.labels.push(numMinutes+1);
    this.dataConsumInfo.datasets[0].data.push(0)
  }
}
