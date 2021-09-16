import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewImmersionComponent } from './new-immersion.component';

describe('NewImmersionComponent', () => {
  let component: NewImmersionComponent;
  let fixture: ComponentFixture<NewImmersionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewImmersionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewImmersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
