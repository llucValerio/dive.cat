import { Component, OnInit } from '@angular/core';

import { first } from 'rxjs/operators';

import { User } from '../../models'
import { UserService } from '../../services/user.service';

declare var google: any;  

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  loading = false;
  user!: User;
  dataNumImmersions: any=[];
  dataConsumInfo:any =[];
  chartBar_options:any=[];

   //Map vars
   map_options: any=[];
   map_overlays: any=[];
   infoWindow: any=[];

  constructor(
    private userService: UserService
  ) {

    //Immersions/year Chart data
    this.dataNumImmersions = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Agos', 'Sept', 'Oct', 'Nov', 'Dec'],
      datasets: [
          {
              label: '2021',
              backgroundColor: '#617ae5',
              data: [65, 59, 80, 81, 56, 55, 40,60,80,0,10,20]
          }, 
          {
            label: '2020',
            backgroundColor: '#e28c0b',
            data: [20, 39, 40, 1, 0, 10, 20,30,20,5,15,10 ]
        }
      ]
    }
    //Consum Chart data
    this.dataConsumInfo = {
      labels: ['05/02', '08/02', '20/07', '30/07', '04/08', '08/08', '10/08'],
      datasets: [
          {
              label: 'Consum',
              data: [65, 59, 80, 81, 56, 55, 40],
              fill: false,
              borderColor: '#617ae5',
              tension: .4
          }
      ]
    };

    //Config Chart
    this.chartBar_options = {
      plugins: {
          legend: {
              labels: {
                  color: '#000'
              }
          }
      },
      scales: {
          x: {
              ticks: {
                  color: '#000'
              },
              grid: {
                  color: 'rgba(255,255,255,0.2)'
              }
          },
          y: {
              ticks: {
                  color: '#000'
              },
              grid: {
                  color: 'rgba(255,255,255,0.2)'
              }
          }
      }
    };
    // Map config
    this.map_options = {
      center: {lat: 36.890257, lng: 30.707417},
      zoom: 2
     };
      this.infoWindow = new google.maps.InfoWindow();
  }

  ngOnInit(): void {
    this.initOverlays();
  }
  //Map functions
  initOverlays() {
    if (!this.map_overlays||!this.map_overlays.length) {
        this.map_overlays = [
            new google.maps.Marker({position: {lat: 36.879466, lng: 30.667648}, title:"Roses", data:'25/05/09'}),
            new google.maps.Marker({position: {lat: 26.879466, lng: 30.667648}, title:"Roses", data:'25/05/09'}),
            new google.maps.Marker({position: {lat: 16.879466, lng: 30.667648}, title:"Roses", data:'25/05/09'}),
            new google.maps.Marker({position: {lat: 36.879466, lng: 10.667648}, title:"Roses", data:'25/05/09'}),
            new google.maps.Marker({position: {lat: 46.879466, lng: 40.667648}, title:"Roses", data:'25/05/09'}),

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
