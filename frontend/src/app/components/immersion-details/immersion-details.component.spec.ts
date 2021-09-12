import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmersionDetailsComponent } from './immersion-details.component';

describe('ImmersionDetailsComponent', () => {
  let component: ImmersionDetailsComponent;
  let fixture: ComponentFixture<ImmersionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImmersionDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImmersionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
