import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common'
import { PrimeNGConfig } from 'primeng/api';

import { User, Immersion } from '../../models'
import { UserService, ImmersionsService } from 'src/app/services';

import { Message } from 'primeng/api';

declare var google: any;  

interface dropdown {
  name: string,
  code: string
}

@Component({
  selector: 'app-new-immersion',
  templateUrl: './new-immersion.component.html',
  styleUrls: ['./new-immersion.component.scss']
})

export class NewImmersionComponent implements OnInit {
  //user DDBB loaded
  user!: User;
  allUsers!:[User]
  // vars used to control data load on display component
  loading = false;
  //update form data
  addForm!: FormGroup;
  submitted = false;
  stageMinuts!: string;
  stageDeep!: string;
  // messages array
  msgs1: Message[] = [];
  // ************************** MESSAGE EXAMPLES **************************
  // {severity:'success', summary:'Success', detail:'Message Content'},
  // {severity:'error', summary:'Error', detail:'Message Content'}
  // {severity:'info', summary:'Info', detail:'Message Content'}
  // {severity:'warn', summary:'Warn', detail:'Message Content'}
  // **********************************************************************
  // modal vars for popup
  immersionStageModal: boolean = false;
  buddieModal: boolean = false;
  displayPosition: boolean = false;
  position: string= '';
  //Vars for map
  dialogVisible: boolean = false;
  selectedPosition!: any;
  options: any=[];
  infoWindow: any=[];
  overlays: any=[];
  markerTitle!: any;
  draggable: boolean=false;
  //DropDown vars
  visibilityOptions:any=[];
  visibilitySelector!: dropdown;
  
  entryFromOptions:any=[];
  entryFromSelector!: dropdown;

  waterTypeOptions:any=[];
  waterTypeSelector!: dropdown;
  
  waterCondiOptions:any=[];
  waterCondiSelector!: dropdown;

  airTypeOptions:any=[];
  airTypeSelector!: dropdown;
  
  constructor(
    private userService: UserService,
    private immService: ImmersionsService,
    private formBuilder: FormBuilder,
    private location: Location,
    private primengConfig: PrimeNGConfig
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.user = JSON.parse(localStorage.getItem('userData') || '')
    this.formEnable();
    this.user.medicalCheckDate = new Date(this.user.medicalCheckDate)
    this.user.licenseExpeditionDate = new Date(this.user.licenseExpeditionDate)
    //Map config
    this.options = {
      center: {
        lat: parseFloat(this.user.center.latitude.$numberDecimal),
        lng: parseFloat(this.user.center.longitude.$numberDecimal)
      },
      zoom: 7
    };
    // this.initOverlays();
    this.infoWindow = new google.maps.InfoWindow();
    //Dropdown options
    this.loadDropDown();
    this.loading = false;
  }

  formEnable() {
    this.addForm = this.formBuilder.group({
      date: new Date,
      startHour: 0,
      startMinut: 0,
      endHour: 0,
      endMinut: 0,
      airTemperature: 0,
      waterTemperature: 0,
      visibilitySelector: '',
      entryFromSelector: '',
      waterTypeSelector:'',
      waterCondiSelector: '', 
      neopreneThickness:0, 
      weight:0, 
      tankAirLiters:0, 
      air:true, 
      nitroxPercentage:0, 
      inicialBar:0,
      finalBar:0,
      stages:[[]],
      buddies: [[]],
      comments: '',
      stageMinuts: 0,
      stageDeep: 0
    });
  }

  loadDropDown() {
    this.visibilityOptions = [
      {name: 'Poor', code: 'Poor'},
      {name: 'Good', code: 'Good'},
      {name: 'Very Good', code: 'Very Good'}
    ];

    this.entryFromOptions = [
      {name: 'From beach', code: 'From beach'},
      {name: 'From boat', code: 'From boat'}
    ];
    this.waterTypeOptions = [
      {name: 'See water', code: 'See water'},
      {name: 'No see water', code: 'No see water'}
    ];
    this.waterCondiOptions = [
      {name: 'Bad', code: 'Bad'},
      {name: 'Normal', code: 'Normal'},
      {name: 'Good', code: 'Good'}, 
      {name: 'Very Good', code: 'Very Good'}
    ];
    this.waterCondiOptions = [
      {name: 'Bad', code: 'Bad'},
      {name: 'Normal', code: 'Normal'},
      {name: 'Good', code: 'Good'}, 
      {name: 'Very Good', code: 'Very Good'}
    ];
  }
  // convenience getter for easy access to form fields
  get formControlData() { return this.addForm.controls; }

  setMessage(severity: string, summary: string, detail:string): void{
    this.msgs1 = [
      ...this.msgs1,
      {severity, summary, detail}
    ]
  }

  setError(error: any) {
    switch (error.status) {
      case 401:
      this.setMessage('error','Error','Unauthorized. Password is wrong.')
        break;
      case 404:
        this.setMessage('error','Error','Not Found. This user does not exist.')
        break;
      default:
        this.setMessage(`error`,`Error`, `${error.status} - ${error.statusText}`)
      break;
    }
  }

  cancelFormEnable():void {
    this.location.back()
  }

