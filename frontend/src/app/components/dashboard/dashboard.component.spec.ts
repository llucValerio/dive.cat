import { ComponentFixture, TestBed } from '@angular/core/testing';
import { User } from 'src/app/models';
import { HeaderComponent } from '../header/header.component';

import { DashboardComponent } from './dashboard.component';

declare var google: any;  

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    spyOn(JSON, 'parse').and.callFake(() => {
      return {
        name:'Luke',
        equipment: [
          {
            name: 'fins',
            brand: 'Cressi'
          }
        ],
        immersions: [
          {date: '2020/09/01'},
          {date: '2019/09/01'}
        ]
      }
    })

    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent, HeaderComponent ],
      providers:[
        {
          provide: User,
          useValue: {
            name: 'Luke'
          }
        }, 
        google
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

    
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
