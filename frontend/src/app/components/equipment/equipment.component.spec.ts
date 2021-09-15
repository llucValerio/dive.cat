import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Equipment, User } from 'src/app/models';

import { EquipmentComponent } from './equipment.component';

describe('EquipmentComponent', () => {
  let component: EquipmentComponent;
  let fixture: ComponentFixture<EquipmentComponent>;

  beforeEach(async () => {
    spyOn(JSON, 'parse').and.callFake(() => {
      return {
        name:'Luke',
        equipment: {
          name: 'fins',
          brand: 'Cressi'
        }
      }
    })
    await TestBed.configureTestingModule({
      declarations: [ EquipmentComponent ],
      providers:[
        {provide: User,
          useValue: {name:'Luke'}},
        {provide: Equipment,
        useValue: {name:'fins'}}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