  deleteBuddie(arrayIndex: number):void {
    this.formControlData.buddies.value.splice(arrayIndex,1)
    this.formControlData.buddies.markAsTouched()
  }

  deleteStage(arrayIndex: number):void {
    this.formControlData.stages.value.splice(arrayIndex,1)
    this.formControlData.stages.markAsTouched()
  }

  addBuddie(buddie: any):void {
    this.formControlData.buddies.value.push({
      _id:buddie._id,
      name:buddie.name,
      surnames:buddie.surnames,
      picture: buddie.picture
    })
    this.buddieModal = false;
    this.formControlData.buddies.markAsTouched()
  }

  addStage():void {
    if (this.formControlData.stageDeep.value <= 0 || this.formControlData.stageMinuts.value <= 0) {
      this.setMessage('error', 'Error', 'Values can NOT be 0.')
      return
    }
    this.formControlData.stages.value.push({
      deep: this.formControlData.stageDeep.value,
      bottomMinuts: this.formControlData.stageMinuts.value
    })
    this.immersionStageModal = false
    this.formControlData.stages.markAsTouched()
  }

  showImmersionStageModalDialog() {
    this.immersionStageModal = true;
  }

  showPositionDialog(position: string) {
    this.position = position;
    this.displayPosition = true;
  }

  showBuddiesModalDialog() {
    this.buddieModal = true;
  } 
  //Map event
  handleMapClick(event:any) {
    this.dialogVisible = true;
    this.selectedPosition = event.latLng;
  }
  
  addMarker() {
    this.overlays[0] = new google.maps.Marker({position:{lat: this.selectedPosition.lat(), lng: this.selectedPosition.lng()}, title:this.markerTitle});
    this.markerTitle = null;
    this.dialogVisible = false;
  }

  addImmersion() { 
    let readyToInsert:boolean = false;
    let addOk:boolean = true;
    let newImmersion! : Immersion
    
    newImmersion = {
      ...newImmersion,
      date: this.formControlData.date.value
    } 
    newImmersion = {
      ...newImmersion,
      startHour: this.formControlData.startHour.value
    } 
    newImmersion = {
      ...newImmersion,
      startMinut: this.formControlData.startMinut.value
    } 
    newImmersion = {
      ...newImmersion,
      endHour: this.formControlData.endHour.value
    } 
    newImmersion = {
      ...newImmersion,
      endMinut: this.formControlData.endMinut.value
    } 
    newImmersion = {
      ...newImmersion,
      airTemperature: this.formControlData.airTemperature.value
    } 
    newImmersion = {
      ...newImmersion,
      waterTemperature: this.formControlData.waterTemperature.value
    } 
    newImmersion = {
      ...newImmersion,
      visibility: this.formControlData.visibilitySelector.value.name
    } 
    newImmersion = {
      ...newImmersion,
  entry: this.formControlData.entryFromSelector.value.name
    } 
  newImmersion = {
    ...newImmersion,
    waterType: this.formControlData.waterTypeSelector.value.name
  }
  newImmersion = {
    ...newImmersion,
    seaConditions: this.formControlData.waterCondiSelector.value.name
  }
  newImmersion = {
    ...newImmersion,
    neopreneThickness: this.formControlData.neopreneThickness.value
  }
  newImmersion = {
    ...newImmersion,
    weight: this.formControlData.weight.value
  }
  newImmersion = {
    ...newImmersion,
    tankAirLiters: this.formControlData.tankAirLiters.value
  }
  newImmersion = {
    ...newImmersion,
    air: this.formControlData.air.value
  } 
  newImmersion = {
    ...newImmersion,
    nitroxPercentage: this.formControlData.nitroxPercentage.value
  } 
  newImmersion = {
    ...newImmersion,
      inicialBar: this.formControlData.inicialBar.value
    } 
    newImmersion = {
      ...newImmersion,
      finalBar: this.formControlData.finalBar.value
    } 
    newImmersion = {
      ...newImmersion,
      immersionStages: this.formControlData.stages.value
    } 
    newImmersion = {
      ...newImmersion,
      buddies: this.formControlData.buddies.value
    } 
    newImmersion = {
      ...newImmersion,
      comments: this.formControlData.comments.value
    }
    newImmersion = {
      ...newImmersion,
      place: {
        name:this.overlays[0].title,
        latitude: this.overlays[0].position.lat(),
        longitude: this.overlays[0].position.lng()
      }
    }
    newImmersion.pictures = [{url:'https://i.ibb.co/kgqwWHz/240px-No-image-available.png'}]

    if (addOk){
      this.loading = true;
      this.immService.addImmersion(newImmersion,this.user._id).subscribe({
        next: () => {
          this.loading = false;
          this.userService.getUserByEmail(this.user.email).subscribe({
            next:(user:any) => {
              this.user = user[0];
              localStorage.setItem('userData', JSON.stringify(this.user));
              this.user.medicalCheckDate = new Date(this.user.medicalCheckDate)
              this.user.licenseExpeditionDate = new Date(this.user.licenseExpeditionDate)
              this.primengConfig.ripple = true;
            },
            error: (error) => {
              this.setError (error)
            }
          })
        },
        error: (error) => {
          this.setError(error)
        }
      });
    }
  }
}
