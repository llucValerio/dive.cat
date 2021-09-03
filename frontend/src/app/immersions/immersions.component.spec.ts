import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmersionsComponent } from './immersions.component';

describe('ImmersionsComponent', () => {
  let component: ImmersionsComponent;
  let fixture: ComponentFixture<ImmersionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImmersionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImmersionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
