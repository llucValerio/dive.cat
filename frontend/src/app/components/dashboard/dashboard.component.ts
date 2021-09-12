import { Component, OnInit } from '@angular/core';
import { Immersion, User } from 'src/app/models';

declare var google: any;  

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  user!: User;
  immersions!: [Immersion];
  // vars used to control data load on display component
  loading = false;
  // graph vars
  dataNumImmersions: any=[];
  dataConsumInfo:any =[];
  chartBar_options:any=[];
   //Map vars
   map_options: any=[];
   map_overlays: any=[];
   infoWindow: any=[];

  constructor(
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.user = JSON.parse(localStorage.getItem('userData') || '')[0];
    this.immersions  = this.user.immersions.sort((a:any,b:any)=>{
      if (a.date>b.date){
        return -1
      }
      if (a.date<b.date){
        return 1
      }
      return 0
    });
    this.loading = false;
    // Google map init
    this.map_options = {
      center: {lat: 36.890257, lng: 30.707417},
      zoom: 2
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
    //Immersions/year Chart data
    this.dataNumImmersions = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Agos', 'Sept', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: '',
          backgroundColor: '#617ae5',
          data: [0,0,0,0,0,0,0,0,0,0,0,0]
        }, 
        {
          label: '',
          backgroundColor: '#e28c0b',
          data: [0,0,0,0,0,0,0,0,0,0,0,0]
        }
      ]
    };
    this.feedLastYearImmersions()
    //Consum Chart data
    this.dataConsumInfo = {
      labels: [],
      datasets: [
        {
          label: 'RMV ( (l/min)*atm )',
          data: [],
          fill: false,
          borderColor: '#617ae5',
          tension: .4
        }
      ]
    };
    this.feedAirPerImmersion();
  }

  feedLastYearImmersions():void {
    const actualDate:Date = new Date;
    const actualYear: number = actualDate.getFullYear();
    const lastYear: number = actualDate.getFullYear()-1;

    this.dataNumImmersions.datasets[0].label = actualYear.toString();
    this.dataNumImmersions.datasets[1].label = lastYear.toString();

    for (let immIndex=0;immIndex < this.immersions.length; immIndex++) {
      let immersionDate = new Date(this.immersions[immIndex].date)
      if (immersionDate.getFullYear()<lastYear){
        console.log('going to break')
        break;
      } else {
        if (immersionDate.getFullYear() === actualYear ) {
          this.dataNumImmersions.datasets[0].data[immersionDate.getMonth()] = 
          (this.dataNumImmersions.datasets[0].data[immersionDate.getMonth()]) + 1
        }
        if (immersionDate.getFullYear() === lastYear ) {
          this.dataNumImmersions.datasets[1].data[immersionDate.getMonth()] = 
          (this.dataNumImmersions.datasets[1].data[immersionDate.getMonth()]) + 1
        }
      }
    }
  }

  feedAirPerImmersion() {
    let immDescendant: Immersion[]  = this.immersions.sort((a:any,b:any)=>{
      if (a.date<b.date){
        return -1
      }
      if (a.date>b.date){
        return 1
      }
      return 0
    });

    if (immDescendant.length> 15) {
      immDescendant = immDescendant.slice(immDescendant.length-15, immDescendant.length)
    }
    
    for(let immIndex=0;immIndex<immDescendant.length;immIndex++) {
      let immersionDate = new Date(this.immersions[immIndex].date)
      this.dataConsumInfo.labels.push(`${immersionDate.getMonth()+1}/${immersionDate.getFullYear()}`)
      // debugger
      const caca: any = this.airConsumed(immDescendant[immIndex])
      // debugger
      this.dataConsumInfo.datasets[0].data.push(caca)
    }
  }

  restDaysCalc(stringDate:Date):number {
    const itemDate: Date = new Date(stringDate)
    const todayDate: Date = new Date()
    itemDate.setFullYear(itemDate.getFullYear()+1)
    const daysUntilEnd: number = Math.round(((((itemDate.getTime()-todayDate.getTime())/1000)/60)/60)/24)
    return daysUntilEnd;
  }

  getImmersionDepth(immersionIndex:number): number {
    return this.immersions[immersionIndex].immersionStages.
    reduce((acc, immersion) => acc = acc > immersion.deep ? acc : immersion.deep, 0);
  }

  maxDepth(): number {
    let maxDepth: number = 0;
    for(let immIndex=0;immIndex<this.immersions.length; immIndex++){
      if (maxDepth<this.getImmersionDepth(immIndex)){
        maxDepth = this.getImmersionDepth(immIndex)
      }
    }
    return maxDepth;
  }

  averageDiveTime():number {
    // debugger
    let totalAverage:number = 0;
    for(let immIndex=0;immIndex<this.immersions.length; immIndex++){
      let average:number = 0
      for(let stageIndex=0;stageIndex<this.immersions[immIndex].immersionStages.length; stageIndex++){
        average = average + this.immersions[immIndex].immersionStages[stageIndex].bottomMinuts;
      }
      totalAverage = totalAverage + average
    }
    totalAverage = totalAverage / this.immersions.length
    return totalAverage;
  }

  immersionMinutes(immersion: Immersion) {
    let immMinutes:number = 0;
    for (let index=0;index<immersion.immersionStages.length;index++) {
      immMinutes = immMinutes + immersion.immersionStages[index].bottomMinuts;
    }
    return immMinutes;
  }

  getDepthImmersion(immersion: Immersion): number {
    return immersion.immersionStages.
    reduce((acc, stage) => acc = acc > stage.deep ? acc : stage.deep, 0);
  }

  atmCalculation(immersion: Immersion) {
    const maxDepth = this.getDepthImmersion(immersion);
    return ((Math.floor(maxDepth/10))+1)
  }

  airConsumed(immersion: Immersion): number {
    const initialPressure:number = immersion.inicialBar;
    const finalPressure:number = immersion.finalBar;
    const immersionMinutes:number = this.immersionMinutes(immersion);
    const diveAtmospheres:number = this.atmCalculation(immersion);
    const tankAir:number = immersion.tankAirLiters;

    return (((initialPressure - finalPressure) / immersionMinutes)/diveAtmospheres)*tankAir
  }

  //Map functions
  initOverlays() {
    if (!this.map_overlays||!this.map_overlays.length) {

      for (let immIndex=0;immIndex<this.immersions.length;immIndex++){
        this.map_overlays.push(
          new google.maps.Marker({position: {lat: this.immersions[immIndex].place.latitude, lng: this.immersions[immIndex].place.longitude}, title:this.immersions[immIndex].place.name, data:this.immersions[immIndex].date}),
        )
      }
    }
  }

  handleOverlayClick(event:any) {
    let isMarker = event.overlay.getTitle != undefined;

    if (isMarker) {
        let title = event.overlay.getTitle();
        this.infoWindow.setContent('' + title + '');
        this.infoWindow.open(event.map, event.overlay);
        event.map.setCenter(event.overlay.getPosition());
    }
  }
}
