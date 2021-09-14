import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from './services';
import { of } from 'rxjs';

import { User } from './models'
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let authenticationServiceStub: Partial<AuthenticationService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AuthenticationService
      ],
      providers: [
        { provide: AuthenticationService, useValue: authenticationServiceStub },
        User
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
    authenticationServiceStub = {
      login: () => of({status: 200, body: {}})
    }
  });


  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    fixture.detectChanges();

    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('frontend app is running!');
  });
});
