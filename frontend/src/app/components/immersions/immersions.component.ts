import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-immersions',
  templateUrl: './immersions.component.html',
  styleUrls: ['./immersions.component.scss']
})


export class ImmersionsComponent implements OnInit {
  id: string= '';
  name:string= '';
  date:string= '';
  picture:string= '';

  // modal vars for popup
  certificationModal: boolean = false;
  displayPosition: boolean = false;
  position: string= '';

  constructor(
  ) {
    this.id="#1";
    this.name="Roses";
    this.date="15/08/2021";
    this.picture="https://i.ibb.co/j4wZDmK/immarsion-picture.jpg";

  }

  ngOnInit(): void {
    
  }
  showCertificationModalDialog() {
    // this.formControlData.certificationName.setValue('')
    // this.formControlData.certifyingEntity.setValue('')
    this.certificationModal = true;
  }
}
